# Subsystem Integration

## 📝 Task Overview
* Sprint: #8
* Dates: September 1 - September 16 (2025)
* Status: In Progress
* Story Points: #5
* Dependencies:
  * Database Setup
  * Backend Setup
  * Intro to Flask
  * UI/UX Foundation
  * Intro to React

* Task Description: Establish a line of basic communication between subsystems to lay the groundwork for the development of future features (submitting plans, starting up the application)
* Expected Outcome: The following software components are successfully connected with some error logging: 1. React ↔ Flask, 2. Flask ↔ Notion External API, 3. Flask ↔ Supabase (database)

---

## 🔧 Work

### ✅ Subtasks
- Contracts & Config
----- Define health endpoint schemas:
------------ /api/health → { online, ts, version, uptime_s }
------------ /api/db/health → { db: "ok" } or { db: "down" }
------------ /api/notion/health → { notion: "ok" } or { notion: "down" }
----- Add config loader in Flask (config.py) that pulls env vars for DB and Notion, fails fast if missing.
----- Enable CORS in Flask for React origin.
- React ↔ Flask
----- Add API client in React with getHealth().
----- On mount, call /api/health and log JSON.
----- Add retry helper for resilience.
----- Track “Connected to Flask” in state (console only).
- Flask ↔ Database
----- Implement /api/db/health with a trivial read (SELECT 1).
----- Create db_client.py with ping().
----- Write pytest that mocks connection and asserts "ok"/"down".
- Flask ↔ Notion
----- Implement /api/notion/health with a lightweight call (e.g., retrieve current user).
----- Create notion_client.py with ping().
----- Add error mapping (401/403/503 → "down").
----- Write pytest that mocks HTTP call.
- Cross-cutting instrumentation
----- Add request ID middleware in Flask (correlationId).
----- Log correlationId in every request log.
----- Include correlationId only in error responses (not surfaced in UI).

### 📘 Definition of Done
- Health endpoint schemas documented in flask_routes.md.
- Flask config loader rejects missing env vars with clear error.
- CORS enabled for React origin.
- React console logs valid /api/health response with retries.
- /api/db/health returns ok locally; pytest for db_client.ping() passes.
- /api/notion/health returns ok (or down if no token); pytest for notion_client.ping() passes.
- Flask logs include correlationId; error responses include it; UI does not display it.
- Screenshots for connections saved in /project_journal/assets/s8_assets/subsystem_integration_proof.mp4.
------ React <-> Flask
------ Flask <-> Notion
------ Flask <-> Supabase (database)