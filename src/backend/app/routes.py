import flask, time
from flask import jsonify, request
from datetime import datetime
from app import app, supabase
from utils import *



@app.route('/')
def index():
    return 'Home Web Page'

@app.route('/api/health', methods=['GET'])
def determine_health():
    start_time = time.perf_counter()
    try:
        http_response = {
            "ok": True,
            "service": "flask",
            "version": flask.__version__,
            "now": datetime.now(),
            "response_time_ms": (time.perf_counter() - start_time) * 1000
        }
        return jsonify(http_response), 200
    except Exception as e:
        http_response = {
            "ok": False,
            "error": str(e),
            "now": datetime.now(),
            "response_time_ms": (time.perf_counter() - start_time) * 1000
        }
        return jsonify(http_response), 503

# curl "http://127.0.0.1:5000/api/stats?start=2025-06-01&end=2025-06-30"
@app.route('/api/stats', methods=['GET'])
def calc_stats():
    start_time = time.perf_counter()
    try:
        start_arg = request.args.get('start') # ?start=2024-06-14
        end_arg = request.args.get('end') # ?end=2025-08-24

        fmt = "%Y-%m-%d"
        start = datetime.strptime(start_arg, fmt)
        end = datetime.strptime(end_arg, fmt)

        date_range = find_valid_range(start, end)

        query = supabase.table("work").select("*") \
        .gte('completion_date', date_range['start']) \
        .lte('completion_date', date_range['end'])
        
        response = query.execute()
        data = response.data

        statistic_data = {
            'week': calc_week_stats(date_range, data),
            'day': calc_day_stats(date_range, data)
        }

        end_time = time.perf_counter()
        elapsed_time = (end_time - start_time) * 1000

        http_response = {
            "ok": True,
            "num_records": len(data),
            "db_connected": True,
            "params": {'start_date': start_arg, 'end_date': end_arg},
            "response_time_ms": elapsed_time,
            "now": datetime.now(),
            "data": statistic_data
        }

        return jsonify(http_response), 200
        
    except Exception as e:
        end_time = time.perf_counter()
        elapsed_time = (end_time - start_time) * 1000
        http_response = {
            "ok": False,
            "error": str(e),
            "response_time_ms": elapsed_time,
            "now": datetime.now()
        }

        return jsonify(http_response), 503