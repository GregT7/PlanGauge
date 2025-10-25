import os
from flask import Flask, request
from flask_cors import CORS
from supabase import create_client
from dotenv import load_dotenv


app = Flask(__name__)

allowed_urls = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://localhost:4173",
    "http://127.0.0.1:4173"
]

CORS(app, resources={r"/api/*": {"origins": allowed_urls}}, supports_credentials=False)

# Load variables from .env
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

from . import routes  # assumes routes.py is inside app/