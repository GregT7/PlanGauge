# tests/test_plan_submissions.py
import json
import types
import uuid
import pytest

# Import the Flask app and the module that defines the route
# Change "app" below if your package name differs.
from app import app as flask_app
from app import routes


# ---------- Helpers / Fakes ----------

class DummyResp:
    """Requests-like response stub for Notion POSTs."""
    def __init__(self, ok=True, status_code=200, headers=None, body=None):
        self.ok = ok
        self.status_code = status_code
        self.headers = headers or {}
        self._body = body or {"ok": ok}

    def json(self):
        return self._body

    @property
    def text(self):
        try:
            return json.dumps(self._body)
        except Exception:
            return str(self._body)


class FakeSBResponse:
    """Supabase .execute() return object."""
    def __init__(self, data=None, error=None):
        self.data = data
        self.error = error


class FakeSupabase:
    """
    Minimal emulation of:
      supabase.table(name).insert(records).execute()
      supabase.table(name).update(updates).eq('submission_id', val).execute()
    plus a hook to force errors on particular operations.
    """
    def __init__(self, *, fail_insert_on=None, fail_update=False):
        # fail_insert_on: set of table names to fail inserts for
        self.fail_insert_on = set(fail_insert_on or [])
        self.fail_update = fail_update
        self._table = None
        self._pending_updates = None
        self._pending_eq = None
        self.update_calls = []  # track updates for assertions if desired

    # Chain parts
    def table(self, name: str):
        self._table = name
        self._pending_updates = None
        self._pending_eq = None
        return self

    def insert(self, records):
        self._op = ("insert", self._table, records)
        return self

    def update(self, updates: dict):
        self._op = ("update", self._table, updates)
        self._pending_updates = updates
        return self

    def eq(self, field, value):
        # We only care about submission_id in tests
        self._pending_eq = (field, value)
        return self

    def execute(self):
        op, table, payload = self._op

        # --- INSERT cases ---
        if op == "insert":
            if table in self.fail_insert_on:
                return FakeSBResponse(data=None, error=types.SimpleNamespace(
                    code="42Pxx", message=f"forced insert failure on {table}"
                ))

            # For plan_submission insert we must return submission_id
            if table == "plan_submission":
                sub_id = str(uuid.uuid4())
                return FakeSBResponse(data=[{"submission_id": sub_id}], error=None)

            # For plan insert, return list of created rows
            if table == "plan":
                # echo back one row per input (typical supabase behavior)
                echoed = []
                for r in payload:
                    echoed.append({**r})
                return FakeSBResponse(data=echoed, error=None)

            # default OK
            return FakeSBResponse(data=[{**(payload[0] if isinstance(payload, list) else payload)}], error=None)

        # --- UPDATE cases (sync_status) ---
        if op == "update":
            self.update_calls.append({
                "table": table,
                "updates": self._pending_updates,
                "where": self._pending_eq,
            })
            if self.fail_update:
                return FakeSBResponse(data=None, error=types.SimpleNamespace(
                    code="42Uxx", message=f"forced update failure on {table}"
                ))
            return FakeSBResponse(data=[{**self._pending_updates}], error=None)

        raise AssertionError("Unknown supabase operation in fake.")


# --------- Fixtures ----------

@pytest.fixture()
def client():
    # Use Flask's test client
    return flask_app.test_client()


def _valid_payload():
    return {
        "filter_start_date": "2025-06-01",
        "filter_end_date":   "2025-06-30",
        "tasks": [
            {
                "name": "Do HW 3",
                "category": "School",
                "due_date": "2025-06-05",
                "start_date": "2025-06-03",
                "time_estimation": 90,
            },
            {
                "name": "Study",
                "category": "School",
                "due_date": "2025-06-06",
                "start_date": "2025-06-04",
                "time_estimation": 60,
            },
        ],
    }


# ---------- Tests ----------

def test_submit_plans_400_invalid_payload(client, monkeypatch):
    # Ensure we don't accidentally hit real clients even in the 400 path
    monkeypatch.setattr(routes, "get_supabase", lambda: None)
    monkeypatch.setattr(routes, "get_notion_headers", lambda: {})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {})

    r = client.post("/api/plan-submissions", json={"bad": "shape"})
    assert r.status_code == 400
    body = r.get_json()
    assert body["ok"] is False
    assert body["error"]["code"] == "bad_request"
    # Should contain validation messages
    assert "filter_start_date" in " ".join(body["error"]["details"])


