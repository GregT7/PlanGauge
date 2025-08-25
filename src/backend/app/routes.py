import flask, statistics
from flask import jsonify, request
from datetime import datetime
from app import app, supabase
from utils import find_valid_range


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
        start = request.args.get('start') # ?start=2024-06-14
        end = request.args.get('end') # ?end=2025-08-24
        

        query = supabase.table("work").select("*") \
        .gte('completion_date', start) \
        .lte('completion_date', end)
        
        response = query.execute()
        rows = response.data

        time_vals = []
        time_sum = 0
        for row in rows:
            fmt = "%H:%M:%S"
            start = datetime.strptime(row["start_time"], fmt)
            end = datetime.strptime(row["end_time"], fmt)
            diff_minutes = (end - start).seconds / 60
            time_vals.append(diff_minutes)
            time_sum += diff_minutes
        
        ave = time_sum / len(rows)
        std = statistics.stdev(time_vals)
        # return jsonify({'ave': ave, 'std': std, 'count': len(time_vals)}), 200
        return jsonify(rows)

    except Exception as e:
        print("Error:", str(e))