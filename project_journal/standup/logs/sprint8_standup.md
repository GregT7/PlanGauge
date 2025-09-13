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
- [x]  Subsystem
    - [x]  Write and append a new unit test case for /api/notion/health
    - [x]  Write and append a new unit test case for /api/db/health
    - [x]  Update flask api documentation
    - [x]  Build React test connection script once endpoints are stable

---

## 🗓️ Standup 5 – Subsystem Integration Progress

### 🧾 Overview
* **Date:** Sunday, September 7th (2025)
* **Time:** 1:32 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - Subsystem Integration

### 📋 Contents

#### ✅ Planned Agenda
- Still haven't followed up on scrubbing the text file with PII
- Worked more on integrating React with the backend, almost done
- Used ChatGPT to autogenerate test cases

#### 📈 Previous Progress
- Finished the react connectionTest.js script
- Finished writing test cases for connectionTest.js script
- Started working on writing additional test cases for App.jsx
- Added toaster notifications using shadcn to notify user of system health statuses

#### 🧱 Problems & Blockers
- It's difficult to test for shadcn's Sonner or Toaster element (appears briefly when certain conditions are met)
- Don't fully understand the ChatGPT generated test cases. Also don’t know if the test cases cover enough situations.
- Need to learn how to use AbortController for retrying fetch requests in case of failure
- Keep on working for 3–4 hours early in the day, and then doing nothing for the rest of it. Want to work and accomplish more.

#### ⏳ Pending Actions
- Remove text file with PII
- Finish React test cases for App.jsx

#### 🔜 Next Steps
- Examine `Subsystem Integration` DoD to ensure almost all requirements are fulfilled
- Replace data txt file containing data requested from database (for testing) and scrub old version from GitHub history
- Subsystem Integration
  - Explore adding fetch retry handling
     - Learn about AbortController
     - Decide: is it worth implementing
  - Add test cases for App.jsx
  - Examine DoD
    - Update inaccurate or old parts
    - Make checklist under backlog item page

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Q:** How do I go about working more in the day? My routine has been going to Starbucks for 3–4 hours where I will work on this project, go home, and then binge TV shows + YouTube until the end of the day.  
- **A:** The core issue is the transition point—when you leave Starbucks, your momentum stops. To extend productivity, create a small but deliberate second work block at home (even 30 minutes). Reduce friction by setting a predefined task before leaving Starbucks. If bingeing is irresistible, delay it until after that second block. Also consider environment cues: working in a library, coworking space, or a different room at home may help you restart.

#### ❓ Question 2
- **Q:** What feels unclear or risky about today’s tasks?  
- **A:** The biggest uncertainty is around testing ephemeral UI elements like shadcn’s Sonner/Toaster. Standard testing tools may not catch them reliably. There’s also risk that the ChatGPT-generated test cases don’t align with your real usage scenarios. Finally, implementing retry logic with AbortController requires clarity on whether it’s truly necessary at this stage—might add scope creep to Subsystem Integration.

### 🧾 Results

#### 🧠 Discussion Notes
- Need a deliberate system to extend work sessions into the afternoon/evening.
- Testing transient UI components remains a challenge and may not be worth fully solving during Subsystem Integration.
- Retry logic could be postponed if core API communication is already stable.

#### 🗝️ Key Decisions
- Focus on completing Subsystem Integration DoD first, then revisit retry logic.
- Commit to removing the PII file before pushing further changes.

#### 📌 Action Items
- [x] Remove text file with PII and scrub GitHub history
- [ ] Finish React test cases for App.jsx
- [ ] Review and update Subsystem Integration DoD
- [x] Decide on retry logic implementation after DoD review
- [x] Experiment with a short second work block at home


## 🗓️ Standup 6 – Testing Lag

### 🧾 Overview
* **Date:** Tuesday, September 9th (2025)  
* **Time:** 11:32 AM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - Subsystem Integration  

### 📋 Contents

#### ✅ Planned Agenda
- Testing is taking some time  
- Plan on working 8 hour days this week, starting today  
- Want to finish up testing, start + complete the pull request, and start feedback system in this sprint if possible  
- New deadline: September 28th. Need to have most of project finished by then  

