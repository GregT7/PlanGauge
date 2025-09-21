from datetime import datetime, timedelta
import statistics
import uuid

def find_valid_range(start, end):
    date_range = {'start': None, 'end': None}

    if isinstance(start, datetime): start = start.date()
    if isinstance(end, datetime):   end   = end.date()

    if end < start:
        return date_range
    
    num_days = (end - start).days
    days_offset = ((7 - start.weekday()) % 7)
    min_num_days = 6 + days_offset

    if num_days >= min_num_days:
        valid_start = start + timedelta(days_offset)
        valid_num_days = (end - valid_start).days
        num_weeks = (valid_num_days + 1) // 7

        valid_end = valid_start + timedelta(num_weeks * 7 - 1)
        return {'start': valid_start, 'end': valid_end}
    
    return date_range

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
    std = statistics.stdev(time_vals)
    return {'ave': ave, 'std': std}

# day_name = my_date.strftime("%A")
def calc_day_stats(date_range, data):
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

        for i in range(7):
            current_day = week_start + timedelta(days=i)
            current_sum = day_sum(current_day, data)

            current_name = current_day.strftime("%A")
            inits = current_name[0:3]

            day_sums[inits] += current_sum
            day_vals[inits].append(current_sum)

    for key in day_vals.keys():
        day_ave[key] = day_sums[key] / num_weeks if num_weeks != 0 else -1
        day_std[key] = statistics.stdev(day_vals[key])

    return {'ave': day_ave, 'std': day_std}

from datetime import datetime

def validate_react_payload(data):
    """
    Expected payload shape (from React):
    {
      "filter_start_date": "2025-06-01T00:00:00Z",   # ISO-8601 string
      "filter_end_date":   "2025-06-30T23:59:59Z",   # ISO-8601 string
      "tasks": [
        {
          "name": "Do HW 3",
          "category": "School",
          "due_date": "2025-06-05T00:00:00Z",        # ISO-8601 string
          "start_date": "2025-06-03T00:00:00Z",      # ISO-8601 string
          "time_estimation": 90                      # integer minutes
          # other fields allowed but ignored
        },
        ...
      ]
    }
    Returns: (ok: bool, errors: list[str])
    """

    errors = []

    # --- helpers ---
    def is_iso8601(s: str) -> bool:
        if not isinstance(s, str):
            return False
        try:
            # support trailing 'Z'
            normalized = s[:-1] + "+00:00" if s.endswith("Z") else s
            datetime.fromisoformat(normalized)
            return True
        except Exception:
            return False

    def req(d: dict, key: str):
        return d.get(key, None)

    # --- top-level object ---
    if not isinstance(data, dict):
        return False, ["payload must be a JSON object"]

    # required top-level keys
    start = req(data, "filter_start_date")
    end = req(data, "filter_end_date")
    tasks = req(data, "tasks")

    if not is_iso8601(start):
        errors.append("filter_start_date must be an ISO-8601 string (UTC recommended).")
    if not is_iso8601(end):
        errors.append("filter_end_date must be an ISO-8601 string (UTC recommended).")

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

        # dates must be ISO-8601 strings
        if not is_iso8601(task["due_date"]):
            errors.append(f"{prefix}.due_date must be ISO-8601.")
        if not is_iso8601(task["start_date"]):
            errors.append(f"{prefix}.start_date must be ISO-8601.")

    return (len(errors) == 0), errors


def generate_unique_integer_id():
  """Generates a unique integer ID using UUIDs."""
  unique_uuid = uuid.uuid4()  # Generate a random UUID (version 4)
  unique_integer_id = unique_uuid.int  # Convert the UUID to an integer
  
  return unique_integer_id % 2147483647


def format_react_to_supabase(data, submission_id):
    record_list = []
    for record in data:
        new_record = {
            "plan_id": generate_unique_integer_id(),
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