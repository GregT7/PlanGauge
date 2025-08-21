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