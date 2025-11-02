# Sprint 12 - Secure Deployment!

## 📝 Overview
* Dates: November 1 - November 24 (2025)
* Status: In Progress
* Backlog Progress: #0 backlogs completed / #2 backlogs assigned ( X% )
* Tasks Assigned:
    * `Deployment`
    * `Security Setup`
* Goal: Deploy the PlanGauge application using Vercel, Docker, and Fly.io with secure, clearly separated demo and production environments.
* Objective: Create a secure dual-environment deployment where demo mode runs safely without secrets or live data, and production mode allows only the owner to access real APIs and databases through protected routes.
* Milestones:
    1. Flask runs on port 8080 and builds successfully with Docker.
    2. Fly.io demo deployed (DEMO_MODE=true, no secrets) and prod deployed (DEMO_MODE=false, secrets set).
    3. Vercel demo and prod builds deployed and linked to correct APIs.
    4. Backend enforces mode separation; demo returns mock data, prod requires owner token.
    5. CORS restricted to matching frontend origins.
    6. Secrets verified absent from Git, logs, and frontend bundles.
    7. Demo cannot alter production data; DB backup/export confirmed.
    8. Curl tests: demo routes return 403/mock, prod routes require token.
    9. Containers and hosting confirmed secure (no open ports or persistent secrets).
    10. Full end-to-end test confirms stable, secure behavior across demo and prod.

--- 

## 🔍 Review
* Major Feedback: insert text here...
* Retrospective Notes: insert text here...


