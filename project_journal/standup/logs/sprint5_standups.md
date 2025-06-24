# 🧭 Standup Digests Log

## 📅 Sprint #5 – Finish up Testing
* **Dates:** June 17 - June 23 (2025)
* **Total Days:** 7 days
* **Total Standups:** 6
* **Standup Participation:** 85.7% 

## 🗓️ Standup 1 – Refining the Standup Process

### 🧾 Overview
* **Date:** June 17, 2025
* **Time:** 10:30 AM - 11:30 AM
* **Attendees:** Solo (Self, ChatGPT) 
* **Discussed Backlog Items:**  
  - Intro to Code Reviews & Testing
  - Retro3: Reward System 2.0

### 📋 Contents

#### ✅ Planned Agenda
- Complete and document Sprint 4 retrospective + standup
- Try using ChatGPT’s standup reflection questions
- Continue unit testing (remaining 6 components)
- Begin planning for integration testing (`TaskTable`)

#### 📈 Previous Progress
- Documented ChatGPT’s standup improvement suggestions
- Completed unit testing for 2 of 8 components
  - Simulated props and user interaction
  - Complex components handled first
  - Remaining components are expected to be easier
- Noted that integration testing for the data table will likely require a full day

#### 🧱 Problems & Blockers
- Standups not happening daily
- Doubts about whether daily standups are warranted due to perceived low productivity
- Adapting to JavaScript is still ongoing
- Writing retrospectives and standups is time-consuming
- General feeling of slow progress
- Only completed one backlog item during Sprint 4

#### ⏳ Pending Actions
- Continue unit testing (6 more components remaining)
- Finish writing unit test for `DateSelector.jsx`
- Complete Sprint 4 retrospective
- Update and publish related documentation

#### 🔜 Next Steps
- Complete and document Sprint 4 retrospective
- Update sprint_dashboard and publish Sprint 4 docs
- Finalize this standup and generate `.md` version
- Finish `DateSelector.jsx` unit test

### 🤖 ChatGPT Reflection

#### ❓ Are the next step tasks small enough to complete today?
✅ Yes. All listed tasks are achievable in one focused session:
- Retrospective + doc: ~30–90 minutes
- Standup doc: already underway
- Unit test for `DateSelector`: scoped and manageable
- Sprint 4 doc updates: feasible if limited in scope

#### ❓ What am I assuming that might be wrong?
- That minor progress doesn’t merit daily standups — even small progress is worth logging
- That standups and retrospectives must be long to be useful
- That documentation always needs high polish before it's valuable

#### ❓ What feels unclear or risky about today's tasks?
- Integration testing for `TaskTable.jsx` is a known time sink
- Testing UI behaviors like popovers and dropdowns could get tricky
- Unsure whether current workflow is sustainable if every standup needs full markdown generation

### 🧾 Results

#### 🧠 Discussion Notes
- Standups are effective, but process felt tedious with double formatting
- ChatGPT suggested a unified template combining both personal and GitHub-ready formats
- Clarified use cases for full vs. summary standup logs in the repo
- Explored but ultimately deprioritized automation (e.g. Zapier, Notion API)
- Time tracking shows ~2× faster output using optimized flow

#### 🗝️ Key Decisions
- ✅ Adopt a **new standup workflow**:
  1. Fill out Overview, Contents, and ChatGPT sections
  2. Paste into ChatGPT for feedback
  3. Document Key Decisions and Actions
  4. Ask ChatGPT to generate final `.md` file
  5. Review and upload to GitHub

- ✅ Keep **long-form standup files** in GitHub repo

- ✅ Create a **`/digests` directory** for summarized standup reviews (Agenda, Notes, Decisions, Actions)

- ✅ At project end:
  - Ask ChatGPT to batch-convert long-form standups into digest format
  - Upload both formats for archival and presentation purposes

- ✅ Skip Notion automation tools — copy/paste `.md` into Notion manually (takes <5s)

#### 📌 Action Items
- [x] Finish unit test for `DateSelector.jsx`
- [x] Complete and post Sprint 4 retrospective
- [x] Update Sprint 4 `sprint_dashboard.md`
- [X] Generate `.md` for today’s standup
- [x] Upload `.md` to GitHub in long-form folder
- [x] ✅ **New:** Create directory `/digests/` in GitHub repo
- [x] ✅ **New:** Add recurring reminder to summarize standups near end of project
- [x] ✅ **New:** At end of sprint, convert all standups into digest format for polished summary

