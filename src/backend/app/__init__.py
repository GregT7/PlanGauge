# __init__.py
import os, sys
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

# Demo if: CLI flag -t/--demo OR env DEMO_MODE=1/true/yes
DEMO_MODE = (
    "-t" in sys.argv
    or "--demo" in sys.argv
    or os.getenv("DEMO_MODE", "").lower() in {"1", "true", "yes"}
)

app = Flask(__name__)

allowed_urls = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173",
]
CORS(app, resources={r"/api/*": {"origins": allowed_urls}}, supports_credentials=False)

# Only import & init Supabase when NOT in demo
supabase = None
if not DEMO_MODE:
    try:
        from supabase import create_client  # <-- moved inside the guard
    except ImportError as e:
        raise RuntimeError(
            "Supabase SDK not installed. Install `supabase` (pip) or run in demo (-t or DEMO_MODE=1)."
        ) from e

    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise RuntimeError(
            "Missing SUPABASE_URL or SUPABASE_KEY. Set them or enable demo mode."
        )
    supabase = create_client(url, key)

from . import routes  # keep last
