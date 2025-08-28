# 🌀 Retrospective #7 – Follow Through & Organizational Struggles

## 🧭 Review
* **Dates:** August 19th - August 25th (2025)
* **Standup Participation:** 57%
  * **Total Standups:** 4
  * **Total Days:** 7

* **Key Decision Follow-through**: 66%
  * **Key Decisions Pursued:** 8
  * **Total Key Decisions:** 12
  * **Key Decision List**:
    * [x] (8/21) Supabase data will be wiped and repopulated cleanly
    * [x] (8/21) Old functional dependency diagram preserved for documentation
    * [x] (8/21) Flask quiz creation prioritized alongside schema reset
    * [x] (8/23) Schema will not be revised further; focus shifts to refactoring data  
    * [x] (8/23) Minimal Flask setup will be attempted this sprint to avoid total backend stagnation  
    * [x] (8/23) Prioritize database integrity over speed when reformatting stored data  
    * [] (8/24) Treat swimlane diagram as reference only, not backlog work.  
    * [] (8/24) Prioritize Intro to Flask to guarantee 1 backlog item closed.  
    * [x] (8/24) Limit Backend Setup to essentials (dependencies, project structure, `/ping` route).  
    * [x] (8/25) Move backend changes to a feature branch to avoid polluting `main`.  
    * [] (8/25) Switch swimlane diagrams to Whimsical for flexibility
    * [] (8/25) Make individual swimlane diagrams for each process instead of combining them all into one

## 📋 Summary
**Date:** Thursday, August 28th, 2025

**What Went Well**
- Finally wrote some code using flask, setting up a basic structure
- Finished the Coursera course on flask
- Created rough-draft swimlane diagram to layout the different processes that govern the application. These diagrams helped with designing flask api endpoints and will also help connecting all the subsystems together
- Hosted standup pretty consistently
- Redesigned DBMS schema so that it is finally in BCNF
- Created a functional dependency diagram for the database schema which helped me realized my design was 2NF, not BCNF!
- Pivoted plans well after realizing the database needed more work with restructuring
- Worked on multiple backlog items in the same day by breaking things up; usually I just complete one backlog item at a time because it's easier to manage things. However, now all backlog items assigned in this sprint are either done or nearly done.

**What Didn't Go Well**
- Didn't follow up on all standup task items
    - There are a lot of different areas where to-do items are held, hard to mentally manage them all
        - Notion (sprint page, backlog pages), sprintX_standups.md
    - Prior to sending my draft standup log to ChatGPT, I already have an idea of what I want to do. However, it will often add a lot of tasks that require a lot more effort and time that I am not prepared to complete.
    - Additionally, a lot of ChatGPT generated ideas are great and I want to implement them, but some aspect is hard to implement. These ideas are then forgotten with no good way of remembering or reminding myself when I am in a better position to implement things.
- Didn't realize DBMS schema was in 2NF and needed a redesign. Planning for this sprint assumed the 'Database Setup' backlog item was nearly complete, slowing down progress for other items.
- The coursera course wasn't that helpful; it focused mainly on creating an application with flask serving dynamic html files with forms which is not what I needed. The introductory codeacademycourse was way better for my purposes
- Did not update ER diagram after redesigning DBMS schema due to time constraints
- Hard to know what I am following through with vs what I am not (recommended ideas + tasks + key decisions from previous standups)
- Didn't give many presentations, mainly just did solo

---

## 🧩 Problems

**Issues Identified**
- Planning approach is a little bit disorganized
- Not following up or maintaining some previous key decisions + tasks laid out during standup meetings
- Not reserving a day at end of sprints for documentation, retrospectives and planning
- Not able to easily implement systematic changes that are recommended by ChatGPT after a daily standup meeting

**Root Cause**
- For standups, I reference a document with sample ChatGPT prompts to ask for reviewing. Some of these prompts naturally provide answers/recommendations that I am not really prepared to implement/address
- Schedule is volatile so it's hard to know when I'll have time to plan things
- Want to avoid feeling behind near the end of the sprint so I neglect planning and spend my remaining time on developing the project

---

## 🛠️ Solutions

**Proposed Solutions**
- Create a new backlog item that addresses retrospective idea implementation + documentation and planning for subsequent sprints
- Block out a section on Google Calendar for planning + retrospective on the final day of the next sprint
- Put into Notion's 'Weekly To-do' database a task for the planning day
- Don't ask ChatGPT for questions regarding systematic changes until the retrospective when I am in a better position to implement ideas. Alternatively, ask these questions but paste the ideas into a new section at the bottom of the standup.md document for review during the retrospective
- Add additional metrics onto the standup template to evaluate follow through on key decisions/tasks made during standup for each sprint
- Add another section to standup template where all key decisions are aggregated and are marked as completed [x] or not completed []
- Move sprint review metrics stored in the standup document to the retrospective document

**Action Plan**
- Add to-do items to the next sprint's page in Notion that require the last day be reserved for planning
- Block out a section of my schedule on Google Calendar for planning once the sprint dates have been decided
- Remove metric section from standup template and move to retro template
- Add follow through metrics to retro template
- Add key decision tracking section to retro template
- Create separate section on retro for ideas to review during retrospective
- Evaluate sprint 7 retro for follow through metrics
- Evaluate sprint 7 retro for key decision section on
- Create sprint 8 retro md document and add question concerning follow through on planning day reservation