---

## 🗓️ Standup #2 – Pull Request Start + Review ChatGPT Code Modifications

### 🧾 Overview
* **Date:** June 18, 2025  
* **Time:** 1:05 PM - 1:50 PM
* **Attendees:** Solo (Self, ChatGPT)  
* **Discussed Backlog Items:**  
  - Intro to Code Reviews & Testing  

### 📋 Contents

#### ✅ Planned Agenda
- Review and understand ChatGPT modifications to `TaskTable`, `CustomFooter`, `DateSelector`, `NameInput`, and `TimeInput`.
- Review ChatGPT-written integration tests for `TaskTable.test.jsx`.
- Finalize unit and integration tests.
- Learn about pull requests through reading/watching material instead of attempting one immediately.

#### 📈 Previous Progress
- Nearly finished writing test files for all components.
- Just one integration test for `TaskTable` and one basic test for `App` remaining.

#### 🧱 Problems & Blockers
- Over-relying on ChatGPT when feeling unmotivated or overwhelmed.
- Inexperience with Git pull requests and merge conflict resolution.

#### ⏳ Pending Actions
- Finalize testing.
- Complete integration testing quiz.

#### 🔜 Next Steps
- Write final integration test for `TaskTable` without ChatGPT assistance.
- Write basic unit test for `App.test.jsx`.
- Create quiz + exercise to review ChatGPT-written integration test logic.
- Read article or watch video about pull requests and take notes.
- Complete the integration test quiz.

### 🤖 ChatGPT Reflection

#### ❓ Are the next step tasks small enough to complete today?
- Yes. Each item is scoped and achievable: writing one test, reviewing another, reading one article/video, and writing quiz content.

#### ❓ What am I assuming that might be wrong?
- That passing tests means full understanding of how they work.
- That PR creation will be simple and error-free.
- That integrating ChatGPT code means it’s fully correct and optimal.

#### ❓ What feels unclear or risky about today's tasks?
- The pull request process—unfamiliar and possibly error-prone.
- Understanding how the tests work beneath the surface.
- Maintaining independent problem-solving instead of defaulting to AI assistance.

### 🧾 Results

#### 🧠 Discussion Notes
- Significant ChatGPT-assisted development is complete, but deeper understanding of test internals is still developing.
- The pull request process will be approached through learning today, not immediate execution.
- Standup and reflection process is maturing and helpful for reinforcing daily structure.

#### 🗝️ Key Decisions
- Will write last `TaskTable` integration test independently.
- Will create a quiz to reinforce learning from ChatGPT’s test logic.
- Will not initiate PR today—will study it instead.

#### 📌 Action Items
- ✅ Complete final integration test for `TaskTable` without AI.
- ✅ Write basic unit test for `App.test.jsx`.
- ✅ Create quiz + exercise to review ChatGPT code/test logic.
- ✅ Read or watch one resource on pull requests and take notes.
- ✅ Finish integration test quiz.


## 🗓️ Standup #3 – Almost done with Code Review + Testing!

### 🧾 Overview
* **Date:** June 19, 2025  
* **Time:** 1:00 PM 
* **Attendees:** Solo (Self, ChatGPT)  
* **Discussed Backlog Items:**  
  - Intro to Code Reviews & Testing  
  - Stat Card System  

### 📋 Contents

#### ✅ Planned Agenda
- Review progress: almost done with code review + testing, just need to write a couple of tests and take a quiz  
- Almost ready to start working on the stat card system  

#### 📈 Previous Progress
- Completed pull request and successfully merged `data_table` testing branch  
- Finished writing almost all unit/integration tests  
- Completed integration testing quiz  
- Generated a new quiz with ChatGPT assistance to reinforce React testing concepts  

#### 🧱 Problems & Blockers
- The React testing quiz is very long  
- Impulsively added the quiz, expanding the scope of the original task  

#### ⏳ Pending Actions
- Writing remaining unit/integration tests for the data table component  
- Starting integration of the stat card system  

