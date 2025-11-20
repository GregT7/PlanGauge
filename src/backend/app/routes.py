import importlib.metadata, time, os, requests, sys
from datetime import datetime, timedelta, timezone
from flask import jsonify, request, g
from . import app
from .utils import *
from .clients import get_supabase, get_notion_headers, get_notion_ids
from .auth_utils import require_session, verify_password, set_session_cookie, clear_session_cookie, current_session_id, hash_password, SESSION_TTL_HOURS
import asyncio


@app.route('/')
def index():
    return 'Home Web Page'

@app.before_request
def log_origin():
    print("Headers:", request.headers)

# @app.route('/api/health', methods=['GET'])
@app.get('/api/health')
def determine_health():
    start_time = time.perf_counter()
    try:
        version_dict = {"version": importlib.metadata.version("flask")}
        http_response = ok_resp(["flask"], start_time, **version_dict)
        return jsonify(http_response), 200
    except Exception as e:
        http_response = err_resp(["flask"], start_time, code="internal_error",
                                message="Flask internal error", details=pack_exc(e))
        return jsonify(http_response), 500


# @app.route('/api/db/health', methods=['GET'])
@app.get('/api/db/health')
def db_health_check():
    start_time = time.perf_counter()
    try:
        supabase = get_supabase()
        response = supabase.table("work").select("*").limit(1).execute()
        data = response.data
        error = getattr(response, "error", None)

        # Supabase is online and working, connection test is successful
        if not error:
            n_rows = {"num_rows_returned": len(data or [])}
            http_response = ok_resp(["flask", "supabase"], start_time, **n_rows)
            return jsonify(http_response), 200
        
        # Service inaccesible error
        else:
            http_response = err_resp(["flask", "supabase"], start_time, code='service_inaccessible',
                                    message='Supabase network not available', details=pack_supabase_error(error))
            return jsonify(http_response), 503

    # internal code error
    except Exception as e:
        http_response = err_resp(["flask", "supabase"], start_time, code='internal_error',
                                message="Unexpected error", details=pack_exc(e))
        return jsonify(http_response), 500
            
# @app.route('/api/notion/health', methods=['GET'])
@app.get('/api/notion/health')
def notion_health_check():
    start = time.perf_counter()
    try:
        # Lazily load secrets only after auth passes
        headers = get_notion_headers()
        ids = get_notion_ids()
        notion_version = headers.get("Notion-Version")
        db_id = ids.get("db_id")

        # Lightweight pings
        user_resp = requests.get("https://api.notion.com/v1/users", headers=headers, timeout=5)
        db_resp = requests.get(f"https://api.notion.com/v1/databases/{db_id}", headers=headers, timeout=5)

        checks = {
            "user":     pack_requests_response(user_resp),
            "database": pack_requests_response(db_resp),
        }

        extra = {"version": notion_version, "checks": checks}

        if checks["user"]["ok"] and checks["database"]["ok"]:
            return jsonify(ok_resp(["flask", "notion"], start, **extra)), 200

        # Build a precise message
        if checks["user"]["ok"] and not checks["database"]["ok"]:
            message = "Notion database unreachable"
        elif not checks["user"]["ok"] and checks["database"]["ok"]:
            message = "Notion user endpoint inaccessible"
        else:
            message = "Notion user and database inaccessible"

        details = {"user": checks["user"], "database": checks["database"]}
        return jsonify(err_resp(["flask", "notion"], start, "service_inaccessible", message, details, **extra)), 503

    except Exception as e:
        extra = {"version": (headers.get("Notion-Version") if "headers" in locals() else None), "checks": None}
        return jsonify(err_resp(["flask", "notion"], start, "internal_error", "Unexpected error", pack_exc(e), **extra)), 500
    
