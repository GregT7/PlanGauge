import os, datetime as dt
from flask import request, g, jsonify
from argon2 import PasswordHasher
from argon2.low_level import Type
from functools import wraps
from .clients import get_supabase


_ph = PasswordHasher(
    time_cost=3, memory_cost=65536, parallelism=1,
    hash_len=32, salt_len=16, type=Type.ID,  # Argon2id
)

SESSION_TTL_HOURS = int(os.getenv("SESSION_TTL_HOURS", 24))
COOKIE_NAME   = os.getenv("SESSION_COOKIE_NAME", "pg_session")
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() in ("1","true","yes")
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "None")

def now_utc():
    return dt.datetime.now(dt.timezone.utc)

def parse_ts(s: str) -> dt.datetime | None:
    """
    Parse an ISO timestamp from Supabase into a timezone-aware UTC datetime.
    Returns None if parsing fails.
    """
    if not s:
        return None
    try:
        # Handle both "...Z" and "+00:00" style timestamps
        if isinstance(s, str):
            s = s.replace("Z", "+00:00")
        return dt.datetime.fromisoformat(s).astimezone(dt.timezone.utc)
    except Exception:
        return None

def new_expiry():
    return now_utc() + dt.timedelta(hours=SESSION_TTL_HOURS)

def hash_password(plain: str) -> str:
    return _ph.hash(plain)

def verify_password(hash_str: str, plain: str) -> bool:
    try:
        _ph.verify(hash_str, plain)
        return True
    except Exception:
        return False

def set_session_cookie(resp, session_id: str):
    resp.set_cookie(
        COOKIE_NAME, session_id,
        httponly=True, secure=COOKIE_SECURE, samesite=COOKIE_SAMESITE,
        path="/", max_age=SESSION_TTL_HOURS * 3600,
    )
    return resp

def clear_session_cookie(resp):
    resp.delete_cookie(COOKIE_NAME, path="/")
    return resp

def current_session_id():
    return request.cookies.get(COOKIE_NAME)

def require_session(f):
    """
    Decorator to enforce an authenticated session.

    - Reads session ID from the cookie
    - Loads and validates the session from Supabase
    - Checks revoked / expired
    - Loads the corresponding app_user
    - Performs sliding TTL refresh on activity
    - Attaches g.user = {id, email, role, session_id}
    """
    @wraps(f)
    def wrapper(*args, **kwargs):
        sid = current_session_id()
        if not sid:
            # No cookie present
            return jsonify({"error": "auth_required", "sid": sid}), 401

        try:
            supabase = get_supabase()
        except Exception as e:
            # DB not reachable / misconfigured
            return jsonify({"error": "auth_unavailable", "details": str(e)}), 503

        # --- 1) Load session row ---
        try:
            sess_resp = (
                supabase.table("session")
                .select("id,user_id,expires_at,revoked,last_seen")
                .eq("id", sid)
                .limit(1)
                .execute()
            )
        except Exception as e:
            return jsonify({"error": "auth_unavailable", "details": str(e)}), 503

        sess_rows = sess_resp.data or []
        if not sess_rows:
            # Unknown/invalid session ID
            return jsonify({"error": "invalid_session"}), 401

        sess = sess_rows[0]

        # --- 2) Check revoked / expired ---
        if sess.get("revoked"):
            return jsonify({"error": "session_revoked"}), 401

        expires_at = parse_ts(sess.get("expires_at"))
        if not expires_at:
            return jsonify({"error": "invalid_session_expiry"}), 401

        if expires_at <= now_utc():
            return jsonify({"error": "session_expired"}), 401

        # --- 3) Load the user ---
        user_id = sess.get("user_id")
        if not user_id:
            return jsonify({"error": "invalid_session_user"}), 401

        try:
            user_resp = (
                supabase.table("app_user")
                .select("id,email,role")
                .eq("id", user_id)
                .limit(1)
                .execute()
            )
        except Exception as e:
            return jsonify({"error": "auth_unavailable", "details": str(e)}), 503

        user_rows = user_resp.data or []
        if not user_rows:
            # Session points at a user that no longer exists
            return jsonify({"error": "user_not_found"}), 401

        user = user_rows[0]

        # --- 4) Sliding TTL refresh (best-effort) ---
        try:
            new_exp = new_expiry()
            supabase.table("session").update(
                {
                    "expires_at": new_exp.isoformat(),
                    "last_seen": now_utc().isoformat(),
                }
            ).eq("id", sid).execute()
        except Exception:
            # Don't fail the request if refresh fails; just proceed
            pass

        # --- 5) Attach to flask.g and proceed ---
        g.user = {
            "id": user["id"],
            "email": user["email"],
            "role": user["role"]
        }

        return f(*args, **kwargs)

    return wrapper
