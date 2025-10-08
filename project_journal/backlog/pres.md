# Presentation Readiness

## 📝 Task Overview
* Sprint: #10
* Dates: October 3rd - October ??? (2025)
* Status: In Progress
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
- [ ] user-stories.md
- [ ] sdp.md (software development plan)
- [ ] reqs.md (requirement specifications)
- [ ] pop.md (project overview proposal)
- [ ] mvs.md (minimum viable specifications)
- [ ] design.md (design specifications)

2) Complete readme
- [ ] Project Title & Description
- [ ] Features
- [ ] Tech Stack
- [ ] Limitations / Disclaimer
- [ ] Project Structure
- [ ] How to use tutorial
- [ ] Setup Tutorial

3) Create terminal execution code
- [ ] Activates python venv
- [ ] Launches flask testing server
- [ ] Launches react server in testing mode
- [ ] Opens app window in chrome

4) React testing mode
- [ ] Uses dummy filter dates for stats retrieval
- [ ] Populates task table with dummy data
- [ ] Activates when debug=true is passed props to the App.jsx component

5) Review
- [ ] Have Uncle Steve review it (Tech Writer + previous SWE)
- [ ] Consider requesting WSU-CS professor review it
- [ ] Present to parents

6) Resume
- [ ] Update resume for final time
- [ ] Update CV for final time

### 📘 Definition of Done
1) Finalize/Update Project Management Docs
- [ ] user-stories.md updated to reflect current workflows; stories traceable to implemented features.
- [ ] sdp.md includes finalized sprint timeline (past + planned) and reflects actual project process.
- [ ] reqs.md matches what is implemented in MVP; each requirement is testable and marked as Met / Not Met.
- [ ] pop.md revised to show accurate problem framing and updated goals.
- [ ] mvs.md lists the delivered MVP scope; checked against implemented features.
- [ ] design.md contains current architecture (React + Flask + Supabase), including final diagrams (ERD, swimlane, context).
- [ ] Evidence: All docs stored in /docs folder, committed, and reviewed for grammar and formatting.

2) Complete README
- [ ] Title & description present and concise.
- [ ] Features section lists major user-facing functionality (task input, feasibility eval, Notion integration placeholder, etc.).
- [ ] Tech stack clearly documented with versions.
- [ ] Limitations/Disclaimer explicitly note what is mocked, placeholder-only, or out of scope.
- [ ] Project structure section shows high-level folder layout.
- [ ] “How to use” tutorial explains interaction (adding tasks, viewing evaluation).
- [ ] Setup tutorial covers cloning repo, installing deps, running backend/frontend.
- [ ] Evidence: README renders correctly on GitHub; no “TODO” placeholders left.

3) Terminal Execution Code
- [ ] Single script (bash or batch) exists that:
- Activates Python venv.
- Launches Flask test server (correct port, test DB/mode).
- Launches React in testing mode.
- Opens app window in Chrome.
- [ ] Script works on local dev environment with one command.
- [ ] Evidence: Demo video or screenshot of command being run → app window launches.

4) React Testing Mode
- [ ] When debug=true is passed into <App />, the app:
- Uses dummy filter dates when calling /api/stats.
- Populates TaskTable with dummy entries (seeded in state).
- Displays debug banner so reviewers know it’s in mock mode.
- [ ] Evidence: Screenshot of app in testing mode with dummy data visible.

5) Review
- [ ] Uncle Steve review completed; feedback received and addressed (grammar, clarity, tech writing).
- [ ] Optional: WSU-CS professor review requested, if feasible, with notes logged.
- [ ] Parents presentation completed to simulate non-technical audience pitch; confirm clarity and flow.
- [ ] Evidence: Feedback notes attached in /docs/reviews/.

6) Resume
- [ ] Resume updated to include finalized version of project (PlanGauge) with polished bullet points.
- [ ] Resume reviewed for consistency (skills, dates, formatting).
- [ ] PDF version saved to /deliverables/resume_final.pdf.
- [ ] Evidence: Updated resume committed or stored in deliverables.

Exit Criteria
- [ ] All project docs, README, and execution code committed to repo.
- [ ] Testing mode demonstrates functionality without relying on live data.
- [ ] At least one external reviewer (Uncle Steve) has provided sign-off.
- [ ] Final resume uploaded to deliverables folder.
- [ ] Presentation-ready repo state tagged (v1.0-presentation).