#### 🔜 Next Steps
- Update standup instructions `.txt` file to make the process smoother  
- Take the generated React testing quiz (pass ≥ 70%)  
- Begin development on the stat card system  

### 🤖 ChatGPT Reflection

#### ❓ Summarize my last 3 standups to identify trends or concerns
- You're showing consistent, steady progress toward completing testing milestones. You've become more proactive in managing quality and learning (e.g. creating your own quiz).
- One emerging trend is a tendency toward **scope creep** due to perfectionism and a desire to deeply understand everything.
- You're managing it well, but the extended scope from “bonus tasks” like quizzes could delay momentum on core deliverables if not watched.

#### ❓ What feels unclear or risky about today's tasks?
- **The quiz**: It’s long and could eat more time than planned if you don’t timebox it.
- **Snapshot and full coverage testing**: These can turn into a rabbit hole with diminishing returns — not everything benefits equally from max coverage.
- **Branching for the Stat Card system**: There’s some risk in starting the next item before the current testing task is fully closed out.

#### ❓ Give me a confidence rating for sprint success based on current progress
- **Confidence Rating: 8/10**
  - You’re on track, having finished all critical parts of testing and ready to move into feature development.
  - Your adjustment to deprioritize non-essential test perfection and lower the quiz bar helps speed things up.
  - Focus and time management will be key to keeping velocity high through the next phase.

### 🧾 Results

#### 🧠 Discussion Notes
- ChatGPT recommends focusing on meaningful progress and avoiding rabbit holes like full test coverage.  
- Highlighted a pattern of scope creep driven by perfectionism — addressed with better boundaries.

#### 🗝️ Key Decisions
- Avoid writing snapshot tests and full function coverage tests for now  
- Lower passing score for the React testing quiz to 70%  
- Prioritize work on the Stat Card System today  

#### 📌 Action Items
- Update standup instructions `.txt` file to ease process further  
- Start ChatGPT-generated quiz for reviewing testing concepts (70% or greater to pass)
  - Finish all multiple choice and short response questions
  - Complete at least 2 coding questions
- Start developing the Stat Card System  


## 🗓️ Standup #4 – Stat Card System Boot-Up & Date Bug Debug

### 🧾 Overview
* **Date:** June 20, 2025
* **Time:** 12:40 PM - 1:20 PM 
* **Attendees:** Solo (Self, ChatGPT) 
* **Discussed Backlog Items:**  
  - Retro3: Reward System 2.0  
  - Intro to Code Reviews & Testing  
  - Stat Card System  

### 📋 Contents

#### ✅ Planned Agenda
- Wrap up Intro to Code Reviews & Testing + Reward System 2.0 backlog items  
- Start setup for Stat Card System  
- Ran into bugs with date alignment  
- Made design decisions on derived values vs state vs context  
- Begin drafting stat card component styling while investigating the bug  

#### 📈 Previous Progress
- Organized data files and component directory structure  
- Updated and fixed existing test files after refactor  
- Created a new context for evaluation system  
- Added mock stat card data file  
- Used `useMemo` in `TaskContext` to calculate and memoize time sum, then passed it as a derived prop  

#### 🧱 Problems & Blockers
- **Date Bug**: Task times are added to the wrong day (e.g., 6/15 task appears on 6/16 stat card)  
- **Performance**: Re-rendering might be happening too frequently — may indicate design inefficiency  

#### ⏳ Pending Actions
- Fix date selection + time summation bug  
- Complete final quiz for Code Reviews & Testing backlog item  
- Finalize last day of Reward System 2.0  

#### 🔜 Next Steps
- Design styling and layout draft of Stat Card components  
- Isolate and resolve the task date alignment bug  

### 🤖 ChatGPT Reflection

#### ❓ Question 1: Identify dependencies I might be missing based on today's task
- You're possibly missing consistent timezone/date parsing between task entry, calendar, and stat card rendering. Also, watch for excessive `useContext` triggers and ensure decoupling between data and layout logic.

#### ❓ Question 2: Suggest 1 improvement to my testing workflow
- Add unit + integration tests targeting date selection and derived time sums. This isolates the date bug and guards against future regressions.

#### ❓ Question 3: Rate today's standup out of 5 on quality
- **4.5/5** — great structure, thoughtful progress tracking, and reflection. Could improve clarity around short-term vs long-term planning.

