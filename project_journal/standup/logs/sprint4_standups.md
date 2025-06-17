# 🧭 Standup Reports Log

## 📅 Sprint #4 – Documentation  & Testing
* **Dates:** June 10 - June 16 (2025)
* **Total Days:** 7 days
* **Total Standups:** 4
* **Standup Participation:** 57%

---

## 🗓️ Standup 1 – Personal vs Professional Documentation

### 🧾 Overview
* **Date:** June 11, 2025
* **Time:** 4:00 PM
* **Attendees:** Dad
* **Discussed Backlog Items:**  
  - Retro3: Reward System 2.0
  - Documentation Catchup

### 📋 Contents

#### ✅ Planned Agenda
1. Almost done with the documentation catch up backlog item
2. Retrospective 3
    1. Completed Notion and .md files
    2. Creating new backlog item to help me implement ideas
    3. Plan on improving and using the previously designed motivational plan created last sprint
3. Introduce other backlog items that will be addressed this sprint
    1. Intro to code review & testing
    2. Documentation catchup
    3. Stat card system
    4. Retro3: Improved Reward System

#### 🧠 Discussion Notes
1. Some of my documentation details and backlog items are unnecessary or a little bit personal, may want to consider removing these items
    1. ie reward system 2.0, sprint 3 retrospective
    2. employers don't care about the personal details of how you manage the project, they just care if you have the capability to do the job well
3. Introduction slides are not helpful during presentation, only wants to see the timeline graph
4. Asked for another explanation of stat card system
5. Project is estimated to be completed in around 3-4 weeks
6. Plan on using ChatGPT as a substitute for daily standups when parents go on vacation in Europe
7. Close to finishing documentation backlog item
8. Added two new backlog items

### 🧾 Results

#### 🗝️ Key Decisions
1. Start packaging action plan for retrospectives into a separate backlog item
2. Feel free to package large additional amounts of work into new, separate backlog items
3. For now, keep some of the personal details and remove them later if need be
4. Presentations will be focused on creating high level details on project to adapt content to audience

#### 📌 Action Items
1. Complete documentation catchup backlog item today
2. Start working on motivation/reward system document

---

## 🗓️ Standup 2 – First ChatGPT Standup

### 🧾 Overview
* **Date:** June 13, 2025
* **Time:** ~10:00 AM
* **Attendees:** Greg (solo) + ChatGPT
* **Discussed Backlog Items:**  
  - Code Review & Testing  

### 📋 Contents

#### ✅ Planned Agenda
- Review and refine current approach to asynchronous standups using ChatGPT
- Submit current notes for feedback and make edits based on suggestions
- Shift focus from documentation-heavy tasks to more implementation and technical backlog items

#### 🧠 Discussion Notes
- Hosted first standup using ChatGPT
- Created a standup document in `.txt` format using the same presentation-style format, then pasted results into ChatGPT for feedback and formatting help
- ChatGPT recommended improving clarity by adding framing statements to each section
- Requested ChatGPT to recreate the `.txt` document with suggested improvements
- Noted that the presentation-style and log-style formats approach standups differently — translating between them may require adaptation
- Added estimated timelines to each item in the Next Steps section

### 🧾 Results

#### 🗝️ Key Decisions
- No need to over-engineer standup documentation with additional narrative framing; the current approach is sufficient
- Continue writing both presentation-style and log-style versions of standups, then pass to ChatGPT for refinement
- Start incorporating rough timeline values into Next Steps and task tracking

#### 📌 Action Items
- Create a new branch specifically for data table testing (6/13)
- Delete temporary or outdated testing files from the main branch (6/13)
- Find a comprehensive article on testing with Vitest and React Testing Library (6/13)
- Read the article (6/14)
- Use ChatGPT to generate a 20-question quiz based on the article (6/13)
- Take quiz and score at least 75% before continuing (6/14)

---

## 🗓️ Standup 3 – Testing Research

### 🧾 Overview
* **Date:** June 14, 2025
* **Time:** 7:00 PM
* **Attendees:** Greg (solo) + ChatGPT
* **Discussed Backlog Items:**  
  - Code Review & Testing  

### 📋 Contents

#### ✅ Planned Agenda
- Host 2nd ChatGPT-based standup and receive feedback on approach
- Publish recent standups to avoid falling behind
- Researched unit and integration testing — ready to begin writing tests

#### 🧠 Discussion Notes
- Created presentation-style standup in `.txt` format with sections: Agenda, Previous Progress, Problems & Blockers, Pending Actions, Next Steps
- Submitted standup to ChatGPT for review and received detailed feedback:
  - Revised wording to improve clarity and tone
  - ChatGPT provided 5 improvement suggestions:
    1. Add a fallback goal for the unit test in case it’s too difficult
    2. Set a deadline for finalizing integration testing decision
    3. Decide whether to defer the Stat Card System to next sprint or define a scaled-down version that’s still doable
    4. Start estimating how much time today’s action items will take
- Asked ChatGPT for feedback on using it more effectively for standups. It recommended:
  1. Ask a recurring set of reflection questions to improve scope and risk awareness
  2. Ask questions that simulate team interaction or stakeholder input
  3. Use consistent standup formatting to improve parsing and feedback quality
  4. Add lightweight metrics (e.g., task confidence or commit intent)
  5. Occasionally simulate stakeholder reviews or questions to gain outside perspective

### 🧾 Results

#### 🗝️ Key Decisions
- Begin incorporating questions from both lists into future standups and retrospectives
- Integration testing will be implemented this sprint
- Added fallback goal to today’s task list for unit test progress
- Will *not* include time estimates in standup for now
- Chose not to track lightweight standup metrics — information overload risk
- Will likely explore the idea of stakeholder-style questions later on
- Plan to reuse some ChatGPT reflection questions in the next sprint retrospective

#### 📌 Action Items
- Document and commit standup notes for 6/13 and 6/14 to GitHub
- Complete and commit one unit test by end of day
- **Fallback:** If blocked on writing a full test, isolate the logic into a scratch file and manually verify expected behavior using `console.log`
- Add today's testing results for the unit testing review to sprint 4's assets folder

---

## 🗓️ Standup 4 – Refining the Standup Process

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
- [ ] Finish unit test for `DateSelector.jsx`
- [ ] Complete and post Sprint 4 retrospective
- [ ] Update Sprint 4 `sprint_dashboard.md`
- [X] Generate `.md` for today’s standup
- [x] Upload `.md` to GitHub in long-form folder
- [x] ✅ **New:** Create directory `/digests/` in GitHub repo
- [x] ✅ **New:** Add recurring reminder to summarize standups near end of project
- [x] ✅ **New:** At end of sprint, convert all standups into digest format for polished summary
