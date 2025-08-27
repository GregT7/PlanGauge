import flask, statistics
from flask import jsonify, request
from datetime import datetime
from app import app, supabase
from utils import *


@app.route('/')
def index():
    return 'Home Web Page'

@app.route('/api/health', methods=['GET'])
def determine_health():
    return jsonify({'ok': True, 'now': datetime.now(), 'version': flask.__version__})

@app.route('/api/get_db_data', methods=['GET'])
def get_data():
    try:
        response = supabase.table("work").select("*").execute()
        return jsonify(response.data), 200
    except Exception as e:
        print("Error:", str(e))

@app.route('/api/stats', methods=['GET'])
def calc_stats():
    try:

        # curl "http://127.0.0.1:5000/api/stats?start=2025-07-01&end=2025-07-31"
        # curl "http://127.0.0.1:5000/api/stats?start=2025-06-01&end=2025-06-30"
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

        return jsonify(calc_day_stats(date_range, data))
        # return jsonify(calc_week_stats(date_range, data))




        # time_vals = []
        # time_sum = 0
        # for row in rows:
        #     fmt = "%H:%M:%S"
        #     start = datetime.strptime(row["start_time"], fmt)
        #     end = datetime.strptime(row["end_time"], fmt)
        #     diff_minutes = (end - start).seconds / 60
        #     time_vals.append(diff_minutes)
        #     time_sum += diff_minutes
        
        # ave = time_sum / len(rows)
        # std = statistics.stdev(time_vals)
        # # return jsonify({'ave': ave, 'std': std, 'count': len(time_vals)}), 200
        # return jsonify(rows)

    except Exception as e:
        print("Error:", str(e))