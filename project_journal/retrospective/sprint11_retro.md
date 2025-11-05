# 🌀 Retrospective #11 – Shifted Priorities

## 🧭 Review
* **Dates:** October 17th - October 31st (2025)
* **Standup Participation:** 53.3%
  * **Total Standups:** 8 days
  * **Total Days:** 15 days

* **Key Decision Follow-through**: 82.3%
  * **Key Decisions Pursued:** 14 / 17  
  * **Total Key Decisions:** 17  
  * **Key Decision List**:
    * [x] Limit Sprint 11 scope to final documentation + testing completion, no new features. (10/17)
    * [x] Maintain lightweight sprints with shorter daily time allocations. (10/17)
    * [x] Continue using ChatGPT as a reflection and planning tool post-Sprint 11. (10/17)
    * [x] Postpone polishing of non-essential README sections until installation testing confirms that the project runs end-to-end. (10/18)
    * [x] Keep large asset files on GitHub for transparency but mark them as optional. (10/21)
    * [x] Prioritize usability polish (README clarity, mode instructions) before returning to testing. (10/21)
    * [x] Adopt a two-tier test launch approach: first confirm static server accessibility, then automate with Playwright. (10/22)
    * [ ] Finalize backlog documentation before continuing test automation. (10/22)
    * [x] Move assets to Google Drive after pull request finalization to avoid merge conflicts. (10/23)
    * [x] Keep E2E tests demo-based for now (mocked static data). (10/23)
    * [x] Postpone testing of live database/API stats retrieval until after presentation readiness. (10/23)
    * [ ] Add `.env.demo` to explicitly separate demo/test credentials. (10/23)
    * [x] Use Playwright’s `trace:on` for debugging failed tests. (10/23)
    * [ ] Define `.env.demo`, `.env.test`, and `.env.local` separation explicitly. (10/24)
    * [x] Finalize README before additional refactors. (10/25)
    * [x] Prioritize clear installation/setup steps for demo and testing reviewers. (10/25)
    * [x] Create new backlog: `Excel → SQL Tooling (DevX)` to separate scope. (10/29)

  
## 📋 Summary
**Date:** Wednesday, November 5th, 2025

**What Went Well**
- Increased sprint 11 date range to account for shifted priorities
  - Job searching is taking up most time
  - Not spending as much time on this project
  - Still finished all backlog items
- Redefined backlog scope to be more succinct and impactful
- Finally started adding entries to the `Icebox` section in Notion for documenting new ideas
- Reorganized .env setup and replaced hard coded values
- Completed readme with pretty good documentation
- Had uncle who worked in tech review project and got feedback
  - Added a demo mode for easy setup
  - Realized it's hard for anyone to really test out the project because there are a lot of dependencies which makes it hard to setup to use
- Reran regression tests and fixed all failing test cases


**What Didn't Go Well**
- Still using ChatGPT to write unit and end-to-end tests quickly
- Combined all non-secret .env variables for the frontend and backend in the same file and appended vite to the name for easy access on the frontend
- Progress felt slow
- Not sure what to do with ideas stored in the `Icebox` ideas
  - there are a lot of good ideas but it will take time to consider or implement things
  - there isn't a good way to prioritize which tasks are most impactful
    - Want some way that clearly documents my thoughts and decision making
- Scope creep: wrote a bunch of scripts `start`, `start:demo`, `demo`, etc that was not originally part of the subtask items
- It was hard to implement ChatGPT generated suggestions created during the daily standup routine because it pushed into scope creep.

---

## 🧩 Problems

**Issues Identified**
- Too many ideas, not enough time or energy
- Backlog item subtasks are not well defined, need further definition as things are starting to be worked on
  - This introduces opportunities for scope creep

**Root Cause**
- Scope creep avoidance restricts idea implementation
- Ideas start to build up and its hard to decide which ones to pursue
---

## 🛠️ Solutions

**Icebox Ideas**
- data entry table improvements
- security feature: send me an email when suspicious activity is detected on prod
<details>
  <summary>Details</summary>

- security: add email alert feature whenever suspicious activity is detected, lock things down
- desired features:
    - table
        - problem: time_estimation column records aren’t updated when submitting plans to supabase
        - easily copy and paste from notion table to app table OR load in current notion table
        - load in categories from notion with corresponding colors on launch
        - load in items from events + to-do list and automatically populate table
        - load in current items within weekly table when creating a new plan
        - be able to easily copy and paste lines of table
        - make width of columns resizable
        - when calendar is open, clicking outside just deselects the calendar, ensure nothing else can be selected, makes things less annoying
        - be able to easily copy and paste rows using highlighting, copy + paste
        - be able to easily copy and paste rows or columns using control + arrows
        - navigate columns using arrows
            - last selected cell remains selected until you click somewhere
        - have rows automatically reorder themselves based on start date in ascending order
        - when calendar date  is selected, popup goes away
        - have column widths be fixed when entering content
        - use app to complete tasks
    - load in previous plans to edit them
</details>

**Proposed Solutions**
- create a toggle under the Notion backlog table detailing backlog ideas
  - paste ideas here so I can remember them later when I have more time
- Implement different prioritization approaches at different stages of the sprint
  - Stages: before sprint, during sprint, mid-sprint checkpoint, end of sprint
  - Approaches: Impact vs. Effort Matrix, MoSCoW Method, ICE Scoring (Impact × Confidence × Ease), Weighted Shortest Job First (WSJF), The “Three Buckets” Method (for Solo Developers), Eisenhower Matrix (Urgent vs. Important)
- Stop using ChatGPT to answer questions during standup
- Redefine `Icebox` section to prioritize ideas better


**Action Plan**
- Implement prioritization approach
  - Rate tasks by Impact and Effort (1–5), compute “Priority = Impact – Effort”, and sort highest first.
  - Apply It Twice Per Sprint: during sprint planning at the start and in the middle
- create a toggle for backlog item ideas
- remove the 2nd chatgpt question from the standup template and make the first one optional
- Redefine `Icebox` section to prioritize ideas better
  - Add two columns to the Notion Icebox table:
    - Impact Score (1-5)
    - Effort Estimate (1-5)
    - Then use a formula field: Impact * 2 - Effort to auto-rank ideas.
  - Add a “Revisit Sprint #” column → schedule periodic triage (every 3 sprints).