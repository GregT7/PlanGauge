# 📅 Sprint #8 – Gluing Everything Together
* **Dates:** September 1st - September 16th (2025)

---

## 🗓️ Standup 1 – Splitting Up Scope-creeped Backlog Item

### 🧾 Overview
* **Date:** Wednesday, September 3rd (2025)  
* **Time:** 11:30 AM  
* **Attendees:** Solo  
* **Discussed Backlog Items:**  
  - Intro to Flask  
  - Backend Setup  
  - Subsystem Integration  

### 📋 Contents

#### ✅ Planned Agenda
- Major backlog item changes: split up *Subsystem Integration* into multiple smaller backlog items and redefined the original item.  
  - **New Items:** Plan Submission, UI Alerts, App Startup  
- Getting close to finishing *Intro to Flask* and *Backend Setup*.  
- Decided on making this sprint 2 weeks.  

#### 📈 Previous Progress
- Completed Sprint 7 documentation and initial planning phase for Sprint 8.  
- Updated *Intro to Flask* backlog item: added a quiz, removed summary review and Coursera questions requirement.  
- Created two swimlane diagrams for:
  1. Launching the application  
  2. Submitting plan data  
- Created new quiz covering Flask basics.  
- Took *web_flask_quiz* and scored 37% → review required.  
- Read article on Flask API design best practices; added related questions to *web_flask_quiz*.  
- Saved Supabase SQL schema + RLS setup into `/src/database` for documentation and transparency.  

#### 🧱 Problems & Blockers
- Subsystem Integration subtasks and definition of done are still unclear.  
- Documentation sync issues between Notion and GitHub `.md` files.  
- `/api/stats` endpoint still unfinished.  
- Haven’t hosted in-person standups yet → timeline needs updating.  
- Feature branch name `backend_setup` is outdated.  

#### ⏳ Pending Actions
- Finish `/api/stats` endpoint.  
- Complete both *Intro to Flask* quizzes with ≥70%.  
- Hold an in-person standup session.  

#### 🔜 Next Steps
- Add reminders in Notion’s Sprint 8 planning page for:  
  - Fixing documentation sync issues  
  - Renaming branch  
  - Completing PR  
- Take *flask_basics_quiz*.  
- Review *web_flask_quiz* questions (6, 7, 8, 15, 17).  
- Retake and grade *web_flask_quiz*.  
- Finish `utils` script for calculating statistics.  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **What am I assuming that might be wrong?**  
  That splitting the backlog will automatically make subtasks clearer—may still need explicit DoD definitions.  

#### ❓ Question 2
- **Identify dependencies I might be missing based on today’s tasks.**  
  - `/api/stats` depends on completed utils script.  
  - In-person standup scheduling depends on updated sprint timeline.  
  - Branch renaming + PR depends on documentation sync being resolved first.  

### 🧾 Results

#### 🧠 Discussion Notes
- Splitting Subsystem Integration clarified priorities but not full DoD.  
- Quiz results highlight need for more Flask study.  
- Documentation sync issues pose long-term risks for traceability.  

#### 🗝️ Key Decisions
- Subsystem Integration officially split into three new backlog items.  
- Sprint extended to two weeks.  

#### 📌 Action Items
- [x]  Finalize `/api/stats` endpoint.
    - [x]  Finalize utils script for statistics.
        - [x]  Finish Code
        - [x]  Test Code
            - [x]  Choose 1 date ranges
            - [x]  Query database and store data locally
            - [x]  Manually calculate expected statistic values + compare using excel
            - [x]  Add test case
    - [x]  Add utils script to `/api/stats/` route
    - [x]  Curl route to ensure it works (same metric values)
- [ ]  Take flask basics quiz
- [x]  Reattempt web_flask_quiz:
    - [x]  Learn Qs: 6, 7, 8, 15, 17
    - [x]  Take Quiz again
- [ ]  Create standup presentation
    - [x]  Set up basic structure
    - [ ]  Create + add new timeline
 

---


## 🗓️ Standup 2 – Refining Subsystem Integration

### 🧾 Overview
* **Date:** Thursday, September 4th (2025)
* **Time:** 1:54 PM
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Intro to Flask
  - Backend Setup
  - Subsystem Integration

### 📋 Contents

#### ✅ Planned Agenda
- Almost done with 'Backend Setup' and 'Intro to Flask' backlog items
- Subsystem Integration backlog is still a little confusing, need to refine and research subtasks + DoD more
- Need to work on some documentation issues
- Want to host a presentation on Friday

#### 📈 Previous Progress
- Mostly finished /api/stats endpoint and wrote some unit tests to verify functionality
  - Manually calculated statistic values for a single data range covering a month, then compared to the calculated values derived when curling the endpoint
  - Locally stored the data used from the database to make calculations into a .txt file for future reference/validation
- Finished the web architecture + Flask quiz

#### 🧱 Problems & Blockers
- Subsystem Integration subtasks and DoD are not clear enough
- Not sure where to store Excel file documenting Flask API endpoints  
  - Living document but subject to frequent change → unclear if versions should go in sprint folders or project management folder
