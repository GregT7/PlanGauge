# run.py
from app import app
from dotenv import load_dotenv
import sys, os

env_path = "../.env"
load_dotenv(dotenv_path=env_path)
if "-t" in sys.argv:
    port = os.getenv("FLASK_TESTING_PORT")
    print(f"🚀 Running Flask in TEST mode on port {port}")
else:
    port = os.getenv("FLASK_DEFAULT_PORT")
    print(f"🚀 Running Flask in NORMAL mode on port {port}")


if __name__ == "__main__":
    app.run(port=port, debug=True)