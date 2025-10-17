# 📅 Sprint #10 – Finishing Up
* **Dates:** October 2nd (2025) - October 13th (2025)

---
## 🗓️ Standup 1 – First Day

### 🧾 Overview
* **Date:** Thursday, October 2nd (2025)
* **Time:** ?
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`
  - `End-to-End Testing`
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Update backlog documentation
- Continue implementing `EvaluationSection` (almost done)
- Keep October 13th deadline in mind when writing backlogs

#### 📈 Previous Progress
- Finished sprint 9 documentation
- Set up sprint 10 documentation

#### 🧱 Problems & Blockers
- Many frontend tests failing due to recent changes → needs fixes
- `ProcessingContext` currently does not provide all info needed for `EvaluationSection`

#### ⏳ Pending Actions
- Finish sprint 10 planning
- Complete `EvaluationSection` from **Feedback System** and update `ProcessingContext`

#### 🔜 Next Steps
- Update backlog documentation:
  - `Feedback System`
  - `End-to-End Testing`
  - `Presentation Readiness`
- EvaluationSection
  - Update ProcessingContext with necessary information
  - Implement subcomponents (accordions for hiding info + stat card for background)
- If time permits, resolve 1 failing test case

### 🤖 ChatGPT Reflection

#### ❓ Q1. Do you think I can finish all three backlog items in 11 days?  
- Likely yes, but only if you (1) scope test coverage tightly, (2) document at a minimal but sufficient level, and (3) don’t over-engineer diagrams/features.

#### ❓ Q2. What assumptions might be incorrect? Any missing dependencies?  
- Assumption: `ProcessingContext` changes will be quick → may take longer since EvaluationSection requires specific data shapes.  
- Dependency gap: frontend test suite needs stabilization before presentation prep (otherwise, failing tests will block readiness).

### 🧾 Results

#### 🧠 Discussion Notes
- Finish `EvaluationSection` before refining backlog docs to avoid double work
- Prioritize bug fixes over adding new test cases until core is stable

#### 🗝️ Key Decisions
- Scope for backlog documentation updates = **minimum detail needed for Sprint 10 + presentation**
- Do not expand testing framework choice yet (leave as TBD in backlog)

#### 📌 Action Items
- [x] Update backlog documentation:
  - [x] `Feedback System`
  - [x] `End-to-End Testing`
  - [x] `Presentation Readiness`
- [ ] EvaluationSection
  - [ ] Update ProcessingContext with necessary information
  - [ ] Implement subcomponents (accordions for hiding info + stat card for background)
- [ ] If time permits, resolve 1 failing test case

---

## 🗓️ Standup 2 – Halfway Through `Feedback System`

### 🧾 Overview
* **Date:** Saturday, October 4th (2025)
* **Time:** 10:20 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`
  - `End-to-End Testing`
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Almost done implementing `Feedback System` draft (without any testing done)
- Completed drafts for `End-to-End Testing` and `Presentation Readiness`
- It's probably going to take me a lot longer to finish everything & there may be issues with scope creep

#### 📈 Previous Progress
- Completed drafts for `Feedback System`, `End-to-End Testing`, and `Presentation Readiness`
- Completed around 75% of EvaluationSection for `Feedback System`
  - Finished ProcessingContext draft
  - Decided on design
  - Implemented 2 info accordions
  - Have 2 info accordions left to implement

#### 🧱 Problems & Blockers
- There may be issues with scope creep for `End-to-End Testing` (introducing CI elements)
  - But this will enhance my resume if I complete it
- Will probably take me an additional sprint to complete the three remaining backlog items
- Still haven't done any testing
- Issues with default/unknown status shading logic

#### ⏳ Pending Actions
- Implement the EvaluationSection for the `Feedback System`

#### 🔜 Next Steps
- Finish the EvaluationSection.jsx component
  - Week Score Accordion
  - Daily Score Accordion
    - Update evalFeasibility: needs to evaluate daily feasibility instead of just score, also needs to return this info
