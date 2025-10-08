# 🌀 Retrospective #9 – Need To Use Diagrams

## 🧭 Review
* **Dates:** September 17th - October 1 (2025)
* **Standup Participation:** 100% (15 / 15)
  * **Total Standups:** 15 days
  * **Total Days:** 15 days

* **Key Decision Follow-through**: 72.7%
  * **Key Decisions Pursued:** 32 decisions
  * **Total Key Decisions:** 44 decisions
  * **Key Decision List**:
  - [ ] Prioritize schema stabilization before touching Supabase migrations or Flask routes.  
  - [x] Documentation must include key–type definitions and error/HTTP code mapping before implementation proceeds.  
  - [ ] Accept that `Plan Submission` will spill over into next sprint; aim for partial completion by this weekend.  
  - [x] Remove `Feedback System` from this sprint and add later if `Plan Submission` is finished.  
  - [x] Treat “finish flask routing” as the high-priority deliverable for today.  
  - [ ] When sending plan record data to Supabase, assign a default value for 'Type' to temporarily solve the `NOT NULL` issue (document this problem for later).  
  - [x] Disable submit button during in-flight request; add debounce + `AbortController` for retries.  
  - [x] Sequence: Supabase (transaction) → Notion → final `sync_status` update; no parallel writes to the same row.  
  - [x] Standardize responses to be JSON-safe (ISO datetimes, no raw client objects).  
  - [x] Address race condition problems later.  
  - [ ] Manage `last_modified` attribute in Flask backend.  
  - [x] Do not implement retry functionality in React fetches for the `/api/plan-submissions` endpoint; consider lightweight retry logic in Flask only if needed.  
  - [x] Adopt helper functions to reduce repetition in response handling.  
  - [x] Replace Flask-generated IDs with deterministic UUIDs to prevent collisions for `plan` and `plan_submission` records.  
  - [x] Standardize error + service fields in all JSON responses.  
  - [x] Let Postgres handle UUID generation (`gen_random_uuid()`) instead of app-side functions.  
  - [x] Standardize date formatting early to prevent downstream errors.  
  - [x] Treat Notion POST exceptions explicitly with try/except and consistent error packing.  
  - [x] Postpone deep dive into `routes.py` testing until after the button disabling feature is working.  
  - [x] Keep ChatGPT’s refactoring changes but double-check against Supabase/Notion requirements.  
  - [x] Update API documentation in parallel with reviewing code so I don’t lose track of intended schema and response formats.  
  - [x] Won’t be using the `TaskContext.jsx` ChatGPT recommended changes — too complicated.  
  - [x] Will keep modifications for `routes.py`, `utils.py`, `submitPlans.js`, and `SubmissionButton.jsx` made by ChatGPT 
  - [x] Prioritize test stabilization before new features.  
  - [ ] Allow incremental bug fixing/testing (batch approach) to avoid being overwhelmed.  
  - [x] Redesign validation to live in a utility/helper function instead of deeply tied to submitPlans.  
  - [x] Accept AI-generated tests as a baseline, but must review line-by-line.  
  - [x] Document submission workflow via swimlane diagram before finalizing PR.  
  - [ ] Schedule at least 2 more sprints for polishing and documentation.  
  - [ ] Incrementally test files as they are created/restored.  
  - [x] Postpone any “nice-to-have” Feedback System features until core plan submission is stable.  
  - [x] Prioritize storing stat data in a context provider.  
  - [x] Break up today’s “Next Steps” into smaller increments to avoid overcommitment.  
  - [x] Use a single comprehensive evaluation card for clarity and reduced complexity.  
  - [ ] Keep StatsContext as the single source of truth for stats; feasibility logic will be computed from it, not stored separately.  
  - [x] Prioritize feature completeness (StatsContext + eval card) over perfect modularity for this sprint.  
  - [x] Error handling in `evaluateFeasibility.js` must be improved before more features depend on it.  
  - [x] Restructure `StatCardSystem` to separate presentational and logic-heavy components.  
  - [x] Investigate merging `StatsContext` and `FeasibilityContext` or ensuring one consumes the other cleanly.  
  - [x] Use **ProcessingContext** as the single combined provider for stats + feasibility evaluation.  
  - [x] Comment out old StatCardSystem logic until refactor is complete.  
  - [ ] Prioritize documentation alongside coding to avoid last-minute backlog.  
  - [x] Regression testing scope expanded to include all failed test cases that previously passed.  
  - [ ] Will create a presentation to communicate progress and remaining work.  

* **Q: Did I reserve the final sprint day for planning + retrospective?**
Mostly, I had intended on working on planning + documentation on the 2nd last day but ended up not doing that. It's going to be tight finishing everything today. Planning for the next sprint won't be the greatest.

## 📋 Summary
**Date:** Wednesday, October 1st, 2025

**What Went Well**
- Implemented a lot of new features
- Hosted standup every single day (100% participation)
- Consistently worked at least 3 hours per day on project
- Improved the design for the final UI component of the project, the evaluation/summary section
- Further reviewed ChatGPT written test cases before accepting them

**What Didn't Go Well**
- Waited until the last second to complete documentation & planning
- Hard to follow up on ChatGPT recommendations made during standup reflection Qs
- Didn't follow through with incremental testing alongside feature development
  - Caused a ripple effect of bugs, need to stay disciplined
- Made a last minute change to the design that deviates from the MVS and have yet to update anything
  - The evaluation/summary section will only include one major section instead of incorporating 3
- Got lazy again with writing unit tests and had ChatGPT write more for me

---

## 🧩 Problems

**Issues Identified**
- Jumped into code writing without previous planning
  - Have to make a lot of implementation decisions that are hard to track/are easily forgettable
  - These changes have ripple effects across different scripts, subcomponents, and subsystems
  - Need to have a consistent design!
- Not using diagrams to plan out the actual code design prior to writing anything
  - Should have used some type of UML diagram
- Don't follow up on some ChatGPT recommendations because its overwhelming when considering all the other tasks that are necessary for the day
- Procrastinating on test writing in batches caused a lot of new bugs to

**Root Cause**
- Creating diagrams takes a lot of time and often needs major updates once the implementation execution is started
  - Going back and forth between updating the diagram and writing code feels like a waste of time
- Additionally, not sure which diagrams are the best to use for each situation so sometimes I avoid it
- Writing tests is tedious/time consuming

---

## 🛠️ Solutions

**Icebox Ideas**
- Look into creating a burndown chart for next sprint to improve the planning process & management of expectations

**Proposed Solutions**
- Create drafts of the necessary diagrams, then start to implement it in code. If I identify a design decision that I hadn't previously considered, stop coding and go back to planning/diagram-creation, then repeat. 
- Do some additional research on different diagrams and there different use cases
- Continue to have ChatGPT generate test cases, just review them and request more for additional coverage
  - This way I actually batch test new features instead of waiting until the end without the tediousness of writing the tests

**Action Plan**
- Iteratively test features as development continues using ChatGPT to write base tests
- Create a data flow diagram for context providers, utility functions, and major consumers
  - https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/68ddaa51-e448-8321-b01c-8b630abd2651