# @app.route('/api/db/stats', methods=['GET'])
@app.get('/api/db/stats')
def calc_stats():
    start_time = time.perf_counter()
    try:
        supabase = get_supabase()

        fmt = "%Y-%m-%d"
        start_arg = request.args.get('start') # ?start=2024-06-14
        end_arg = request.args.get('end') # ?end=2025-08-24
        params = {'start': start_arg, 'end': end_arg}

        are_args_valid = verify_stat_args(start_arg, end_arg, fmt)
        if not are_args_valid:
            http_response = err_resp(["flask"], start_time, code="bad_request", 
                                    message="The passed date arguments were invalid", details=params)
            return jsonify(http_response), 400
        
        date_range = find_valid_range(start_arg, end_arg, fmt)
        if date_range["start"] is None or date_range["end"] is None:
            msg = '''Date range passed is not long enough! There must be at least 
            one Monday that spans to the next immediate Sunday'''
            http_response = err_resp(["flask"], start_time, code="bad_request", 
                                    message=msg, details=params)
            return jsonify(http_response), 400

        start_str = date_range['start'].strftime(fmt)
        end_str = date_range['end'].strftime(fmt)
        query = supabase.table("work").select("*") \
        .gte('completion_date', start_str) \
        .lte('completion_date', end_str)
        
        response = query.execute()
        data = response.data
        error = getattr(response, "error", None)

        if error:
            http_response = err_resp(["flask", "supabase"], start_time, code='service_inaccessible',
                                    message='Supabase network not available', details=pack_supabase_error(error))
            return jsonify(http_response), 503

        week_stats = calc_week_stats(date_range, data)
        day_stats = calc_day_stats(date_range, data)

        week_invalid = (week_stats['ave'] is None or week_stats['std'] is None)
        day_invalid = (day_stats['ave'] is None or day_stats['std'] is None)

        if week_invalid or day_invalid:
            details = {
                "week_stats": week_stats, "week_invalid": week_invalid,
                "day_stats": day_stats, "day_invalid": day_invalid
            }
            details.update(params)
            msg = "Insufficient data to compute week/day stats (need at least one full week)."
            http_response = err_resp(["flask", "supabase"], start_time, code="bad_request", 
                                    message=msg, details=details)
            return jsonify(http_response), 400

        extra_data = {
            "num_records": len(data), 
            "params": params,
            "data": {'week': week_stats, 'day': day_stats}
        }
        http_response = ok_resp(["flask", "supabase"], start_time, **extra_data)

        return jsonify(http_response), 200

    except Exception as e:
        http_response = err_resp(["flask", "supabase"], start_time, code='internal_error',
                                message="DB stats request: unexpected error occurred", 
                                details=pack_exc(e))
        return jsonify(http_response), 500
        
# @app.route('/api/plan-submissions', methods=['POST'])
@app.post('/api/plan-submissions')
def submit_plans():
    start_time = time.perf_counter()
    try:
        supabase = get_supabase()

        payload = request.get_json(silent=True)
        is_valid_payload, errors = validate_react_payload(payload)

        if not is_valid_payload:
            http_response = err_resp(["flask"], start_time, code="bad_request", 
                                        message="The formatting of the payload sent from react is invalid for processing...",
                                        details=errors)
            return jsonify(http_response), 400
        
        # POST plan_submission - Supabase
        plan_submission = {
            "sync_attempts": 0,
            "synced_with_notion": False,
            "sync_status": "pending",
            "created_at": now_iso(),
            "last_modified": now_iso(),
            "filter_start_date": payload['filter_start_date'],
            "filter_end_date": payload['filter_end_date']
        }

        db_submission_response = supabase.table("plan_submission").insert(plan_submission).execute()
        resp_error = getattr(db_submission_response, "error", None)

        if resp_error:
            http_response = err_resp(["flask", "supabase"], start_time, code='supabase_post_error', 
                                        message='Supabase insert failed', details=pack_supabase_error(resp_error))
            return jsonify(http_response), 503
        
        submission_id = db_submission_response.data[0]["submission_id"]  # keep as str

        # POST plans - Supabase DB
        formatted_records = format_react_to_supabase(payload['tasks'], submission_id)
        db_plans_response = supabase.table("plan").insert(formatted_records).execute()
        resp_error = getattr(db_plans_response, "error", None)

        if resp_error:
            http_response = err_resp(["flask", "supabase"], start_time, code='supabase_post_error', 
                                        message='Supabase insert failed', details=pack_supabase_error(resp_error),)
            return jsonify(http_response), 503
        
        # POST plans - Notion
        # Lazily load secrets only after auth passes
        headers = get_notion_headers()
        ids = get_notion_ids()
        db_id = ids.get("db_id")

        notion_payload = format_react_to_notion(payload['tasks'], db_id)
        for record in notion_payload:
            try:
                notion_response = requests.post(
                    "https://api.notion.com/v1/pages",
                    headers=headers,
                    json=record,
                    timeout=10
                )
                if notion_response is None or not notion_response.ok:
                    # mark submission as failure first
                    db_sync_response = mark_submission_failed(supabase, submission_id)
                    resp_error = getattr(db_sync_response, "error", None)
                    if resp_error:
                        # Supabase failed to record the failure
                        http_response = err_resp(
                            ["flask", "supabase", "notion"], start_time,
                            code="supabase_sync_error",
                            message="Supabase plan_submission synchronization update failed",
                            details=pack_supabase_error(resp_error)
                        )
                        return jsonify(http_response), 503
                    else:
                        # Supabase recorded failure successfully → report the real Notion error
                        http_response = err_resp(
                            ["flask", "notion"], start_time,
                            code="notion_post_error",
                            message="Notion insert failed",
                            details=pack_requests_response(notion_response)
                        )
                        return jsonify(http_response), 502
            except requests.exceptions.RequestException as e:
                # network/timeout, also mark as failure first

                try:
                    db_sync_response = mark_submission_failed(supabase, submission_id)
                    resp_error = getattr(db_sync_response, "error", None)
                    if resp_error:
                        http_response = err_resp(
                            ["flask", "supabase", "notion"], start_time,
                            code="supabase_sync_error",
                            message="Supabase plan_submission synchronization update failed",
                            details=pack_supabase_error(resp_error)
                        )
                        return jsonify(http_response), 503
                except Exception as upd_exc:
                    # If even the failure update throws unexpectedly
                    http_response = err_resp(
                        ["flask", "supabase", "notion"], start_time,
                        code="internal_error",
                        message="Unexpected error while marking Notion failure",
                        details={"notion_exc": pack_exc(e), "update_exc": pack_exc(upd_exc)}
                    )
                    return jsonify(http_response), 500

                # Supabase updated failure OK → report Notion network error
                http_response = err_resp(
                    ["flask", "notion"], start_time,
                    code="notion_post_error",
                    message="Notion insert failed (network/timeout)",
                    details=pack_exc(e)
                )
                return jsonify(http_response), 502


        # UPDATE plan_submission - Supabase
        updates = {
            "sync_status": "success",
            "sync_attempts": 1,
            "synced_with_notion": True,
            "last_modified": now_iso()
        }

        db_sync_response = (
            supabase.table("plan_submission")
            .update(updates)
            .eq("submission_id", submission_id)   # filter on PK
            .execute()
        )
        resp_error = getattr(db_sync_response, "error", None)
        if resp_error:
            http_response = err_resp(["flask", "supabase", "notion"], start_time, code='supabase_sync_error',
                                        message='Supabase plan_submission synchronization update failed',
                                        details=pack_supabase_error(resp_error))
            return jsonify(http_response), 503

        plan_submission.update(updates)

        plan_submission["submission_id"] = submission_id
        extra_data = {
            "num_plans": len(formatted_records),
            "plan_submission": plan_submission   
        }
        http_response = ok_resp(["flask", "supabase", "notion"], start_time, **extra_data)

        return jsonify(http_response), 201

    except Exception as e:
        print("exception thrown: ", e)
        http_response = err_resp(["flask"], start_time, code="internal_error", 
                                    message='Unexpected error occurred when trying to submit data',
                                    details=pack_exc(e))
        return jsonify(http_response), 500
    
