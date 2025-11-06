# __init__.py
import os, sys
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

load_dotenv(find_dotenv(filename=".env"))  # finds src/.env when CWD is src/backend

# Demo if: CLI flag -t/--demo OR env DEMO_MODE=1/true/yes
DEMO_MODE = "-demo" in sys.argv

app = Flask(__name__)

# Comma-separated list in env
allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]

# Fallback to localhost only if not set (safer than wildcard)
if not allowed_origins:
    allowed_origins = ["http://localhost:5173", "http://localhost:4173"]

CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=False)

# Only import & init Supabase when NOT in demo
supabase = None
if not DEMO_MODE:
    try:
        from supabase import create_client  # <-- moved inside the guard
    except ImportError as e:
        raise RuntimeError(
            "Supabase SDK not installed. Install `supabase` (pip) or run in demo (-t or DEMO_MODE=1)."
        ) from e

    load_dotenv(dotenv_path=".env.local")
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise RuntimeError(
            "Missing SUPABASE_URL or SUPABASE_KEY. Set them or enable demo mode."
        )
    supabase = create_client(url, key)

from . import routes  # keep last
