import os
from flask import Flask, jsonify, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv

app = Flask(__name__)
# CORS(app)
# CORS(app, resources={r"/api/plan-submissions": {"origins": "http://localhost:5173"}})
# CORS(api, resources={r"/api/*": {"origins": "http://localhost:3000"}})
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}}, supports_credentials=False)

# Load variables from .env
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

from . import routes  # assumes routes.py is inside app/