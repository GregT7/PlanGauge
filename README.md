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

_Description_: This demo shows the app launching, performing API health checks, retrieving stats, and updating its UI from “unknown” to “good.” As the user enters plans, metrics and statuses update in real time, and new records are successfully synced to Supabase and Notion upon submission.

![system_demo](https://github.com/user-attachments/assets/23625c7a-682c-43c6-a5a8-9ebac076261f)


<details>
    <summary>
        More Details
    </summary>

This demo showcases the user launching the application and entering plans into the table interface.
During the launch process, the system performs a health check to verify connectivity with the Flask, Notion, and Supabase APIs. At the same time, the app successfully requests and receives statistical metric data. Once the data is retrieved, the interface updates accordingly — the styling transitions from red (indicating an “unknown” status) to grey (signifying “neutral”). The stat cards are then populated with average and standard deviation time values, and the evaluation section dynamically updates with these new metrics.

As the user adds new records, the outlines of all subsystems adjust to reflect overall feasibility. The stat card system also updates in real time, calculating total time values for tasks that share the same start date. The user continues to input plans for the following week until the overall status indicator turns green, representing a “good” state.

The demo continues with the user scrolling through the updated interface, showing how both the stat cards and evaluation sections appear when the system is in its optimal state. Finally, the user opens the Supabase and Notion databases — initially empty — then submits the new plan. After submission, both databases display the newly created records, confirming a successful sync between the app and the Notion productivity environment.
</details>



### Architecture
#### Teck Stack

- Frontend:
    - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
        - Manages the application’s dynamic UI and state, allowing real-time updates as users modify their weekly plans.
    - ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
        - Provides a responsive and modern utility-based styling framework for consistent, adaptive layouts.
    - ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
        - Offers a good looking library for aesthetically pleasing dark mode styling design
- Backend:
    - ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
        - Implements the backend logic and HTTP endpoints that process feasibility calculations, manage plan submissions, and connect to external services.
    - ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)
        - Enables two-way synchronization of plan data between PlanGauge and the user’s Notion workspace.
- Database:
    - ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) 
        - Stores plan submissions and plan records created using this app. Also stores previous work/productivity records that are used for statistical metric calculations. The statistical metrics are then used to compare the current plan to previous performances.
    - ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
        - Supabase uses PostgreSQL

#### System Architecture Diagram

_Description:_ The system architecture connects a React-based frontend to a Flask backend that interfaces with Supabase and the Notion API, enabling real-time plan evaluation, data synchronization, and dynamic UI feedback.