- Implement status shading for all the other subcomponents
- Start resolving regression tests (try for 5)

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**Can I complete all three backlog items in 9 days?**  
> Yes — 9 days is a realistic timeframe **if you maintain focus and structure your workflow by priority**.  
> - **Days 1–4:** Finalize the `Feedback System` — finish the `EvaluationSection`, verify feasibility calculations, and complete regression tests.  
> - **Days 5–7:** Implement `End-to-End Testing` using Playwright/Vitest; prioritize basic user flow tests before adding CI integrations.  
> - **Days 8–9:** Complete `Presentation Readiness` — finalize documentation, DoD verification, and polish visuals for the demo.  
>  
> This timeline assumes no major architectural refactors are needed and that you allocate at least one buffer day for bug fixes or regressions.  
> In summary: **achievable but requires strict timeboxing and avoiding additional features outside the original MVS scope.**


#### ❓ Question 2  
**What assumptions may be incorrect? What are today’s biggest risks?**  
> - Assuming no major refactor will be needed once feasibility evaluation logic expands.  
> - Assuming styling consistency will not cause regressions.  
> - Risk of scope creep: integrating CI into testing may delay progress.  
> - Risk of over-focusing on “polish” (presentation readiness) before verifying functionality.

### 🧾 Results

#### 🧠 Discussion Notes
- Project remains aligned with the MVS goals — feasible plan evaluation and visual feedback loop are nearly functional.  
- Core table + contexts already match requirements from MVS (`R-6.10`–`R-6.12`).  
- Adding `EvaluationSection` will complete the first end-to-end user flow from data input → evaluation → summary feedback.

#### 🗝️ Key Decisions
- Allocate the 9-day window across all three backlog items with strict timeboxing to prevent scope creep.  
- Prioritize **Feedback System completion and regression testing** within the first 4 days to ensure a functional base.  
- Begin **End-to-End Testing** once feasibility logic and UI behavior are stable, reserving the last 2 days for **Presentation Readiness** and documentation polish.  
- Avoid adding new CI features or non-essential visual enhancements until all three items meet their Definition of Done.
- Refactor `End-to-End Testing` by removing CI related elements and moving into extra backlog item `CI Setup`

#### 📌 Action Items
- [x] Backlog refactoring
  - [x] Remove CI elements from `End-to-End Testing`
  - [x] Move CI elements to `CI Setup`
- [x] Finish EvaluationSection.jsx (week + daily accordions)  
- [x] Add feasibility evaluation logic to handle daily aggregation  
- [ ] Implement consistent status shading logic  
- [x] Run 5 regression tests and record results  
- [ ] Begin documentation updates (minimal draft only)

---

## 🗓️ Standup 3 – Feedback System Testing Continued

