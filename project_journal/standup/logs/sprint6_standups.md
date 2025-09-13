# 🧭 Standup Reports Log

## 📅 Sprint #6 – Intro to the Backend
* **Dates:** June 24 - June 29 (2025)
* **Total Days:** 6 days
* **Total Standups:** 
* **Standup Participation:** 

## 🗓️ Standup #1 – New sprint - where do I want to start?

### 🧾 Overview
* **Date:** June 24, 2025
* **Time:** –
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Database Setup & Integration  
  - Backend Setup  
  - Feedback System  

### 📋 Contents

#### ✅ Planned Agenda
- Decide on which backlog item to focus on  
- Finished up stat card system  
- Need to finish retrospective  
- Need to flesh out subtasks for all backlog items  

#### 📈 Previous Progress
- Completed stat card system (testing + pull request)  
- Created gifs + visuals for showcasing stat card features  

#### 🧱 Problems & Blockers
- Unsure of what specifically needs to be done for backend/database setup  
  - Do diagrams need to be created beforehand?  
  - Should new backlog items be created for Flask/MongoDB learning?  
- Risk of over-scoping and delaying progress  

#### ⏳ Pending Actions
- Complete Retrospective 5  
- Choose initial backlog focus  

#### 🔜 Next Steps
- Flesh out backend subtasks  
- Finalize backlog selection  
- Start backend integration  

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
- **Which backlog item should I start on?**  
  → Start with **backend integration**. It's foundational for all other components and helps unblock further development.

#### ❓ Question 2  
- **Should I create a backlog item for learning Flask/MongoDB?**  
  → Yes, create a timeboxed backlog item (~2 hrs) for focused Flask and MongoDB onboarding to avoid derailing the timeline.

#### ❓ Question 3  
- **What feels unclear or risky about today’s tasks?**  
  → The backend scope is vague. It's unclear what must be implemented now vs. later, and how much of the Notion/DB integration is essential for MVP.

#### ❓ Question 4  
- **How can I improve my testing workflow?**  
  → Add **mock API integration tests** using tools like MSW or Vitest. These can validate the frontend and backend interactions early in development.

### 🧾 Results

#### 🧠 Discussion Notes
- Backend will not pull from Notion for now. Instead, it will:  
  - Accept task submission from frontend  
  - Send POST requests to Notion  
  - Fetch and process task data from MongoDB  
- Scope is intentionally limited to prevent delays and over-complication  

#### 🗝️ Key Decisions
- Start with backend integration  
- Will add visual schema design for database setup  
- Add basic Codecademy course (~2 hrs) to backend subtasks  
- Add mock API integration tests to backend subtasks  
- Backend goals (initial scope only):  
  - No Notion data fetch  
  - Handle POST to Notion  
  - Query DB, run task-duration calculations, and return data  

#### 📌 Action Items
- Flesh out backend subtasks  
- Complete Retrospective 5  

---

## 🗓️ Standup #2 – Flask Intro

### 🧾 Overview
* **Date:** June 27, 2025  
* **Time:** 11:20 AM - 12:00 PM  
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Backend Setup & Integration  
  - Database Setup & Integration  

### 📋 Contents

#### ✅ Planned Agenda
- Set up basic Supabase SQL database and insert records  
- Prepare Flask backend structure  
- Address backlog instability and scope creep  

#### 📈 Previous Progress
- Entered and cleaned most recent records in Excel  
- Created Supabase account and project  
- Designed ER diagram and translated it into PostgreSQL SQL schema  
- Imported cleaned CSV data into Supabase  
- Chose Supabase over MongoDB for its structured data and integrity  
- Labeled extra backlog items to maintain MVS focus  

#### 🧱 Problems & Blockers
- Sprint subtasks are changing frequently and lack clear scope  
- Scope creep emerging due to tempting extra ideas  
- Intertwined dependencies between tasks make tracking and planning harder  
- Limited backend/Flask experience under time constraints  
- Downloaded Notion plan data exists, but is not currently required  
- Potentially useful analytics tables for ML models are a distraction from MVS  

