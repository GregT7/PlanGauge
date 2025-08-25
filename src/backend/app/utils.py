from datetime import datetime, timedelta, date

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