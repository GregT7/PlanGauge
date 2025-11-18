# tests/test_routes.py
from datetime import datetime
import types
import pytest

# The app under test
from app import app as flask_app
from app import routes

# ----------------------------
# Test client fixture
# ----------------------------
@pytest.fixture()
def client():
    flask_app.config.update(TESTING=True)
    with flask_app.test_client() as c:
        yield c

# ----------------------------
# Small helpers / fakes shared by tests
# ----------------------------

class _SBResponse:
    def __init__(self, data=None, error=None):
        self.data = data
        self.error = error

class FakeSupabaseOK:
    """supabase.table(...).select(...).limit(...).execute() -> ok with provided data"""
    def __init__(self, data=None):
        self._table = None
        self._data = data or []
        self._filters = []

    def table(self, name):
        self._table = name
        return self

    # chainable query helpers used in stats route
    def select(self, *_a, **_k): return self
    def limit(self, *_a, **_k):  return self
    def gte(self, *_a, **_k):    self._filters.append(("gte", _a, _k)); return self
    def lte(self, *_a, **_k):    self._filters.append(("lte", _a, _k)); return self

    def execute(self):
        return _SBResponse(data=list(self._data), error=None)

class FakeSupabaseError(FakeSupabaseOK):
    """execute() returns an error object"""
    class ErrObj:
        code = "connection_error"
        message = "network unavailable"

    def execute(self):
        return _SBResponse(data=None, error=FakeSupabaseError.ErrObj())

class FakeSupabaseRaises(FakeSupabaseOK):
    """calling execute() raises unexpectedly"""
    def execute(self):
        raise RuntimeError("boom")

class DummyResp:
    def __init__(self, ok=True, status_code=200, data=None, headers=None, text=""):
        self.ok = ok
        self.status_code = status_code
        self._data = {} if data is None else data
        self.headers = {} if headers is None else headers
        self.text = text

    def json(self):
        return self._data


# Convenience: support both new helpers and old globals
def _patch_supabase(monkeypatch, fake):
    if hasattr(routes, "get_supabase"):
        monkeypatch.setattr(routes, "get_supabase", lambda: fake)
    else:
        # legacy fallback
        monkeypatch.setattr(routes, "supabase", fake)

def _patch_notion(monkeypatch, *, version="2022-06-28", db_id="db_123", bearer="secret"):
    # headers
    hdrs = {
        "Authorization": f"Bearer {bearer}",
        "Notion-Version": version,
        "Content-Type": "application/json",
    }
    if hasattr(routes, "get_notion_headers"):
        monkeypatch.setattr(routes, "get_notion_headers", lambda: hdrs)
    else:
        # legacy: define variables if present
        if hasattr(routes, "notion_header"):
            monkeypatch.setattr(routes, "notion_header", hdrs)

    # version + ids
    if hasattr(routes, "get_notion_ids"):
        monkeypatch.setattr(routes, "get_notion_ids", lambda: types.SimpleNamespace(db_id=db_id, version=version))
    else:
        if hasattr(routes, "notion_db_id"):
            monkeypatch.setattr(routes, "notion_db_id", db_id)
        if hasattr(routes, "notion_version"):
            monkeypatch.setattr(routes, "notion_version", version)

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
    _patch_supabase(monkeypatch, FakeSupabaseOK(data=[{"id": 1}]))
    r = client.get("/api/db/health")
    assert r.status_code == 200
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "supabase"]
    assert body["num_rows_returned"] == 1

def test_db_health_service_unavailable(client, monkeypatch):
    _patch_supabase(monkeypatch, FakeSupabaseError())
    r = client.get("/api/db/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase"]
    assert "error" in body

def test_db_health_internal_exception(client, monkeypatch):
    _patch_supabase(monkeypatch, FakeSupabaseRaises())
    r = client.get("/api/db/health")
    assert r.status_code == 500
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "supabase"]
    assert "error" in body

