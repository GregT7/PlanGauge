import flask, json
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
        # curl "http://127.0.0.1:5000/api/stats?start=2025-04-01&end=2025-04-30"
        # curl "http://127.0.0.1:5000/api/stats?start=2025-02-13&end=2025-03-23"


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

        return jsonify(statistic_data)
        
    except Exception as e:
        print("Error:", str(e))