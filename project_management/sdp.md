# Software Development Plan

## Administrative
* Work Schedule
  * School: ~ 60 mins per week until the final semester is over
  * Post-graduation: to be determined...



## SDLC
* Agile Methodology: Water-Scrum-Fall (Implemented AFTER graduation)
* Project Management Platform: Notion
* Testing: Incremental unit testing, integration testing, and End-to-End tests will be used to ensure the functionality and quality of the project during each sprint.
* Project Management: MSV, Software Development Plan, Project Overview Proposal, Tech Stack/Architecture, Milestones, and Timeline will be created up front and provide the backbone for development. However, these living documents will be updated frequently to reflect the status of the project with each sprint.
* User Stories: User stories will be collected from the perspective of me as the user and me as the developer
* Sprint Planning and Execution
  * Duration: To be determined...
  * Contents: Goals, Backlog, Definition of Done (DoD), Review, Retrospective


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
| No | Milestone                  | Backlog                          | Description                                                                  |
|----|----------------------------|-----------------------------------|------------------------------------------------------------------------------|
| 1  | UX Polish                  | Animated Color Transitions        | Visual polish with smooth animations                                         |
|    |                            | Hover Effects & Transitions       | Subtle feedback for UI interactions                                          |
|    |                            | Full Dark Mode Support            | Match system theme and dark UI toggle                                        |
|    |                            | Responsive Horizontal Layout      | Optimize layout for wide screens                                             |
| 2  | Advanced Stats & History   | Stats Page with Filters           | Historical overview of past plans                                            |
|    |                            | Weekly Time Comparisons           | Weekly breakdowns to see consistency or changes                              |
|    |                            | Tooltip Showing Past Metrics      | Hover info showing avg/previous time per task                                |
| 3  | Smarter ML Integration     | Auto Model Retraining             | Retrain the prediction model on new data                                     |
|    |                            | Stat Card Weight Settings         | Let users adjust how different stats affect plan status                      |
| 4  | Robust Syncing             | Column Restriction Sync           | Enforce data integrity with Notion column constraints                        |





## Timeline
| Deliverable       | Date |
| -----------       | ---- |
| MVS               |  x/x |
| Milestones        |  x/x |
| Requirement Specs |  x/x |
| Design Specs      |  x/x |
| Gantt Chart       |  x/x |