### 🧾 Overview
* **Date:** Sunday, October 5th (2025)  
* **Time:** 5:03 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Feedback System`  
  - `End-to-End Testing`  

### 📋 Contents

#### ✅ Planned Agenda
- Used ChatGPT to refactor EvaluationSection related components and to create new tests  
- Need to continue testing to finish this backlog item  

#### 📈 Previous Progress
- Fixed all failing regression tests using ChatGPT  
- Refactored `End-to-End Testing` to decrease scope by resolving CI elements  
- Finished implementing the EvaluationSection and related subcomponents  
- Added dynamic UI changes to all subsystem containers depending on the feasibility status  
- Wrote at least one unit test for the EvaluationSystem components  

#### 🧱 Problems & Blockers
- Vibe coded the EvaluationSection refactoring, failed regression tests, and newly created unit tests  
- Have to finish everything for `Feedback System` by the end of tomorrow  
- Shading for the 'default' status is not defined in terms of logic and implementation  
- Haven't written any tests for the new frontend utility scripts  
- Learning/Setting up Playwright is part of `End-to-End Testing` & not `Feedback System`  

#### ⏳ Pending Actions
- Unit testing  

#### 🔜 Next Steps
- Handle `default` shading logic  
  - Decide on logic  
  - Implement with code  
- Testing  
  - Unit test for new util files  
  - Complete informal e2e tests & record a gif  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**What are the biggest risks for the `Feedback System` backlog item?**

The main risks involve **incomplete test coverage** and **ambiguous logic for “default” feasibility states**. Without consistent color mapping for this case, UI feedback may appear inconsistent with the rest of the evaluation framework. There’s also the risk of **scope creep** if e2e setup (Playwright) or unplanned refactors bleed into this sprint. Time pressure is the largest non-technical risk since finishing both testing and documentation by tomorrow compresses the debugging window.

#### ❓ Question 2
**Describe the trends you've noticed from the past 5 standup logs.**

Across the last five standups, several consistent trends have emerged:

1. **Testing Progression:** The project evolved from debugging regression issues to achieving consistent test coverage and now toward E2E integration, showing maturation in code reliability.  
2. **Scoping Discipline:** Repeated re-scoping (e.g., dropping CI from E2E) shows improved prioritization and practical project management.  
3. **Refactor Cycles:** The "refactor → test → refine" loop has stabilized into a predictable workflow, mirroring industry-grade iteration patterns.  
4. **Self-Pressure Indicators:** Frequent “vibe coding” and deadline compression highlight potential burnout; planning buffers should be integrated in future sprints.  
5. **Document Alignment:** Frequent synchronization between POP, MVS, and backlog updates confirms strong documentation discipline and traceability.

### 🧾 Results

#### 🧠 Discussion Notes
- The **Feedback System** is nearing completion with all components integrated and regression tests passing.  
- Most remaining issues are **testing coverage** and **UI consistency** (e.g., `default` shading logic).  
- The **End-to-End Testing** backlog item has been **de-scoped** to focus on frontend behavior and informal runs before Playwright setup.  
- Core functionality (task evaluation, feasibility logic, and status-based color feedback) now aligns with the **MVS**’s visual feedback and the **POP**’s frontend feasibility card description.  
- The testing backlog progress parallels the structure of the **TaskTable system** (TaskContext, CategorySelector, CustomFooter, etc.), meaning unit testing here sets a precedent for other UI subsystems.  

#### 🗝️ Key Decisions
- Finish all **unit tests** before Playwright setup.  
- Informal e2e validation (GIF demo) will substitute for automated Playwright coverage until Sprint 11.  

#### 📌 Action Items
- [ ] Implement `default` shading logic in feasibility color map
  - [ ] Decide on logic
  - [ ] Implement in code
- [x] Write missing unit tests for frontend utilities  
- [ ] Run informal E2E test → record GIF proof  

---

## 🗓️ Standup 4 – Still Testing `Feedback System`

### 🧾 Overview
* **Date:** Monday, October 6th (2025)
* **Time:** 10:11 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Got a little bit more testing done yesterday
- Need to finish up `Feedback System` by the end of today if I want to be on time

#### 📈 Previous Progress
- Finished writing test files for utility scripts with most passing
- Solved some additional failed regression tests

#### 🧱 Problems & Blockers
- Still have 3 tests failing from 2 different test files
- Missing test coverage for frontend/backend integration testing and informal e2e testing

#### ⏳ Pending Actions
- Implement `default` shading logic in feasibility color map
    - Decide on logic
    - Implement in code

#### 🔜 Next Steps
- Finish updating swimlane diagram for starting up process
- Fix unresolved regression tests
- Implement `default` shading logic in feasibility color map  
  - Decide on logic  
  - Implement in code
- Add test cases for system components correctly styling their respective container borders based on feasibility  
  - SubmissionButton  
  - TaskTable  
  - EvaluationSection  
  - StatCardSystem
- Add test for case sensitivity handling of feasibility keys (ie "GoOd" vs "good" vs "GOOD" etc)  
  - determineStatusStyle.js  
  - evaluateFeasibility.js

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Do you still think I can finish the 3 remaining backlog items in 8 days?**  
  Yes — it’s achievable if you focus on wrapping up testing coverage within the next two work sessions. You’ve already handled the hardest parts (backend and utility coverage). The remaining work is mostly targeted integration tests and some informal E2E validation, which are quicker to implement once structure is in place. Stay strict on scope to avoid new side tasks.

#### ❓ Question 2
- **What is the biggest mistake I've made so far this sprint?**  
  The main issue has been overextending the test scope before finalizing feature logic — particularly with frontend styling and color mapping. Locking down the logic earlier would have prevented some cascading test failures. Still, your test-driven approach has paid off overall by stabilizing the Feedback System for future sprints.

### 🧾 Results

#### 🧠 Discussion Notes
- Progress momentum improving; regression tests mostly stable  
- Only a few coverage areas left (frontend integration, case sensitivity)

#### 🗝️ Key Decisions
- Maintain testing scope discipline to finish on schedule  
- Prioritize logic completion (`default` color map) before UI styling tests

#### 📌 Action Items
- [x] Finish updating swimlane diagram for starting up process
- [x] Fix unresolved regression tests
- [x] Implement `default` shading logic in feasibility color map  
  - [x] Decide on logic  
  - [x] Implement in code
- [x] Add test cases for system components correctly styling their respective container borders based on feasibility  
  - [x] SubmissionButton  
  - [x] TaskTable  
  - [x] EvaluationSection  
  - [x] StatCardSystem
- [x] Add test for case sensitivity handling of feasibility keys (ie "GoOd" vs "good" vs "GOOD" etc)  
  - [x] determineStatusStyle.js  
  - [x] evaluateFeasibility.js

---

## 🗓️ Standup 5 – Starting e2e Testing Soon!

### 🧾 Overview
* **Date:** Tuesday, October 7th (2025)  
* **Time:** 12:57 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Feedback System`
  - `End-to-End Testing`

