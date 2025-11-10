# run.py
from app import app

if __name__ == "__main__":
    # print(f"🚀 Running Flask in {mode} mode on port {port}")
    
    app.run(port=5000, debug=True)