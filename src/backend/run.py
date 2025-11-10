# run.py
from app import app, port, mode

if __name__ == "__main__":
    print(f"🚀 Running Flask in {mode} mode on port {port}")
    
    app.run(port=port, debug=True)