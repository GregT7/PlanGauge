from datetime import datetime, timedelta, timezone
from statistics import stdev
import time

def is_valid_date(val, fmt="%Y-%m-%d"):
    try:
        date = datetime.strptime(val, fmt)
        if date is None:
            return False
        else:
            if date.year is None:
                return False
            
            if date.month is None:
                return False
            
            if date.day is None:
                return False
            
            return True
    except:
        return False

def verify_stat_args(start, end, fmt):
    is_start_valid = is_valid_date(start, fmt)
    is_end_valid = is_valid_date(end, fmt)

    if not is_start_valid or not is_end_valid:
        return False
    
    try:
        start_date = datetime.strptime(start, fmt)
        end_date = datetime.strptime(end, fmt)
        if end_date <= start_date:
            return False
        else:
            return True
    except:
        return False

def find_valid_range(start, end, fmt):
    bad_range = {'start': None, 'end': None}
    try:
        start_date = datetime.strptime(start, fmt).date()
        end_date = datetime.strptime(end, fmt).date()

        num_days = (end_date - start_date).days
        days_offset = ((7 - start_date.weekday()) % 7)
        min_num_days = 6 + days_offset

        if num_days >= min_num_days:
            valid_start = start_date + timedelta(days_offset)
            valid_num_days = (end_date - valid_start).days
            num_weeks = (valid_num_days + 1) // 7

            valid_end = valid_start + timedelta(num_weeks * 7 - 1)
            return {'start': valid_start, 'end': valid_end}
        
        return bad_range
    except:
        return bad_range
    
def time_duration(work_record):
    time_fmt = "%H:%M:%S"
    start_time = datetime.strptime(work_record["start_time"], time_fmt)
    end_time = datetime.strptime(work_record["end_time"], time_fmt)
    return (end_time - start_time).seconds / 60
            

def ranged_sum(start, end, data):
    date_fmt = "%Y-%m-%d"
    
    time_sum = 0
    for work_record in data:
        work_date = datetime.strptime(work_record['completion_date'], date_fmt).date()

        if work_date >= start and work_date <= end:
            time_sum += time_duration(work_record)

    return time_sum

def day_sum(day, data):
    date_fmt = "%Y-%m-%d"
    time_sum = 0
    for work_record in data:
        work_date = datetime.strptime(work_record['completion_date'], date_fmt).date()

        if work_date == day:
            time_sum += time_duration(work_record)

    return time_sum


def calc_week_stats(date_range, data):
    try:
        num_days = (date_range['end'] - date_range['start']).days + 1
        num_weeks = num_days // 7

        time_sum = 0
        time_vals = []
        
        for i in range(num_weeks):
            # week stats
            days_offset = i * 7
            week_start = date_range['start'] + timedelta(days=days_offset)
            week_end = week_start + timedelta(days=6)
            week_time = ranged_sum(week_start, week_end, data)

            time_sum += week_time
            time_vals.append(week_time)

        ave = time_sum / num_weeks
        std = stdev(time_vals) if len(time_vals) >= 2 else 0.0
        return {'ave': ave, 'std': std}
    except:
        return {'ave': None, 'std': None}

# day_name = my_date.strftime("%A")
def calc_day_stats(date_range, data):
    try:
        names_list = ('Mon','Tue','Wed','Thu','Fri','Sat','Sun')
        day_vals = {d: [] for d in names_list}
        day_sums = {d: 0 for d in names_list}

        day_ave = {d: 0 for d in names_list}
        day_std = {d: 0 for d in names_list}
        
        num_days = (date_range['end'] - date_range['start']).days + 1
        num_weeks = num_days // 7 if num_days != 0 else 0
        
        for i in range(num_weeks):
            days_offset = i * 7
            week_start = date_range['start'] + timedelta(days=days_offset)

            for j in range(7):
                current_day = week_start + timedelta(days=j)
                current_sum = day_sum(current_day, data)

                current_name = current_day.strftime("%A")
                inits = current_name[0:3]

                day_sums[inits] += current_sum
                day_vals[inits].append(current_sum)

        for key in day_vals.keys():
            day_ave[key] = day_sums[key] / num_weeks if num_weeks != 0 else -1
            day_std[key] = stdev(day_vals[key]) if len(day_vals[key]) >= 2 else 0.0

        return {'ave': day_ave, 'std': day_std}
    except:
        return {'ave': None, 'std': None}