### 📋 Contents

#### ✅ Planned Agenda
- Done testing for `Feedback System`, just need to finish the PR request + documentation  
- Want to finally start `End-to-End Testing`

#### 📈 Previous Progress
- Implemented logic for "default" vs "unknown" shading  
- Added test cases for UI updating for feasibility for all subsystem components  
- Added case-insensitive handling for frontend functions accessing feasibility category keys ("good" → "GoOd")  
- Completed & recorded a rough e2e test: user loads → stats fetched → feasibility computed → outlines + button color update  
- Updated subtasks + DoD of `Feedback System`  
- Recorded GIFs for PR request and DoD evidence  

#### 🧱 Problems & Blockers
- Messed up merge request last time and it might happen again  
- Noticed some minor bugs:  
  - Calcs for daily evaluations organize by "Start Date" day name  
  - However, the calc does not filter for specific dates to ensure the dates on the stat card match the "Start Date"  
  - This means, that I could create plans across 5 weeks with tasks on Mondays and the time calcs would all count towards Monday even though the Stat Card corresponding to Monday is only for one specific date  

#### ⏳ Pending Actions
- None  

#### 🔜 Next Steps
- Update `Feedback System` backlog + Notion  
- Complete PR request  
  - Create GIFs  
  - Finish PR `.md` file  
  - Solve merge conflicts  
  - Finalize pull request  
  - Double check all files to ensure merge conflict resolution wasn’t messed up  
- Start implementing `End-to-End Testing`  
  - Download + setup Playwright  

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**If you had to choose the next feature to develop that would help my resume the most, what would you choose?**  
Building an **end-to-end testing system** with Playwright would have the strongest resume impact right now. It demonstrates full-stack maturity (React → Flask → Supabase → Notion), test automation, and CI/CD readiness — a clear differentiator for junior developers.

#### ❓ Question 2  
**What are the biggest risks for today’s tasks? What am I assuming that might be incorrect?**  
The main risk lies in assuming the “Monday aggregation bug” is minor — it could undermine data reliability during e2e testing. Another risk is merge conflict resolution: assuming previous PR fixes carried over without re-testing might introduce silent regressions.