# curl -i -X POST "http://127.0.0.1:5000/auth/login" -H "Content-Type: application/json"
# -d "{\"email\":\"insert_email_here\",\"password\":\"insert_password_here\"}"
# add in '-c cookies.txt' to create a local cookie jar for local testing if so desired
@app.post("/auth/login")
def auth_login():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()
    password = data.get("password") or ""
    if not email or not password:
        return jsonify({"error": "missing email or password"}), 400

    supabase = get_supabase()

    # 1) Lookup user
    user_resp = (
        supabase.table("app_user")
        .select("id,email,password_hash,role")
        .eq("email", email)
        .limit(1)
        .execute()
    )
    rows = user_resp.data or []
    if not rows:
        return jsonify({"error": "invalid credentials"}), 401

    user = rows[0]
    if not verify_password(user["password_hash"], password):
        return jsonify({"error": "invalid credentials"}), 401

    # 2) Create session row
    expires_at = datetime.now(timezone.utc) + timedelta(hours=SESSION_TTL_HOURS)

    # Try to get the inserted row back directly
    sess_resp = supabase.table("session").insert(
        {
            "user_id": user["id"],
            "expires_at": iso_utc(expires_at),
            "revoked": False,
        },
        returning="representation",   # works on PostgREST; python client passes it through
    ).execute()

    sid_rows = (sess_resp.data or [])

    # Fallback: if insert didn't return data, fetch newest session for this user
    if not sid_rows:
        sid_resp = (
            supabase.table("session")
            .select("id")
            .eq("user_id", user["id"])
            .order("created_at", desc=True)  # requires a created_at column
            .limit(1)
            .execute()
        )
        sid_rows = sid_resp.data or []

    if not sid_rows:
        return jsonify({"error": "failed to create session"}), 500

    sid = sid_rows[0]["id"]

    # 3) Set cookie + return
    resp = jsonify({"ok": True, "user": {"email": user["email"], "role": user["role"]}})
    return set_session_cookie(resp, sid), 200

# curl -i -X POST "http://127.0.0.1:5000/auth/logout" -H "Content-Type: application/json" -b cookies.txt
# OR
# curl -i -X POST "http://127.0.0.1:5000/auth/logout" -H "Content-Type: application/json" -H "Cookie: pg_session=insert_session_id_here"
@app.post("/auth/logout")
@require_session
def auth_logout():
    sid = current_session_id()
    supabase = get_supabase()

    if sid:
        # Mark server-side session revoked
        supabase.table("session").update({"revoked": True}).eq("id", sid).execute()

    resp = jsonify({"ok": True})
    return clear_session_cookie(resp), 200

# curl -i "http://127.0.0.1:5000/auth/me" -H "Cookie: pg_session=insert_session_id_here"
# OR
# curl -i "http://127.0.0.1:5000/auth/me" -b cookies.txt
@app.get("/auth/me")
@require_session
def auth_me():
    # At this point g.user is guaranteed to be present
    return jsonify({"ok": True, "user": g.user}), 200