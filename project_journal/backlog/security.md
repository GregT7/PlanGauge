# Security Setup

## 📝 Task Overview
* Sprint: #12
* Dates: November 1 - Month day (2025)
* Status: In Progress
* Story Points: #7
* Dependencies:
  * `Deployment`
* Task Description: Strengthen the application’s overall security posture by safeguarding API keys, databases, and external integrations from unauthorized access or misuse. Establish clear boundaries between demo and production environments while ensuring users can safely interact with the demo mode.
* Expected Outcome: The deployed application resists unauthorized access, data corruption, and resource abuse. Sensitive information remains protected, demo mode operates safely with no external dependencies, and the owner retains full secure access to production features.

---

## 🔧 Work

### ✅ Subtasks
#### **1) Secrets & Environment Protection**
- [ ] Store all credentials and tokens in platform-managed secret stores (never in Git or frontend).
- [ ] Separate `.env` files for each environment (`.env.demo`, `.env.prod`, `.env.local`) and confirm they are Git-ignored.
- [ ] Ensure demo environments contain no real secrets or external API credentials.
- [ ] Rotate production keys regularly and verify no sensitive info is printed or logged.

#### **2) Access Control & Mode Separation**
- [ ] Add a Flask environment flag `DEMO_MODE` to control app behavior server-side.
- [ ] Disable Notion, database, and predictive routes entirely when `DEMO_MODE=true`.
- [ ] Require an **owner token** or equivalent secret header for protected routes when `DEMO_MODE=false`.
- [ ] Create two isolated deployments (e.g., `demo.planGauge.com` and `app.planGauge.com`) with separate environment configs.
- [ ] Verify CORS rules restrict each deployment to its own origin.

#### **3) Network & API Safety**
- [ ] Apply strict CORS rules to limit requests to known origins.
- [ ] Add request validation and rate limits for all publicly exposed endpoints.
- [ ] Hide internal routes (health checks, debug logs) in demo or production deployments.
- [ ] Deny unauthorized `curl` or external API access in demo deployments.

#### **4) Database & Data Integrity**
- [ ] Use least-privilege credentials and separate demo/test databases from production.
- [ ] Confirm no data mutation occurs when `DEMO_MODE=true`.
- [ ] Establish a simple backup or export process for production data.
- [ ] Test isolation by attempting to access production data from demo deployment (should fail).

#### **5) Deployment & Container Security**
- [ ] Configure Dockerfile to use a non-root user and minimal base image.
- [ ] Assign separate environment secrets to Fly.io and Vercel for demo and production.
- [ ] Confirm demo containers build and run without loading secret files.
- [ ] Audit deployed containers for open ports, leaked logs, or unused routes.

#### **6) Monitoring & Resilience**
- [ ] Log failed authorization and rate-limit events to track potential abuse.
- [ ] Add basic monitoring for resource usage (requests, DB calls, errors).
- [ ] Periodically verify that secrets and tokens align with intended environments.
- [ ] Test recovery routine (restore from backup or export).

#### **7) Demo Mode Safety**
- [ ] Serve mock JSON responses for all demo endpoints instead of real queries.
- [ ] Verify frontend and backend remain fully functional offline in demo mode.
- [ ] Curl test: direct API calls to demo backend return `403` or safe mock data.
- [ ] Confirm that switching between demo and production deployments does not require code changes.

### 📘 Definition of Done
- [ ] Flask correctly distinguishes between `DEMO_MODE=true` and `DEMO_MODE=false`.  
- [ ] Demo deployment contains **no secrets** and returns mock data only.  
- [ ] Production deployment requires a valid **owner token** for protected routes.  
- [ ] Demo routes return `403` or dummy responses when accessed externally (e.g., via `curl`).  
- [ ] Backend secrets verified to be excluded from Git, logs, and client bundles.  
- [ ] CORS policies restrict requests to trusted origins for each environment.  
- [ ] Database connections are isolated and backed up; demo cannot modify production data.  
- [ ] Docker and hosting environments confirmed secure (no open ports, no persistent secrets).  
- [ ] Manual end-to-end test verifies environment swap behaves correctly and securely.