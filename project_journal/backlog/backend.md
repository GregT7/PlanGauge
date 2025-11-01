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
- [x] Install dependencies (flask, flask-cors, python-dotenv, supabase-py, etc.)
- [x] Set up Flask project structure (app.py, routes.py, utils/)
- [x] Create basic test route (/health) to confirm backend is working
- [x] Load environment variables using .env (Supabase keys, Notion keys, etc.)
- [x] Establish connection between Supabase and flask application
- [x] Complete /api/stats endpoint for retrieving data, calculating metrics, and then making the metrics accessible
- [x] Document all current routes and expected structure

### 📘 Definition of Done
- [x] Downloaded dependencies are visually inspected and compared against requirements
- [x] Visually inspect project files to ensure code is properly organized (ie no route functions in app.py)
- [x] Flask app is able launch a local server that is successfully accessed via the Chrome browser
- [x] Query the database from flask then inspect the Supabase portal and verify that the number of database requests increased
- [x] Query the database from flask, then retrieve all records from the 'work' relation and print to console. Verify that the same number of records stored on the database were received in the query. Additionally, visually inspect some of the records received and compare to supabase.
- [x] Curl request /api/health endpoint and verify that the response json message is received + printed in the terminal in the expected format
- [x] Create unit tests for the utils file used to calculate the statistical metrics. At least - [ ] test cases are written and all of them pass.
- [x] Choose a date range, query database for matching entries, and store the results into a .txt file. Save the text file.
- [x] Use the locally stored data and manually calculate the 4 main statistical metrics with excel. Save the excel file.
- [x] Add a test case to ensure the manually calculated values match the script calculated values when using the functions from the utils.py file
- [x] Curl the /api/stats endpoint with the same date range first decided in DoD item 8 and verify that the statistics match the previous results covered in DoD item 10.
- [x] The flask endpoint /api/stats includes a try/except clause and stores a status indicator for a successful query inside the response message
- [x] Create an excel file that documents the current API design. Take and store a screenshot of the design.