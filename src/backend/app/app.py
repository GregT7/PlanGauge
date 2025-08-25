
from flask import Flask, jsonify, request
from flask_cors import CORS

import os, statistics
from supabase import create_client
from dotenv import load_dotenv



app = Flask(__name__)
CORS(app)

# Load variables from .env
load_dotenv()

url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_KEY")

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

from routes import *


if __name__ == '__main__':
    app.run(debug=True)