### 🧾 Results

#### 🧠 Discussion Notes
- Finished all `Feedback System` testing tasks  
- e2e testing setup is the next logical milestone for validating the full frontend-backend flow  
- Need to address date filtering bug before formal e2e tests to prevent misaligned data summaries  

#### 🗝️ Key Decisions
- Proceed with Playwright setup as the next backlog item  
- Defer full statistical validation until after the merge fix  
- Document the date-calculation bug in the `Feedback System` PR to maintain traceability  

#### 📌 Action Items
- [ ] Finalize and merge `Feedback System` PR
  - [x] Record + create all gifs
  - [ ] Document bug in .md file
  - [ ] Finish PR `.md` file
  - [x] Solve merge conflicts
  - [x] Finalize pull request
- [x] Verify merge conflict fixes did not alter test behavior  
- [ ] Log and triage the daily evaluation date mismatch bug  
- [ ] Initialize Playwright configuration for `End-to-End Testing`

---

## 🗓️ Standup 6 – First Day of E2E Testing

### 🧾 Overview
* **Date:** Wednesday, October 8th (2025)
* **Time:** 11:04 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`
  - `End-to-End Testing`
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Finish PR documentation, specifically the modified files section
- Begin initial setup for E2E testing using Playwright
- Review and refine E2E subtasks + DoD for alignment with actual test goals
- Consider updating documentation alongside testing for smoother handoff
- Reassess `Presentation Readiness` to ensure deliverables match updated scope

#### 📈 Previous Progress
- Created all PR GIFs demonstrating system behavior
- Nearly finished documenting the PR (only “modified files” and bug section remain)
- Successfully merged the `feedback_system` branch into main

#### 🧱 Problems & Blockers
- Unclear list of recently modified files for PR summary section
- E2E backlog subtasks and DoD may contain redundant or outdated objectives
- Not yet confirmed if test environment setup (Flask + Vite preview) will auto-synchronize for Playwright

#### ⏳ Pending Actions
- Complete PR documentation
  - Add details on unresolved bug behavior and affected components
  - Identify all modified files from the `feedback_system` branch
- Begin E2E testing environment configuration

#### 🔜 Next Steps
- Finalize PR documentation and submit for review
- Initialize Playwright test suite (`npm i -D @playwright/test`, `npx playwright install`)
- Run first test locally and confirm successful environment boot
- Update E2E subtasks + DoD based on recent ChatGPT recommendations
- Create seed data or test-only endpoints for deterministic testing

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **What patterns or bottlenecks do you notice in my standup history?**  
  You tend to hit small blockers near transitions between phases (e.g., documentation → testing). Each new system introduction (Feedback System, E2E, etc.) takes extra time for setup and alignment, but once it’s standardized, progress accelerates sharply. The consistent bottleneck is **scope alignment** — finalizing definitions (DoD, subtasks) before moving forward.

#### ❓ Question 2
- **Which parts of the project consistently take longer than expected?**  
  Documentation and integration steps. Writing detailed PR documentation, verifying modified files, and ensuring consistency across frontend/backend interfaces often extend the timeline. However, this tradeoff results in strong maintainability and review clarity.

### 🧾 Results

#### 🧠 Discussion Notes
- The E2E testing phase should start with environment reliability (Flask + frontend sync).
- Current subtasks will be restructured to explicitly include connection health, toast verification, and Plan Submission flows.
- Documentation updates should run in parallel to testing to minimize end-of-sprint crunch.

#### 🗝️ Key Decisions
- Begin Playwright setup before completing all test definitions — iterate as environment stabilizes.
- Align E2E DoD with practical test coverage (connection → stats → submission).
- Use ChatGPT-assisted refinement for PR modified file summaries to close out the backlog item faster.

#### 📌 Action Items
- [x] Finish PR documentation (add modified files + bug note)
- [x] Install and configure Playwright environment
- [x] Verify test servers start correctly via npm scripts
- [x] Update E2E subtasks + DoD in backlog documentation
- [x] Begin first “connection health” test run
- [x] Update playwright testing workflow to `Presentation Readiness` backlog tasks

---

## 🗓️ Standup 7 – Fixing Playwright Issues

### 🧾 Overview
* **Date:** Thursday, October 9th (2025)  
* **Time:** 1:39 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `End-to-End Testing`  
  - `Presentation Readiness`  

### 📋 Contents

#### ✅ Planned Agenda
- Setup Playwright and got some basic tests to work  
- However, ran into some bugs trying to set up app bootstrapping for tests  
- It will probably take 3–4 days just to finish `E2E testing` unfortunately, may extend to an 11th sprint  
- Want to start writing up documentation now  

#### 📈 Previous Progress
- Finished PR documentation (added bug acknowledgement + changed file descriptions)  
- Downloaded & setup Playwright  
- Passed first Playwright test  
- Started working on app bootstrapping  

#### 🧱 Problems & Blockers
- App bootstrapping — script that launches both Flask + React servers and loads environment variables does not currently work  

#### ⏳ Pending Actions
- E2E testing: app bootstrapping  

#### 🔜 Next Steps
- **E2E Testing**  
  - Resolve app bootstrapping issue  
- **Presentation Readiness**  
  - Update `design.md`  
  - Update `mvs.md`  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**What assumptions am I making that may be incorrect?**  
You might be assuming that the bootstrapping issue is purely a path or `cmd.exe` error, when it could actually stem from how the script invokes environment variables or subprocesses in Windows. Another assumption is that the current folder structure will support concurrent Flask and Vite launches without cross-port interference or async handling — this may need a small delay or readiness check in the script.

#### ❓ Question 2
**What is the likelihood I complete all assigned backlog items this sprint?**  
Moderate (~60%). The E2E bootstrapping issue may extend the sprint timeline, but documentation updates and presentation materials can progress in parallel. If the core test harness becomes stable by the weekend, finishing `Presentation Readiness` by the end of Sprint 10 is still achievable.

### 🧾 Results

#### 🧠 Discussion Notes
- Playwright setup validated basic test functionality.  
- Major blocker now lies in synchronizing environment variable loading and process management across both servers.  
- Documentation efforts can begin concurrently to avoid idle time during troubleshooting.

#### 🗝️ Key Decisions
- Proceed with an additional sprint (Sprint 11) if E2E bootstrapping isn’t stable within three days.  
- Begin updating presentation documents (`design.md`, `mvs.md`) alongside technical debugging.  

#### 📌 Action Items
- [ ] E2E Testing - resolve bugs
  - [x] Debug ENOENT and subprocess handling for app bootstrapping
  - [ ] Verify `.env.test` variables load correctly for both Flask and Vite 
- Presentation Readiness
  - Update `design.md`  
  - Update `mvs.md`  

---

## 🗓️ Standup 8 – Not Making Much Progress

### 🧾 Overview
* **Date:** Friday, October 10th (2025) 
* **Time:** 11:31 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `End-to-End Testing`
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Barely got anything done yesterday due to lack of node js + playwright knowledge
- Want to prioritize presentation readiness

#### 📈 Previous Progress
- Got the test-boot.js script to launch both the flask and react servers
- Briefly researched how to write a good readme.md file

#### 🧱 Problems & Blockers
- Don't know how much detail to include in documentation or if I should write multiple readmes?

#### ⏳ Pending Actions
- Update documentation
  - mvs.md (minimum viable specifications)
  - design.md (design specifications)
- Finishing the boot launch code for playwright

#### 🔜 Next Steps
- Update Documentation
  - mvs.md
  - design.md
  - readme
- If time permits, work on test-boot.js
  - imports .env.test vars
  - explore building & launching vite preview server

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**If you were me, what would be the first thing you would alter in my work approach to improve things?**  
→ I’d shift your immediate focus from perfecting technical bootstrapping (test-boot.js) to documenting what already works. Writing clear READMEs and design specs will reinforce your understanding and highlight missing links before debugging consumes more time.

#### ❓ Question 2
**What assumptions am I making that may be incorrect?**  
→ You might be assuming the documentation needs to be split across many README files. For your current scale, one **root README.md** explaining architecture, setup, and testing is sufficient—then link to `mvs.md` and `design.md`. This keeps things cohesive and easier to maintain.

#### 🧠 Discussion Notes
- Documentation doesn’t have to be exhaustive; it should communicate how to run, test, and understand the system.
- Combining Flask and Vite servers is achievable, but prioritize reliability (launch + teardown) before Playwright automation.

#### 🗝️ Key Decisions
- Consolidate documentation into one main README.
- Defer advanced Playwright integration until after all core docs are finalized.

#### 📌 Action Items
- [ ] Documentation
  - [ ] Finish README with structure, setup, and test sections.
  - [x] Update reqs.md
  - [ ] Complete design.md draft
  - [ ] Update mvs.md draft

---

## 🗓️ Standup 9 – Barely Getting Anything Done

### 🧾 Overview
* **Date:** Saturday, October 11th (2025)  
* **Time:** 12:42 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `End-to-End Testing`  
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Work more on documentation and push off E2E testing for a little bit.  
- Updated the requirement specifications but didn’t make much additional progress yesterday.  
- Definitely won’t finish everything before October 13th — will need to create **Sprint 11**.

#### 📈 Previous Progress
- Finished updating the **requirement specifications (`reqs.md`)**.

#### 🧱 Problems & Blockers
- The **MVS** and **Design Specifications** both depend on finalized requirements, so they couldn’t progress until `reqs.md` was finished.  
- The **README** structure is still undefined, which slows down content writing.  
- Documentation interdependence is increasing the total time needed.  
- The **testing mode** for presentation readiness lacks backend implementation (mock data retrieval route or toggled API).  
- The current **`test-boot.js`** script runs with `npm run dev` instead of a built `vite preview` server, which will make E2E tests less reliable and realistic.

#### ⏳ Pending Actions
- Write and structure the **README**.  
- Update **MVS (`mvs.md`)** and **Design (`design.md`)** documents.

#### 🔜 Next Steps
- **Documentation Tasks**
  - Finish `mvs.md`.  
  - Finish `design.md`.  
  - Update `user-stories.md`.  
  - Decide on final `README` structure and add placeholder sections.

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**What assumptions am I making that may be incorrect?**
- You might be assuming that documentation tasks are parallel when they’re actually sequential. Each depends on the previous file (`reqs.md` → `mvs.md` → `design.md`). Trying to write them in parallel can cause rework and inconsistencies.  
- You’re also assuming the Vite dev server (`npm run dev`) is “good enough” for Playwright testing, but it’s not — dev mode uses hot reloads and looser module boundaries. Using `vite preview` (which runs a built production bundle) will give you more realistic and stable E2E test coverage.  
- Lastly, you might be underestimating how long these final documentation and testing setup tasks take — they’re more detail-heavy than typical coding work.

#### ❓ Question 2  
**Am I missing any dependencies for today’s tasks?**
Yes — two main ones stand out:  
1. A **backend mock-data API route** (e.g., `/api/test/seed`) or a set of JSON fixtures is needed to simulate stats data for testing and presentation mode. Without this, frontend tests will break when backend is unavailable.  
2. A clear **README outline** is needed before populating it. Defining sections first (“Project Description,” “Setup,” “Testing,” “Usage,” etc.) will make it easier to write concise and non-redundant content later.  

A smaller dependency worth noting: your `test-boot.js` script will need environment variables for the preview server (`E2E_BASE_URL`, `FLASK_URL`) once it’s updated — planning those ahead could save troubleshooting time.

### 🧾 Results

#### 🧠 Discussion Notes
- Documentation dependencies clarified — the proper order is **requirements → MVS → design**.  
- The testing environment needs to switch to a **production-style build** to ensure accurate E2E results.  
- Backend needs a **testing/mock mode** with consistent fake data for stable presentation demos.  
- The README will act as the anchor for all other deliverables, so its structure should be finalized before adding text.  

#### 🗝️ Key Decisions
- Documentation will be prioritized before any further E2E setup.  
- Switch to `vite preview` instead of `npm run dev` for testing.  
- Add backend mock-data endpoint for testing mode.  
- Create **Sprint 11** to accommodate documentation and final integration work.

#### 📌 Action Items
- [x] Finalize `mvs.md` (based on finalized requirements).  
- [ ] Finalize `design.md` (align with MVS).  
- [ ] Define and outline README structure.  
- [ ] Update `Presentation Readiness` to include backend implementation for the test mode 

---

## 🗓️ Standup 10 – Need Another Sprint

### 🧾 Overview
* **Date:** Sunday, October 12th (2025)  
* **Time:** 11:03 AM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `End-to-End Testing`  
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Continued documentation work from yesterday.  
- Still have a considerable amount of progress to make before finishing.  

#### 📈 Previous Progress
- Completed updating **mvs.md**.  
- Began work on **design.md** and identified missing structural sections.  

#### 🧱 Problems & Blockers
- Not dedicating enough consistent time to project work.  
- **design.md** currently lacks test coverage and flow visualization.  
- Need a clear flow chart for feasibility logic before finalizing.  

#### ⏳ Pending Actions
- Finalize `design.md` (ensure alignment with MVS).  
- Define and outline README structure.  
- Update `Presentation Readiness` backlog to include backend test mode logic.  

#### 🔜 Next Steps
- Focus on completing `design.md` first, then move on to the README outline.  
- Create feasibility algorithm flowchart before final draft.  
- Revise `Presentation Readiness` backlog and connect backend test toggles.  
- Work **270 minutes total today**:
  - 90 min (Session 1)  
  - 90 min (Session 2)  
  - 90 min (Session 3)

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**Why do you think progress has been slowing down recently?**  
Progress has slowed because your current tasks (documentation and flow diagrams) are less stimulating than coding, making it harder to stay engaged. They also require more organization and long-form attention, which makes procrastination easier. Structuring your sessions into smaller, focused work blocks (60–90 minutes) could help maintain flow.

#### ❓ Question 2  
**Do you think I can accomplish all my action items today given my recently sluggish performance?**  
Yes, but only with a narrowed scope. You can likely **complete the design.md structure and draft the README outline**, but finishing both with full polish (including visuals and formatting) will probably require tomorrow as well. Focus today on creating **working drafts**, not perfection.

### 🧾 Results

#### 🧠 Discussion Notes
- Reconfirmed the need for one additional sprint to wrap up documentation and testing.  
- Established clear sequencing: design → readme → presentation readiness.  
- Recognized the need to add visuals (flowchart + architecture diagram) to design specs.

#### 🗝️ Key Decisions
- Add one more 90-minute work block today (total 270 minutes).  
- Create a feasibility algorithm flowchart before completing design.md.  
- Prioritize README outline and `Presentation Readiness` backlog edits next.

#### 📌 Action Items
- [x] Define and outline **README** structure.
- [x] Update `Presentation Readiness` backlog for backend test mode logic.
- [x] Finalize **design.md** (align with MVS):
  - [x] Write component and logic descriptions.
  - [x] Fix formatting inconsistencies.
  - [x] Add feasibility algorithm flowchart.
- [x] Update other documentation
  - [x] user-stories
  - [x] sdp
  - [x] pop (just add statement saying this was done at the beginning and the design evolved over time)
- [x] work on readme
  - [x] Project Title & Description
  - [x] Table of Contents (Toggle)
  - [x] Overview
    - [x] What the application does
    - [x] Testing coverage
- [x] Work 270 minutes today:
  - [x] Session 1 – 90 min
  - [x] Session 2 – 90 min
  - [x] Session 3 – 90 min