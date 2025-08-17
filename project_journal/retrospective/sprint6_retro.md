# 🌀 Retrospective #X – Insert title here

## 📋 Summary
**Date:** Sunday, August 17, 2025

**What Went Well**
- Recognized the poor planning behind the assigned backlog items and pivoted by re-evaluating the structure of assigned items
- Further examined current architecture plans and realized a SQL based database fits my needs better instead of MongoDB (NOSQL)
    - Created a Supabase account and new cluster for the project
    - Created and implemented relation schemas on Supabase
    - Cleaned and inserted currently existing records into Supabase cluster
- Started learning how to create a flask application
- Researched specific backend implementation steps to clear confusion over setting up/integrating the flask app with the database + frontend

**What Didn't Go Well**
- Backlog subtasks were not clearly defined
- Backlog dependencies were confusing, missing, or not accurately defined (Backend + Database)
- Scope of backlog items were too broad
- Goals of sprint 6 was too ambitious for the allotted time
    - Assigned too many backlog items with less work time than typical sprints
- Backlog items were not atomic and needed to be further split up into new, separate items
    - Backend Setup & Integration --> 1. Backend Setup, 2. Frontend & Backend Integration, 3. Intro to Flask
    - Performance & End-to-End Testing --> 1. Performance Testing, 2. End-to-End Testing
- Poor understanding of Flask
- Used ChatGPT to quickly generate subtasks for backend and database backlog items but this caused further confusion

---

## 🧩 Problems

**Issues Identified**
- A day designated for retrospectives and next sprint planning has yet to be implemented into the current sprint workflow
- Big changes were made to the project architecture but no updates were made in the supporting documentation or diagrams
- Unclear objectives, goals, and dependencies will only cause more issues further down the line
- Packaging too many subtask items into a backlog item is a form of scope creep which makes planning more difficult and fatigue more likely
- Timeline is unclear

**Root Cause**
- Fatigue/burnout decreases work output and quality
- Rushed planning increases tech debt, which in turn, increases fatigue and unnecessary complexity
- Less time than usual was allotted to this sprint while the work load was increased
---

## 🛠️ Solutions

**Proposed Solutions**
- Create an official work schedule where I work a minimum of X hours a day on certain days of the week (Monday - Friday) to make things more sustainable
    - No working on off days to preserve motivation and decrease fatigue
    - Probably will need to create some document to make this plan more "official" to increase the chances I follow through
    - Might want to consider an official starting time in the morning and ending time in the afternoon
    - Need some way to track + enforce the planned schedule
- Ensure the last day is reserved for completing the retrospective, planning, documentation, etc.
- Assign only one backlog item per sprint and add new items as things are completed only during the sprint
- Further research and define the backlog items that will be worked on in the immediate future
- Update timeline

**Action Plan**
- Documentation
    - Finalize and push this retro page to repo
    - Complete and push sprint 6 dashboard page to repo
    - Update Notion retro and sprint dashboard pages
    - Update timeline
- Further research the following backlog items and ensure the dependencies and subtasks are clearly defined in a way that doesn't push the project scope
    - Intro to Flask
    - Backend Setup
    - Database Setup & Integration
    - Frontend & Backend Integration
- Write up brief plan detailing work schedule (don't make it too rigid or difficult)
- Plan next sprint
    - ensure only 1 backlog item is assigned
    - assign backlog items
    - start filling out sprint 7 dashboard page