#### ❓ Question 4: What feels unclear or risky about today's date?
- Debugging the date bug *while* building out stat card design may create layering problems. Suggest decoupling those steps to reduce design drift caused by logic errors.

### 🧾 Results

#### 🧠 Discussion Notes
- Highlighted need for consistent date parsing and timezone handling  
- Memoization and rendering triggers might be affecting performance  
- Testing plan will be expanded to include date-based behavior  

#### 🗝️ Key Decisions
- Try to resolve bug before designing the individual stat card component
- Organize test files -- create directory for TaskTable tests and new directory for StatCardSystem
- Write a basic unit test for the stat card component

#### 📌 Action Items
- Resolve task-to-date misalignment bug  
- Finish Code Reviews quiz
- Begin drafting stat card component structure and style  
- Organize test files -- create directory for TaskTable tests and new directory for StatCardSystem
- Write a basic unit test for the stat card component
---

## 🗓️ Standup #5 – Close to finishing stat card draft

### 🧾 Overview
* **Date:** June 21, 2025
* **Time:** 1:30 PM
* **Attendees:** Solo (Self, ChatGPT) 
* **Discussed Backlog Items:**  
  - Stat Card System  
  - Retro3: Reward System 2.0

### 📋 Contents

#### ✅ Planned Agenda
- Review progress on stat card system
- Acknowledge ongoing work on React testing quiz
- Plan for CI/CD/E2E integration without overloading immediate scope

#### 📈 Previous Progress
- Solved bug with converting string dates to Date objects
- Populated stat card container with stat cards
- Stat cards are responsive to task data changes (styling and logic)
- Some styling reflects card status dynamically

#### 🧱 Problems & Blockers
- Testing (unit and E2E) is time-consuming
- Balancing between feature creep vs. necessary improvements
- Hard to quantify performance without tooling; risk of premature optimization
- CD not needed yet, but prepping early adds scope

#### ⏳ Pending Actions
- Complete remaining coding questions in React testing quiz
- Finalize draft implementation of stat card UI and logic
- Continue to resist premature optimization/expansion unless value is clear

#### 🔜 Next Steps
- Complete 2–4 React testing quiz coding questions
- Rewrite card data structure to make testing/debugging easier
- Create three new backlog items:
  - End-to-End testing
  - CI setup
  - CD setup
- Write brief description and light subtasks for each item
- Add subtasks to E2E backlog item specifically for performance tracking
- Write and implement status count system under stat card container
- Write 1 basic unit test each for:
  - StatCardSystem
  - StatCard
  - StatusCount

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**Q:** Identify dependencies I might be missing based on today's tasks  
**A:**  
- Mocking context/props is necessary for unit tests  
- `StatCard` could benefit from `React.memo()` to reduce unnecessary re-renders  
- E2E tests require setup of a framework (e.g. Cypress or Playwright)  
- A CI runner (like GitHub Actions) is needed to automate testing  
- Status consistency is needed for reliable status count display  
- Optional: Faker.js or other tools could help if you scale up test datasets  

#### ❓ Question 2  
**Q:** Rate my responsiveness to ChatGPT suggestions so far  
**A:**  
- You're applying advice thoughtfully and critically  
- You've implemented `useMemo`, centralized calculations, and explored Context vs Props intelligently  
- You're now following through with test setup, mock data, and considering performance analysis  

#### ❓ Question 3  
**Q:** What might I be missing that could be wrong?  
**A:**  
- Potential over-rendering of stat cards if `useContext` or props aren’t memoized  
- Lack of profiling may hide performance regressions  
- Without isolating calculation logic from render logic, testing may become harder later  
- You’re managing scope well, but E2E + CD simultaneously can be taxing if not staged properly  

#### ❓ Question 4  
**Q:** Is it fair to add a backlog item for end-to-end testing, or is this just scope creep?  
**A:**  
- It’s fair and valuable, especially for resume and quality assurance  
- Key is to scope it carefully (e.g., 1–2 test flows, basic performance checks)  
- Pair it with a future CD plan, but don’t rush deployment setup — your instincts are right  

### 🧾 Results

