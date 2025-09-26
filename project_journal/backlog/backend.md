# Backend Setup

## 📝 Task Overview
* Sprint: #8
* Dates: Month day - Month day (YYYY)
* Status: Not Started
* Story Points: #5
* Dependencies:
  * Database Setup
* Task Description: Setup basic flask application and establish a connection between database and backend
* Expected Outcome: Backend is setup with a basic connection with the database

---

## 🔧 Work

### ✅ Subtasks
1. Install dependencies (flask, flask-cors, python-dotenv, supabase-py, etc.)
2. Set up Flask project structure (app.py, routes.py, models.py, utils/)
3. Create basic test route (/ping) to confirm backend is working
4. Load environment variables using .env (Supabase keys, Notion keys, etc.)
5. Establish connection between Supabase and flask application
6. Add logging middleware to capture request and response data

### 📘 Definition of Done
1. Downloaded dependencies are visually inspected and compared against requirements
2. Ping routing test works
3. Visually inspect project files to ensure code is properly organized (ie no route functions in app.py)
4. Flask app is able launch a local server that is accessible
5. Middleware displays connection between flask and Supabase database using database keys