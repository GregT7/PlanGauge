# app/clients.py
import os
from dotenv import load_dotenv
from functools import lru_cache

_supabase = None

def get_supabase():
    global _supabase
    if _supabase is not None:
        return _supabase

    # Only load local secrets in trusted dev; in prod rely on real env vars.
    load_dotenv(".env.local")  # <- keep for local-only if you want, avoid in container prod

    from supabase import create_client
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key:
        raise RuntimeError("Missing SUPABASE_URL or SUPABASE_KEY")
    _supabase = create_client(url, key)
    return _supabase


REQUIRED_NOTION_VARS = (
    "NOTION_API_KEY",
    "NOTION_VERSION",
    "NOTION_DB_ID",     # if you write to a DB
    "NOTION_PAGE_ID",   # if you write to a page
)

def _must_get(name: str) -> str:
    v = os.getenv(name)
    if not v:
        raise RuntimeError(f"Missing required environment variable: {name}")
    return v

@lru_cache(maxsize=1)
def get_notion_headers() -> dict:
    """
    Build and cache the Notion headers only after an authorized call asks for them.
    This keeps secrets out of memory until they’re actually needed.
    """
    # Validate required vars once (raises helpful error if misconfigured)
    for key in REQUIRED_NOTION_VARS:
        _ = os.getenv(key)  # don't force both IDs if you only need one; adjust set above

    return {
        "Authorization": f"Bearer {_must_get('NOTION_API_KEY')}",
        "Notion-Version": _must_get("NOTION_VERSION"),
        "Content-Type": "application/json",
    }

@lru_cache(maxsize=1)
def get_notion_ids() -> dict:
    # Split ids from headers so callers can pull only what they need
    return {
        "db_id": os.getenv("NOTION_DB_ID"),
        "page_id": os.getenv("NOTION_PAGE_ID"),
    }
