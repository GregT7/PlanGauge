# tests/test_utils.py
# Run with: pytest -q

from datetime import date, datetime, timedelta, timezone
import statistics
import pytest

from app.utils import (
    # date & arg validators
    is_valid_date,
    verify_stat_args,
    find_valid_range,
    # time helpers & aggregations
    time_duration,
    ranged_sum,
    day_sum,
    calc_week_stats,
    calc_day_stats,
    # payload validators/formatters
    validate_react_payload,
    format_react_to_supabase,
    # response helpers
    now_iso,
    ms_since,
    ok_resp,
    err_resp,
    pack_exc,
    pack_requests_response,
    pack_supabase_error,
    # side-effect helper
    mark_submission_failed,
)

FMT = "%Y-%m-%d"

# ---------------------------
# is_valid_date / verify_stat_args
# ---------------------------

# ---------------------------
# is_valid_date / verify_stat_args
# ---------------------------

def test_is_valid_date_happy_and_bad():
    # Accepts zero-padded and non-zero-padded month/day with the default "%Y-%m-%d"
    assert is_valid_date("2025-06-01") is True
    assert is_valid_date("2025-6-01") is True
    assert is_valid_date("2025-06-1") is True

    # Clearly invalid formats/values
    assert is_valid_date("2025/06/01") is False
    assert is_valid_date("not-a-date") is False
    assert is_valid_date("") is False

    # Custom format still works
    assert is_valid_date("06-01-2025", "%m-%d-%Y") is True


def test_verify_stat_args_ok_and_bad():
    assert verify_stat_args("2025-06-01", "2025-06-30", FMT) is True
    # end before start
    assert verify_stat_args("2025-06-02", "2025-06-01", FMT) is False
    # invalid start
    assert verify_stat_args("2025/06/01", "2025-06-30", FMT) is False
    # invalid end
    assert verify_stat_args("2025-06-01", "06-30-2025", FMT) is False

# ---------------------------
# find_valid_range
# ---------------------------

def test_find_valid_range_snaps_to_full_weeks_within_bounds():
    # Friday → Sunday; should snap to first Monday on/after start and last Sunday ≤ end
    req_start = "2025-08-01"  # Fri
    req_end   = "2025-08-31"  # Sun
    rng = find_valid_range(req_start, req_end, FMT)
    assert rng["start"] == date(2025, 8, 4)
    assert rng["end"]   == date(2025, 8, 31)

def test_find_valid_range_with_datetime_strings_only():
    # Function expects strings; this ensures we keep using strings here
    rng = find_valid_range("2025-08-01", "2025-08-07", FMT)  # 1 week but start=Fri → not enough span
    assert rng == {"start": None, "end": None}

def test_find_valid_range_insufficient_span():
    # Start Mon, end Thu same week: only 4 days
    rng = find_valid_range("2025-08-04", "2025-08-07", FMT)
    assert rng == {"start": None, "end": None}

# ---------------------------
# time_duration / ranged_sum / day_sum
# ---------------------------

@pytest.fixture
def two_week_records_aug_2025():
    """
    Two consecutive weeks of weekday sessions: 60 min each at 09:00–10:00.
    Weeks: 2025-08-04..08-10 and 2025-08-11..08-17
    """
    recs = []
    def add(dstr):
        recs.append({
            "completion_date": dstr,
            "start_time": "09:00:00",
            "end_time":   "10:00:00",
        })

    # Week 1 (Mon..Fri)
    for i in range(5):
        add((date(2025, 8, 4) + timedelta(days=i)).strftime(FMT))
    # Week 2 (Mon..Fri)
    for i in range(5):
        add((date(2025, 8, 11) + timedelta(days=i)).strftime(FMT))
    return recs

def test_time_duration_minutes():
    assert time_duration({"start_time": "09:15:00", "end_time": "10:00:00"}) == 45
    assert time_duration({"start_time": "10:00:00", "end_time": "10:00:00"}) == 0

def test_ranged_sum_inclusive(two_week_records_aug_2025):
    start = date(2025, 8, 4)
    end   = date(2025, 8, 10)
    assert ranged_sum(start, end, two_week_records_aug_2025) == 300  # 5 * 60

