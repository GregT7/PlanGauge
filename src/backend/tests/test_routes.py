# tests/test_routes.py
import pytest
from datetime import datetime

from app import app as flask_app
import app.routes as routes


# =========================
# Pytest fixtures
# =========================
@pytest.fixture
def client():
    flask_app.testing = True
    with flask_app.test_client() as c:
        yield c


# =========================
# Shared fakes / helpers
# =========================
class _SBResponse:
    def __init__(self, data=None, error=None):
        self.data = data
        self.error = error

class FakeSupabaseOK:
    """Generic OK supabase fake for simple .select/.execute and gte/lte chains."""
    def __init__(self, data=None):
        self._data = data if data is not None else []
    def table(self, *_args, **_kwargs): return self
    def select(self, *_args, **_kwargs): return self
    def limit(self, *_args, **_kwargs): return self
    def gte(self, *_args, **_kwargs): return self
    def lte(self, *_args, **_kwargs): return self
    def insert(self, *_args, **_kwargs): return self
    def execute(self): return _SBResponse(data=self._data, error=None)

class FakeSupabaseError(FakeSupabaseOK):
    def execute(self): return _SBResponse(data=None, error="boom")

class FakeSupabaseRaises:
    def table(self, *_args, **_kwargs):
        raise RuntimeError("supabase down")

class DummyResp:
    def __init__(self, ok, status_code, json_payload=None, headers=None):
        self.ok = ok
        self.status_code = status_code
        self._payload = json_payload or {}
        self.headers = headers or {}
    def json(self):
        return self._payload


# ======= plan-submissions specific fakes =======
class FakeSupabasePlanSubmissionsOK:
    """
    Simulates:
      - table("plan_submission").insert(...).select(...).execute()  -> returns a submission_id
      - table("plan").insert([...]).execute()                        -> echoes payload
      - table("plan_submission").update({...}).eq("submission_id", ...).execute() -> OK
    """
    def __init__(self, submission_id="11111111-2222-3333-4444-555555555555"):
        self._submission_id = submission_id
        self._last_table = None
        self._last_action = None
        self._bulk_payload = None
        self._plan_submission_payload = None
        self._update_payload = None
        self._eq_filter = None

    def table(self, name):
        self._last_table = name
        self._last_action = None
        return self

    def select(self, *_a, **_k):
        return self

    def insert(self, payload):
        self._last_action = "insert"
        if self._last_table == "plan_submission":
            self._plan_submission_payload = payload
        elif self._last_table == "plan":
            self._bulk_payload = payload
        return self

    def update(self, payload):
        self._last_action = "update"
        self._update_payload = payload
        return self

    def eq(self, *args, **kwargs):
        # store filter (e.g., ("submission_id", "<uuid>"))
        self._eq_filter = (args, kwargs)
        return self

    def execute(self):
        if self._last_table == "plan_submission" and self._last_action == "insert":
            return _SBResponse(data=[{"submission_id": self._submission_id}], error=None)

        if self._last_table == "plan" and self._last_action == "insert":
            return _SBResponse(data=self._bulk_payload, error=None)

        if self._last_table == "plan_submission" and self._last_action == "update":
            updated = {"submission_id": self._submission_id, **(self._update_payload or {})}
            return _SBResponse(data=[updated], error=None)

        return _SBResponse(data=None, error=None)




# =========================
# Tests
# =========================

# ---- Root index ----
def test_index_root_ok(client):
    r = client.get("/")
    assert r.status_code == 200
    assert isinstance(r.data, (bytes, bytearray))


# ---- /api/health ----
def test_api_health_happy_path(client):
    r = client.get("/api/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask"]
    assert isinstance(body.get("version"), str) and body["version"]
    assert isinstance(body.get("response_time_ms"), (int, float))
    assert "now" in body


