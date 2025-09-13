# test_utils.py
# Run with: pytest -q

from datetime import date, datetime, timedelta
import statistics, pytest, json
from pathlib import Path


# Adjust the import below if your module name/path is different
from app.utils import (
    find_valid_range,
    time_duration,
    ranged_sum,
    day_sum,
    calc_week_stats,
    calc_day_stats,
)


# ---------- Test Fixtures ----------

@pytest.fixture
def two_week_range_aug_2025():
    """
    We ask for a broad range and expect find_valid_range to snap to:
    start = Monday, Aug 4, 2025
    end   = Sunday, Aug 31, 2025  (4 full weeks)
    """
    req_start = date(2025, 8, 1)   # Friday
    req_end   = date(2025, 8, 31)  # Sunday
    return find_valid_range(req_start, req_end)

@pytest.fixture
def june_2025_records():
    HERE = Path(__file__).resolve().parent  # the folder this test file is in
    data_path = HERE / "data_JUN1_JUN30_2025.txt"

    with open(data_path, "r") as f:
        data = json.load(f)
    return data

# See excel file for manual calculations
@pytest.fixture
def june_2025_statistics():
    day_stats = {
        "ave": {
            "Mon": 423.000,
            "Tue": 327.500,
            "Wed": 357.250,
            "Thu": 355.250,
            "Fri": 396.250,
            "Sat": 360.250,
            "Sun": 473.250
        },

        "std": {
            "Mon": 44.729,
            "Tue": 147.789,
            "Wed": 190.902,
            "Thu": 129.113,
            "Fri": 88.206,
            "Sat": 131.988,
            "Sun": 120.478
        }
    }

    week_stats = {
        "ave": 2692.750,
        "std": 261.546
    }

    return {
        "day": day_stats,
        "week": week_stats
    }

@pytest.fixture
def two_week_data_aug_2025():
    """
    Create work records for two consecutive weeks starting Aug 4, 2025 (Monday).
    Each weekday has one 60-minute session (09:00-10:00). Weekends have 0.
    """
    # Week 1: 2025-08-04 (Mon) .. 2025-08-10 (Sun)
    # Week 2: 2025-08-11 (Mon) .. 2025-08-17 (Sun)
    records = []
    def add(day):
        records.append({
            "completion_date": day.strftime("%Y-%m-%d"),
            "start_time": "09:00:00",
            "end_time":   "10:00:00",
        })

    week1_start = date(2025, 8, 4)
    week2_start = date(2025, 8, 11)

    for base in (week1_start, week2_start):
        for i in range(5):  # Mon-Fri
            add(base + timedelta(days=i))

    return records

@pytest.fixture
def one_week_range_aug_2025():
    """Exactly one week: Monday Aug 4-Sunday Aug 10, 2025."""
    return {"start": date(2025, 8, 4), "end": date(2025, 8, 10)}

# ---------- find_valid_range ----------

def test_find_valid_range_snaps_to_full_weeks_within_bounds():
    req_start = date(2025, 8, 1)   # Friday
    req_end   = date(2025, 8, 31)  # Sunday
    got = find_valid_range(req_start, req_end)
    assert got["start"] == date(2025, 8, 4)   # First Monday on/after Aug 1
    assert got["end"]   == date(2025, 8, 31)  # Last Sunday <= Aug 31

def test_find_valid_range_with_datetime_inputs():
    # Same request, but pass datetimes (the function must coerce to .date()).
    req_start = datetime(2025, 8, 1, 12, 0, 0)
    req_end   = datetime(2025, 8, 31, 23, 59, 59)
    got = find_valid_range(req_start, req_end)
    assert got["start"] == date(2025, 8, 4)
    assert got["end"]   == date(2025, 8, 31)

def test_find_valid_range_when_end_before_start():
    got = find_valid_range(date(2025, 8, 10), date(2025, 8, 1))
    assert got == {"start": None, "end": None}

def test_find_valid_range_when_insufficient_span():
    # Start on a Monday, end on Thursday of same week (only 4 days; need full 7-window)
    got = find_valid_range(date(2025, 8, 4), date(2025, 8, 7))
    assert got == {"start": None, "end": None}

# ---------- time_duration ----------

def test_time_duration_basic_minutes():
    rec = {"start_time": "09:30:00", "end_time": "10:45:00"}
    assert time_duration(rec) == 75

def test_time_duration_zero_minutes():
    rec = {"start_time": "10:00:00", "end_time": "10:00:00"}
    assert time_duration(rec) == 0

# ---------- ranged_sum & day_sum ----------

def test_ranged_sum_inclusive_bounds(two_week_data_aug_2025):
    # Single week (Mon–Sun) range; expect 5 weekdays * 60 = 300 minutes
    start = date(2025, 8, 4)
    end   = date(2025, 8, 10)
    assert ranged_sum(start, end, two_week_data_aug_2025) == 300

