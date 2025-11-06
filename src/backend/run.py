# run.py
from app import app, DEMO_MODE
from dotenv import load_dotenv
import os



if __name__ == "__main__":
    env_path = "../.env"
    load_dotenv(dotenv_path=env_path)

    if DEMO_MODE:
        port = os.getenv("VITE_FLASK_TESTING_PORT")
        mode = "DEMO"
    else:
        port = os.getenv("VITE_FLASK_DEFAULT_PORT")
        mode = "NORMAL"

    print(f"🚀 Running Flask in {mode} mode on port {port}")
    
    app.run(port=port, debug=True)