# ---- /api/db/health ----
def test_db_health_ok(client, monkeypatch):
    monkeypatch.setattr(routes, "supabase", FakeSupabaseOK(data=[{"id": 1}]))
    r = client.get("/api/db/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "supabase"]
    assert body["num_rows_returned"] == 1

def test_db_health_service_unavailable(client, monkeypatch):
    monkeypatch.setattr(routes, "supabase", FakeSupabaseError())
    r = client.get("/api/db/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase"]
    assert "error" in body

def test_db_health_internal_exception(client, monkeypatch):
    monkeypatch.setattr(routes, "supabase", FakeSupabaseRaises())
    r = client.get("/api/db/health")
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase"]
    assert "error" in body


# ---- /api/notion/health ----
def test_notion_health_all_ok(client, monkeypatch):
    def fake_get(url, headers=None, timeout=None):
        return DummyResp(ok=True, status_code=200)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "notion"]
    assert "checks" in body
    assert body["checks"]["user"]["ok"] is True
    assert body["checks"]["database"]["ok"] is True
    assert body.get("version")

def test_notion_health_db_inaccessible(client, monkeypatch):
    def fake_get(url, headers=None, timeout=None):
        if url.endswith("/v1/users/"):
            return DummyResp(ok=True, status_code=200)
        return DummyResp(ok=False, status_code=404)
    monkeypatch.setattr(routes.requests, "get", fake_get)

    r = client.get("/api/notion/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "notion"]
    assert "error" in body
    assert "checks" in body
    assert body.get("version")

def test_notion_health_network_exception(client, monkeypatch):
    def raiser(*_a, **_k):
        raise routes.requests.exceptions.Timeout("timeout!")
    monkeypatch.setattr(routes.requests, "get", raiser)

    r = client.get("/api/notion/health")
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "notion"]
    assert "checks" in body and body["checks"] is None
    assert "error" in body
    assert body.get("version")


# ---- /api/db/stats ----
def test_stats_success_happy_path(client, monkeypatch):
    monkeypatch.setattr(routes, "verify_stat_args", lambda s, e, fmt: True)

    fake_range = {
        "start": datetime(2025, 6, 2),   # Monday
        "end": datetime(2025, 6, 29),    # Sunday
    }
    monkeypatch.setattr(routes, "find_valid_range", lambda s, e, fmt: fake_range)

    fake_rows = [{"id": 1}, {"id": 2}]
    monkeypatch.setattr(routes, "supabase", FakeSupabaseOK(data=fake_rows))

    monkeypatch.setattr(routes, "calc_week_stats", lambda dr, data: {"ave": 10, "std": 2})
    monkeypatch.setattr(routes, "calc_day_stats",  lambda dr, data: {"ave": {"Mon": 5}, "std": {"Mon": 1}})

    r = client.get("/api/db/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "supabase"]
    assert body["num_records"] == 2
    assert body["params"]["start"] == "2025-06-01"
    assert body["params"]["end"] == "2025-06-30"
    assert body["data"]["week"] == {"ave": 10, "std": 2}
    assert body["data"]["day"]["ave"]["Mon"] == 5

def test_stats_bad_date_params(client, monkeypatch):
    monkeypatch.setattr(routes, "verify_stat_args", lambda s, e, fmt: False)
    r = client.get("/api/db/stats?start=not-a-date&end=2025-06-30")
    assert r.status_code == 400
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask"]
    assert "error" in body
    assert body["error"]["details"]["start"] == "not-a-date"
    assert body["error"]["details"]["end"] == "2025-06-30"

def test_stats_date_range_too_short(client, monkeypatch):
    monkeypatch.setattr(routes, "verify_stat_args", lambda s, e, fmt: True)
    monkeypatch.setattr(routes, "find_valid_range", lambda s, e, fmt: {"start": None, "end": None})

    r = client.get("/api/db/stats?start=2025-06-01&end=2025-06-02")
    assert r.status_code == 400
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask"]
    assert "error" in body

def test_stats_internal_exception(client, monkeypatch):
    monkeypatch.setattr(routes, "verify_stat_args", lambda s, e, fmt: True)
    def raise_inside(*_a, **_k):
        raise RuntimeError("calc fail")
    monkeypatch.setattr(routes, "find_valid_range", raise_inside)

    r = client.get("/api/db/stats?start=2025-06-01&end=2025-06-30")
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase"]
    assert "error" in body


# ---- /api/plan-submissions (POST) ----
def _valid_payload():
    return {
        "tasks": [
            {"name": "A", "category": "School", "due_date": "2025-09-30", "start_date": "2025-09-24", "time_estimation": 60},
            {"name": "B", "category": "Personal", "due_date": "2025-10-02", "start_date": "2025-09-28", "time_estimation": 30},
        ],
        "filter_start_date": "2025-09-01",
        "filter_end_date": "2025-09-30",
    }

def test_plan_submissions_400_on_bad_payload(client, monkeypatch):
    monkeypatch.setattr(routes, "validate_react_payload", lambda p: (False, {"tasks": "missing or invalid"}))
    r = client.post("/api/plan-submissions", json={"nope": True})
    assert r.status_code == 400
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask"]
    assert body["error"]["code"] == "bad_request"
    assert body["error"]["details"] == {"tasks": "missing or invalid"}

def test_plan_submissions_201_happy_path(client, monkeypatch):
    payload = _valid_payload()
    monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
    formatted = [{"x": 1}, {"x": 2}]
    monkeypatch.setattr(
        routes,
        "format_react_to_supabase",
        lambda tasks, submission_id: formatted
    )

    fake_submission_id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    monkeypatch.setattr(routes, "supabase", FakeSupabasePlanSubmissionsOK(submission_id=fake_submission_id))
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True, status_code=200))

    r = client.post("/api/plan-submissions", json=payload)
    assert r.status_code == 201
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "supabase", "notion"]
    assert body["num_plans"] == len(formatted)
    ps = body["plan_submission"]
    assert ps["filter_start_date"] == payload["filter_start_date"]
    assert ps["filter_end_date"] == payload["filter_end_date"]
    assert ps["submission_id"] == fake_submission_id
    for key in ("sync_attempts", "synced_with_notion", "sync_status", "created_at", "last_modified"):
        assert key in ps

