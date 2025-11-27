# __init__.py
import os, sys
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

path = find_dotenv(filename=".env")
load_dotenv(path)

app = Flask(__name__)

# Comma-separated list in env
allowed_origins = [o.strip() for o in os.getenv("ALLOWED_ORIGINS", "").split(",") if o.strip()]
CORS(
    app,
    resources={
        r"/api/*":  {"origins": allowed_origins},
        r"/auth/*": {"origins": allowed_origins},
    },
    supports_credentials=True
)

port = os.getenv("FLASK_ROUTE")[-4:]
from . import routes  # keep last