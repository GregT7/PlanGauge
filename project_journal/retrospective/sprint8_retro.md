# 🌀 Retrospective #8 – Two Week Sprints Are Great

## 🧭 Review
* **Dates:** September 1 - September 16 (2025)
* **Standup Participation:** 73%
  * **Total Standups:** 11
  * **Total Days:** 15 (take Sunday off)

* **Key Decision Follow-through**: 81.5%
  * **Key Decisions Pursued:** 22
  * **Total Key Decisions:** 27
  * **Key Decision List**:
    * [ ] (9/3) Subsystem Integration officially split into three new backlog items
    * [x] (9/3) Sprint extended to two weeks
    * [ ] (9/4) `/api/stats` responses will include `connected: true/false` for clarity
    * [x] (9/4) Manually calculate statistic data using excel and locally stored data to confirm the stats calculating script is accurate and add this to the DoD
    * [ ] (9/4) Establish clear policy for handling “living documents” (API Excel, diagrams)
    * [ ] (9/5) Keep “App Startup” and “UI Alerts” backlog items marked as *extra*
    * [x] (9/5) Remove sensitive test data from GitHub ASAP
    * [x] (9/6) Update API docs before writing tests to lock down schemas
    * [ ] (9/6) Use centralized API utilities in React to manage health checks
    * [x] (9/6) Update backlog documentation near end of sprint with retrospective/planning
    * [x] (9/7) Focus on completing Subsystem Integration DoD first, retry logic later
    * [x] (9/7) Commit to removing PII file before further changes
    * [x] (9/9) Prioritize fetch helper tests for `timed_fetch` and `persistent_fetch`
    * [x] (9/9) Accept that App.jsx tests may roll into tomorrow, but scaffold today
    * [x] (9/10) Assign Plan Submission as next backlog item after Subsystem Integration
    * [x] (9/10) Focus on DoD redefinition + App tests before starting PR
    * [x] (9/11) Add Plan Submission to Sprint 8 instead of starting new sprint
    * [x] (9/11) Keep sprint doc intact, update backlog/notes only (no full rewrite)
    * [x] (9/13) Limit Extra backlog pursuit to max 3 items
    * [x] (9/13) Move Idempotency Enforcement into separate backlog item
    * [x] (9/13) Create placeholder backlog for Deployment
    * [x] (9/13) Add “Review MVS compliance” to end-of-sprint and next sprint tasks
    * [x] (9/13) Complete documentation on feature branch instead of main
    * [x] (9/13) Keep `backend_setup` branch locally only as backup
    * [x] (9/15) Supabase remains system of record; Notion sync failures won’t trigger deletions
    * [x] (9/15) Use `synced_with_notion` flag + retry mechanism for robustness
    * [x] (9/15) Deprioritize diagram polish until API flow stabilizes

* **Q: Did I reserve the final sprint day for planning + retrospective?**
Yes! I finally did, it is currently 9/15/2025, or the day before the sprint ends. I finally followed up on this!
  
## 📋 Summary
**Date:** Monday, September 15, 2025

**What Went Well**
- Made sprint 2 weeks long which was more than enough time to implement all the assigned backlog items, create + update project management documentation, and plan for the next sprint. This also demonstrates an improved capacity to follow up on reflection ideas + recommendations
- Completed all backlog items originally assigned to this sprint, then added Plan Submission once finished to keep up momentum
- Took off Sunday to help preserve motivation
- Documented my pull requests pretty well with GIFS and clean diagrams
- Took some steps to prevent scope creep -- when defining new backlog items, realized when I was adding too much and started separating things into separate backlog items and labeling them as Extra in my project management app Notion
- This sprint might have had the highest standup participation out of all the sprints so far
- Actually followed through with leaving the last couple days of the sprint for documenting things, reflecting, and planning for the next sprint. I have been meaning to implement this for several sprints now.
- Thought about Extra backlog items and prioritized a max of three to work on if I get the time: Deployment, Security Setup, and external API design

**What Didn't Go Well**
- Progress felt slow
- Started adding a lot of additional extra backlog items for me to eventually implement, not sure if worth it, now I feel like I have to complete all these new items
- Only worked around 3-4 hours per day on project, could do a lot more
- Scope creep: added feasibility status styling to submission button which should be a Feedback System subtask, also added an alert system to Subsystem Integration while on the fly which was not part of the subtask list, created two swim lane diagrams when neither of these items were on any of the subtask items for backlogs assigned during the sprint, added an additional quiz to Intro to Flask with questions that were a little outside of scope
- Feels like I forgot most of the content that was covered on previous quizzes
- Got lazy near the end of writing unit tests and just had ChatGPT generate some
- Not sure when the project should be over
- Also not sure if the application will even be useful since its taking so long just to get a basic model working
- Documenting things (standup, etc) takes a long time
- Not following MVS and some features have been deprioritized over others

---

## 🧩 Problems

**Issues Identified**
- MVS out of date and not being followed
- Scope creep is a big problem
- Not sure if application will even be useful
- Not working more than 4 hours a day on project

**Root Cause**
- It's hard to determine which features are the most important to implement at the beginning of the design process when considering the time + effort required to create vs the value provided
- Not working as much on project because I always work at a coffee shop and once I return home, I default to watching TV/YouTube. Also, the effects of caffeine starts to wear off so I am not as motivated during this time.
- Additionally, I have other tasks I am trying to accomplish alongside this project.
- When defining subtasks for backlog items, I get really excited about the idea of new features or implementation details and add too many things. Additionally, caffeine makes me think I can achieve more than I historically do.
- It's difficult to evaluate the usefulness of the application when it's not in a semi complete state and it's taking a long time just to get it there.

---

## 🛠️ Solutions

**Icebox Ideas**
- No new ideas were added this sprint, forgot to implement it again

**Proposed Solutions**
- Have tech writer/software developer uncle try out application when its in a ready state to get feedback on usefulness and other flaws. Additionally, follow up with CS professor and get an additional review. This will help me evaluate the application's effectiveness and potential improvements that could be made.
- Make my own coffee initially in the morning, work at home for 2-3 hours, THEN head to Starbucks (this way I still work at Starbucks for 3-4 hours, am caffeinated + motivated the whole time, and work an additional 2-3 hours before returning home with the want to play video games)
- Add the questions to undefined backlog items at the bottom of the Notion page: are all subtasks and DoD items essential? is there any room for scope creep? before finalizing things.

**Action Plan**
- Create new backlog item for professional review, label it as Extra, but move it up on the prioritized Extra list
- Add the two questions concerning scope creep to the remaining essential backlog items: Plan Submission, Feedback System, End-to-End Testing, and Presentation Readiness
- Update the MVS to make things more accurate and define an official 'good enough' state.
- Try making coffee at home and working for 2-3 hours before going to Starbucks and seeing how I like it