def test_ranged_sum_outside(two_week_records_aug_2025):
    start = date(2025, 7, 1)
    end   = date(2025, 7, 31)
    assert ranged_sum(start, end, two_week_records_aug_2025) == 0

def test_day_sum(two_week_records_aug_2025):
    assert day_sum(date(2025, 8, 4), two_week_records_aug_2025) == 60   # Mon in week 1
    assert day_sum(date(2025, 8, 9), two_week_records_aug_2025) == 0    # Sat

# ---------------------------
# calc_week_stats / calc_day_stats
# ---------------------------

@pytest.fixture
def four_week_range_aug_2025():
    """From snapped full weeks: 2025-08-04 (Mon) through 2025-08-31 (Sun)."""
    return {"start": date(2025, 8, 4), "end": date(2025, 8, 31)}

@pytest.fixture
def one_week_range_aug_2025():
    """Exactly one full week: Mon 2025-08-04 .. Sun 2025-08-10."""
    return {"start": date(2025, 8, 4), "end": date(2025, 8, 10)}

def test_calc_week_stats_over_four_weeks(four_week_range_aug_2025, two_week_records_aug_2025):
    # Weeks 1–2: 300 each; Weeks 3–4: 0 each → ave = 150, std = stdev([300,300,0,0])
    stats = calc_week_stats(four_week_range_aug_2025, two_week_records_aug_2025)
    assert stats["ave"] == pytest.approx(150.0)
    assert stats["std"] == pytest.approx(statistics.stdev([300, 300, 0, 0]))

def test_calc_week_stats_single_week_returns_values(one_week_range_aug_2025, two_week_records_aug_2025):
    # Function guards stdev with len<2 → std=0.0; ave should equal that week's total
    stats = calc_week_stats(one_week_range_aug_2025, two_week_records_aug_2025)
    assert stats["ave"] == pytest.approx(300.0)
    assert stats["std"] == 0.0

def test_calc_day_stats_over_four_weeks(four_week_range_aug_2025, two_week_records_aug_2025):
    # num_weeks = 4; weekdays values = [60,60,0,0] → ave 30; weekends [0,0,0,0] → ave 0
    stats = calc_day_stats(four_week_range_aug_2025, two_week_records_aug_2025)
    ave, std = stats["ave"], stats["std"]

    for d in ("Mon", "Tue", "Wed", "Thu", "Fri"):
        assert ave[d] == pytest.approx(30.0)
        assert std[d] == pytest.approx(statistics.stdev([60, 60, 0, 0]))
    assert ave["Sat"] == 0
    assert ave["Sun"] == 0
    assert std["Sat"] == 0
    assert std["Sun"] == 0

def test_calc_day_stats_single_week(one_week_range_aug_2025, two_week_records_aug_2025):
    stats = calc_day_stats(one_week_range_aug_2025, two_week_records_aug_2025)
    ave, std = stats["ave"], stats["std"]
    for d in ("Mon", "Tue", "Wed", "Thu", "Fri"):
        assert ave[d] == pytest.approx(60.0)
        assert std[d] == 0.0
    assert ave["Sat"] == 0
    assert ave["Sun"] == 0
    assert std["Sat"] == 0
    assert std["Sun"] == 0

# ---------------------------
# validate_react_payload / format_react_to_supabase
# ---------------------------

def _valid_payload():
    return {
        "filter_start_date": "2025-09-01",
        "filter_end_date": "2025-09-30",
        "tasks": [
            {"name": "A", "category": "School",  "due_date": "2025-09-30", "start_date": "2025-09-24", "time_estimation": 60},
            {"name": "B", "category": "Personal","due_date": "2025-10-02", "start_date": "2025-09-28", "time_estimation": 30},
        ]
    }

def test_validate_react_payload_happy_path():
    ok, errors = validate_react_payload(_valid_payload())
    assert ok is True
    assert errors == []

def test_validate_react_payload_top_level_errors():
    ok, errors = validate_react_payload({"tasks": []})
    assert ok is False
    # expect at least these two messages
    assert any("filter_start_date" in e for e in errors)
    assert any("filter_end_date" in e for e in errors)
    assert any("tasks must be a non-empty array" in e for e in errors)

