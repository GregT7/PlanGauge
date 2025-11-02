# Deployment

## 📝 Task Overview
* Sprint: #12
* Dates: November 1st - Month day (2025)
* Status: In Progress
* Story Points: #7
* Dependencies:
  * `Feedback System`
  * `Plan Submission`
  * `Subsystem Integration`
  * `End-to-End Testing`
  * `Presentation Readiness`
* Task Description: Deploy application using vercel, docker, and Fly.io.
* Expected Outcome: The application can be accessed and used from visiting a url with some basic security measures in place

---

## 🔧 Work

### ✅ Subtasks
#### Backend Setup
- [ ] Backend (Flask) — Docker + Fly.io
  - [ ] Prep
    - [ ] Ensure a single start command (e.g., python run.py or gunicorn app:app -b 0.0.0.0:8080).
    - [ ] Use container port 8080.
    - [ ] Move secrets to environment variables (no secrets in code).
  - [ ] Dockerize (Local)
    - [ ] Create Dockerfile (Python base, install deps, expose 8080, start app).
    - [ ] Add .dockerignore (venv/, __pycache__/, *.pyc, etc.).
    - [ ] Build locally
    - [ ] Run locally:
    - [ ] Verify health: open http://localhost:8080/api/health.
  - [ ] Fly.io Setup
    - [ ] Log in:
    - [ ] Initialize app (in backend folder):
    - [ ] Set secrets:
    - [ ] Deploy:
    - [ ] Verify health:
    - [ ] Record public API base URL (e.g., https://<app>.fly.dev).

#### Frontend Setup
- [ ] Frontend (React/Vite) — Vercel
  - [ ] Prep
    - [ ] Read backend URL from import.meta.env.VITE_API_URL.
    - [ ] Local .env:
    - [ ] Confirm build:
  - [ ] Vercel Deployment
    - [ ] Create Vercel project from frontend repo/folder.
    - [ ] Use preset “Vite + React” (auto-detected is fine).
    - [ ] Add env var in Vercel:
    - [ ] Deploy (Vercel builds and hosts).

#### Integration
- [ ] Connect Backend & Frontend
  - [ ] CORS + Integration
    - [ ] Allow CORS for your Vercel domain in the backend.
    - [ ] Redeploy backend if CORS changed.
    - [ ] Open Vercel site and verify it reaches the Fly.io API.

#### Basic Testing
- [ ] Sanity Checks & Maintenance
  - [ ] End-to-End Verification
    - [ ] Frontend loads on Vercel.
    - [ ] API calls return 200 from https://<app>.fly.dev/....
    - [ ] Core routes (health / stats / submit) respond as expected.
  - [ ] Basic Troubleshooting
    - [ ] If requests fail: confirm VITE_API_URL in Vercel and CORS on backend.
    - [ ] Check backend logs
    - [ ] Redeploy if needed

#### Documentation Update
- [ ] Add user stories
- [ ] Add new requirements to reqs.md
- [ ] Readme
  - [ ] Update architecture diagram
  - [ ] Update installation & usage instructions

### 📘 Definition of Done
- [ ] Backend Setup
  - [ ] flask app launches on port 8080 from new terminal command
  - [ ] docker installation & setup
  - [ ] fly.io installation & setup
- [ ] Frontend Setup - Deploy vercel build
- [ ] Integration - Fly.io connects to vercel
- [ ] Basic testing - Frontend loads on Vercel, API calls return 200, Core routes respond as expected