- Unsure how to handle design artifacts (keep separate asset folder vs. embed in finalized `.md` docs)
- Progress coding feels slow — several weeks just to create a bare-bones Flask app
- Rediscovered Ice Box in Notion but haven’t been using it

#### ⏳ Pending Actions
- Flask basics quiz
- Define Subsystem Integration backlog item
- Finish /api/stats endpoint (status message for connection & processing tests)

#### 🔜 Next Steps
- Include Flask basics quiz in deliverables
- Create timeline + add to presentation
- Organize standup meeting for Friday (add to planner + coordinate with parents)
- Upload new screenshots of test results for /api/stats and utils functions
- Upload quiz scores for Flask & web architecture quiz
- Update Notion after backlog completion:
  - Sprint page
  - Product backlog status
- Update backend description:
  - Replace “choose 3 metrics” with “write unit tests”
  - Add try/except branch + `connected: true/false` flag
  - Review if more pieces of `/stats` endpoint are needed
  - Consider updating API Excel doc
- Rewrite & explore subsystem integration — still unclear

---

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**Identify dependencies I might be missing based on today's tasks.**  
- **Frontend–Backend contract**: Need consistent API schema for TaskTable data → depends on a stable `/api/stats` and `/api/save_plans` 
- **Notion sync**: Subsystem integration tasks implicitly depend on Notion API setup (keys, schema mapping).  
- **Deployment**: Docker setup may affect subsystem testing later; documenting environment early will reduce blockers.  

#### ❓ Question 2  
**What feels unclear or risky about today's tasks?**  
- **Subsystem Integration backlog**: scope creep risk → currently overlaps with Backend Setup. Needs subtasks clarified into: (1) React–Flask flow, (2) Flask–DB flow, (3) Flask–Notion flow, (4) end-to-end testing.  
- **Living documents**: Risk of fragmentation if Excel files get versioned inconsistently. Might need a single canonical folder for “active living docs” with snapshot exports into sprint folders.  
- **Slow progress perception**: Risk of discouragement. But given architecture complexity (React + Flask + DB + Notion), weeks for foundations is normal.  

---

### 🧾 Results

#### 🧠 Discussion Notes
- Backend is progressing but subsystem integration remains ambiguous
- Documentation storage strategy needs a decision
- Presentation prep is a motivating milestone but adds time pressure

#### 🗝️ Key Decisions
- `/api/stats` will include something to indicate status like `connected: true/false` for better response clarity
- Replace arbitrary metric choices with systematic unit testing as DoD
- Need to define a clear policy for handling “living documents” (API Excel, diagrams)

#### 📌 Action Items
- [x]  Move flask api excel doc to project management folder and take screenshot of previous state, then save to assets folder where the excel doc was originally saved
- [x]  Presentation
    - [x]  Prep timeline + visuals for Friday’s presentation
    - [x]  Coordinate to organize time
- [x]  Quiz Scores
    - [x]  Take Flask basics quiz
    - [x]  Review missing questions
    - [x]  Upload quiz scores
- [x]  Documentation
    - [x]  Update Notion after completing 'Backend Setup' and 'Intro to Flask’
        - [x]  Sprint Page
        - [x]  Product Backlog
    - [x]  Add screenshots of test results to assets folder
- [x]  Finish 'Backend Setup’
    - [x]  Update subtasks + DoD
        - [x]  Add documentation of endpoints
        - [x]  Add try/except + other data when for the json response of /api/stats
    - [x]  Implement new changes
        - [x]  Document end points
        - [x]  Add try/except + other metrics to http_response object
            - [x]  /api/health
            - [x]  /api/stats
        - [x]  Consider other datapoints
        - [x]  Briefly test things
            - [x]  change stats error - “status” to “ok”: False
            - [x]  remove params from stats error
- [x]  Redefine Subsystem Integration
    - [x]  Subtasks
    - [x]  DoD

---

## 🗓️ Standup 3 – Mid-Project Alignment

### 🧾 Overview
* **Date:** Friday, September 5th
* **Time:** 1:30 PM 
* **Attendees:** Self, Dad
* **Discussed Backlog Items:**  
  - Subsystem Integration
  - Intro to Flask
  - Backend Setup

### 📋 Contents

#### ✅ Planned Agenda
- Discuss projected project conclusion (Oct 13)
- Reviewed 6 Main backlog items
  - x1 is already addressed (Subsystem Integration)
  - x2 are for developing the last features
  - x2 are for testing
  - x1 is for making things presentable

#### 📈 Previous Progress
- Finished 'Backend Setup' and 'Intro to Flask' backlog items
- Redefined 'Subsystem Integration' subtasks + DoD
  - Stopped scope creep, separated subtasks into three total backlog items, then labelled the 2 new items as 'Extras'
- Designed + passed two basic quizzes covering concepts learned for Flask (score must be 70% or greater)
- Created rough timeline detailing the schedule from August 19 until the estimated end of the project

#### 🧱 Problems & Blockers
- Swimlane diagrams increased scope
  - Added a bunch of error handling logic, made things more complicated
  - Not entirely sure how to handle this, created two separate backlog items to address this but labeled them as extra
    - 'App Startup', 'UI Alerts'