#### 📈 Previous Progress
- Added retry feature to `connectionTest` (attempts 3 times before giving up)  
  - Restructured code: went from 1 helper + 1 main function → 2 helpers + 1 main function  
  - Made it more modular  
- Restarted writing unit tests for `connectionTest.js` due to restructuring  
- Avoiding overreliance on ChatGPT for test-writing — deliberately learning through implementation, which takes longer  

#### 🧱 Problems & Blockers
- Finishing unit tests for `connectionTest` and `App.jsx` might take more time than desired due to testing learning curve  

#### ⏳ Pending Actions
- Evaluate + restructure DoD  

#### 🔜 Next Steps
- Subsystem Integration  
  - Write tests for `connectionTest`  
    - `timed_fetch`  
    - `persistent_fetch`  
    - `connectionTest`  
  - Unit tests for `App.jsx`  
    - baseline render  
    - new tests for `Toaster` component  
- Work a total of 8 hours today  

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
*Would I be able to keep up with the pace of a regular agile software development team making a real product?*  
- You’re moving slower than a production team, but that’s expected — you’re learning fundamentals solo while also coding. A real team benefits from shared knowledge, existing test harnesses, and mentorship. The key takeaway: your pace would accelerate significantly in a real environment where testing frameworks and standards are already in place.  

#### ❓ Question 2  
*If it’s taken me some time just to write one test for `timed_fetch` in `connectionTest.js`, do you think it’s possible to complete today’s tasks?*  
- It’s ambitious. If you dedicate a full 8-hour block, you may cover most tests for `connectionTest`, but finishing `App.jsx` tests + Toaster might spill into tomorrow. A more realistic target today: finalize `timed_fetch` + `persistent_fetch` tests, and scaffold `connectionTest` + `App.jsx` test files with at least one working case each. That ensures forward momentum.  

### 🧾 Results

#### 🧠 Discussion Notes
- Unit testing is currently the pacing item; backlog integration depends on clearing this.  
- Your restructuring (modularizing fetch logic) directly supports easier testing and future maintainability.  

#### 🗝️ Key Decisions
- Prioritize fetch helper tests today.  
- Accept that `App.jsx` tests may roll into tomorrow, but ensure scaffolding is in place today.  

#### 📌 Action Items
- [x] Finish tests for `timed_fetch` and `persistent_fetch`  
- [x] Begin `connectionTest` integration tests (at least one case)  
- [x] Add baseline render test for `App.jsx`  
- [ ] Revisit DoD and ensure testing coverage is included in criteria
- [ ] Complete 8 hours of work today

---

## 🗓️ Standup 7 – Almost Ready to Pull backend_setup!

### 🧾 Overview
* **Date:** Wednesday, September 10th (2025)
* **Time:** 10:41 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - Subsystem Integration

### 📋 Contents

#### ✅ Planned Agenda
- Might finally finish `Subsystem Integration` today!
- Which should I assign next to this sprint: `Feedback System` or `Plan Submission`?
- Need to finally redefine/update DoD for `Subsystem Integration`

#### 📈 Previous Progress
- Finished writing tests for connectionTest.js (12 tests in total)
- Wrote up the outline for 4 unit tests for App.jsx

#### 🧱 Problems & Blockers
- Not working long enough on project
- Pull request might take a while to document and complete

#### ⏳ Pending Actions
- Examine + redefine the DoD for `Subsystem Integration`

#### 🔜 Next Steps
- Draft up work plan for this and next week to help me work longer
- Work at least 4 hours on this project today
- Finish the final 4 tests for App.test.jsx
- Redefine the DoD for `Subsystem Integration`
- Start the pull request for `backend_setup` branch with `main`

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
- Which should I implement first after completing `Subsystem Integration`: `Feedback System` or `Plan Submission`?  
  👉 **Answer:** Do **Plan Submission** first. It’s a core MVP feature, requires Notion API integration and error handling, and unblocks the full system flow. Feedback System builds more easily on top once submission works.

#### ❓ Question 2  
- Are there any dependencies I am missing for today's tasks? Do you think it’s feasible for me to complete today's tasks?  
  👉 **Answer:** Dependencies are mostly in place (TaskTable, TaskContext, Tailwind, test scaffolding). Missing pieces: a redefined DoD checklist, isolated tests for event-driven components, and a PR template/notes. Feasible if you scope tightly—DoD + App tests within ~4 hrs; PR draft may spill into tomorrow.

