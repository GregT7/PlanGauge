import os, datetime as dt
from flask import request
from argon2 import PasswordHasher
from argon2.low_level import Type

_ph = PasswordHasher(
    time_cost=3, memory_cost=65536, parallelism=1,
    hash_len=32, salt_len=16, type=Type.ID,  # Argon2id
)

SESSION_TTL_HOURS = int(os.getenv("SESSION_TTL_HOURS", 24))
COOKIE_NAME   = os.getenv("SESSION_COOKIE_NAME", "pg_session")
COOKIE_SECURE = os.getenv("COOKIE_SECURE", "false").lower() in ("1","true","yes")
COOKIE_SAMESITE = os.getenv("COOKIE_SAMESITE", "Lax")

def now_utc():
    return dt.datetime.utcnow().replace(tzinfo=dt.timezone.utc)

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
