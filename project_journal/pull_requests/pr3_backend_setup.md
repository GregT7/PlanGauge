# 🧾 Overview
The purpose of this pull request is to integrate the backend with the frontend and external APIs. The idea here is to create basic scaffolding via a Flask application that exposes API endpoints to facilitate end-to-end system communication. The Flask application can successfully retrieve data from the Supabase cluster (database), calculate statistic metrics using the data, and send the processed information to React. Additionally, React can make HTTP requests for Flask to connect with Notion's external API, covering all API connections. When launching, React now triggers a connection test that will make requests to Flask, Notion, and Supabase to ensure all systems are online. Subsystem statuses are then displayed to the user through shadcn's toaster + sonner functionality that briefly shows notifications as the responses are received by React.

---

## 🛠️ Changes

### ✅ Created New Files
- `__init__.py` - Creates the Flask application and sets it up for cross communication with other APIs
- `routes.py` + tests - Defines the API endpoints for subsystem communication
- `utils.py` + tests - Contains functions that help calculate statistical metrics given a dataset
- `pytest.ini` - Configuration file to help with pytest
- `run.py` - Simple launcher script that starts running the Flask app
- `data_JUN1_JUN30_2025.txt` - Test dataset extracted and cleaned of PII, used for testing the utils stat calculating functions, stored in a json format
- `db_setup.sql` - SQL used to create the database schema on Supabase
- `row_security.sql` - SQL used to enable row level security for all my tables in Supabase
- `connectionTest.js` + tests - Script that tests all of Flask's health api endpoints to ensure all systems are online from the frontend (React)

### 🔧 Modified Files
- `App.jsx` - Added a Toaster or sonner component from Shadcn so that system status messages can be displayed to the user when connectionTest runs
- `TaskContext.jsx` - Implemented a `starting_tasks` parameter that will populate the task table on launch. Originally had it hard coded to load task data from a local file for testing purposes
- `App.test.jsx` - Tested new toaster functionality, connectionTest implementation

---

## 🔗 Context
This covers the following backlog items:
- `Database Setup`: Design & create a database cluster on Supabase and populate it with clean data
- `Intro to Flask`: Learn the basics of Flask with a Coursera course, article reading, and quizzes
- `Backend Setup`: Setup a basic Flask application with some starter routes
- `Subsystem Integration`: Design routes to connect React, Flask, Notion external API, and Supabase

---

## 🧪 Testing

All components were tested using:

- **Testing Libraries**: React Testing Library, pytest
- **Test Runner**: Vitest + Jest

### 🔍 Coverage includes:
- Flask: interaction testing (via curl) - app can handle responses from individual 'health' api endpoints that test connections for flask itself, Notion, and Supabase regardless of errors/exceptions
- Flask: subcomponent integration testing - api endpoint for stats can retrieve data from supabase, calculate accurate statistics, and then package and send a response
- Flask: implementation testing - statistic calculating functions accurately process the data, edge case testing
- React: edge case + error handling - connection test calls during launch and ensures all systems are online without causing errors/exceptions
- React: implementation testing - status updates are 'toasted' to the screen, notifying the user with the correct message

---

