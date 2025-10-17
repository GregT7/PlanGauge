# PlanGauge - Planning Assistance Tool
_Description_: PlanGauge is a full-stack planning assistant that helps users create, evaluate, and submit weekly plans through a clean, Notion-style interface. It visualizes plan feasibility using statistical metrics and dynamic color-coded feedback, then syncs finalized plans to connected Notion and Supabase databases via a Flask API.


<details>
  <summary>Table of Contents</summary>

  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [How to Install & Run](#how-to-install-&-run)
  - [How to Use Tool](#how-to-use-tool)
  - [How to Run Tests](#how-to-run-tests)
  - [Limitations](#limitations)
  - [Reflection](#reflection)
  - [Acknowledgements](#acknowledgements)
</details>

## Overview
### Use Cases
- UC-1: Create Weekly Plan — The user adds, edits, and deletes tasks in the Task Entry Table (R-2.10–R-2.15), filling out task names, categories, dates, and times. The Stat Card System updates automatically to reflect daily workload changes. (Ref: design.md – “Table Structure,” “Add New Task Demo”)
- UC-2: Evaluate Plan Feasibility — The user views live feedback through the Stat Card System and Evaluation Section, which compute daily and weekly feasibility using Z-scores (R-1.22–R-1.23). The Evaluation Section provides a summary score and detailed breakdown of contributing metrics. (Ref: design.md – “Populated State,” “Evaluation Section,” “Details Accordion”)
- UC-3: Submit Plan to External Systems — The user clicks the Submit button to send plan data to Notion and Supabase via Flask (R-5.10). A toast confirms success or failure, and the button color reflects the plan’s overall feasibility. (Ref: design.md – “Submission Swimlane Diagram,” “Submission Demo”)
- UC-4: System Launch and Data Retrieval — On startup, the app runs connectivity checks for Flask, Supabase, and Notion (R-7.40–R-7.41) and retrieves stored stats to initialize feasibility data. Toasts indicate success or failure of retrieval operations. (Ref: design.md – “Startup Process Swimlane Diagram,” “Stats Retrieval API Endpoint”)
### System Demo

### Testing Coverage
- Frontend
    - Technology: React Testing Library, Vitest, Jest
    - Quantity: 258 tests
    - Description: validates UI behavior, state updates, and real-time feedback
- Backend
    - Technology: pytest
    - Quantity: 40 tests
    - Description: confirms API correctness, data retrieval, and error handling
- System
    - Technology: Playwright
    - Quantity: ? tests
    - Description: simulates full user interactions, from plan creation to submission and system feedback

### Architecture
#### Teck Stack
- Frontend: React, Tailwind CSS, Shadcn/UI
    - React: Manages the application’s dynamic UI and state, allowing real-time updates as users modify their weekly plans.
    - Tailwind CSS: Provides a responsive and modern utility-based styling framework for consistent, adaptive layouts.
    - Shadcn/UI: Offers a good looking library for aesthetically pleasing dark mode styling design
- Backend: Flask, Notion API
    - Flask: Implements the backend logic and HTTP endpoints that process feasibility calculations, manage plan submissions, and connect to external services.
    - Notion API: Enables two-way synchronization of plan data between PlanGauge and the user’s Notion workspace.
- Database: Supabase (PostgreSQL)
    - Supabase: Stores plan submissions and plan records created using this app. Also stores previous work/productivity records that are used for statistical metric calculations. The statistical metrics are then used to compare the current plan to previous performances.

#### System Architecture Diagram

_Description:_ The system architecture connects a React-based frontend to a Flask backend that interfaces with Supabase and the Notion API, enabling real-time plan evaluation, data synchronization, and dynamic UI feedback.

![sys_architect](https://github.com/user-attachments/assets/97318bac-c3b5-407b-84d4-7f87d5691168)

#### Project Methodology
PlanGauge was developed using an adapted Agile methodology called Solo-Scrum, tailored for individual development. The project was organized into time-boxed sprints, each focused on specific backlog items derived from user stories that captured functional goals and user needs. Daily standups were documented to track progress, identify blockers, and plan next actions, while retrospectives were held at the end of each sprint to reflect on what worked well and what needed improvement. The product backlog was continuously refined to maintain alignment between requirements, testing, and implementation, ensuring steady, iterative progress toward a functional and user-centered planning assistant. Refer to the `project_journal` directory for agile documentation created throughout the development of this project.




## Project Structure
- have a table of contents for different files like mvs.md and design.md
    - title + embedded link, role, description
- explain the project_management directory + the project_journal directory

## How to Install & Run
- consider:
    - 1. creating a separate file
        - writing a brief description in place here
        - add a link to detailed file
    - 2.
        - adding a dependencies section (Notion, Supabase account)

## How to Use tool
- Explain the goal is to enter tasks into the task table and then use the feasibility categorizations to edit plans to make them mroe realistic and then send data to Notion DB when satisfied

## How to Run Tests
- pytest, vitest, playwright
- snapshot tests likely to fail
- need to install playwright, install and run from right location

## Limitations
- a lot of the database schema currently has no use
- everything is done through testing servers / no deployment
- etc

## Acknowledgements
- parents, Dr. Raymer, uncle steve, Cogan Shimizu, swe peers