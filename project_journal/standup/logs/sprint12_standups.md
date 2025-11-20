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
- [x] Remove authentication based code for now
  - [x] Comment out code on frontend and backend
  - [x] Document which scripts are impacted for later updates
- [x] Pause deployment on render and vercel
- [x] Decide on approach for solving supabase loading issue on the backend for demo v full mode
- [x] Frontend: locally serve stats data for demo mode

---

## 🗓️ Standup 6 – Refactoring Continued p3

### 🧾 Overview
* **Date:** Monday, November 10 (2025)
* **Time:** 1:32 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Deployment`
  - `Security Setup`

### 📋 Contents

#### ✅ Planned Agenda
- Paused deployment on vercel + render
- Will continue to fix things until the project is ready to deploy again

#### 📈 Previous Progress
- Frontend serves static mock data for stats retrieval
- Backend now loads sensitive env data/models individually for each api request
- Vercel deployment deleted (couldn't find a pause option)
- Render deployment paused
- Temporarily commented out authorization code

#### 🧱 Problems & Blockers
- `Deployment` and `Security Setup` definition
  - Have overlapping tasks
  - `Security Setup` is not clearly defined
  - Not sure about design implementation -- signing in approach, staying logged in
- Demo mode locally doesn't work: `npm run dev:demo`

#### ⏳ Pending Actions
- [ ] Test local npm run dev / dev:demo login flows.

#### 🔜 Next Steps
- Redefine backlog items
- Fix demo vs full mode issues

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- Is there anything I am missing for today's tasks?

**Answer**:
No, I think you’ve covered everything for today — the main focus is clarifying the overlap between Deployment and Security Setup, defining login and token handling, and preparing for testing both modes before redeploying.

### 🧾 Results

#### 🧠 Discussion Notes
- Reviewed current backend and frontend setup to identify where security and deployment overlap.  
- Decided to clearly separate concerns: deployment handles infrastructure and connectivity, while security covers authentication, authorization, and secret management.  
- Discussed approaches for simulating sign-in locally to streamline testing versus requiring real authentication in production.  
- Noted the need to redefine `Security Setup` backlog items to include session tokens, demo mode restrictions, and updated test coverage across all layers.

#### 🗝️ Key Decisions
- Make `npm run dev` automatically sign me in for convenience when locally testing
- Make `npm run dev:demo` load the normal version where the person is logged out
- Need to add unit, integration, and e2e tests for both deploying and security -- will take a while
- Need to redefine `Security Setup` backlog subtasks + DoD
- Before redeploying, add in + test security features
- Only keep the boot script that is needed for e2e testing with playwright

#### 📌 Action Items
- [x]  Update vite command aliases
  - [x]  `npm run dev` automatically "signs" me in
  - [x]  `npm run dev:demo` loads the default version where the person is logged out
- [x]  Redefine backlog items
  - [x]  `Security Setup` backlog
  - [x]  `Deployment` backlog
- [x]  Add non-sensitive env files for tracking + delete .prod files
- [x]  Research
  - [x]  Session tokens, username + password login, cookies?
  - [x]  Look into creating a new api route `/api/auth/login`
- [x] Delete unnecessary boot scripts
  - [x] Delete boot.js
  - [x] Remove corresponding package.json script commands
 
---

## 🗓️ Standup 7 – Security Setup p1

### 🧾 Overview
* **Date:** Monday, November 17th (2025)
* **Time:** 11;25 PM
* **Attendees:** Self
* **Discussed Backlog Items:**  
  - `Deployment Prep`
  - `Security Setup`
  - `Deployment Launch`

### 📋 Contents

#### ✅ Planned Agenda
- Started implementing security features but am not super knowledgeable
- Separated deployment into two separate backlog items to make things more palatable
- Want to append new user stories used to design the `Security Setup` backlog item subtasks
- Almost done with `Deployment Prep`

#### 📈 Previous Progress
- Separated `Deployment` into `Deployment Prep` and `Deployment Launch` to make the work more approachable
  - `Deployment Prep` pretty much was just `Deployment` but renamed
  - `Deployment Launch` will encompass the logistics around actually launching the product on vercel and render for public use
- Vibe coded a lot of code that I still need to review on the backend
  - `src/backend/app/auth_utils.py` -- utility functions used for defining security routes
  - `src/backend/app/clients.py` -- creates temporary supabase object in python and headers for notion api requests to help limit access to other routes
  - `src/backend/app/routes.py` -- added login and logout routes and then tested them using curl
  - `db_setup.sql` -- created new sql tables for app_user (app users) and sessions
  - `row_security.sql` -- added lines to add security to the two newly created tables
  - `src/backend/app/cj.txt` -- stores cookies, not entirely sure how this works
  - `src/backend/.env` -- appended new variables for cookie + security management
  - `src/frontend/.env` -- simplified routing variables
  - `src/frontend/package.json` -- deleted script aliases linking boot.js script
  - `src/frontend/e2e` -- updated e2e tests to account for all the major changes and to ensure they still all pass
  - `src/frontend/src/utils/config.js` -- creates an object that determines and stores the api routes depending on the current mode (development or prod)
  - `src/frontend/src/utils/connectionTest.js` -- uses the new config object passed as a parameter
  - `src/frontend/src/utils/test-boot.js` -- updated some env variable access after changes were made to the env file
  - `src/frontend/src/contexts/ProcessingContext.jsx` -- subscribes to the new config context and uses the config object to determine whether to serve mock data or retrieve real data
  - `src/frontend/src/contexts/ConfigContext.jsx` -- created a config context to easily pass in a config object without prop drilling to other subcomponents of the app to streamline frontend/backend connections
  - `src/frontend/src/tests` -- updated existing tests so they all pass
- Ended up just deleting the complicated port swap configurations for testing vs local development -- not worth the headache
  - Also deleted the boot.js script -- not worth managing this, I'll just launch the servers independently when working locally
  - Updated all related files that depended/expected a specific port to be called on frontend and the backend

#### 🧱 Problems & Blockers
- Don't fully understand the newly code generated -- need to potentially make quizzes for the new content
  - files: `auth_utils.py`, `clients.py`, `db_setup.sql`, `routes.py`, `cj.txt`
  - Appending on new quizzes onto backlog items will just further the scope and time for completion so I will need to consider this
- It appears the vercel deployment only temporarily deleted and now is online -- not great...
- Not sure what files were modified from previous attempts at token management
- Testing all these new features is going to take a long time if I do it thoroughly

#### ⏳ Pending Actions
- Completing the review quizzes

#### 🔜 Next Steps
- Review newly created files to gain a better understanding
  - files: `auth_utils.py`, `clients.py`, `db_setup.sql`, `routes.py`, `cj.txt`
- Take both the quizzes generated for `Deployment Setup`
- Create sessions table with user_id, created_at, expires_at, revoked, last_seen.
- Append security user stories to user_stories.md document
- Implement cookie-based session system (pg_sid):
  - HttpOnly, Secure, SameSite=Lax cookie.
  - Sliding TTL refresh (extend expires_at on activity).

#### ❓ Question 1
- What do you think is the biggest whole in my security design? Would my app be easy to hack?

**Answer:** Your biggest gap right now is **incomplete and unvalidated session management**:

- No real enforcement of session expiration or TTL refresh  
- Session cookie can be set but isn't required for protected routes  
- No route protection middleware (e.g., @require_auth) guarding API endpoints  
- No verification that the cookie you receive is tied to a valid, unrevoked session  
- No hashing or secure comparison of session IDs in queries  
- No rate limiting, brute-force prevention, or lockout protection  
- Row-level security is incomplete without a strong session binding

Right now, **yes — an attacker could make requests freely** because:

- Nothing verifies user identity before accessing /api routes  
- Missing token/session validation means any request looks “authenticated”  
- No access control around plan-submission, stats retrieval, health checks, etc.

The good news: this is very normal at this stage. You’ve laid the foundation — you now need to connect the parts (session creation → cookie → middleware → route protection → revocation + TTL refresh).

### 🧾 Results

#### 🧠 Discussion Notes
- Realized that my deployment and security systems are tightly coupled, so splitting them reduced cognitive load.
- Security setup is turning out to be more complex than expected — cookie flags, session lifetime logic, route protection, and Supabase RLS all need to work together.
- A lot of the backend files evolved organically (“vibe coding”), so reviewing them is essential before continuing.
- I need to create clear user stories to keep the security backlog scope defined, otherwise the task will balloon.
- Testing will likely take longer than implementation because many new flows were introduced (login, logout, cookie handling, session DB interactions).

#### 🗝️ Key Decisions
- Split Deployment into two items: `Deployment Prep` (refactor, env cleanup, port simplification) and `Deployment Launch` (actual hosting).
- Use cookie-based sessions instead of tokens: for the MVP security model.
- Adopt HttpOnly + Secure + SameSite=Lax cookies as the standard for session cookies.
- Store sessions in Supabase: rather than in-memory — enables revocation, TTL, auditing, and logout.
- Remove port-swap complexity: to reduce mental overhead and break fewer tests.
- Frontend loads config at startup using a context provider: so backend mode changes don’t require prop-drilling.

#### 📌 Action Items
- [x] Review all new backend files (`auth_utils.py`, `clients.py`, `routes.py`, `db_setup.sql`, `cj.txt`)
- [x] Complete both quizzes for `Deployment Setup`
- [x] Finalize `session` table design (revocation + TTL + last_seen)
- [x] Add new user stories to `user_stories.md` under `Security Setup`
- [x] Implement a middleware decorator (@require_auth) to guard protected routes
- [x] Implement sliding TTL refresh logic
- [x] Clean out unused cookie/token files from early experiments
- [ ] Begin writing tests for login, logout, and session expiration behavior

---

## 🗓️ Standup 8 – Security Setup p2

### 🧾 Overview
* **Date:** Thursday, November 20th (2025)
* **Time:** 4:32 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Security Setup`
  - `Security Design`
  - `Penetration Check`