#### ⏳ Pending Actions
- Setup Flask app structure  

#### 🔜 Next Steps
- Decide on Flask learning strategy (e.g., take Codecademy course?)  
- Create backend branch  
- Begin development with minimum functional components

### 🤖 ChatGPT Reflection

#### ❓ Identify dependencies I might be missing based on today's tasks
- Flask CORS setup for React communication  
- Supabase client library or psycopg2 for DB connection  
- `.env` management for API keys and credentials  
- Possible database migration tool (e.g., Alembic) if schema evolves

#### ❓ Summarize my last 3 standups to identify trends or concerns
- Standup #0: Planning stage, finalized backlog and MVS priorities  
- Standup #1: Frontend nearly complete, backend scope started forming  
- Standup #2: Backend foundation in progress, struggle with scope control and complex dependencies

**Trend:** Forward progress continues, but consistently challenged by shifting task definitions and unplanned idea sprawl

#### ❓ Are my tasks aligned with this sprint's goals?
Yes, the current work on Flask and Supabase supports the MVS. However, integrating Notion data and expanding analytics is not MVS-aligned and should be deferred to the icebox.

### 🧾 Results

#### 🧠 Discussion Notes
- A rigid scope lock doesn't fit the discovery-heavy nature of the project right now  
- An adaptive scope lock model—locking sprint goals but allowing evolving subtasks—strikes the right balance  
- Using a “learning buffer” and a “parking lot” (icebox) can manage ideas without disrupting flow

#### 🗝️ Key Decisions
- Icebox section for preserving ideas outside of scope is a great idea, will implement this now  
- Don't create new tables or clean additional data that is unneeded to achieve the MVS  
- Start creating .env files for storing API keys and other sensitive config info  

#### 📌 Action Items
- Create icebox section in Notion for new ideas that are outside of scope but can be reviewed and decided upon during each sprint retrospective  
- Create a new branch for backend: `backend-setup`  
- Set up Flask project structure (app.py, routes.py, models.py, etc.)  
- Install dependencies (`flask`, `python-dotenv`, `supabase-py`, `flask-cors`, etc.)

---

## 🗓️ Standup 3 – Backend Progress Review & System Integration Planning

### 🧾 Overview
* **Date:** June 28, 2025  
* **Time:** 6:00 PM AM  
* **Attendees:** Dad, Mom  
* **Discussed Backlog Items:**  
  - Backend Setup & Integration  
  - Database Setup & Integration

### 📋 Contents

#### ✅ Planned Agenda
1. Review and demonstrate progress made during the past two weeks of independent work  
2. Present pull requests and corresponding test coverage for newly implemented features  
3. Provide visual demonstrations (GIFs, live walkthrough) of core functionality  
4. Share current timeline status and discuss adjustments for remaining project scope

#### 🧠 Discussion Notes
1. Demonstrated the integration of the **stat card system** with the **task entry table**, both visually and functionally.
2. Walked through two pull requests representing completed features, with emphasis on code quality and commit clarity.
3. Explained the design and implementation of unit and integration tests using **Vitest** and **React Testing Library**, ensuring that individual components and system interactions behave as expected.
4. Showcased transition from MongoDB (NoSQL) to **Supabase** (SQL), including rationale, ER diagram, and cleaned data inserted into the cloud-hosted database.
5. Updated the project timeline to accurately reflect current progress and remaining milestones.
6. Received positive feedback on the use of **GIFs and visual walkthroughs**, which improved clarity in communicating progress.
7. Discussed design feedback regarding the **status counter colors**: colors did not initially match the stat card backgrounds, leading to confusion. Explained that the vibrant shades used for the counters were intentional for visibility and semantic emphasis, given that darker card backgrounds were necessary for white text contrast. Parents recommended incorporating this explanation somewhere in the interface or documentation.
8. General feedback included encouragement to continue momentum and recognition of solid progress made during the standalone development period.

