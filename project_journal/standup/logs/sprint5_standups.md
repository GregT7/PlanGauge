# 🧭 Standup Digests Log

## 📅 Sprint #5 – Finish up Testing
* **Dates:** June 17 - June 23 (2025)
* **Total Days:** 7 days
* **Total Standups:** 
* **Standup Participation:** 

## 🗓️ Standup 1 – Refining the Standup Process

### 🧾 Overview
* **Date:** 2025-06-17
* **Time:** 10:30 AM - 11:30 AM
* **Attendees:** Greg T. (with ChatGPT feedback)
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
* **Attendees:** Greg, ChatGPT  
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