def test_validate_react_payload_per_task_errors():
    bad = _valid_payload()
    bad["tasks"][0]["time_estimation"] = "60"  # wrong type
    bad["tasks"][1].pop("due_date")           # missing key
    ok, errors = validate_react_payload(bad)
    assert ok is False
    assert any("time_estimation" in e for e in errors)
    assert any("missing required key" in e for e in errors)

def test_format_react_to_supabase_maps_fields_and_submission_id():
    tasks = _valid_payload()["tasks"]
    rid = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    out = format_react_to_supabase(tasks, rid)
    assert len(out) == 2
    assert out[0]["plan_name"] == tasks[0]["name"]
    assert out[0]["start_date"] == tasks[0]["start_date"]
    assert out[0]["due_date"] == tasks[0]["due_date"]
    assert out[0]["submission_id"] == rid

# ---------------------------
# ok_resp / err_resp / packers
# ---------------------------

def test_ok_resp_and_err_resp_shapes():
    t0 = 0.0  # not real; just ensure keys exist
    ok = ok_resp(["flask"], t0, hello="world")
    assert ok["ok"] is True
    assert ok["service"] == ["flask"]
    assert "now" in ok and isinstance(ok["now"], str)
    assert "response_time_ms" in ok
    assert ok["hello"] == "world"

    err = err_resp(["flask"], t0, code="bad", message="nope", details={"x": 1})
    assert err["ok"] is False
    assert err["error"]["code"] == "bad"
    assert err["error"]["message"] == "nope"
    assert err["error"]["details"] == {"x": 1}

def test_pack_exc():
    e = ValueError("boom")
    packed = pack_exc(e)
    assert packed["type"] == "ValueError"
    assert packed["message"] == "boom"

class _DummyReqResp:
    def __init__(self, ok=True, status_code=200, headers=None, json_body=None, text="TEXT"):
        self.ok = ok
        self.status_code = status_code
        self.headers = headers or {"X-Id": "1"}
        self._json_body = json_body
        self.text = text

    def json(self):
        if self._json_body is None:
            raise ValueError("no json")
        return self._json_body

def test_pack_requests_response_json_and_text():
    r1 = _DummyReqResp(ok=True, status_code=200, json_body={"a": 1})
    got = pack_requests_response(r1)
    assert got["ok"] is True and got["status_code"] == 200 and got["body"] == {"a": 1}
    r2 = _DummyReqResp(ok=False, status_code=500, json_body=None, text="oops")
    got2 = pack_requests_response(r2)
    assert got2["ok"] is False and got2["status_code"] == 500 and got2["body"] == "oops"

def test_pack_supabase_error_variants():
    assert pack_supabase_error(None) == {"message": None}
    assert pack_supabase_error("boom") == {"message": "boom"}

    class ErrObj:
        code = "23505"
        message = "unique violation"
        details = "duplicate key"
        hint = "check unique index"

    got = pack_supabase_error(ErrObj())
    assert got == {
        "code": "23505",
        "message": "unique violation",
        "details": "duplicate key",
        "hint": "check unique index",
    }

# ---------------------------
# mark_submission_failed
# ---------------------------

class _SBResp:
    def __init__(self, data=None, error=None):
        self.data = data
        self.error = error

class _FakeSB:
    def __init__(self):
        self.last_table = None
        self.updated = None
        self.eq_filter = None
    def table(self, name):
        self.last_table = name
        return self
    def update(self, payload):
        self.updated = payload
        return self
    def eq(self, *args, **kwargs):
        self.eq_filter = (args, kwargs)
        return self
    def execute(self):
        return _SBResp(data=[{"ok": True}], error=None)

def test_mark_submission_failed_calls_update_and_returns_response():
    fake = _FakeSB()
    rid = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
    resp = mark_submission_failed(fake, rid)
    assert isinstance(resp, _SBResp)
    assert fake.last_table == "plan_submission"
    assert fake.updated["sync_status"] == "failed"
    assert fake.eq_filter[0][0] == "submission_id"

# ---------------------------
# now_iso / ms_since smoke
# ---------------------------

def test_now_iso_and_ms_since():
    s = now_iso()
    assert isinstance(s, str) and "T" in s
    t0 = 0.0
    delta = ms_since(t0)
    assert isinstance(delta, (int, float))