### 🧾 Results

#### 🧠 Discussion Notes
- MVP priorities: Plan Submission is more critical than Feedback System.  
- TaskTable + supporting components are solid; testing coverage still needs finalization.  
- Need to formalize DoD for Subsystem Integration to avoid scope creep during PR.  
- Timeboxing PR work is key, as documentation could take longer than coding.

#### 🗝️ Key Decisions
- Assign **Plan Submission** as the next backlog item after Subsystem Integration.  
- Focus today on DoD redefinition + finishing App tests before touching PR.

#### 📌 Action Items
- [x] Redefine DoD for Subsystem Integration  
- [x] Write 4 remaining App unit tests  
- [x] Work minimum 4 hrs today
- [x] Redefine DoD for Subsystem Integration
- [x] Update flask api documentation
- [x] Confirm flask api documentation matches flask routes
  - [x] /api/health
  - [x] /api/notion/health
  - [x] /api/db/health
  - [x] /api/db/stats
- [x] Update flask routes
  - [x] /api/health
  - [x] /api/notion/health
  - [x] /api/db/health
  - [x] /api/db/stats
- [x] Testing (pytest)
  - [x] rerun tests
  - [x] Fix issues
- [ ] Draft PR notes/template to accelerate merge process tomorrow  

---

## 🗓️ Standup 8 – Finalizing Subsystem Integration

### 🧾 Overview
* **Date:** Thursday + Friday, September 11-12th (2025)
* **Time:** 9:41 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - Subsystem Integration
  - Plan Submission

### 📋 Contents

#### ✅ Planned Agenda
- Had to fix some new issues with the flask api + documentation, slowed things down a little
- Just need to finish the pull request and `Subsystem Integration` will finally be done
- Can start planning `Plan Submission` soon if not today

#### 📈 Previous Progress
- Completed App.test.jsx testing
- Made flask api endpoint response structure consistent across all routes
  - Updated flask_api.xlsx document recording the response schemas
  - Rewrote the test_routes.py to account for new changes in the routes

#### 🧱 Problems & Blockers
- Didn't account for inconsistencies in flask routing design which needed fixing
- Not entirely sure what to post in the pull request in terms of documentation, not sure if anything is gif worthy
- If I add a new backlog item to this sprint, do I need to redo the sprint page's documentation since there will be a shift in the overall goal/objective/expected outcome?

#### ⏳ Pending Actions
- Pull request

#### 🔜 Next Steps
- Pull request
  - Draft pull request + save .md document
  - Make request & solve merge conflicts
  - Consider making a new folder for pull requests
- Update Notion documentation
  - Mark `Subsystem Integration` as done
  - Update completed backlog items from 2 to 3 on the sprint dashboard page
  - Add `Plan Submission` to sprint 8's backlog items
- Start defining `Plan Submission` (dependencies, task description, subtasks)

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Q:** If I add a new backlog item to this sprint, do I need to redo the sprint page's documentation since there will be a shift in the overall goal/objective/expected outcome?  
- **A:** You don’t need to redo the entire sprint doc—just update the **Backlog Progress** section and note the addition in your sprint’s “Tasks Assigned.” The sprint’s original goal/objective can remain, but you can add a short note under *Milestones* or *Retrospective Notes* explaining the adjustment.

#### ❓ Question 2
- **Q:** What am I assuming that might be wrong? What are some dependencies I am missing for today's tasks?  
- **A:** Possible assumptions to re-check:  
  - That your test routes fully cover the new error-handling cases (e.g., 400 vs 503).  
  - That your Notion API integration won’t need schema updates when `Plan Submission` is added.  
  - That your pull request reviewers will understand context without screenshots/gifs—consider adding short API response examples or a brief workflow diagram for clarity.  
  - Dependency to flag: the `Plan Submission` backlog item might rely on having the Notion schema finalized, so make sure you lock that down first.


### 🧾 Results