![sys_architect](https://github.com/user-attachments/assets/97318bac-c3b5-407b-84d4-7f87d5691168)

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

### Project Methodology
PlanGauge was developed using an adapted Agile methodology called Solo-Scrum, tailored for individual development. The project was organized into time-boxed sprints, each focused on specific backlog items derived from user stories that captured functional goals and user needs. Daily standups were documented to track progress, identify blockers, and plan next actions, while retrospectives were held at the end of each sprint to reflect on what worked well and what needed improvement. The product backlog was continuously refined to maintain alignment between requirements, testing, and implementation, ensuring steady, iterative progress toward a functional and user-centered planning assistant. Refer to the `project_journal` directory for agile documentation created throughout the development of this project.

## Project Structure
<details>
    <summary>
        <code>/project_journal</code>: solo-Scrum documents showing my evolution through implementing an agile environment
    </summary>

- `/assets`: stores diagrams, mockups, quiz docs, demo gifs, and other docs created during sprints
- `/backlog`: backlog item documentation for features implemented in this project
- `/professional_review`: presentation and notes from project pitch to CS professor
- `/pull_requests`: docs for completed pull requests demoing the features developed and merged
- `/retrospective`: reflections completed for reviewing and improving sprint approach for each sprint
- `/sprints`: docs for sprints including the goal, assigned backlog items, subtasks, and DoD
- `/standup`: logs for daily standups documenting previous progress, next steps, problems, ChatGPT review
</details>

<details>
    <summary>
        <code>/project_management</code>: stores documents used to design & maintain the technical aspects of the project
    </summary>

- `/api/flask_apis.xlsx`: excel document that details the flask api including example http responses, response key explanations, and http response code clarifications
- `/diagrams`: mockups, architecture diagram, FDD, ERD, and swimlane diagrams used in the current design
- `/specs`: This directory contains all formal software engineering documentation written throughout the development of PlanGauge. Each file defines the project’s requirements, rationale, and design decisions used to guide implementation.
    - `/design.md`: The Design Specification document defines the structural, visual, and behavioral blueprint for PlanGauge, bridging the project’s requirements with its implemented architecture. It includes annotated diagrams, UI mockups, and flow representations that capture how each subsystem functions and interacts.
    - `/mvs.md`: Defines the Minimum Viable Specification for PlanGauge—listing the essential features (task table, stat cards, plan summary, submission flow) required for a functioning prototype and mapping them to their requirement IDs.
    - `/pop.md`: The Project Overview Proposal detailing the motivation, scope, and predicted architecture of PlanGauge. It covers complexity across system layers, technology stack choices, and methodology (Solo-Scrum).
    - `/reqs.md`: The Requirement Specifications document defining all functional and non-functional requirements (R-X.Y) including frontend behavior, backend logic, security, and usability standards.
    - `/sdp.md`: The Software Development Plan describing lifecycle phases, sprint schedules, testing strategy, risk assessment, and documentation control procedures.
    - `timeline.xlsx`: Spreadsheet outlining the chronological schedule of development milestones, sprint durations, and deliverable deadlines. Stopped using/updating this half way through project development.
    - `/user-stories.md`: Lists user stories that express functional goals from the perspective of an end user, forming the basis for requirement traceability and backlog creation.
</details>

<details>
    <summary>
        <code>/src</code>: Contains all source code for the PlanGauge application, organized into frontend, backend, and database subsystems.
    </summary>

- `/backend`: Implements the Flask API server responsible for handling data transactions, performing validation, and bridging between the React frontend and Supabase database.
    - `/app/__init__.py`: Initializes the Flask app instance and loads configuration (e.g., environment variables, API keys).
    - `/app/routes.py`: Defines RESTful API endpoints for CRUD operations, plan submission, and Notion synchronization.
    - `/app/utils.py`: Contains helper functions for validation, data formatting, and Notion API communication.
    - `/tests/`: Houses backend unit and integration tests written with pytest.
    - `pytest.ini`: Configures test discovery paths and environment markers for pytest.
    - `run.py`: Entry point to launch the Flask development server.
- `/database`: Contains SQL scripts and schema configuration for the project’s Supabase (PostgreSQL) layer.
    - `db_setup.sql`: Creates database tables, relations, and constraints aligned with the BCNF-compliant schema defined in the design specs.
    - `row_security.sql`: Defines row-level security policies to control user access and protect plan submission records.
- `/frontend`: Implements the React + Tailwind + Shadcn/UI interface that allows users to input, visualize, and submit their weekly plans.
    - `/e2e/`: End-to-end tests using Playwright to verify full-stack functionality.
    - `/src/components/`: Stores the react components for all subsystems
    - `/src/contexts/`: Context providers like TaskContext.jsx managing global state for task data
    - `/src/tests/`: Frontend unit and integration tests written with Vitest + React Testing Library.
    - `/src/utils/`: Utility functions supporting calculations, formatting, or API requests.
    - `/src/App.jsx`: Root React component that renders the main task table and theme provider
    - `/src/App.css`: Base styling and layout rules.
    - `/src/index.css`: Tailwind + custom theme variables defining color palettes and dark mode support.
    - `/src/main.jsx`: Application entry point rendering the React root node.
</details>

- `/templates`: scaffolding for scrum documents stored in the `/project_journal/` directory

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