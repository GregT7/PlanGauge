# Software Development Plan

## Administrative


## SDLC
* Agile Methodology: Solo-scrum (made up)
* Project Management Platform: Notion
* Work Schedule: 3 hours per day, 6 days a week
* Testing: Incremental unit testing, integration testing, and End-to-End tests will be used to ensure the functionality and quality of the project during each sprint.
* Project Management: MSV, Software Development Plan (timeline, milestones, extras, backlogs), Project Overview Proposal (tech stack, methodology), Design Specifications, Requirement Specifications
* User Stories: User stories will be collected from the perspective of me as the user, developer, and owner
* Sprint Planning and Execution
  * Duration: Roughly 1 week
  * Contents: Goals, Backlog, Definition of Done (DoD), Retrospective, Daily Standup (with parents)
* Documentation Plan
  * Project management will be handled using Notion including sprint details, standup, retrospectives, and more
  * At the conclusion of the sprint, all content will be formatted and uploaded to GitHub for employers to see my work ethic and process


## Milestones & Backlogs
### MVS
| No | Milestone               | Backlog                          | Description                                                                 |
|----|-------------------------|-----------------------------------|-----------------------------------------------------------------------------|
| 1  | Initial Setup           | Project Setup                     | Initialize Git, install dependencies, basic folder structure               |
|    |                         | Intro to Scrum                    | Learn agile basics and team workflow                                       |
| 2  | Planning Core UI        | UI/UX Foundation                  | Set up the basic design system, layout, and visual components              |
|    |                         | Data Entry Table                  | Implement a dynamic Notion-style table for planning                        |
|    |                         | Settings Toggle                   | Toggle for manual vs. ML-based task durations                              |
| 3  | ML Model Integration    | Time Estimation Autofill          | Auto-fill time predictions based on task type                              |
|    |                         | Task Duration Prediction Model    | Set up and connect the ML model                                            |
| 4  | Core App Infrastructure | Notion API Integration            | Set up communication to send data to Notion                                |
|    |                         | Backend Integration               | Connect frontend with backend and services                                 |
|    |                         | Database Setup & Integration      | MongoDB setup for storing data and predictions                             |
| 5  | Planning Feedback View  | Stat Card System                  | Visual feedback on daily status (cards)                                    |
|    |                         | Feedback System                   | Overall plan feedback and visual status (color-coded summaries)            |


### Extras
| No | Milestone              | Backlog                    | Description                                                       |
|----|------------------------|----------------------------|-------------------------------------------------------------------|
| 1  | Environment Setup      | Docker Setup & Integration | Containerize the app for easier local development and deployment  |
| 2  | Convenience & Polish   | Tooltip                    | Add hover-over tips to guide the user                             |
|    |                        | Convenience Features       | Minor UX improvements (e.g., better defaults, shortcuts)          |
| 3  | Extended UI Control    | Settings Page              | Page for additional app configurations and preferences            |
| 4  | Data Insights          | Stats Page                 | Aggregate visualization page for metrics and trends               |


## Timeline
| Sprint | Week # | Milestone                         | Tasks                                                                 |
|--------|--------|-----------------------------------|-----------------------------------------------------------------------|
| 1      | Week 1 | 🔧 Project Initialization          | Project Setup, UI/UX Foundation, Intro to Scrum                      |
| 2      | Week 2 | 🧾 Core Input & Display            | Data Entry Table, Settings Toggle, Time Estimation Autofill          |
| 3      | Week 3 | 🔗 Integration + Intelligence      | Notion API Integration, Task Duration Prediction Model, DB Setup     |
| 4      | Week 4 | 📊 Results + Feedback              | Stat Card System, Feedback System, Backend Integration               |
