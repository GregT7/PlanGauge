# tests/test_routes_append.py
import pytest

# Import the Flask app and the routes module to monkeypatch internals
from app import app as flask_app
import app.routes as routes

# ---------------------------
# Simple client fixture
# ---------------------------
@pytest.fixture
def client():
    flask_app.testing = True
    with flask_app.test_client() as c:
        yield c

# ---------------------------
# Helpers: Fake Supabase & Responses
# ---------------------------
class _SBResponse:
    def __init__(self, data=None, error=None):
        self.data = data
        self.error = error

class FakeSupabaseOK:
    # supports: table(name).select("*").limit(n).execute()
    #           and gte/lte chained for /api/stats
    def __init__(self, data=None):
        self._data = data if data is not None else []
    def table(self, *_args, **_kwargs): return self
    def select(self, *_args, **_kwargs): return self
    def limit(self, *_args, **_kwargs): return self
    def gte(self, *_args, **_kwargs): return self
    def lte(self, *_args, **_kwargs): return self
    def execute(self): return _SBResponse(data=self._data, error=None)

class FakeSupabaseError(FakeSupabaseOK):
    def execute(self): return _SBResponse(data=None, error="boom")

class FakeSupabaseRaises:
    def table(self, *_args, **_kwargs):
        raise RuntimeError("supabase down")

class DummyResp:
    def __init__(self, ok, status_code):
        self.ok = ok
        self.status_code = status_code
        self.headers = {}

# ---------------------------
# /            (sanity)
# ---------------------------
def test_index_root_ok(client):
    r = client.get("/")
    assert r.status_code == 200
    assert b"Home Web Page" in r.data

# ---------------------------
# /api/health (happy path only; covers version & shape)
# ---------------------------
def test_api_health_happy_path(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == "flask"
    assert isinstance(body.get("version"), str) and body["version"]
    assert isinstance(body.get("response_time_ms"), (int, float))
    assert "now" in body

# ---------------------------
# /api/db/health
# ---------------------------
def test_db_health_ok(client, monkeypatch):
    # returns 1 row, no error
    monkeypatch.setattr(routes, "supabase", FakeSupabaseOK(data=[{"id": 1}]))
    r = client.get("/api/db/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == "supabase"
    assert body["num_rows_returned"] == 1

def test_db_health_service_unavailable(client, monkeypatch):
    # execute() returns error attribute -> 503
    monkeypatch.setattr(routes, "supabase", FakeSupabaseError())
    r = client.get("/api/db/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == "supabase"
    assert "error" in body and body["error"]

def test_db_health_internal_exception(client, monkeypatch):
    # .table(...) raises -> 500 branch
    monkeypatch.setattr(routes, "supabase", FakeSupabaseRaises())
    r = client.get("/api/db/health")
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == "supabase"
    assert "error" in body

# ---------------------------
# /api/notion/health
# ---------------------------
def test_notion_health_all_ok(client, monkeypatch):
    calls = {"n": 0}
    def fake_get(url, headers=None, timeout=None):
        calls["n"] += 1
        # first call: /v1/users/ ; second: /v1/databases/{id}
        return DummyResp(ok=True, status_code=200)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == "notion"
    assert "checks" in body and body["checks"]["user"]["ok"] and body["checks"]["database"]["ok"]
    assert calls["n"] == 2

def test_notion_health_db_inaccessible(client, monkeypatch):
    # user ok, database not ok -> 503 and specific error message
    def fake_get(url, headers=None, timeout=None):
        if url.endswith("/v1/users/"):
            return DummyResp(ok=True, status_code=200)
        return DummyResp(ok=False, status_code=404)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body.get("error") == "Network Error: Notion database inaccessible"

def test_notion_health_network_exception(client, monkeypatch):
    # mimic requests.exceptions.Timeout without importing requests in test
    monkeypatch.setattr(routes.requests, "get", lambda *a, **k: (_ for _ in ()).throw(routes.requests.exceptions.Timeout("timeout!")))
    r = client.get("/api/notion/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == "notion"
    assert "timeout" in body["error"].lower()

# ---------------------------
# /api/stats
# ---------------------------
def test_stats_success_happy_path(client, monkeypatch):
    # Freeze utils outputs to avoid re-testing math; just verify integration/shape.
    fake_range = {"start": "2025-06-02", "end": "2025-06-29"}  # Monday..Sunday aligned
    monkeypatch.setattr(routes, "find_valid_range", lambda s, e: fake_range)

    # Pretend DB returned two rows (the actual values won't be recomputed, we just pass through len)
    fake_rows = [{"id": 1}, {"id": 2}]
    monkeypatch.setattr(routes, "supabase", FakeSupabaseOK(data=fake_rows))

    # Return small, known stats payloads
    monkeypatch.setattr(routes, "calc_week_stats", lambda dr, data: {"ave": 10, "std": 2})
    monkeypatch.setattr(routes, "calc_day_stats",  lambda dr, data: {"ave": {"Mon": 5}, "std": {"Mon": 1}})

    r = client.get("/api/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["num_records"] == 2
    assert body["params"]["start_date"] == "2025-06-01"
    assert body["params"]["end_date"] == "2025-06-30"
    assert body["data"]["week"] == {"ave": 10, "std": 2}
    assert body["data"]["day"]["ave"]["Mon"] == 5

def test_stats_bad_date_params(client):
    # Missing/invalid date -> datetime.strptime raises -> 503 branch
    r = client.get("/api/stats?start=not-a-date&end=2025-06-30")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert "error" in body

def test_stats_internal_exception(client, monkeypatch):
    # Force exception inside handler after parsing dates
    monkeypatch.setattr(routes, "find_valid_range", lambda *a, **k: (_ for _ in ()).throw(RuntimeError("calc fail")))
    r = client.get("/api/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert "calc fail" in body.get("error", "")