# ---- /api/notion/health ----
def test_notion_health_all_ok(client, monkeypatch):
    _patch_notion(monkeypatch, version="2022-06-28", db_id="db_123", bearer="abc")

    def fake_get(url, headers=None, timeout=None):
        return DummyResp(ok=True, status_code=200, data={"ok": True})

    # Important: patch where it's used
    import app.routes as routes
    monkeypatch.setattr(routes.requests, "get", fake_get)
    monkeypatch.setattr(routes, "get_notion_headers", lambda: {
        "Authorization": "Bearer abc",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    })
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123"})


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
    _patch_notion(monkeypatch, version="2022-06-28", db_id="db_123", bearer="abc")
    def fake_get(url, headers=None, timeout=None):
        if url.endswith("/v1/users/"):
            return DummyResp(ok=True, status_code=200)
        return DummyResp(ok=False, status_code=404)
    monkeypatch.setattr(routes.requests, "get", fake_get)
    monkeypatch.setattr(routes, "get_notion_headers", lambda: {
        "Authorization": "Bearer abc",
        "Notion-Version": "2022-06-28",
        "Content-Type": "application/json",
    })
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123"})
    r = client.get("/api/notion/health")
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask", "notion"]
    assert "error" in body
    assert "checks" in body
    assert body.get("version")

def test_notion_health_network_exception(client, monkeypatch):
    _patch_notion(monkeypatch, version="2022-06-28", db_id="db_123", bearer="abc")
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
    _patch_supabase(monkeypatch, FakeSupabaseOK(data=fake_rows))

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
            {"name": "A", "category": "School",  "due_date": "2025-09-30", "start_date": "2025-09-24", "time_estimation": 60},
            {"name": "B", "category": "Personal","due_date": "2025-10-02", "start_date": "2025-09-28", "time_estimation": 30},
        ],
        "filter_start_date": "2025-09-01",
        "filter_end_date":   "2025-09-30",
    }

def test_plan_submissions_400_on_bad_payload(client, monkeypatch):
    monkeypatch.setattr(routes, "validate_react_payload", lambda p: (False, ["x"]))
    r = client.post("/api/plan-submissions", json={"broken": True})
    assert r.status_code == 400
    body = r.get_json()
    assert body["ok"] is False
    assert body["service"] == ["flask"]
    assert body["error"]["code"] == "bad_request"

# ======= plan-submissions specific fakes =======
# A universal Supabase fake for plan-submissions tests
# class FakeSupabasePlanSubmissionsOK:
#     """
#     Behaves like supabase-py for the operations used by /api/plan-submissions:
#       - table("plan_submission").insert({...}).execute()
#       - table("plan").insert([{}, ...]).execute()
#       - table("plan_submission").update({...}).eq("submission_id", sid).execute()

#     Configure failures via flags to cover error branches in tests.
#     """

#     class _Resp:
#         def __init__(self, data=None, error=None):
#             self.data = data
#             self.error = error

#     class _Err:
#         def __init__(self, message="error"):
#             self.message = message

#     class _Table:
#         def __init__(self, name, root):
#             self.name = name
#             self._root = root
#             self._action = None
#             self._payload = None
#             self._filter = {}

#         # Query-builder shape
#         def insert(self, payload):
#             self._action = "insert"
#             self._payload = payload
#             return self  # must allow .execute()

#         def update(self, updates):
#             self._action = "update"
#             self._payload = updates
#             return self

#         def eq(self, col, val):
#             self._filter[col] = val
#             return self

#         # Optional no-ops to be future-proof
#         def select(self, *a, **k): return self
#         def limit(self, *a, **k): return self
#         def order(self, *a, **k): return self

#         def execute(self):
#             # Simulate configurable failures
#             if self._action == "insert" and self.name == "plan_submission":
#                 if self._root.fail_insert_submission:
#                     return FakeSupabasePlanSubmissionsOK._Resp(
#                         data=None, error=FakeSupabasePlanSubmissionsOK._Err("plan_submission insert failed")
#                     )
#                 # Assign a submission_id and store
#                 rec = dict(self._payload)
#                 rec["submission_id"] = self._root.submission_id
#                 self._root._store["plan_submission"].append(rec)
#                 return FakeSupabasePlanSubmissionsOK._Resp(data=[{"submission_id": self._root.submission_id}], error=None)

#             if self._action == "insert" and self.name == "plan":
#                 if self._root.fail_insert_plan:
#                     return FakeSupabasePlanSubmissionsOK._Resp(
#                         data=None, error=FakeSupabasePlanSubmissionsOK._Err("plan insert failed")
#                     )
#                 recs = list(self._payload)
#                 self._root._store["plan"].extend(recs)
#                 return FakeSupabasePlanSubmissionsOK._Resp(data=recs, error=None)

