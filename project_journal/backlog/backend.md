# Backend Setup

## 📝 Task Overview
* Sprint: 6, 7, 8
* Dates: June 24 - September 16 (2025)
* Status: Completed
* Story Points: #5
* Dependencies:
  * Database Setup
* Task Description: Setup basic flask application and establish a connection between database and backend
* Expected Outcome: A basic backend is setup with a basic connection with the database

---

## 🔧 Work

### ✅ Subtasks
1. Install dependencies (flask, flask-cors, python-dotenv, supabase-py, etc.)
2. Set up Flask project structure (app.py, routes.py, utils/)
3. Create basic test route (/health) to confirm backend is working
4. Load environment variables using .env (Supabase keys, Notion keys, etc.)
5. Establish connection between Supabase and flask application
6. Complete /api/stats endpoint for retrieving data, calculating metrics, and then making the metrics accessible
7. Document all current routes and expected structure

### 📘 Definition of Done
1. Downloaded dependencies are visually inspected and compared against requirements
2. Visually inspect project files to ensure code is properly organized (ie no route functions in app.py)
3. Flask app is able launch a local server that is successfully accessed via the Chrome browser
4. Query the database from flask then inspect the Supabase portal and verify that the number of database requests increased
5. Query the database from flask, then retrieve all records from the 'work' relation and print to console. Verify that the same number of records stored on the database were received in the query. Additionally, visually inspect some of the records received and compare to supabase.
6. Curl request /api/health endpoint and verify that the response json message is received + printed in the terminal in the expected format
7. Create unit tests for the utils file used to calculate the statistical metrics. At least 10 test cases are written and all of them pass.
8. Choose a date range, query database for matching entries, and store the results into a .txt file. Save the text file.
9. Use the locally stored data and manually calculate the 4 main statistical metrics with excel. Save the excel file.
10. Add a test case to ensure the manually calculated values match the script calculated values when using the functions from the utils.py file
11. Curl the /api/stats endpoint with the same date range first decided in DoD item 8 and verify that the statistics match the previous results covered in DoD item 10.
12. The flask endpoint /api/stats includes a try/except clause and stores a status indicator for a successful query inside the response message
13. Create an excel file that documents the current API design. Take and store a screenshot of the design.