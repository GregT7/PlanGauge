# __init__.py
import os, sys
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

if "-test" in sys.argv:
    path = find_dotenv(filename=".env.testing")
    print("test")
elif "-prod" in sys.argv:
    path = find_dotenv(filename=".env.production")
    print("prod")
else:
    path = find_dotenv(filename=".env.development")

load_dotenv(path)

app = Flask(__name__)

# Comma-separated list in env
allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]

CORS(app, resources={r"/api/*": {"origins": allowed_origins}}, supports_credentials=False)

from . import routes  # keep last
