# 🧭 Standup Digests Log

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
