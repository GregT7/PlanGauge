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