## 🎥 Visuals
### System Integration - Launch Process Swimlane Diagram
- Description: Lays out the logical flow across subsystems when initially starting and setting up the application
![startup_swimlane](https://github.com/user-attachments/assets/2d274db5-a496-4276-bcdf-df851c46afab)

### Database - Entity-Relation Diagram
- Description: Visual of the SQL schema design for all tables in the database, image downloaded from Supabase
![ERD](https://github.com/user-attachments/assets/3a40b385-7ad4-4929-91fb-6de27db65087)

### Database - Functional Dependency Diagram
- Description: Describes the relationship between attributes and how they influence each other, shows that the design is in BCNF
![PlanGauge_FDD](https://github.com/user-attachments/assets/d3cbdbe0-68ae-4634-a46d-e63fd7d75ac1)

### Flask - API Documentation
- Description: Shows the different success and error responses for all currently defined api routes
![flask_api_design](https://github.com/user-attachments/assets/0fd96025-77e5-4bfc-a353-5cedbc7fba25)

### Flask - API Testing Demonstration
- Description: Making a live HTTP request to the three health api endpoints testing for connectivity with Flask, Supabase, and Notion using curl
![demo_health](https://github.com/user-attachments/assets/78b1cc52-aa82-4907-a16c-d0aac6331aaf)

### Flask - Requesting Statistics Demonstration
- Description: Making a live HTTP request to flask for data retrieval from Supabase and subsequent statistical processing
![demo_stats](https://github.com/user-attachments/assets/feecd397-fcbc-40d3-9185-c0a9c5084150)

### Flask - Statistics Calculation Verification
- Description: Screenshots from excel displaying the manual calculation results using excel side-by-side with the flask produced results, proving the accuracy of the flask script
![week_calcs](https://github.com/user-attachments/assets/95689e62-580b-4558-bf44-ca5346e4730f)
![day_calcs](https://github.com/user-attachments/assets/b437c320-3042-4899-a013-b43b7991d2fa)
![stats_endpoint_test_pass](https://github.com/user-attachments/assets/d76b19fa-f36f-409e-b4f1-82eba5569583)

### React - Notification System Demonstration
- Description: Showing the toaster/sonner notification system displaying system status results as React tests each API endpoint for Flask, Notion, and Supabase
![demo_connect_test](https://github.com/user-attachments/assets/715ea58e-4326-4e48-8000-666bd15eb6b3)

---

## 👀 Reviewers
I'd appreciate feedback on:

- 🧪 Test coverage
- 🧱 Component or logic design
- ⏱️ Pacing of work
- 🚧 Scope creep analysis
- 🧠 Overall quality — score 1–10 with reasoning

---

## 📂 Branch Info
- **Base branch**: `main`
- **Feature branch**: `backend_setup`

This merges together the `backend_setup` which contains the backbone of the backend with `main` which contains the frontend. This pull request is nearing the end of the project cycle. There are just two features left to implement: `Plans Submission` and `Feedback System`

--- 

# ChatGPT Review - PR #3: Backend Integration

## Overall Review
This PR successfully delivers **subsystem integration** across React ⇄ Flask ⇄ Supabase ⇄ Notion, with proper testing and user-facing notifications. The description is well-structured with clear visuals and file breakdowns. Great milestone!

---

## Strengths
- ✅ Clear artifacts: new/modified file lists, visuals, and test coverage details.  
- ✅ Health-first UX: automatic connection test + toaster feedback is thoughtful.  
- ✅ Security-first mindset: RLS SQL included, schema in BCNF.  

---

## Risks & Recommendations
1. **Error Responses & Status Codes**
   - Standardize JSON error shape across all endpoints.
   - Use 400 for client input errors, 500 for server bugs, 503 for dependency outages.

2. **Health Endpoints**
   - Consider returning `200` always, with per-service statuses in body:
     ```json
     {"flask":{"ok":true},"supabase":{"ok":true},"notion":{"ok":false,"status":503}}
     ```

3. **Timeouts & Retries**
   - Add short (2–5s) timeouts, 1–2 retries with backoff, and a cooldown fuse to avoid spamming external APIs.

4. **CORS & Secrets**
   - Ensure explicit CORS rules, and secrets in `.env` (never in tests).

5. **Stats Endpoint**
   - Define `start`/`end` date params, paginate or limit large queries, and document timezone behavior.

6. **API Versioning**
   - Prefix all routes with `/api/v1/*` to future-proof.

7. **CI/CD**
   - Gate merges on pytest, vitest, linting, and coverage thresholds.

8. **Frontend UX**
   - Group multiple toaster notifications into one update to reduce noise.

---

## Feedback Questions

### 🧪 Test Coverage
- **Good start.** Coverage includes Flask utils, routes, React toaster flow.
- Missing: schema validation for responses, stats date param tests, retry/timeout handling.
- Target: **85%+ coverage** with both happy and error paths.

### 🧱 Component / Logic Design
- ConnectionTest should return a normalized array of service checks, leaving UI to just render.
- Flask routes should stay thin — push logic into a service layer for testability.
- Utils are well-scoped; keep them pure and deterministic.

### ⏱️ Pacing of Work
- Solid pacing; delivered infra + UX + tests in one sprint.
- Risk: large PR breadth. Break into smaller PRs for future features (infra, docs, UX separately).

### 🚧 Scope Creep Analysis
- Stayed mostly aligned with "Subsystem Integration."
- Minor creep with toaster UX + visuals + RLS in same PR. Not harmful, but increases surface area.

### 🧠 Overall Quality
**Score: 8.3/10**  
**Reasoning:** Strong integration, diagrams, and tests. Improvements needed on error consistency, API versioning, circuit-breaking, and PR granularity. With those fixes, quality rises toward 9–9.5/10.

---

## Suggested Next Steps
1. Add error schema + status code rules.  
2. Prefix endpoints with `/api/v1`.  
3. Implement timeouts/retries + circuit breaker.  
4. Add CI gates for lint/test/coverage.  
5. Debounce or group toaster outputs.  
6. Document date/timezone handling in stats API.  