### 📋 Contents

#### ✅ Planned Agenda
- Created two additional backlog items to address gaps in security management
- Finished server-side session implementation
- Ready to start working on temporary invite links

#### 📈 Previous Progress
- Created `Security Design` for designing security diagrams to help me make sense of the changes and ensure the code is maintainable
- Created `Penetration Check` to conduct a basic penetration test after deploying my project to see if there are any glaring issues or critical updates needed so my app is more difficult to mess with
- Reviewed previously written code from ChatGPT to gain a better understanding
- Appended new user stories to reflect security wishes from the perspective of a user, developer, and tester
- Updated `session` sql table on Supabase and in the initialization sql file
- Added and tested @require_auth decorator to sensitive routes with curl
- Completed two quizzes, passing one and failing one
- Generated an additional quiz covering more authorization topics/questions
- Moved security quizzes to `Security Design` backlog item

#### 🧱 Problems & Blockers
- All code for security is being written on the main branch
- Generated an additional quiz which increased scope creep -- should add new quizzes to the `Security Design` backlog item

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- Update Notion: 

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- Did I not address all of the previous concerns mentioned in the last ChatGPT question regarding security (refer to yesterday's queries please)

**Answer:**  
Yes — you addressed all previous concerns except one: *you still need to move all new security logic off the main branch.* Everything else (session TTL refresh, @require_auth decorator, SameSite guidance, cookie security flags, schema updates, and testability) has been implemented correctly.


### 🧾 Results

#### 🧠 Discussion Notes
- Adding two new backlog items (`Security Design`, `Penetration Check`) clarified the scope and prevented further creep  
- Decided to treat quizzes, diagrams, audits, and penetration tests as *separate tasks* rather than bundled into `Security Setup`  
- Realized that working directly on main is dangerous for long-lived features — security changes especially need isolation  
- The session system is now robust and better understood, especially sliding TTL and the decorator chain  
- Temporary invite links are the next logical milestone and will complete the authentication flow for “guest” access

#### 🗝️ Key Decisions
- Create a separate branch for security development where I will finish a pull request with documentation  
- Also update documentation at the end of security development: requirement specifications, design specifications, and README  
- Assign quizzes and diagrams to `Security Design` to avoid inflating the scope of `Security Setup`  
- Treat penetration testing after deployment as a separate backlog item

#### 📌 Action Items
- [ ] Create `security-setup` feature branch  
- [ ] Move existing security commits from main into the new feature branch  
- [ ] Implement invites table (`token_hash`, `role`, `expires_at`, `used`)  
- [ ] Add `/auth/accept-invite` endpoint logic (validate → mark used → create session)  
- [ ] Write a small script for generating invite links (24h / 7-day options)

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