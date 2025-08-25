## 🗓️ Standup 2 – Database Redesign + Flask Kickoff

### 🧾 Overview
* **Date:** Thursday, August 21 (2025)
* **Time:** 12:25 PM
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Intro to Flask  
  - Database Setup  

### 📋 Contents

#### ✅ Planned Agenda
- Discuss issues with database design and need for redesign
- Emphasize need to work more consistently per day to accomplish sprint tasks

#### 📈 Previous Progress
- Created and finalized functional dependency diagram in BCNF
- Corrected poor database schema design
- Added most recent entries to Excel file

#### 🧱 Problems & Blockers
- Not working enough on project daily
    - No progress on Flask course yesterday
    - Incorrect assumption that schema was already in BCNF
- Supabase design needs a reset
- Database diagrams must be updated

#### ⏳ Pending Actions
- Work on Flask course + draft quiz
- Fix Supabase issues (inserting data + schema redesign)

#### 🔜 Next Steps
- Flask
  - 30 minutes of course
  - Create quiz with 5 questions
- Documentation
  - Add old functional dependency diagram to assets folder
- Database
  - Delete all records in Supabase
  - Populate Categorization table using Excel records
  - Add `cat_reference` values to all other tables in Excel
  - Insert cleaned task records into Supabase

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Confidence rating for sprint success based on current progress:**  
  Moderate. Correcting schema design was a big win, but missed work sessions and Flask course delays pose a risk. Staying consistent will be the deciding factor.  

#### ❓ Question 2
- **What feels unclear or risky about today’s tasks?**  
  The redesign work (deleting and repopulating Supabase) is higher risk—could lead to lost data or mismatched references if not carefully executed. Flask quiz creation is lower risk.  

### 🧾 Results

#### 🧠 Discussion Notes
- Fixed major design flaw in database schema by moving to BCNF  
- Recognized work consistency as a key bottleneck for sprint success  
- Flask learning path must resume immediately to stay on schedule  

#### 🗝️ Key Decisions
- Supabase data will be wiped and repopulated cleanly  
- Old functional dependency diagram preserved for documentation  
- Flask quiz creation prioritized alongside schema reset  

#### 📌 Action Items
- Work on Flask course for 30 minutes  
- Draft 5 quiz questions on Flask basics  
- Save old schema diagram in assets folder  
- Delete existing Supabase records  
- Populate Categorization table from Excel  
- Add category references (`cat_reference`) to all tables  
- Insert cleaned task records into Supabase 

---

## 🗓️ Standup 2 – Database Troubles

### 🧾 Overview
* **Date:** Saturday, August 23 (2025)
* **Time:** 1:43 PM
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Database Setup
  - Intro to Flask

### 📋 Contents

#### ✅ Planned Agenda
- Encountered more issues with database design but finally fixed it (now in BCNF)
- Still need to work more on the flask solo project
- Not sure if the backend will see any work this sprint

#### 📈 Previous Progress
- Fixed database schema design: went from 2NF to BCNF
- Fixed functional dependency diagram and posted into assets folder
- Wrote + executed SQL code to create corresponding tables

#### 🧱 Problems & Blockers
- Stored data does not match the formatting of the new schema design, will need to refactor stored data
- Not working on backend much
- Haven't really worked on "Backend Setup" backlog

#### ⏳ Pending Actions
- Database Setup

#### 🔜 Next Steps
- Write basic app setup for flask (Backend Setup)
- Reformat stored data to match new schema design without any data integrity violations
- Work on Intro to Flask project for 30 mins

### 🤖 ChatGPT Reflection  

#### ❓ Question 1  
- **What feels unclear or risky about today’s tasks?**  
  Reformatting stored data is the biggest risk—there’s a chance of mismatched references or data loss if done carelessly. Flask setup is lower risk but still requires consistent work sessions.  

#### ❓ Question 2  
- **What am I assuming that might be wrong?**  
  Assuming that the corrected schema will be easy to populate—this might not be true if old data is too messy to map directly. Also assuming backend work can be pushed later without affecting sprint scope, which may not hold if time runs short.  

### 🧾 Results  

#### 🧠 Discussion Notes  
- Database schema issues have been resolved and design is in BCNF  
- Realized data refactoring will take more time than expected  
- Backend setup is lagging behind, but Flask solo project remains a viable entry point  

#### 🗝️ Key Decisions  
- Schema will not be revised further; focus shifts to refactoring data  
- Minimal Flask setup will be attempted this sprint to avoid total backend stagnation  
- Prioritize database integrity over speed when reformatting stored data  

#### 📌 Action Items  
- Reformat existing stored data to match new schema  
- Create a basic Flask app scaffold (Backend Setup)  
- Dedicate at least 30 minutes to the Flask solo project

---

## 🗓️ Standup 3 – Flask Routing & Scope Creep

### 🧾 Overview
* **Date:** Sunday, August 24th (2025)  
* **Time:** 12:08 PM  
* **Attendees:** Solo  
* **Discussed Backlog Items:**  
  - Database Setup  
  - Intro to Flask  
  - Backend Setup  

### 📋 Contents

#### ✅ Planned Agenda
- Completed database setup for now  
- Need to finish Coursera course on Flask  
- Not fully understanding Flask but will continue working on it  

#### 📈 Previous Progress
- Completed **Database Setup** backlog item  
- Created comprehensive quiz covering concepts in this sprint  
- Nearly finished Coursera Flask course  
- Began **Backend Setup** backlog item  
- Created swimlane diagram for visualizing system processes  