def test_submit_plans_201_happy_path(client, monkeypatch):
    # Fake Supabase (all inserts/updates succeed)
    fake_sb = FakeSupabase()
    monkeypatch.setattr(routes, "get_supabase", lambda: fake_sb)

    # Notion headers/ids + POST succeeds
    monkeypatch.setattr(routes, "get_notion_headers", lambda: {"Authorization": "Bearer x", "Notion-Version": "2022-06-28", "Content-Type": "application/json"})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123", "page_id": None})
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True, status_code=200))

    # (Optionally) simplify supabase formatting to keep test focused
    formatted = [{"plan_name": "A", "start_date": "2025-06-01", "due_date": "2025-06-02", "submission_id": "x"}]
    monkeypatch.setattr(routes, "format_react_to_supabase", lambda tasks, submission_id: formatted)

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 201, r.get_data(as_text=True)
    body = r.get_json()
    assert body["ok"] is True
    assert body["service"] == ["flask", "supabase", "notion"]
    assert body["plan_submission"]["synced_with_notion"] is True
    assert body["plan_submission"]["sync_status"] == "success"
    assert body["num_plans"] == len(formatted)


def test_submit_plans_503_on_submission_insert_failure(client, monkeypatch):
    fake_sb = FakeSupabase(fail_insert_on={"plan_submission"})
    monkeypatch.setattr(routes, "get_supabase", lambda: fake_sb)

    monkeypatch.setattr(routes, "get_notion_headers", lambda: {"Authorization": "Bearer x", "Notion-Version": "2022-06-28", "Content-Type": "application/json"})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123", "page_id": None})
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True))

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["error"]["code"] == "supabase_post_error"


def test_submit_plans_503_on_plan_insert_failure(client, monkeypatch):
    fake_sb = FakeSupabase(fail_insert_on={"plan"})
    monkeypatch.setattr(routes, "get_supabase", lambda: fake_sb)

    monkeypatch.setattr(routes, "get_notion_headers", lambda: {"Authorization": "Bearer x", "Notion-Version": "2022-06-28", "Content-Type": "application/json"})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123", "page_id": None})
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True))

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["error"]["code"] == "supabase_post_error"


def test_submit_plans_502_on_notion_failure_records_failed_status(client, monkeypatch):
    """
    Force Notion POST failure. The route should first mark the submission as failed in Supabase,
    then return 502 with code 'notion_post_error'.
    """
    fake_sb = FakeSupabase()
    monkeypatch.setattr(routes, "get_supabase", lambda: fake_sb)

    monkeypatch.setattr(routes, "get_notion_headers", lambda: {"Authorization": "Bearer x", "Notion-Version": "2022-06-28", "Content-Type": "application/json"})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123", "page_id": None})

    # Notion returns ok=False (e.g., 500)
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=False, status_code=500, body={"error": "boom"}))

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 502
    body = r.get_json()
    assert body["ok"] is False
    assert body["error"]["code"] == "notion_post_error"

    # And our fake recorded at least one update to plan_submission with failed status
    assert any(
        (u["table"] == "plan_submission" and u["updates"].get("sync_status") == "failed")
        for u in fake_sb.update_calls
    )


def test_submit_plans_503_on_final_sync_update_failure(client, monkeypatch):
    """
    Everything succeeds until the very last Supabase update to mark success; force that to fail.
    """
    fake_sb = FakeSupabase(fail_insert_on=set(), fail_update=True)
    monkeypatch.setattr(routes, "get_supabase", lambda: fake_sb)

    monkeypatch.setattr(routes, "get_notion_headers", lambda: {"Authorization": "Bearer x", "Notion-Version": "2022-06-28", "Content-Type": "application/json"})
    monkeypatch.setattr(routes, "get_notion_ids", lambda: {"db_id": "db_123", "page_id": None})
    monkeypatch.setattr(routes.requests, "post", lambda *a, **k: DummyResp(ok=True, status_code=200))

    r = client.post("/api/plan-submissions", json=_valid_payload())
    assert r.status_code == 503
    body = r.get_json()
    assert body["ok"] is False
    assert body["error"]["code"] == "supabase_sync_error"
