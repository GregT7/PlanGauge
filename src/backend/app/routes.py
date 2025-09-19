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
notion_header = {
    "Authorization": f"Bearer {notion_key}",
    "Notion-Version": notion_version
}

@app.route('/')
def index():
    return 'Home Web Page'


@app.route('/api/health', methods=['GET'])
def determine_health():
    start_time = time.perf_counter()
    try:
        http_response = {
            "ok": True,
            "service": ["flask"],
            "version": importlib.metadata.version("flask"),
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000
        }
        return jsonify(http_response), 200
    except Exception as e:
        http_response = {
            "ok": False,
            "service": ["flask"],
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
                "service": ["supabase"],
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
                "service": ["supabase"],
                "now": datetime.now(timezone.utc).isoformat(),
                "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
                "num_rows_returned": len(data or [])
            }
            return jsonify(http_response), 200

    # internal code error
    except Exception as e:
        http_response = {
            "ok": False,
            "service": ["supabase"],
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

    def pack(resp):
        # Helper to safely pack response details
        if resp is None:
            return {"ok": False, "status_code": None}
        return {
            "ok": resp.ok,
            "status_code": resp.status_code
        }
    try:
        notion_user_ping = requests.get('https://api.notion.com/v1/users/', headers=notion_header, timeout=5)
        notion_db_ping = requests.get(f"https://api.notion.com/v1/databases/{notion_db_id}", headers=notion_header, timeout=5)

        checks = {
            "user": pack(notion_user_ping),
            "database": pack(notion_db_ping),
        }
        all_ok = checks["user"]["ok"] and checks["database"]["ok"]

        http_response = {
            "ok": all_ok,
            "service": ["notion"],
            "version": notion_version,
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "checks": checks
        }

        error_obj = {}
        if checks["user"]["ok"] and not checks["database"]["ok"]:
            error_obj["code"] = 'database_inaccessible'
            error_obj["message"] = "Notion database unreachable"
            error_obj["details"] = "db: " + str(notion_db_ping)
            http_response["error"] = error_obj

        elif not checks["user"]["ok"] and checks["database"]["ok"]:
            error_obj["code"] = 'user_inaccessible'
            error_obj["message"] = "Notion user endpoint inaccessible"
            error_obj["details"] = "user: " + str(notion_user_ping)
            http_response["error"] = error_obj

        elif not checks["user"]["ok"] and not checks["database"]["ok"]:
            error_obj["code"] = 'service_inaccessible'
            error_obj["message"] = 'Notion user and database inaccessible'
            error_obj["details"] = "db: " + str(notion_db_ping) + ", user: " + str(notion_user_ping)
            http_response["error"] = error_obj

        return jsonify(http_response), (200 if all_ok else 503)
  
    except Exception as e:
        http_response = {
            "ok": False,
            "service": ["notion"],
            "version": notion_version,
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "checks": None,
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

        http_response = {
            "ok": True,
            "service": ["supabase"],
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "num_records": len(data),
            "params": {'start_date': start_arg, 'end_date': end_arg},
            "data": statistic_data
        }

        return jsonify(http_response), 200

    except Exception as e:
        http_response = {
            "ok": False,
            "service": ["supabase"],
            "now": datetime.now(timezone.utc).isoformat(),
            "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
            "error": {
                'code': 'internal_error',
                'message': 'DB stats request: unexpected error occured',
                'details': str(e)
            }  
        }

        return jsonify(http_response), 500
    


# bulk inserting + inserting into supabase
# https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/68cb4d89-a3c0-8331-a432-5f636ea692d7

# curl -X POST http://127.0.0.1:5000/api/plan-submissions -H "Content-Type: application/json"
# https://developers.notion.com/docs/working-with-databases

# response = requests.post(
#     "http://localhost:5000/api/plan-submissions",
#     headers=notion_header,
#     json={"test": 123}   # <-- this ensures JSON encoding
# )
# @app.route('/api/plan-submissions', methods=['POST'])
# def submit_plans():
#     start_time = time.perf_counter()
#     if request.method == 'POST':

#         # try:
#         #     data = request.get_json(force=True)
#         # except:
#         #     print("aa")

#         # notion_payload = pack_notion_request(notion_db_id, checked=False, title="This is a test title!!", 
#         #                                      category="Career", priority=None, due="2025-09-20",
#         #                                      start="2025-09-20", time=90)

#         # notion_post = requests.post(f"https://api.notion.com/v1/pages", 
#         #                             headers=notion_header, json=notion_payload, timeout=10)
        
#         # return str(notion_post.text), 200

#         if not request.is_json:
#             return jsonify({
#                 "ok": False,
#                 "code": "invalid_content_type",
#                 "message": "Expected application/json"
#             }), 415
        
#         data = request.get_json(silent=True)  # returns Python list/dict or None
#         if data is None:
#             # Still bytes? Log and fail gracefully
#             raw_preview = request.data[:200]  # bytes
#             return jsonify({
#                 "ok": False,
#                 "code": "invalid_json",
#                 "message": "Request body is not valid JSON",
#                 "details": str(raw_preview)
#             }), 400
        
#         if type(data) == 'list' and len(data) < 1:
#             return jsonify({
#                 "ok": False,
#                 "code": "no_records",
#                 "message": "Request body contains no new records to submit",
#                 "details": data
#             }), 400
        

#         test_record = format_react_to_supabase(data)[0]
#         response = supabase.table("plan").insert(test_record).execute()

#         http_response = {
#             'ok': response.ok,
#             'record': test_record,
#             'test': "123",
#             'valid': str(validate_react_data(data)),
#             'tasks': data
#         }
#         return jsonify(http_response), 200

    
#     else:
#         http_response = {
#             'ok': False
#         }
#         return jsonify(http_response), 600


#     # test_record = {
#     #     'submission_id': 1,
#     #     'sync_attempts': 0,
#     #     'synced_with_notion': False,
#     #     'sync_status': 'pending',
#     #     'created_at': datetime.now(timezone.utc).isoformat(),
#     #     'last_modified': datetime.now(timezone.utc).isoformat(),
#     #     'filter_start_date': '2025-06-01',
#     #     'filter_end_date': '2025-06-30'
#     # }
#     # response = supabase.table("plan_submission").insert(test_record).execute()
#     # error = getattr(response, "error", None)

#     # if not error:
#     #     http_response = {
#     #         'ok': True,
#     #         'service':["Supabase"],
#     #         'now': datetime.now(timezone.utc).isoformat(),
#     #         "response_time_ms": round(time.perf_counter() - start_time, 2) * 1000,
#     #         "plan_submission": test_record
#     #     }
#     #     return jsonify(http_response), 201

# resp = supabase.table("plan").insert(row).execute()
# print(resp)  # inspect fields
# payload = {
#     "data": getattr(resp, "data", None),
#     "error": getattr(resp, "error", None),
#     "status_code": getattr(resp, "status_code", None),
# }
# return jsonify(payload)

import traceback
@app.route('/api/plan-submissions', methods=['POST'])
def submit_plans():
    start_time = time.perf_counter()
    if request.method == 'POST':
        try:
            data = request.get_json(silent=True)
            test_record = format_react_to_supabase(data)[0]
            response = supabase.table("plan").insert(test_record).execute()
            http_response = {
                'ok': True,
                'message': 'record posted to database'
            }
            return jsonify(http_response), 201
            # return jsonify(response)
            # return jsonify("asdads")
        except Exception as e:

            return jsonify({
                "ok": False,
                "code": "unhandled_exception",
                "message": str(e),
                "trace": traceback.format_exc()
            }), 500


