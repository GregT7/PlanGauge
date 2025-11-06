# 📅 Sprint #12 – Secure Deployment!
* **Dates:** November 2nd (2025) - November 24th (2025)

---

## 🗓️ Standup 1 – Wrapping Up Sprint 11

### 🧾 Overview
* **Date:** Wednesday, November 5th (2025)
* **Time:** 3:44 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`
  - `Security Setup`

### 📋 Contents

#### ✅ Planned Agenda
- Finished sprint 11 & final backlog items, rough project is complete
- Wrap up retrospective for sprint 11
- Start deploying project

#### 📈 Previous Progress
- Completed init_records.sql script for populating database for demo mode
- Finalized readme
- Created `Deployment` and `Security Setup` backlog definition
- Centralized .env file storage and replaced all hard coded urls

#### 🧱 Problems & Blockers
- Sprint 11 documentation is seeping into sprint 12
- Deployment will be vulnerable if security steps aren't taken before making it public
- Don't fully understand the subtasks defined for backend setup for `Deployment`
- Flask dev server is currently going to be served for production which is not ideal

#### ⏳ Pending Actions
- Sprint 11 retrospective

#### 🔜 Next Steps
- Finish sprint 11
  - Retrospective
  - Sprint 11: retro section
- Start `Deployment`
  - Clarify backend subtasks more
  - Install gunicorn + add to requirements.txt
  - Figure out gunicorn launch server

**Answer:**  
You may be assuming that simply running Flask with Gunicorn will be enough for production readiness. In reality, additional steps like configuring environment variables, using proper reverse proxies, and limiting access to demo data are crucial. Another incorrect assumption could be that deployment and security can be treated as sequential rather than integrated steps—security should guide how deployment is set up, not follow it.

### 🧾 Results

#### 🧠 Discussion Notes
- The project has officially reached a functional MVP state aligning with the Minimum Viable Specification (MVS).  
- Deployment preparation marks a transition from development to operational readiness.  
- Noted that backend production setup (Gunicorn + Docker + Fly.io) must be refined to ensure maintainability and security.  
- Security configuration (env variables, demo vs production mode isolation) will directly impact how safe public hosting is.  

#### 🗝️ Key Decisions
- Use **Gunicorn** as the production server for Flask instead of the dev server.  
- Proceed with **Docker + Fly.io** for backend deployment and **Vercel** for frontend.  
- Maintain `.env` separation for demo and production environments.  
- Integrate `Security Setup` backlog tasks *before* exposing endpoints publicly.  

#### 📌 Action Items
- [x] Complete Sprint 11 retrospective and finalize sprint documentation.  
- [x] Add `gunicorn` to `requirements.txt` and test local build.  
- [x] Create `Dockerfile` exposing port 8080 and verify Flask app runs with `gunicorn app:app -b 0.0.0.0:8080`.  
- [ ] Begin Fly.io deployment and verify `/api/health` endpoint.  

---

## 🗓️ Standup 2 – Learning Docker

### 🧾 Overview
* **Date:** Thursday, November 6th (2025)
* **Time:** 2:16 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`

### 📋 Contents

#### ✅ Planned Agenda
- Downloaded & setup docker but don't have a great understanding of the technology
- Got gunicorn to work in the docker container but also confused about this
- Need to setup Fly.io

#### 📈 Previous Progress
- Setup docker
  - Created docker-compose.yaml, .dockerignore and Dockerfile
  - Downloaded Docker Desktop
  - Was able to curl a health endpoint while container was live
  - Completed 3 lessons given in Docker Desktop, learning some of the basics
- Looked into Fly.io more and it seems like it will cost a non-zero amount per month and requires a credit card to use at all

#### 🧱 Problems & Blockers
- Don't really understand gunnicorn or docker
- Don't understand how to integrate docker with backend deployment setup
- health test connections only worked when the .env file variables were changed, may want to consider creating deploy variables
- Not sure if I want to use Fly.io, want a completely free alternative, my website wont have a lot of traffic

#### ⏳ Pending Actions
- Backend deployment

#### 🔜 Next Steps
- Create a quiz for reviewing concepts and update `Deployment` subtasks
  - Add some questions for docker and gunnicorn
- Look more into Fly.io alternatives
- Add deployment variables to the env file
- See if I can modify the gunnicorn launch command to include a custom deploy flag

#### ❓ Question 1
- What do you recommend for solving each item in the problems section? Answer briefly please.

**Answer:**  
- Gunicorn: Use it as your Flask app’s production server; keep the command gunicorn app:app -b 0.0.0.0:8080 in Docker to handle multiple concurrent requests efficiently.
- Docker: Think of Docker as a lightweight, isolated environment for your app. Focus on learning how the Dockerfile builds an image and how docker-compose.yaml defines how it runs.
- Docker + Backend Integration: Your backend runs inside the container. You’ll deploy this container (image) to a platform like Fly.io, Render, or Railway that hosts it and exposes port 8080.
- Health Tests & Env Files: Create separate environment files — .env.local for dev, .env.deploy for deployment. Use Docker’s --env-file flag to load the right one when building or running.
- Fly.io Alternatives: Try Render or Railway for free Docker-based hosting. Both require no credit card and are easier to configure for small apps.
### 🧾 Results

#### 🧠 Discussion Notes
- Clarified how Gunicorn works as a production WSGI server that pairs with Flask.
- Reviewed Docker’s role as an isolated environment where the backend runs independently of the host system.
- Understood how deployment services (Fly.io, Render, Railway) simply run the same container image you build locally.
- Identified the need for environment-specific .env files to simplify testing, local, and deploy modes.
- Found Fly.io requires a credit card, so alternative hosts (Render/Railway) may be more practical for a free deployment.

#### 🗝️ Key Decisions
- Keep Gunicorn as the app’s production entry point.
- Separate .env.local and .env.deploy for environment configuration.
- Use Docker Compose only for local development; deploy with a single Dockerfile.
- Evaluate Render first as the preferred free host for deployment testing.

#### 📌 Action Items
- [ ] Create .env.deploy file with only essential variables.
- [ ] Test running the app locally using --env-file .env.deploy.
- [ ] Update Deployment backlog subtasks to include Render/Railway alternatives.
- [ ] Write a short quiz for Docker and Gunicorn concepts.
- [ ] Verify Docker container responds at /api/health using the new env file.

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---