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
- [ ] Centralize “living docs” in project management folder, snapshot finalized versions into sprint folders
- [ ] Presentation
  - [ ] Prep timeline + visuals for Friday’s presentation
  - [ ] Coordinate to organize time
- [ ] Quiz Scores
  - [ ] Take Flask basics quiz
  - [ ] Review missing questions
  - [ ] Upload quiz scores
- [ ] Documentation
  - [ ] Update Notion after completing 'Backend Setup' and 'Intro to Flask'
    - [ ] Sprint Page
    - [ ] Product Backlog
  - [ ] Add screenshots of test results to assets folder
- [ ] Finish 'Backend Setup'
  - [ ] Update subtasks + DoD
    - [ ] Add documentation of endpoints
    - [ ] Add try/except + other data when for the json response of /api/stats
  - [ ] Implement new changes
    - [ ] Document end points
    - [ ] Add try/except
    - [ ] Consider other datapoints
    - [ ] Briefly test things
- [ ] Redefine Subsystem Integration

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