#             if self._action == "update" and self.name == "plan_submission":
#                 if self._root.fail_update_submission:
#                     return FakeSupabasePlanSubmissionsOK._Resp(
#                         data=None, error=FakeSupabasePlanSubmissionsOK._Err("plan_submission update failed")
#                     )
#                 sid = self._filter.get("submission_id")
#                 for rec in self._root._store["plan_submission"]:
#                     if rec.get("submission_id") == sid:
#                         rec.update(dict(self._payload))
#                         return FakeSupabasePlanSubmissionsOK._Resp(data=[rec], error=None)
#                 # Not found
#                 return FakeSupabasePlanSubmissionsOK._Resp(
#                     data=None, error=FakeSupabasePlanSubmissionsOK._Err("plan_submission not found")
#                 )

#             # Default OK empty
#             return FakeSupabasePlanSubmissionsOK._Resp(data=[], error=None)

#     def __init__(
#         self,
#         submission_id="aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
#         *,
#         fail_insert_submission=False,
#         fail_insert_plan=False,
#         fail_update_submission=False,
#     ):
#         self.submission_id = submission_id
#         self.fail_insert_submission = fail_insert_submission
#         self.fail_insert_plan = fail_insert_plan
#         self.fail_update_submission = fail_update_submission
#         self._store = {"plan_submission": [], "plan": []}

#     def table(self, name):
#         return FakeSupabasePlanSubmissionsOK._Table(name, self)


# def test_plan_submissions_201_happy_path(client, monkeypatch):
#     fake_submission_id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
#     monkeypatch.setattr(routes, "supabase", FakeSupabasePlanSubmissionsOK(fake_submission_id))

#     # Also stub Notion + validators
#     monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
#     monkeypatch.setattr(routes, "format_react_to_supabase", lambda tasks, sid: [{"x": 1}, {"x": 2}])
#     monkeypatch.setattr(routes, "format_react_to_notion", lambda tasks, db: [{} for _ in tasks])
#     monkeypatch.setattr(routes, "get_notion_headers", lambda: {
#         "Authorization": "Bearer abc", "Notion-Version": "2022-06-28", "Content-Type": "application/json"
#     })
#     monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123"})
#     monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True, status_code=200))

#     r = client.post("/api/plan-submissions", json=_valid_payload())
#     assert r.status_code == 201


# def test_plan_submissions_502_when_notion_fails_and_supabase_records_failure(client, monkeypatch):
#     payload = _valid_payload()
#     monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
#     monkeypatch.setattr(routes, "format_react_to_supabase", lambda tasks, submission_id: [{"x": 1}])

#     _patch_supabase(monkeypatch, FakeSupabasePlanSubmissionsOK(submission_id="sub-123"))
#     _patch_notion(monkeypatch, version="2022-06-28", db_id="db_123", bearer="abc")

#     # Notion POST returns an error (ok=False), and Supabase can record failure
#     monkeypatch.setattr(routes.requests, "post", lambda *_a, **_k: DummyResp(ok=False, status_code=500))

#     r = client.post("/api/plan-submissions", json=payload)
#     assert r.status_code == 502
#     body = r.get_json()
#     assert body["ok"] is False
#     assert body["service"] == ["flask", "notion"]
#     assert body["error"]["code"] in ("notion_post_error",)

# def test_plan_submissions_503_when_notion_fails_and_supabase_cannot_record_failure(client, monkeypatch):
#     payload = _valid_payload()
#     monkeypatch.setattr(routes, "validate_react_payload", lambda p: (True, None))
#     monkeypatch.setattr(routes, "format_react_to_supabase", lambda tasks, submission_id: [{"x": 1}])

#     # Fake supabase that errors when updating failure status
#     class FakeSBFailOnUpdate(FakeSupabasePlanSubmissionsOK):
#         def execute(self):
#             if self._last_table == "plan_submission" and self._last_action == "update":
#                 class Err: 
#                     code = "update_failed"
#                     message = "cannot update"
#                 return _SBResponse(data=None, error=Err())
#             return super().execute()

#     _patch_supabase(monkeypatch, FakeSBFailOnUpdate(submission_id="sub-123"))
#     _patch_notion(monkeypatch, version="2022-06-28", db_id="db_123", bearer="abc")

#     # Notion POST returns an error (ok=False), and Supabase cannot record failure (above)
#     monkeypatch.setattr(routes.requests, "post", lambda *_a, **_k: DummyResp(ok=False, status_code=500))

#     r = client.post("/api/plan-submissions", json=payload)
#     assert r.status_code == 503
#     body = r.get_json()
#     assert body["ok"] is False
#     assert body["service"] == ["flask", "supabase", "notion"]
#     assert body["error"]["code"] in ("supabase_sync_error",)