#### 🧠 Discussion Notes
- Subsystem Integration is essentially complete pending the PR.
- Documentation has been aligned but needs polish before merging.
- Planning for `Plan Submission` can begin immediately after PR.

#### 🗝️ Key Decisions
- Add `Plan Submission` to Sprint 8 instead of starting a new sprint.
- Keep sprint doc intact, only update backlog + notes instead of rewriting objectives.

#### 📌 Action Items
- [x] Finish pull request (draft + resolve conflicts)
  - [x] Draft pull request + save .md document
  - [x] Make request & solve merge conflicts
  - [x] Consider making a new folder for pull requests
- [x] Update Notion sprint doc
- [x] Start defining the next backlog item: `Plan Submission`
  - [x] Dependencies
  - [x] Task Description
  - [x] Subtasks

---

## 🗓️ Standup 9 – Plan Submission Kickoff

### 🧾 Overview
* **Date:** Saturday, September 13th (2025)
* **Time:** 9:30 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Complete defining `Plan Submission` backlog item
- Think about approach to completing `Extra` backlog items
- Start working on implementing `Plan Submission` items

#### 📈 Previous Progress
- Finished pull request with supporting documentation (including gifs and diagrams)
- Finished testing the backend and subsystem integrations
- Defined the `Plan Submission` dependencies, description, and subtask items

#### 🧱 Problems & Blockers
- MVS is not updated and hasn't been entirely followed → some scope creep
- Idempotency enforcement seems complicated and a little outside scope of just submitting plan data
- Many nice-to-have backlog items labeled 'Extra' in Notion will take a long time to implement
- Deployment of the application is currently not a backlog; app only runs on local testing servers
- Documentation is behind: backlog items not consistently updated

#### ⏳ Pending Actions
- Defining `Plan Submission`
- Updating backlog item documentation

#### 🔜 Next Steps
- Complete defining `Plan Submission` backlog item
- Briefly research deployment approaches
- Choose at most 3 `Extra` backlog items to pursue, mark them in Notion
- Implement button feature to React

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Q:** Are my next steps lacking? What am I assuming that might be incorrect?  
- **A:** Your next steps are solid, but they’re very execution-oriented. What’s missing is a checkpoint for *validation* (e.g., “does this backlog item align with the MVS?”). You might also be assuming deployment can stay “later”—but delaying even a basic deployment plan could make integration riskier. A lightweight deployment experiment early would de-risk future work.

#### ❓ Question 2
- **Q:** How do I address the problems I listed? I already have a full plate of tasks so I won’t be addressing everything today but I also don’t want to forget about them. How should I go about solving this problem?  
- **A:** Treat these as **parallel backlog items** in Notion, but tag them “Deferred” or “Parking Lot.” That way they don’t clutter your active sprint, but you won’t lose sight of them. For scope creep/MVS drift, add a small action item: “Review MVS compliance once per sprint.” For extras, pick 2–3 you truly want and archive the rest. For deployment, at least create a placeholder backlog (“Deployment Options Research”) so it’s tracked.

### 🧾 Results

#### 🧠 Discussion Notes
- Plan Submission backlog is shaping up but needs clarity on idempotency scope.
- Extra backlog items risk distracting from MVS alignment.
- Deployment research should start soon to avoid integration surprises.

#### 🗝️ Key Decisions
- Limit Extra backlog pursuit to a maximum of 3 items.
- Create a separate backlog item for Idempotency Enforcement rather than forcing it into Plan Submission.
- Add deployment placeholder backlog for visibility.
- Add `Review MVS compliance` to end of this sprint's tasks when reviewing and planning for the next sprint. Also add to next sprint's to-do items.
- Complete documentation on the feature branch instead of main to make things more convenient (less branch swapping and conflict resolution)
- Keep the `backend_setup` branch but only locally -- incase something goes wrong

#### 📌 Action Items
- [ ] Finalize Plan Submission backlog definition today
- [ ] Create new branch for button submissions
- [ ] Create submission button component with shadcn styling
- [ ] Create new backlog item: “Deployment”  
- [x] Move Idempotency Enforcement to a new backlog item and mark as `Extra`
- [x] Mark top 3 Extras in Notion 
- [x] Add “MVS alignment check” step to end of this sprint and the next sprint

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