- Will take an entire month longer to complete
- Project Management documentation is outdated
- Included some personal information in the text file storing a snapshot of database data used in testing

#### ⏳ Pending Actions
- Subsystem Integration

#### 🔜 Next Steps
- Further flask API design (Subsystem Integration subtasks)
  - Design endpoint schemas for checking the status of Notion and the DB (2 endpoints)
  - Update documentation
  - Implement endpoint schemas (Notion + DB)
- Remove personal information from testing data, reupload updated version, then scrub the old version from GitHub entirely

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **What feels unclear or risky about today's tasks?**  
  The biggest uncertainty is around the *scope creep from swimlane diagrams*. Adding full error-handling layers and startup checks could delay progress past October 13 if not carefully constrained. Risk is medium–high because they touch both frontend (alerts) and backend (startup checks).

#### ❓ Question 2
- **Give me a confidence rating for sprint success based on current progress**  
  Current progress is solid: 2 backlog items finished, scope redefined, and quizzes passed. However, documentation debt and scope creep lower confidence. I’d rate **70–75% confidence** that the sprint will succeed *if extras remain extras* and core features (submission, stat cards, task table) stay prioritized.

### 🧾 Results

#### 🧠 Discussion Notes
- Projected finish date adjusted to October 13.
- Extras identified but deliberately deprioritized to avoid further delays.
- Agreement that database snapshot must be scrubbed/replaced quickly to avoid security issues.

#### 🗝️ Key Decisions
- Keep “App Startup” and “UI Alerts” backlog items marked as *extra*.
- Remove sensitive test data from GitHub ASAP.

#### 📌 Action Items
- [x] Further flask API design
  - [x]  Design endpoint schemas for checking the status of Notion and the DB (`/api/db/health` and `/api/notion/health`)
  - [x]  Update documentation
  - [x]  Implement endpoint schemas (Notion + DB)
- [ ] Replace data txt file containing data requested from database (for testing) and scrub old version from GitHub history.  

## 🗓️ Standup 4 – Creating Frontend Health Test

### 🧾 Overview
* **Date:** Saturday, September 6th (2025)
* **Time:** 10:29 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - Subsystem Integration

### 📋 Contents

#### ✅ Planned Agenda
- Created health API endpoints for the db and Notion
- Started reading Notion's API documentation

#### 📈 Previous Progress
- Wrote up schema designs for `/api/db/health` and `/api/notion/health`
- Took some trial and error but learned how to successfully query Notion's API  
  - Found and added Notion's API key, target page id, and target database id to the .env file  
  - Queried the page and database successfully  

#### 🧱 Problems & Blockers
- Wrote up the schema for /api/db/health and /api/notion/health but then didn't follow the plan  
  - Realized some attributes in the response either weren't needed or were needed but weren't already accounted for  
  - The implementation and documentation are not aligned, documentation needs to be updated  

#### ⏳ Pending Actions
- Still need to scrub personal data from the text file referenced in yesterday's standup  

#### 🔜 Next Steps
- Replace data txt file containing data requested from database (for testing) and scrub old version from GitHub history
- Subsystem Integration  
  - Write and append a new unit test case for /api/notion/health  
  - Write and append a new unit test case for /api/db/health  
  - Update Flask API documentation  
  - Create a test connection script in React to query all of Flask's 'health' API endpoints for the db, Notion API, and Flask itself  

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**Summarize my last 3 standups to identify trends or concerns**  
- Health endpoints have been a recurring focus (design → testing → implementation).  
- Subsystem integration dominates backlog discussions, broken down into React ↔ Flask, Flask ↔ DB, Flask ↔ Notion.  
- Documentation often lags behind implementation, causing mismatches.  
- Cleanup tasks (e.g., scrubbing sensitive data) tend to roll over between days.

#### ❓ Question 2  
**Identify dependencies I might be missing based on today's tasks**  
1. React test connection script depends on Flask endpoints being finalized and returning consistent JSON.  
2. Unit tests depend on stable endpoint schemas—misaligned docs will cause churn.  
3. Notion health checks require correct `.env` credentials (Notion key, DB id).  
4. Frontend context (`TaskTable`, `TaskContext`) is stable, but centralizing API utilities will help avoid duplication.  

### 🧾 Results

#### 🧠 Discussion Notes
- Progress is steady but documentation and cleanup need to catch up to coding tasks.  
- Subsystem integration is progressing logically from backend endpoints → tests → frontend connection.  

#### 🗝️ Key Decisions
- Update API docs before writing tests to lock down schemas.  
- Use centralized API utilities in React to manage health checks.
- Update backlog documentation near the end of the sprint cycle when the retrospective & planning is also addressed.

#### 📌 Action Items
- [ ]  Replace data txt file containing data requested from database (for testing) and scrub old version from GitHub history
- [ ]  Subsystem
    - [ ]  Write and append a new unit test case for /api/notion/health
    - [ ]  Write and append a new unit test case for /api/db/health
    - [ ]  Update flask api documentation
    - [ ]  Build React test connection script once endpoints are stable

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