def test_ranged_sum_no_matches_returns_zero(two_week_data_aug_2025):
    start = date(2025, 7, 1)
    end   = date(2025, 7, 31)
    assert ranged_sum(start, end, two_week_data_aug_2025) == 0

def test_day_sum_exact_match(two_week_data_aug_2025):
    # Monday, Aug 4, 2025 exists with a 60-min entry
    assert day_sum(date(2025, 8, 4), two_week_data_aug_2025) == 60

def test_day_sum_no_match_returns_zero(two_week_data_aug_2025):
    # Weekend day without any entry
    assert day_sum(date(2025, 8, 9), two_week_data_aug_2025) == 0  # Saturday

# ---------- calc_week_stats ----------

def test_calc_week_stats_two_weeks(two_week_range_aug_2025, two_week_data_aug_2025):
    # The valid range fixture spans 4 weeks total (Aug 4–Aug 31), but our data only
    # populate the first two weeks with weekday 60-minute sessions:
    #
    # Week1 (Aug 4–10): 5 * 60 = 300
    # Week2 (Aug 11–17): 5 * 60 = 300
    # Week3 (Aug 18–24): 0
    # Week4 (Aug 25–31): 0
    #
    # calc_week_stats will compute over ALL weeks in the valid range (4 weeks).
    stats = calc_week_stats(two_week_range_aug_2025, two_week_data_aug_2025)
    # time_vals = [300, 300, 0, 0]  -> ave = 150, std = stdev([300,300,0,0]) = 173.205...
    assert stats["ave"] == pytest.approx(150.0)
    assert stats["std"] == pytest.approx(statistics.stdev([300, 300, 0, 0]))

def test_calc_week_stats_raises_on_single_week(one_week_range_aug_2025, two_week_data_aug_2025):
    # With a single week in the range, statistics.stdev() has only one data point
    # and will raise StatisticsError.
    with pytest.raises(statistics.StatisticsError):
        calc_week_stats(one_week_range_aug_2025, two_week_data_aug_2025)

# ---------- calc_day_stats ----------

def test_calc_day_stats_two_weeks(two_week_range_aug_2025, two_week_data_aug_2025):
    # Over the 4-week range, we have:
    # - Weeks 1 & 2: Mon–Fri = 60; Sat & Sun = 0
    # - Weeks 3 & 4: all days = 0
    #
    # num_weeks = 4
    # For each weekday:
    #   values = [60, 60, 0, 0] -> sum = 120 -> ave = 120/4 = 30
    # For Sat/Sun:
    #   values = [0, 0, 0, 0]  -> sum = 0   -> ave = 0
    stats = calc_day_stats(two_week_range_aug_2025, two_week_data_aug_2025)

    ave = stats["ave"]
    std = stats["std"]

    # Weekday averages: 30 min
    for d in ("Mon", "Tue", "Wed", "Thu", "Fri"):
        assert ave[d] == pytest.approx(30.0)

    # Weekend averages: 0 sentinel
    assert ave["Sat"] == 0
    assert ave["Sun"] == 0

    # Standard deviations:
    # stdev([60,60,0,0]) for weekdays; stdev([0,0,0,0]) = 0 for weekends
    expected_weekday_std = statistics.stdev([60, 60, 0, 0])
    for d in ("Mon", "Tue", "Wed", "Thu", "Fri"):
        assert std[d] == pytest.approx(expected_weekday_std)

    assert std["Sat"] == 0
    assert std["Sun"] == 0

def test_calc_day_stats_raises_on_single_week(one_week_range_aug_2025, two_week_data_aug_2025):
    # For a single week, each day list has length 1; stdev requires at least 2
    with pytest.raises(statistics.StatisticsError):
        calc_day_stats(one_week_range_aug_2025, two_week_data_aug_2025)


# rounded everything to 3 decimal places then compared together
def test_statistic_calcs_on_month(june_2025_records, june_2025_statistics):
        start_arg = "2025-06-01"
        end_arg = "2025-06-30"

        fmt = "%Y-%m-%d"
        start = datetime.strptime(start_arg, fmt)
        end = datetime.strptime(end_arg, fmt)

        date_range = find_valid_range(start, end)

        statistic_data = {
            'week': calc_week_stats(date_range, june_2025_records),
            'day': calc_day_stats(date_range, june_2025_records)
        }
        
        statistic_data['week']['ave'] = round(statistic_data['week']['ave'], 3)
        statistic_data['week']['std'] = round(statistic_data['week']['std'], 3)

        for key in statistic_data['day']['ave'].keys():
            statistic_data['day']['ave'][key] = round(statistic_data['day']['ave'][key], 3)

        for key in statistic_data['day']['std'].keys():
            statistic_data['day']['std'][key] = round(statistic_data['day']['std'][key], 3)

        assert statistic_data == june_2025_statistics
