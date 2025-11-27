# run.py
from app import app, port



if __name__ == "__main__":
    print(f"🚀 Running Flask on port {port}")
    
    app.run(host="localhost", port=port, debug=True)