def validate_react_payload(data):
    """
    Expected payload shape (from React):
    {
      "filter_start_date": "2025-06-01",   # YYYY-MM-DD string
      "filter_end_date":   "2025-06-30",   # YYYY-MM-DD string
      "tasks": [
        {
          "name": "Do HW 3",
          "category": "School",
          "due_date": "2025-06-05",                  # YYYY-MM-DD string
          "start_date": "2025-06-03",                # YYYY-MM-DD string
          "time_estimation": 90                      # integer minutes
          # other fields allowed but ignored
        },
        ...
      ]
    }
    Returns: (ok: bool, errors: list[str])
    """

    errors = []

    # some helpers
    def req(d: dict, key: str):
        return d.get(key, None)

    # --- top-level object ---
    if not isinstance(data, dict):
        return False, ["payload must be a JSON object"]

    # required top-level keys
    start = req(data, "filter_start_date")
    end = req(data, "filter_end_date")
    tasks = req(data, "tasks")


    # filter dates must be 'YYYY-MM-DD' strings
    if not is_valid_date(start):
        errors.append("filter_start_date must be a string with this formatting: 'YYYY-MM-DD'")
    if not is_valid_date(end):
        errors.append("filter_end_date must be a string with this formatting: 'YYYY-MM-DD'")

    if not isinstance(tasks, list) or len(tasks) == 0:
        errors.append("tasks must be a non-empty array.")

    # short-circuit if top-level already broken
    if errors:
        return False, errors

    # --- per-task validation ---
    REQUIRED = ["name", "category", "due_date", "start_date", "time_estimation"]

    for i, task in enumerate(tasks):
        prefix = f"tasks[{i}]"
        if not isinstance(task, dict):
            errors.append(f"{prefix} must be an object.")
            continue

        # keys present
        missing = [k for k in REQUIRED if k not in task]
        if missing:
            errors.append(f"{prefix} missing required key(s): {', '.join(missing)}.")
            # continue to next task; no need to type-check missing fields
            continue

        # types / formats
        if not isinstance(task["name"], str) or not task["name"].strip():
            errors.append(f"{prefix}.name must be a non-empty string.")

        if not isinstance(task["category"], str) or not task["category"].strip():
            errors.append(f"{prefix}.category must be a non-empty string.")

        # time_estimation: integer minutes (>= 0)
        if not isinstance(task["time_estimation"], int) or task["time_estimation"] < 0:
            errors.append(f"{prefix}.time_estimation must be an integer ≥ 0 (minutes).")

        # dates must be 'YYYY-MM-DD' strings
        if not is_valid_date(task["due_date"]):
            errors.append(f"{prefix}.due_date must be 'YYYY-MM-DD'.")
        if not is_valid_date(task["start_date"]):
            errors.append(f"{prefix}.start_date must be 'YYYY-MM-DD'.")

    return (len(errors) == 0), errors

def format_react_to_supabase(data, submission_id):
    record_list = []
    for record in data:
        new_record = {
            "plan_name": record["name"],
            "start_date": record["start_date"],
            "due_date": record["due_date"],
            "submission_id": submission_id
        }
        record_list.append(new_record)

    return record_list

def format_react_to_notion(data, db_id):
    notion_records = []
    for record in data:
        formatted_record = {
            "parent": { "database_id" : db_id},
            "properties": 
                {
                    "YG%60S": { "checkbox": False },
                    "Task": {
                        "title": [
                            {"type": "text", "text": {"content": record["name"]}}
                        ]
                    },
                    "Category": {
                        "select": {
                            "name": record["category"]
                        }
                    },
                    "Priority": { "select": None },
                    "Due": { "date": { "start": record["due_date"] } },
                    "Start": { "date": { "start": record["start_date"] } },
                    "Total": {"number": record['time_estimation']}
                }
        }
        notion_records.append(formatted_record)
    return notion_records

def now_iso(): return datetime.now(timezone.utc).isoformat()
def ms_since(t0): 
    return round((time.perf_counter() - t0) * 1000, 2)

def ok_resp(service, t0, **extra):
    base = {"ok": True, "service": service, "now": now_iso(), "response_time_ms": ms_since(t0)}
    base.update(extra)
    return base

def err_resp(service, t0, code, message, details=None, **extra):
    body = {"ok": False, "service": service, "now": now_iso(), "response_time_ms": ms_since(t0),
            "error": {"code": code, "message": message, "details": details}}
    body.update(extra)
    return body

def pack_exc(e: Exception):
    return {"type": type(e).__name__, "message": str(e)}

def pack_requests_response(r):
    if r is None: 
        return {"ok": False, "status_code": None, "body": None}
    try:
        body = r.json()
    except Exception:
        body = r.text
    return {
        "ok": r.ok,
        "status_code": r.status_code,
        "headers": dict(r.headers),
        "body": body[:2000] if isinstance(body, str) else body,  # guard size
    }

def pack_supabase_error(err):
    """
    Normalize a Supabase error into a safe, JSON-serializable dict.

    Prioritizes common fields (code, message, details, hint).
    Falls back to str(err) if nothing useful is available.
    """
    if err is None:
        return {"message": None}

    if isinstance(err, str):
        return {"message": err}

    # Try to extract common error attributes
    fields = {}
    for key in ("code", "message", "details", "hint"):
        val = getattr(err, key, None)
        if val is not None:
            fields[key] = val

    if fields:
        return fields

    # Fallback to string representation
    return {"message": str(err)}

    

def mark_submission_failed(supabase, submission_id):
    """
    Mark a plan_submission row as failed in Supabase.

    Returns the raw supabase response object so caller can inspect
    .data / .error directly.
    """
    updates = {
        "sync_status": "failed",
        "sync_attempts": 1,
        "synced_with_notion": False,
        "last_modified": now_iso(),
    }

    return (
        supabase.table("plan_submission")
        .update(updates)
        .eq("submission_id", submission_id)
        .execute()
    )

    