# 🌀 Retrospective #10 – So Close Yet So Far..

## 🧭 Review
* **Dates:** October 2nd (2025) - October 13th (2025)
* **Standup Participation:** 83.3% (10 / 12)
  * **Total Standups:** 10 days
  * **Total Days:** 12 days

* **Key Decision Follow-through**: 76% (19 / 25)
  * **Key Decisions Pursued:** 19 decisions
  * **Total Key Decisions:** 25 decisions
  * **Key Decision List**:
    * [x] Scope for backlog documentation updates = minimum detail needed for Sprint 10 + presentation. (10/2)  
    * [x] Do not expand testing framework choice yet (leave as TBD in backlog). (10/2)  
    * [ ] Allocate 9-day window across all three backlog items with strict timeboxing to prevent scope creep. (10/4)  
    * [x] Prioritize Feedback System completion and regression testing within the first 4 days to ensure a functional base. (10/4)  
    * [ ] Begin End-to-End Testing once feasibility logic and UI behavior are stable, reserving the last 2 days for Presentation Readiness and documentation polish. (10/4)  
    * [x] Avoid adding new CI features or non-essential visual enhancements until all three items meet their Definition of Done. (10/4)  
    * [x] Refactor End-to-End Testing by removing CI-related elements and moving into extra backlog item CI Setup. (10/4)  
    * [x] Finish all unit tests before Playwright setup. (10/5)  
    * [x] Use informal e2e validation (GIF demo) as substitute for automated Playwright coverage until Sprint 11. (10/5)  
    * [x] Maintain testing scope discipline to finish on schedule. (10/6)  
    * [x] Prioritize logic completion (default color map) before UI styling tests. (10/6)  
    * [x] Proceed with Playwright setup as the next backlog item. (10/7)  
    * [ ] Defer full statistical validation until after merge fix. (10/7)  
    * [x] Document the date-calculation bug in Feedback System PR to maintain traceability. (10/7)  
    * [x] Begin Playwright setup before completing all test definitions — iterate as environment stabilizes. (10/8)  
    * [ ] Align E2E DoD with practical test coverage (connection → stats → submission). (10/8)  
    * [x] Use ChatGPT-assisted refinement for PR modified file summaries to close out backlog item faster. (10/8)  
    * [x] Proceed with an additional sprint (Sprint 11) if E2E bootstrapping isn’t stable within three days. (10/9)  
    * [x] Begin updating presentation documents (design.md, mvs.md) alongside technical debugging. (10/9)  
    * [x] Consolidate documentation into one main README. (10/10)  
    * [x] Defer advanced Playwright integration until after all core docs are finalized. (10/10)  
    * [x] Documentation will be prioritized before any further E2E setup. (10/11)  
    * [ ] Switch to vite preview instead of npm run dev for testing. (10/11)  
    * [ ] Add backend mock-data endpoint for testing mode. (10/11)  
    * [x] Create Sprint 11 to accommodate documentation and final integration work. (10/11)  
    * [x] Add one more 90-minute work block today (total 270 minutes). (10/12)  
    * [x] Create a feasibility algorithm flowchart before completing design.md. (10/12)  
    * [x] Prioritize README outline and Presentation Readiness backlog edits next. (10/12)  

  
  * **Q: Did I reserve the final sprint day for planning + retrospective?**
No, this sprint wasn't the greatest. I needed to transition to job searching and I was starting to get burnt out. This caused progress to falter and planning to be neglected.

## 📋 Summary
**Date:** Friday, October 17th, 2025

**What Went Well**
- Reworked `End-to-End Testing` to prevent scope creep (CI integration)
- Finished the `Feedback System` quickly and with clean pr documentation
- Prioritized documentation over final testing -- more important now when displaying project to employers
- Was able to update the initial project_management documentation
- Reached out to uncle Steve and got some feedback on project

**What Didn't Go Well**
- Motivation waned and progress slowed -- didn't work a lot per day
- Got stuck on e2e testing launch script -- had to learn some NodeJS
- Even after redefining `End-to-End Testing` (using ChatGPT), scope creep was still present and tasks weren't entirely clear
- Got overwhelmed/distracted easily, there's still a lot more that needs to be implemented/wrapped up
- Realized
  - it may be hard for someone to install & use project (everything is tailored for my own specific needs)
  - the projects use case might not be super clear

---

## 🧩 Problems

**Issues Identified**
- `End-to-End Testing` subtasks + DoD is not clear -- needs to be redefined again
- There are some decisions/hanging features that I would like to implement at some point that I keep forgetting about
- It's hard to understand how to install & use the project or what it even accomplishes
- Readme has not yet been written and exists only on the `e2e` branch and not main
- Need to prepare project for presentations to employers -- will be looking at my work soon (maybe)


**Root Cause**
- Used ChatGPT to redefine backlog to make it faster but didn't look over everything super closely
- Not super experienced with Node.js, need time to learn how to use it more
- I've been using `npm run dev` to launch the react testing server this whole time but this is not the best approach for end to end testing. Instead, I need to build the app but this is causing new bugs.

---

## 🛠️ Solutions

**Icebox Ideas**
- None

**Proposed Solutions**
- Add a note to readme on `main` saying it will be updated soon and the in-construction version is on the `e2e` branch
- Redefine the `e2e` backlog again -- make it more manageable
  - keep the server launch script for testing
  - keep only true e2e tests and only a couple (max 5)
- Better communicate use cases, setup, & how to use
  - Add demo gifs to readme to display how to use & what its good for
  - Create a tutorial on installation
- Add a "hanging feature" note at the bottom of my project management page in Notion

**Action Plan**
- Prioritize finishing documentation soon!
- Add tasks to sprint 11 Notion page
  - redefine e2e backlog
  - Add a note to readme on `main` saying it will be updated soon and the in-construction version is on the `e2e` branch
  - update `Presentation Readiness` backlog to include a demo in the readme
- Add a "hanging feature" note at the bottom of my project management page in Notion. Here are some ideas to populate the toggle.
  - Button doesn't fully disable when clicked
  - Want an excel sheet with VBA code for data filtering and SQL code creation to automate inserting new records into Supabase