#### 🧱 Problems & Blockers
- Designing API endpoints in Flask (routing.py) still confusing  
- Subsystem flow unclear:  
  - How React should interact with Flask  
  - Division of responsibilities (frontend vs backend)  
- Swimlane diagram issues:  
  - User should not need to manually launch both servers, may add complexity  
  - Notion lane missing in the diagram  
- Scope Creep: Swimlane diagram not tied to current backlog items  

#### ⏳ Pending Actions
- Finish Coursera Flask course  
- Set up backend app and routing  

#### 🔜 Next Steps
- Finish course  
- Install backend dependencies (supabase-py)  
- Create a small API endpoint spec table/diagram  
- Implement at least 3 routes  
- Test one route with curl  

### 🤖 ChatGPT Reflection  

#### ❓ Question 1  
**Should I continue creating the swimlane diagram even though it’s not in the backlog?**  
👉 Yes, but treat it as supporting documentation rather than a deliverable. It clarifies scope and roles (React = UI input + display, Flask = logic + API/DB/Notion interaction). Keep it lightweight and avoid overinvestment.  

#### ❓ Question 2  
**Confidence rating for sprint success with two days left, considering full backlog definitions of done?**  
👉 **~45–50% confidence** if *full completion* is required (both backlog items fully meeting DoD).  
👉 **~65–70% confidence** if *minimum viable finish* is acceptable (Intro to Flask done, Backend Setup progressed with dependencies + structure + `/ping` route working, but Supabase connection deferred).  

### 🧾 Results

#### 🧠 Discussion Notes
- Routing confusion stems from unclear frontend vs backend responsibilities.  
- Swimlane diagrams help clarify flow but should not derail sprint focus.  

#### 🗝️ Key Decisions
- Treat swimlane diagram as reference only, not backlog work.  
- Prioritize Intro to Flask to guarantee 1 backlog item closed.  
- Limit Backend Setup to essentials (dependencies, project structure, `/ping` route).  

#### 📌 Action Items
- Complete Coursera course + summary + quiz  
- Implement basic backend project structure + test route  
- Connect Supabase if time permits; otherwise defer to next sprint  

---

## 🗓️ Standup 4 – Same Mistakes

### 🧾 Overview
* **Date:** Monday, August 25th (2025)
* **Time:** 3:55 PM
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Intro to Flask  
  - Backend Setup  

### 📋 Contents

#### ✅ Planned Agenda
- Big problem: didn’t follow up on decision to leave last day for retrospective + planning  
- Made some progress on Backend but the backlog item still isn’t fully defined  
- Was easy to connect Flask to Supabase, only takes a couple lines of code  
- Almost done with Intro to Flask backlog item  
- Didn’t follow up on swimlane diagram completion  

#### 📈 Previous Progress
- Created routes table for Flask outlining what API endpoints need to be defined  
- Implemented basic `/health` route for testing and started on `/stats` route  
- Tested Flask routes with curl and verified it works  
- Connected Flask to Supabase and was able to successfully query the database  
- Finished Coursera course, just need to finalize routing  

#### 🧱 Problems & Blockers
- Scope creep: added extra networking questions to quiz  
- Not following through with previous key decisions (e.g., documentation on last sprint day)  
- Backend Setup subtasks unclear, out of order, not reflecting actual work done  
- Progress feels slower than expected  
- Swimlane diagram incomplete, Lucidchart too limiting (need Whimsical)  
- Accidentally coding backend changes on `main` branch  

#### ⏳ Pending Actions
- Finish up Flask routing and clean up code  
- Transfer code to `backend_setup` branch and delete from `main`  
- Complete swimlane diagrams in Whimsical  
- Redefine “Backend Setup” subtasks for clarity  

#### 🔜 Next Steps
- Move backend code into `backend_setup` branch, reset `main`  
- Separate app into `app`, `routes`, and `utils` files  
- Complete `/stats` route  

---

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**Q:** What can I do to ensure I finally follow through with documentation and planning on the final day of the sprint?  
**A:** Treat documentation as a backlog item, not an optional add-on. Assign it subtasks (e.g., “write retrospective,” “update sprint doc,” “commit diagrams”). Block off the final 1–2 hours of the sprint and commit only to this work—no coding.

#### ❓ Question 2
**Q:** I feel like I keep making the same mistakes and not following through with key decisions. Do you agree or disagree? What are your observations?  
**A:** Agree. Based on your last standups, there’s a recurring pattern: (1) sprint planning not strictly followed, (2) scope creep mid-sprint, (3) final-day documentation neglected. The technical side (connecting Flask, task table, etc) moves forward, but planning/structure is consistently sacrificed. Confidence in finishing all backlog items for a sprint remains **low to medium** unless documentation and planning are elevated to the same priority as coding.

---

### 🧾 Results

#### 🧠 Discussion Notes
- Technical execution is strong (Flask ↔ Supabase working, task table functioning), but project management discipline is inconsistent.  
- “Backend Setup” backlog is misaligned with actual coding order; needs restructuring.  
- Decision to always document on sprint’s final day was not upheld—pattern repeats.  

#### 🗝️ Key Decisions
- Documentation and retrospectives will be explicit backlog items.  
- Move backend changes to a feature branch to avoid polluting `main`.  
- Switch swimlane diagrams to Whimsical for flexibility.  

#### 📌 Action Items
- [ ] Restructure “Backend Setup” backlog subtasks to match real workflow  
- [ ] Move backend code into `backend_setup` branch
- [ ] Schedule documentation/retrospective as fixed backlog items for sprint end  
- [ ] Recreate swimlane diagrams in Whimsical

---