### 🧾 Results

#### 🗝️ Key Decisions
1. Retain use of vibrant stat card **border colors** for the status counter display to maintain visual clarity and avoid the perception of zero values.
2. Add a brief **tooltip or note** in the UI or documentation to explain the visual design rationale for status counter color choices.
3. Continue backend development using **Flask** in conjunction with the **Supabase** database.
4. Maintain professional development workflow by using **pull requests**, **code reviews**, and **automated testing**.
5. Evaluate whether to include a **learning quiz** as part of the backend backlog for self-assessment and deeper understanding.
6. Continue using visual assets (GIFs, live demos) in future standups to effectively communicate progress.

#### 📌 Action Items
1. Add design rationale for status counter colors to the UI (e.g., tooltip or help section).
2. Continue Flask setup and learning.
3. Ensure subtasks reflect **full-stack integration**, not just internal backend/database concerns.
4. Create a backend learning quiz (tentative).


---

## 🗓️ Standup #4 – Learning Flask Continued

### 🧾 Overview
* **Date:** June 29, 2025
* **Time:** 11:30 AM
* **Attendees:** Self
* **Discussed Backlog Items:**  
  - Database Setup & Integration  
  - Backend Setup & Integration

### 📋 Contents

#### ✅ Planned Agenda
- Get caught up in documentation
- Decide if I will continue to learn Flask or jump into implementation

#### 📈 Previous Progress
- Decided to add a quiz subtask to the backend backlog item

#### 🧱 Problems & Blockers
- Didn't document yesterday's standup

#### ⏳ Pending Actions
- Documenting yesterday's standup
- Learn about Flask

#### 🔜 Next Steps
- Document yesterday's standup  
- Finish today's standup  
- Finish learning about basic Flask app: https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/685f2f54-599c-8009-b84c-a1c8b0ea968d  
- Download Flask dependencies  
- Setup `.env` file + add to `.gitignore`

### 🤖 ChatGPT Reflection

#### ❓ Are my tasks aligned with this sprint's goal?
Yes. Your tasks (Flask learning, .env setup, API prep) support the sprint goal of backend setup and time prediction integration. These are critical steps for enabling Flask to communicate with the frontend and prediction model.

#### ❓ What am I assuming that might be wrong?
You might be underestimating the importance of Flask learning before implementation. Rushing into coding without a proper grasp could result in rework. Also, skipping daily documentation risks losing important project context.

#### ❓ Identify dependencies I might be missing based on today's tasks
- `flask`, `flask-cors`, `python-dotenv`
- Possibly `pymongo`, `joblib`, `scikit-learn` depending on next steps
- Ensure `.gitignore` excludes `.env`, `__pycache__`

#### ❓ Give me a confidence rating for sprint success (ends today)
**Confidence: 7.5/10**  
You're focused and aware of priorities. If you stay on task and realistically adjust your milestones, you'll finish the most critical setup today.

### 🧾 Results

#### 🧠 Discussion Notes
- Flask is a core backend technology for the project.
- Key utilities (env config, routing, CORS, Notion/MongoDB integration) depend on learning Flask now.
- Documenting yesterday’s standup is essential for continuity.

#### 🗝️ Key Decisions
- Add `.env` file and update `.gitignore`  
- Create backend quiz on setting up the Flask app: https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/68615d90-c1cc-8009-9862-a89bc6bbdfa6  
- Update Sprint 6 milestones to reflect realistic workload for the day

#### 📌 Action Items
- Document yesterday's standup  
- Finish today's standup  
- Finish Flask learning: https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/685f2f54-599c-8009-b84c-a1c8b0ea968d  
- Download Flask dependencies  
- Setup `.env` file and update `.gitignore`

---