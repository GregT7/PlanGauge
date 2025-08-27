from datetime import datetime, timedelta
import statistics


def find_valid_range(start, end):
    valid_range = {'start': None, 'end': None}

    if isinstance(start, datetime): start = start.date()
    if isinstance(end, datetime):   end   = end.date()

    if end < start:
        return valid_range
    
    num_days = (end - start).days
    days_offset = ((7 - start.weekday()) % 7)
    min_num_days = 6 + days_offset

    if num_days >= min_num_days:
        valid_start = start + timedelta(days_offset)
        valid_num_days = (end - valid_start).days
        num_weeks = (valid_num_days + 1) // 7

        valid_end = valid_start + timedelta(num_weeks * 7 - 1)
        return {'start': valid_start, 'end': valid_end}
    
    return valid_range

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
        day_ave[key] = day_sums[key] / num_weeks if day_sums[key] != 0 else -1
        day_std[key] = statistics.stdev(day_vals[key])

    return {'ave': day_ave, 'std': day_std}