#### 🧠 Discussion Notes
- Mock data is already in place and sufficient for testing current UI logic  
- Faker.js isn't necessary now but can be useful later for load testing  
- CD will eventually matter once the app is usable and demoable, but not a priority yet  
- Profiler usage should be baked into E2E flow for performance insight  
- Your current architecture allows for scaling and testability — strong base

#### 🗝️ Key Decisions
- Add new backlog items: CI setup, CD setup, End-to-End testing  
  - Keep item subtasks and DoD simple to maintain balance with scope creep  
  - Don’t worry about CD setup for a while (until the project is good enough to be deployed but not yet perfect)  
  - Include basic performance testing (e.g., `useMemo`, `useContext`) as part of E2E  

#### 📌 Action Items
-  Complete 2–4 of the coding questions on the React testing quiz  
-  Rewrite card data for easier testing and debugging of new feature implementations  
-  Add 3 new backlog items: End-to-End Testing, CI Setup, CD Setup  
-  Write a brief description + subtasks for each new backlog item  
-  Add basic subtasks to End-to-End testing for performance testing (e.g., memoization, context updates)  
-  Write and design the Status Count system below the StatCardSystem container  
-  Write one unit test each for StatCardSystem, StatCard, and StatusCount  

---

## 🗓️ Standup 6 – Almost done testing stat card system

### 🧾 Overview
* **Date:** June 23, 2025
* **Time:** 4:40-5:10 PM
* **Attendees:** Solo
* **Discussed Backlog Items:**  
  - Stat Card System

### 📋 Contents

#### ✅ Planned Agenda
- Explore idea of integration testing with two major subsystems: task table + stat card system
- Close to finishing testing, taking on the task above will prolong things but will ensure code is robust
- End of sprint, need to wrap up

#### 📈 Previous Progress
- Modified 3 out of 4 component files for invalid prop handling to match test cases, just need to do `StatCardSystem.test.jsx`
- Added new backlog items for CI/CD setup and E2E testing with brief descriptions
- Completed Retro3: Reward System 2.0 — it was a success

#### 🧱 Problems & Blockers
- Need to decide on integration testing between major subsystems (task table + stat card system)
- Code for the stat card system is a little more complicated so it might take some time
- There are a lot of different functions inside each of the React component files that aren't being directly tested
  - Don't know if I should export all the functions or put everything in a JS file inside the util folder
  - Don’t want to be too thorough/perfect and waste time
- Today is the last day of Sprint 5 so I will have to write + upload new documentation

#### ⏳ Pending Actions
- Finish testing & then initiate a pull request for stat card system
- Retro 5 wrap-up

#### 🔜 Next Steps
- Decide on subsystem integration tests for frontend
- Finish up writing tests for the `StatCardSystem.test.jsx`

### 🤖 ChatGPT Reflection

#### ❓ What do you think I should do about testing local helper functions used in React components, is this being too thorough at the cost of time?
- Skip testing or exporting local functions if they're simple, not reused, and already indirectly tested via component tests. Refactor later if complexity grows.

#### ❓ Identify dependencies I might be missing depending on today's tasks
- Ensure you have `@testing-library/react`, `@testing-library/user-event`, and `vitest` installed. Consider adding `msw`, `cypress`, or `playwright` for E2E testing later.

#### ❓ Give me a confidence rating for sprint success based on current progress
- 8.5/10 — Almost all work is done; just finish the final test file and write Retro5. Avoid scope creep.

#### ❓ Should I do subsystem integration tests (task table + stat card system)?
- Yes, but keep it limited in scope. Test 2–3 core flows where TaskTable updates affect StatCardSystem. Helps validate system-level behavior and provides coverage without overdoing it.

### 🧾 Results

#### 🧠 Discussion Notes
- You’re wrapping up Sprint 5 strong, with testing nearly complete and documentation tasks planned.
- Integration testing is a useful but optional enhancement — worth doing briefly now, expanding later if needed.

#### 🗝️ Key Decisions
- Don't unit test the functions or move them to a util folder script as they are not reusable and are simple enough
- Create an integration test for TaskTable and StatCardSystem but don't spend too much time on it

#### 📌 Action Items
- Finish `StatCardSystem.test.jsx`
- Start writing `TaskTable_StatCardSystem.test.jsx`

---
