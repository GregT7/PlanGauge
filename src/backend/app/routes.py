import importlib.metadata, time, os, requests
from flask import jsonify, request
from . import app, supabase
from dotenv import load_dotenv
from .utils import *
from .demo_stats import demo_stats
import asyncio

load_dotenv()

notion_key = os.getenv("NOTION_API_KEY")
notion_page_id = os.getenv("NOTION_PAGE_ID")
notion_db_id = os.getenv("NOTION_DB_ID")
notion_version = os.getenv("NOTION_VERSION")
notion_header = {
    "Authorization": f"Bearer {notion_key}",
    "Notion-Version": notion_version,
    "Content-Type": "application/json"
}

@app.route('/')
def index():
    return 'Home Web Page'

@app.before_request
def log_origin():
    print("Origin:", request.headers.get("Origin"))

@app.route('/api/health', methods=['GET'])
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
    
@app.route('/api/db/health', methods=['GET'])
def db_health_check():
    start_time = time.perf_counter()
    try:
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



@app.route('/api/notion/health', methods=['GET'])
def notion_health_check():
    start_time = time.perf_counter()

    try:
        user_response = requests.get('https://api.notion.com/v1/users/', headers=notion_header, timeout=5)
        db_response = requests.get(f"https://api.notion.com/v1/databases/{notion_db_id}", headers=notion_header, timeout=5)

        checks = {
            "user": pack_requests_response(user_response),
            "database": pack_requests_response(db_response),
        }

        http_response = None
        http_code = None
        extra_data = {'version': notion_version, "checks": checks}
        if checks["user"]["ok"] and checks["database"]["ok"]:
            http_response = ok_resp(["flask", "notion"], start_time, **extra_data)
            http_code = 200
        else:
            code = 'service_inaccessible'
            details={
                "user": pack_requests_response(user_response),
                "database": pack_requests_response(db_response)
            }

            if checks["user"]["ok"] and not checks["database"]["ok"]:
                message = "Notion database unreachable"
            elif not checks["user"]["ok"] and checks["database"]["ok"]:
                message = "Notion user endpoint inaccessible"
            elif not checks["user"]["ok"] and not checks["database"]["ok"]:
                message = 'Notion user and database inaccessible'

            http_response = err_resp(["flask", "notion"], start_time, code, 
                                     message, details, **extra_data)
            http_code = 503

        return jsonify(http_response), http_code
  
    except Exception as e:
        extra_data = {'version': notion_version, "checks": None}
        http_response = err_resp(["flask", "notion"], start_time, 'internal_error', 
                                 "Unexpected error", pack_exc(e), **extra_data)
        return jsonify(http_response), 500
        
@app.route('/api/db/stats', methods=['GET'])
def calc_stats():
    start_time = time.perf_counter()
    try:
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
    
@app.route('/api/plan-submissions', methods=['POST'])
def submit_plans():
    start_time = time.perf_counter()
    try:
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
        notion_payload = format_react_to_notion(payload['tasks'], notion_db_id)
        for record in notion_payload:
            try:
                notion_response = requests.post(
                    "https://api.notion.com/v1/pages",
                    headers=notion_header,
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

@app.route('/api/demo/stats', methods=['GET'])
async def retrieve_dummy_stats():
    start_time = time.perf_counter()
    await asyncio.sleep(3)  # ⏳ non-blocking delay
    extra_data = {
        "data": demo_stats
    }
    http_response = ok_resp(["flask"], start_time, **extra_data)
    return jsonify(http_response)