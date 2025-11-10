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
- Use Docker Compose only for local development; deploy with a single Dockerfile.
- Evaluate Render first as the preferred free host for deployment testing.

#### 📌 Action Items
- [x] Update Deployment backlog subtasks to include Render/Railway alternatives.
- [x] Write a short quiz for Docker and Gunicorn concepts.
- [x] Verify Docker container responds at /api/health using the new env file.
- [x] Deploy to vercel
- [x] Deploy to render with docker container

---

## 🗓️ Standup 3 – Connect Frontend & Backend Deployment

### 🧾 Overview
* **Date:** Friday, November 7th (2025)
* **Time:** 5:07 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`

### 📋 Contents

#### ✅ Planned Agenda
- Deployed both the backend & frontend
- Design issues with full vs demo mode -- very confusing implementation
- Added some last minute security changes: added a local token that is required

#### 📈 Previous Progress
- Deployed to render
  - Docker container linked & works
  - Successfully curled endpoints
  - Added security change: requires a token in the request header
- Deployed to vercel

#### 🧱 Problems & Blockers
- e2e testing script no longer works
- some frontend unit + integration tests fail now
- full vs demo mode problems
  - confusing scripts
  - confusing .env use
- frontend and backend are not connected
- will need to update the readme

#### ⏳ Pending Actions
- connecting frontend and backend deployment

#### 🔜 Next Steps
- Connect frontend with backend

### 🧾 Results

#### 🧠 Discussion Notes
- The separation between full access (Supabase + Notion enabled) and partial/demo access (mock data only) caused confusion in how .env files and Docker environment variables are handled.
- The Flask app dynamically switches based on DEMO_MODE, but React’s environment loading wasn’t aligned, breaking the test and build scripts.
- The new local token header for backend endpoints successfully improves security but requires frontend updates to inject the token at runtime.
- Render deployment was successful — all Flask routes (including /api/health) return expected responses.
- Vercel build succeeded, but environment variables for demo vs full deployment need clearer separation.

#### 🗝️ Key Decisions
- Postpone readme updates
- Need to list out all functions that need to be refactored (too confusing, doing too much)

#### 📌 Action Items
- [x] Validate cross-origin access between Render backend and Vercel frontend.
- [x] List out all files impacted/related to env management, demo vs full mode, and confusing scripts that do too much

---

## 🗓️ Standup 4 – Refactoring Continued p1

### 🧾 Overview
* **Date:** Saturday, November 8th (2025)
* **Time:** 1:38 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`

### 📋 Contents

#### ✅ Planned Agenda
- Connected render with vercel albeit with a lot of issues
- Code is confusing, tech debt is starting to accumulate, need to fix things now
- Will continue working on refactoring things, although it's a bit overwhelming. There are so many changes that need to be implemented.

#### 📈 Previous Progress
- Connected render with vercel
- Listed out all the impacted files related to env management, env vs demo mode

#### 🧱 Problems & Blockers
- persistentFetch is sometimes used and sometimes not, need to decide on when and where to use it if at all
  - may want to replace with some type of fetch that wakes up render
- application is very insecure, tokens are loaded on as VITE environment variables

#### ⏳ Pending Actions
- env + script management refactoring

#### 🔜 Next Steps
- Define & use a context api object for configuration management
- Look into inconsistent persistentFetch usage & consider an awake fetch function for accessing render
- Create local env files

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- Is there anything I am missing here?

**Answer:**
You’re not missing anything major — focus next on refactoring configuration and fetch handling before continuing deployment.

### 🧾 Results

#### 🧠 Discussion Notes
- Current setup mixes frontend and backend env management, exposing sensitive VITE_ tokens — must be refactored.
- Will implement a config singleton + Context API to replace IS_DEMO prop drilling and unify config handling.
- Need a standardized fetch wrapper to replace inconsistent persistentFetch usage and wake Render when idle.
- Demo routes should move frontend-side with mock data to simplify deployment.
- Will standardize .env files (dev, test, prod) for predictable behavior across environments.

#### 🗝️ Key Decisions
- Create a lingering problems toggle under sprint 12's Notion page
  - Append readme updates here, postpone this until design is more complete
- Stop prop drilling with IS_DEMO, instead use a configuration singleton and context api
- Don't store tokens as environment variables, especially with `VITE_` prefix because these are all exposed to the browser
- Create a script that centralizes url/path creation logic (ie returns `/localhost:5173/api/health`)
- Remove the demo api routes, just serve example/mock data from the frontend
- For managing demo vs test vs prod modes, rely on vite flags (`--mode`), env variables are fine for default values on launch but not good for runtime execution
- .env management
  - local: separate into development, testing, and production
  - deployment: use only one set of env variables (one file)

#### 📌 Action Items
- [x] Use a config singleton + context api instead of prop drilling with 
  - [x] Define a config object
  - [x] Create config context with config object
  - [x] Wrap app with context
  - [x] use context in relevant files
- [ ] Fetch management
  - [ ] Create a function that attaches headers with tokens
  - [ ] iron out inconsistent use of persistentFetch, timedFetch and this new fetch function
- [x] Create local env files on the frontend: dev, demo, test, prod

---

## 🗓️ Standup 5 – Refactoring Continued p2

### 🧾 Overview
* **Date:** Sunday, November 9th (2025)
* **Time:** 5:53 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`
  - `Security Setup`

### 📋 Contents

#### ✅ Planned Agenda
- Worked on refactoring code to get rid of hard coded routes & to support demo vs full mode
  - Still needs a lot of work & is very confusing
- Not going to commit anything to GitHub, may need to restart at some point

#### 📈 Previous Progress
- Implemented config script with a context handler for easy route management
  - removed IS_DEMO prop drilling and replaced with config
- Populated frontend and backend .env files again
- Started working on getting the backend working again

#### 🧱 Problems & Blockers
- Backend loads supabase client only if not in demo mode
  - This causes runtime errors because other scripts depend on the supabase object
  - Also want to dynamically grant access to supabase object- demo mode: no access, full mode: access
- Backend doesn't properly load in the right .env files
- Learning that it's difficult to make changes to code that is heavily interconnected

#### ⏳ Pending Actions
- Refactoring env management & demo/full mode implementation
- Creating a header appending fetch script

#### 🔜 Next Steps
- Remove authentication based code for now
  - Comment out code on frontend and backend
  - Document which scripts are impacted for later updates
- Pause deployment on render and vercel
- Decide on approach for solving supabase loading issue on the backend for demo v full mode

#### ❓ Question 1
- How would you go about changing/refactoring code that is complicated and heavily connected with each other?

### 🧾 Results

#### 🧠 Discussion Notes
- Refactor risk is coming from module-level side effects (env loads, conditional SDK imports) and cross-module Supabase coupling.
- A Service Layer + Null Object will stop demo-mode crashes and let routes remain identical while the data source swaps under them.
- Consolidating env loading removes “which .env won?” ambiguity and makes bug reports reproducible.
- Short-term removal of auth reduces scope so env/mode refactor can land cleanly.

#### 🗝️ Key Decisions
- Remove authentication based code for now, deter until local implementation works again
- Pause deployment for now
- Finish these tasks before redeploying
  - Get e2e testing working again
  - All tests cases pass (including playwright e2e tests)
  - Get basic authentication working locally

#### 📌 Action Items
- [ ] Remove authentication based code for now
  - [ ] Comment out code on frontend and backend
  - [ ] Document which scripts are impacted for later updates
- [ ] Pause deployment on render and vercel
- [ ] Decide on approach for solving supabase loading issue on the backend for demo v full mode
- [ ] Frontend: locally serve stats data for demo mode

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