def test_plan_submissions_502_when_notion_fails_and_supabase_records_failure(client, monkeypatch):
    payload = _valid_payload()
    monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
    monkeypatch.setattr(
        routes,
        "format_react_to_supabase",
        lambda tasks, submission_id: [{"x": 1}]
    )
    monkeypatch.setattr(routes, "supabase", FakeSupabasePlanSubmissionsOK(submission_id="sub-123"))
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=False, status_code=400))

    def mark_ok(supabase_client, submission_id):
        return _SBResponse(data=[{"submission_id": submission_id, "sync_status": "failed"}], error=None)
    monkeypatch.setattr(routes, "mark_submission_failed", mark_ok)

    r = client.post("/api/plan-submissions", json=payload)
    assert r.status_code == 502
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "notion"]
    assert body["error"]["code"] == "notion_post_error"
    assert "details" in body["error"]

def test_plan_submissions_503_when_notion_fails_and_supabase_cannot_record_failure(client, monkeypatch):
    payload = _valid_payload()
    monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
    monkeypatch.setattr(
        routes,
        "format_react_to_supabase",
        lambda tasks, submission_id: [{"x": 1}]
    )
    monkeypatch.setattr(routes, "supabase", FakeSupabasePlanSubmissionsOK(submission_id="sub-123"))
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=False, status_code=500))

    def mark_err(supabase_client, submission_id):
        return _SBResponse(data=None, error={"msg": "update failed"})
    monkeypatch.setattr(routes, "mark_submission_failed", mark_err)

    r = client.post("/api/plan-submissions", json=payload)
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase", "notion"]
    assert body["error"]["code"] == "supabase_sync_error"
    assert "details" in body["error"]

def test_plan_submissions_500_on_unhandled_exception(client, monkeypatch):
    def boom(_payload):
        raise RuntimeError("unexpected")
    monkeypatch.setattr(routes, "validate_react_payload", boom)

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask"]
    assert body["error"]["code"] == "internal_error"
