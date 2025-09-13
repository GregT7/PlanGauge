import importlib.metadata, time, os, requests
from flask import jsonify, request
from datetime import datetime, timezone
from . import app, supabase
from dotenv import load_dotenv
from .utils import *

load_dotenv()

notion_key = os.getenv("NOTION_API_KEY")
notion_page_id = os.getenv("NOTION_PAGE_ID")
notion_db_id = os.getenv("NOTION_DB_ID")
notion_version = os.getenv("NOTION_VERSION")

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
            "version": importlib.metadata.version("flask"),
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000
        }
        return jsonify(http_response), 200
    except Exception as e:
        http_response = {
            "ok": False,
            "service": "flask",
            "version": importlib.metadata.version("flask"),
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "error": {
                "code": "internal_error",
                "message": "Flask internal error",
                "details": str(e)
            }
        }
        return jsonify(http_response), 500
    

@app.route('/api/db/health', methods=['GET'])
def db_health_check():
    start_time = time.perf_counter()
    try:
        response = supabase.table("work").select("*").limit(1).execute()
        data = response.data
        error = getattr(response, "error", None)

        # Service inaccesible error
        if error:
            http_response = {
                "ok": False,
                "service": "supabase",
                "now": datetime.now(timezone.utc).isoformat(),
                "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
                
                "error": {
                    'code': 'service_inaccessible',
                    'message': 'Supabase network not available',
                    'details': str(error)
                }
            }
            return jsonify(http_response), 503
        
        # Supabase is online and working, connection test is successful
        else:
            http_response = {
                "ok": True,
                "service": "supabase",
                "now": datetime.now(timezone.utc).isoformat(),
                "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
                "num_rows_returned": len(data or [])
            }
            return jsonify(http_response), 200

    # internal code error
    except Exception as e:
        http_response = {
            "ok": False,
            "service": "supabase",
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,

            "error": {
                'code': 'internal_error',
                'message': "Unexpected error",
                'details': str(e)
            }
        }
        return jsonify(http_response), 500


@app.route('/api/notion/health', methods=['GET'])
def notion_health_check():
    start_time = time.perf_counter()
    headers = {
        "Authorization": f"Bearer {notion_key}",
        "Notion-Version": "2022-06-28"
    }

    def pack(resp):
        # Helper to safely pack response details
        if resp is None:
            return {"ok": False, "status_code": None}
        return {
            "ok": resp.ok,
            "status_code": resp.status_code
        }
    try:
        notion_user_ping = requests.get('https://api.notion.com/v1/users/', headers=headers, timeout=5)
        notion_db_ping = requests.get(f"https://api.notion.com/v1/databases/{notion_db_id}", headers=headers, timeout=5)

        checks = {
            "user": pack(notion_user_ping),
            "database": pack(notion_db_ping),
        }
        all_ok = checks["user"]["ok"] and checks["database"]["ok"]

        http_response = {
            "ok": all_ok,
            "service": "notion",
            "version": notion_version,
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
        }


        error_obj = {
            'code': 'service_inaccessible',
            'message': 'Notion user and database inaccessible',
            'details': checks
        }

        if all_ok:
            http_response['checks'] = checks

        elif not checks["user"]["ok"]:
            error_obj.code = 'user_inaccessible'
            error_obj.message = "Notion user endpoint inaccessible"
            http_response["error"] = error_obj

        elif checks["user"]["ok"] and not checks["database"]["ok"]:
            error_obj.code = 'database_inaccessible'
            error_obj.message = "Notion database unreachable"
            http_response["error"] = error_obj

        elif not checks["user"]["ok"] and not checks["database"]["ok"]:
            http_response["error"] = error_obj

        return jsonify(http_response), (200 if all_ok else 503)
  
    except requests.exceptions.RequestException as e:
        # Network/HTTP layer problems
        body = {
            "ok": False,
            "service": "notion",
            "version": notion_version,
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": int((time.perf_counter() - start_time) * 1000),
            "error": {
                'code': 'network_error',
                'message': 'Network/HTTP failure while contacting Notion',
                'details': str(e)
            }
        }
        return jsonify(body), 503
    except Exception as e:
        http_response = {
            "ok": False,
            "service": "notion",
            "version": notion_version,
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "error": {
                'code': 'internal_error',
                'message': "Unexpected error",
                'details': str(e)
            }
        }
        return jsonify(http_response), 500

# curl "http://127.0.0.1:5000/api/db/stats?start=2025-06-01&end=2025-06-30"
@app.route('/api/db/stats', methods=['GET'])
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
            "service": "supabase",
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": elapsed_time,
            "num_records": len(data),
            "params": {'start_date': start_arg, 'end_date': end_arg},
            "data": statistic_data
        }

        return jsonify(http_response), 200

    except Exception as e:
        end_time = time.perf_counter()
        elapsed_time = (end_time - start_time) * 1000
        http_response = {
            "ok": False,
            "service": "supabase",
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": elapsed_time,
            "error": {
                'code': 'internal_error',
                'message': 'DB stats request: unexpected error occured',
                'details': str(e)
            }  
        }

        return jsonify(http_response), 500