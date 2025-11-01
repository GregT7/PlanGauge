# Presentation Readiness

## 📝 Task Overview
* Sprint: #10
* Dates: October 3rd - October 31st (2025)
* Status: Completed
* Story Points: #10
* Dependencies:
  * `Feedback System`
  * `End-to-End Testing`
  * `Backend Setup`
  * `Intro to Flask`
  * `Subsystem Integration`
  * `Database Setup`
  * `UI UX Foundation`
  * `Intro to React`
  * `Data Entry Table`
* Task Description: Finalize documentation, README, and demo script, enable testing mode with dummy data, gather external feedback, and update the resume so the project is ready for presentation and portfolio use.
* Expected Outcome: The project is presentation-ready with finalized documentation, a clear README, and a one-command demo script. React runs in testing mode with dummy data for reliable demos, and external reviews validate clarity. The resume is updated to showcase the project as a completed portfolio piece.

---

## 🔧 Work

### ✅ Subtasks
1) Finalize/Update Project Management Docs
- [x] user-stories.md
- [x] sdp.md (software development plan)
- [x] reqs.md (requirement specifications)
- [x] pop.md (project overview proposal)
- [x] mvs.md (minimum viable specifications)
- [x] design.md (design specifications)

2) Complete readme
- [x] Project Title & Description
- [x] Table of Contents (Toggle)
- [x] Overview
--- [x] What the application does description
--- [x] System Demo
--- [x] System Architecture (include updated diagram)
--- [x] Tech Stack overview + explanation
--- [x] Testing Coverage
- [x] Project Structure (/project_management, /src/, etc)
- [x] How to Install & Run
- [x] How to Use
- [x] How to Run Tests (pytest, vitest+RTL, playwright)
- [x] Limitations / Disclaimer
- [x] Acknowledgements

3) Create terminal execution code (full mode)
- [x] Activates python venv
- [x] Launches flask testing server
- [x] Launches react server in testing mode
- [x] Opens app window in chrome

4) Demo mode
- [x] Populates task table with dummy data
- [x] Custom terminal command
- [x] Flask has a dummy api endpoint that sends over static stats data
- [x] Submission button doesn't submit data anywhere but has a simple toast message

5) Populate DB with sample data
- [x] Finish init_records.sql so that it populates all tables with sample data
- [x] Test script to ensure it works

6) Relocate assets
- [x] Move assets to google drive
- [x] Keep necessary assets
- [x] Add link + note to readme

7) Review
- [x] Request Uncle Steve review it (Tech Writer + previous SWE)
- [x] Consider requesting WSU-CS professor review it
- [x] Present to parents

8) Resume
- [x] Update resume for final time
- [x] Update CV for final time

9) Final Touches
- [x] Update recent backlog items (Notion + GitHub)
- [x] Review & update previous backlog items

### 📘 Definition of Done
- [x] All project management document drafts are finalized (user-stories.md, sdp.md, reqs.md, pop.md, mvs.md, design.md)
- [x] Readme is completed with an overview, installation tutorial, usage tutorial, dependencies, and more
- [x] Three terminal commands for e2e/unit testing, demoing, and dev usage
- [x] Demo mode for people that want to try out application without any setup
- [x] init_records.sql is created & finalized, populating all relations with sample data
- [x] CV contains bullet point on end-to-end testing
- [x] Have one person review project
- [x] All backlog items updated
- [x] Asset files are relocated to google drive with a link inside the readme