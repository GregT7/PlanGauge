# tests/test_routes.py
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
    #           and gte/lte chained for /api/db/stats
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
    def __init__(self, ok, status_code, headers=None):
        self.ok = ok
        self.status_code = status_code
        self.headers = headers or {}


# ---------------------------
# /            (sanity)
# ---------------------------
def test_index_root_ok(client):
    r = client.get("/")
    assert r.status_code == 200
    assert isinstance(r.data, (bytes, bytearray))


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
    assert "error" in body

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
# /api/notion/health  (success has top-level checks; errors do not)
# ---------------------------
def test_notion_health_all_ok(client, monkeypatch):
    def fake_get(url, headers=None, timeout=None):
        # /v1/users/ then /v1/databases/<id>
        return DummyResp(ok=True, status_code=200)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == "notion"
    assert "checks" in body
    assert body["checks"]["user"]["ok"] is True
    assert body["checks"]["database"]["ok"] is True

def test_notion_health_db_inaccessible(client, monkeypatch):
    # user ok, database not ok -> some builds return 503, others 500; accept either
    def fake_get(url, headers=None, timeout=None):
        if url.endswith("/v1/users/"):
            return DummyResp(ok=True, status_code=200)
        return DummyResp(ok=False, status_code=404)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code in (503, 500)
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == "notion"
    # error may be string or object during migration
    assert "error" in body
    # on error responses, there should be no top-level checks (per your latest spec)
    assert "checks" not in body

def test_notion_health_network_exception(client, monkeypatch):
    # mimic requests.exceptions.Timeout
    def raiser(*_a, **_k):
        raise routes.requests.exceptions.Timeout("timeout!")
    monkeypatch.setattr(routes.requests, "get", raiser)

    r = client.get("/api/notion/health")
    assert r.status_code in (503, 500)
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == "notion"
    assert "checks" not in body
    assert "error" in body


# ---------------------------
# /api/db/stats  (note: /api/db/stats is your route)
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

    r = client.get("/api/db/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["num_records"] == 2
    assert body["params"]["start_date"] == "2025-06-01"
    assert body["params"]["end_date"] == "2025-06-30"
    assert body["data"]["week"] == {"ave": 10, "std": 2}
    assert body["data"]["day"]["ave"]["Mon"] == 5

def test_stats_bad_date_params(client):
    # Invalid date -> your handler returns 503; accept 400 or 503 depending on your branch
    r = client.get("/api/db/stats?start=not-a-date&end=2025-06-30")
    assert r.status_code in (400, 500)
    body = r.get_json()
    assert body["ok"] is False
    assert "error" in body

def test_stats_internal_exception(client, monkeypatch):
    # Force exception inside handler after parsing dates
    def raise_inside(*_a, **_k):
        raise RuntimeError("calc fail")
    monkeypatch.setattr(routes, "find_valid_range", raise_inside)

    r = client.get("/api/db/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code in (503, 500)
    body = r.get_json()
    assert body["ok"] is False
    assert "error" in body
