# app/auth.py
import os
from functools import wraps
from flask import request, jsonify

OWNER_TOKEN = os.getenv("OWNER_TOKEN")  # set in Render & locally

def require_owner(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        # Expect: Authorization: Bearer <token>
        auth = request.headers.get("Authorization", "")
        if not OWNER_TOKEN:
            return jsonify({"ok": False, "error": {"code":"server_misconfigured","message":"OWNER_TOKEN not set"}}), 500
        if not auth.startswith("Bearer "):
            return jsonify({"ok": False, "error": {"code":"forbidden","message":"Missing Bearer token"}}), 403

        token = auth.split(" ", 1)[1]
        if token != OWNER_TOKEN:
            return jsonify({"ok": False, "error": {"code":"forbidden","message":"Invalid token"}}), 403

        return f(*args, **kwargs)
    return wrapper
