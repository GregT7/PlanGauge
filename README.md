# PlanGauge - Planning Assistance Tool
_Description_: PlanGauge is a full-stack planning assistant application that helps users create, evaluate, and submit weekly plans through a clean, Notion-style interface. It visualizes plan feasibility using statistical metrics and dynamic color-coded feedback, then syncs finalized plans to connected a connected Notion table (database) where todo tasks for the week can be managed. The app has an authentication feature that permits role-based access to users granting them the capacity to submit real plan data, retrieve real statistical data, and test connections to peripheral systems. The app is currently deployed to the cloud and is accessible via this link: https://plan-gauge.vercel.app/. If you would like a temporary login which would grant you access to some additional privileges/features, email me: gregterrelga@gmail.com


<details>
  <summary>Table of Contents</summary>

  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [How to Install](#how-to-install)
  - [How to Use Tool](#how-to-use-tool)
  - [Other](#other)
    - [Testing](#testing)
    - [Limitations](#limitations)
    - [Assets Relocation](#assets-relocation)
    - [Acknowledgements](#-acknowledgements)
</details>

---

## Overview
### Use Cases
_Description:_ The system allows users to create, evaluate, and submit weekly plans through an interactive task table that provides real-time feedback on workload and feasibility. It automatically calculates and displays plan feasibility using statistical metrics, then conditionally syncs finalized plans to external systems such as Notion and Supabase based on the user’s authenticated role. On launch, the application verifies backend and integration connectivity, loads stored feasibility data, and determines the user’s authentication state and role to establish the appropriate system mode (visitor, guest, or owner). Throughout the session, role-based access controls govern available features, substituting mock data and processes when permissions are restricted, while secure sessions preserve authentication state across refreshes until logout, expiration, or revocation.

<details>
    <summary>
        More Details
    </summary>
    
- UC-1: Create Weekly Plan — The user adds, edits, and deletes tasks in the Task Entry Table (R-2.10–R-2.15), filling out task names, categories, dates, and times. The Stat Card System updates automatically to reflect daily workload changes. (Ref: design.md – “Table Structure,” “Add New Task Demo”)
- UC-2: Evaluate Plan Feasibility — The user views live feedback through the Stat Card System and Evaluation Section, which compute daily and weekly feasibility using Z-scores (R-1.22–R-1.23). The Evaluation Section provides a summary score and detailed breakdown of contributing metrics. (Ref: design.md – “Populated State,” “Evaluation Section,” “Details Accordion”)
- UC-3: Submit Plan to External Systems — The user clicks the Submit button to send plan data to Notion and Supabase via Flask (R-5.10). A toast confirms success or failure, and the button color reflects the plan’s overall feasibility. (Ref: design.md – “Submission Swimlane Diagram,” “Submission Demo”)
- UC-4: System Launch and Data Retrieval — On startup, the app runs connectivity checks for Flask, Supabase, and Notion (R-7.40–R-7.41) and retrieves stored stats to initialize feasibility data. Toasts indicate success or failure of retrieval operations. (Ref: design.md – “Startup Process Swimlane Diagram,” “Stats Retrieval API Endpoint”)
- UC-5: Authenticate User and Manage Session Lifecycle — The user clicks the Login button to open the Login Modal, submits email and password credentials, and receives loading and success/error toast feedback while the system searches for a matching user record by email and compares the hashed password input to the stored password hash (R-8.10–R-8.18, R-8.50–R-8.52). On success, the system creates a session, issues a secure cookie, and preserves authentication state across refreshes until logout, expiration, or revocation (R-8.20–R-8.23, R-8.42–R-8.44). (Ref: design.md – “Login Process Swimlane,” “Login Modal,” “Session Lifecycle”)
- UC-6: Enforce Role-Based Access and Conditional System Behavior — After authentication, the system retrieves the user’s role attribute from the database record and applies it as the active application role (“owner” or “guest”), while unauthenticated users retain the default “visitor” role (R-9.10–R-9.15). Based on the retrieved role, the application enables or restricts features such as plan submission, real data retrieval, and system health checks, substituting mock data and mock processes where permissions are limited (R-9.11–R-9.36). (Ref: design.md – “RBAC Matrix,” “Mode Display,” “Mock Processes”)

</details>

### System Demo

_Description_: This demo shows the app launching, performing API health checks, retrieving stats, and updating its UI from “unknown” to “good.” As the user enters plans, metrics and statuses update in real time, and new records are successfully synced to Supabase and Notion upon submission. Demo does not include any authentication/role-based-access features.

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
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) ![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=for-the-badge&logo=shadcnui&logoColor=white) ![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) ![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<details>
    <summary>
        More Details
    </summary>

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
- Deployment:
  - ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
    - Hosts the frontend, react app.
  - ![Render](https://img.shields.io/badge/Render-000000?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
    - Hosts the backend flask app containerized with docker and running with gunnicorn
  - ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
    - Containerizes the flask app
  
</details>

#### System Architecture Diagram

_Description:_ The system architecture connects a React-based frontend to a Flask backend that interfaces with Supabase and the Notion API, enabling real-time plan evaluation, data synchronization, and dynamic UI feedback.

![sys_architect](https://github.com/user-attachments/assets/4076d756-7bc9-474c-aed8-64a156406570)

#### Dependencies (for local setup)
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![npm](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white) ![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white) ![pip](https://img.shields.io/badge/pip-3775A9?style=for-the-badge&logo=pypi&logoColor=white) ![Google](https://img.shields.io/badge/Google-4285F4?style=for-the-badge&logo=google&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white) ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white)

<details>
  <summary>More Details</summary>

- Git  
  Git is required for version control and cloning the PlanGauge repository.  
  - Install from [https://git-scm.com/](https://git-scm.com/).  
  - Used for managing commits, branches, and synchronizing local changes with GitHub.  

- Node.js & NPM  
  Node.js and its package manager (NPM) are required to run the React frontend.  
  - Download from [https://nodejs.org/](https://nodejs.org/) (LTS version recommended).  
  - Used to install dependencies, run development servers, and execute build/test scripts.  

- Python  
  Python (version 3.10 or later) is required to run the Flask backend.  
  - Install from [https://www.python.org/downloads/](https://www.python.org/downloads/).  
  - Used to launch the API, handle predictions, and manage database requests.  

- Google Account  
  A Google account is required to access Notion authentication setup and any integrated cloud services (if applicable).  
  - Used for identity verification, environment configuration syncing, and potential API access (e.g., Google Drive or OAuth).  

- Supabase Account (Free Tier)
  A Supabase account is needed to store and retrieve data.  
  - Create a new Supabase project and note the API URL and anon key.  
  - Used by the Flask backend to persist plan statistics and user data.

</details>

### Project Methodology
PlanGauge was developed using an adapted Agile methodology called Solo-Scrum, tailored for individual development. The project was organized into time-boxed sprints, each focused on specific backlog items derived from user stories that captured functional goals and user needs. Daily standups were documented to track progress, identify blockers, and plan next actions, while retrospectives were held at the end of each sprint to reflect on what worked well and what needed improvement. The product backlog was continuously refined to maintain alignment between requirements, testing, and implementation, ensuring steady, iterative progress toward a functional and user-centered planning assistant. Refer to the `project_journal` directory for agile documentation created throughout the development of this project.

---

## Project Structure
<details>
    <summary>
        <code>/project_journal</code>: solo-Scrum documents showing my evolution through implementing an agile environment
    </summary>

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
    - `/app/auth_utils.py`: Utility functions used for enforcing authentication when making api requests to the flask app.
    - `/app/clients.py`: Helper functions used to retrieve a temporary supabase object or attach headers for notion requests.
    - `/app/routes.py`: Defines RESTful API endpoints for CRUD operations, plan submission, and Notion synchronization.
    - `/app/utils.py`: Contains helper functions for validation, data formatting, and Notion API communication.
    - `/tests/`: Houses backend unit and integration tests written with pytest.
    - `Dockerfile`: Containerizes flask, installs python dependencies, and starts flask app with gunnicorn
    - `pytest.ini`: Configures test discovery paths and environment markers for pytest.
    - `run.py`: Entry point to launch the Flask development server.
- `/database`: Contains SQL scripts and schema configuration for the project’s Supabase (PostgreSQL) layer.
    - `db_setup.sql`: Creates database tables, relations, and constraints aligned with the BCNF-compliant schema defined in the design specs.
    - `init_records.sql`: Script to initialize most of the relational tables with sample data, helpful if you want to create your own supabase account.
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

---

## How to Install Locally
> Note: Complete setup for cloning the repo, installing dependencies, integrating Notion + Supabase, and setting up environment files.

<details>
  <summary>More Details</summary>

1️⃣ Clone the repository
   ```
   git clone https://github.com/GregT7/PlanGauge.git
   ```

2️⃣ Install frontend dependencies (run these lines individually)
   ```
   cd PlanGauge/src/frontend
   npm install
   npm audit fix
   ```

3️⃣ Install backend dependencies (run these lines individually)
   ```
   cd PlanGauge/src/backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```

4️⃣ Setup Notion
   1. Create or log into your Notion account.
   2. Create a new page.
   3. Add a database within that page.
   4. Create a new integration under [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
   5. Grant the integration full access to your database.
   6. Copy and store your Notion API key for later use.

5️⃣ Setup Supabase
   1. Create a free account at [https://app.supabase.com](https://app.supabase.com).
   2. Run the SQL scripts in `/PlanGauge/src/database/` in order:
      1. `db_setup.sql` — Initializes database tables.  
      2. `row_security.sql` — Enables row-level security (prevents unauthorized access).  
      3. `init_records.sql` — Populates dummy records (optional).
   3. Note your Project URL and anon public key for the `.env` file.

6️⃣ Setup environment files
  1. Ensure the general env files are already setup
  2. Create backend .env file (for api keys)
      1. Navigate to `/PlanGauge/src/backend`
      ```
      cd /PlanGauge/src/backend
      ```

      2. Copy & paste into new `.env.local` file
      ```
      SUPABASE_URL = 
      SUPABASE_KEY = 
      NOTION_API_KEY = 
      NOTION_PAGE_ID = 
      NOTION_DB_ID = 
      NOTION_VERSION = "2025-09-03"
      ```

  3. Find API keys / info for Notion & Supabase and update `/PlanGauge/src/backend/.env.local` file
   - `SUPABASE_URL`  
     - _Description_: The unique base URL endpoint for your Supabase project.  
     - How to find:
       1. Log in to [https://app.supabase.com](https://app.supabase.com)
       2. Select your project.
       3. Go to Project Settings → API.
       4. Copy the Project URL.
     - Example:
       ```
       SUPABASE_URL=https://abcde12345.supabase.co
       ```

   - `SUPABASE_KEY`  
     - _Description_: Your Supabase authentication key — typically the “anon public” key.  
     - How to find:
       1. In Project Settings → API, scroll to Project API Keys.
       2. Copy the anon public key.
     - Example:
       ```
       SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       ```

   - `NOTION_API_KEY`  
     - _Description_: The token for your internal integration used to access Notion’s API.  
     - How to find:
       1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
       2. Create a new integration (e.g., “PlanGauge”).
       3. Copy the Internal Integration Token.
       4. Share your Notion page/database with this integration.
     - Example:
       ```
       NOTION_API_KEY=secret_qwerty123456789abcdef
       ```

   - `NOTION_PAGE_ID`  
     - _Description_: The 32-character ID for the Notion page you want PlanGauge to sync.  
     - How to find:
       1. Open the Notion page in your browser.
       2. Copy the 32-character string at the end of the URL.
     - Example:
       ```
       NOTION_PAGE_ID=abcdef1234567890abcdef1234567890
       ```

   - `NOTION_DB_ID`  
     - _Description_: The ID of your Notion database used for plan synchronization.  
     - How to find:
       1. Open your Notion database in your browser.
       2. Copy the 32-character string before `?v=` in the URL.
     - Example:
       ```
       NOTION_DB_ID=1234567890abcdef1234567890abcdef
       ```

   - `NOTION_VERSION` = "2025-09-03"  
     - _Description_: Specifies the Notion API version for compatibility.  
     - How to find:
       - Refer to [Notion’s API versioning documentation](https://developers.notion.com/reference/versioning)
     - Example:
       ```
       NOTION_VERSION="2025-09-03"
       ```
</details>

---

## How to Use Tool
### 1️⃣ Navigate to website
1. Navigate to this website: `https://plan-gauge.vercel.app/`

### 2️⃣ Login
1. Click the login button to spawn the dialogue input form
2. Locate guest user credentials (email and password)
3. Enter in user credentials and hit submit
4. A loading toast will appear and resolve indicating either failure or success
5. If successful, there will be a display with text: "Mode: Guest" at the top of the app.

### 3️⃣ Create or Edit Weekly Tasks
1. Use the Notion-like task table to enter your weekly goals.  
   Each row represents a task with the following fields:
   - Task Name – Short description of your task.
   - Category – Choose from pre-defined options (e.g., Health, Career, School).
   - Start / Due Date – Select using the date picker.
   - Estimated Time – Enter manually or let the backend predict time (future feature).
2. Add new tasks using the “+ New Page” button at the bottom of the table.
3. Tasks update automatically as you edit fields — no need to manually save.

### 4️⃣ Review Daily and Weekly Feasibility
**Note**: Guest users will get up to date statistical data loaded
- Each day displays a stat card showing:
  - The total planned time for that day.
  - A color-coded status:
    - 🟢 Good – Within target range.
    - 🟡 Moderate – Under or near threshold.
    - 🔴 Poor – Exceeds predicted workload limit.
- At the bottom, a Plan Summary indicator shows the overall feasibility rating for the week.

### 5️⃣ Submit Your Plan
**Note:** Restricted to owner only, for guest users a mock plan submission will occur which only renders a loading toast
When satisfied with your plan, click the Submit button.  
This will:
1. Send your plan data to the Flask backend.  
2. The backend will:
   - Store your plan data in Supabase for long-term tracking.
   - Sync your updated plan to Notion, ensuring your Notion workspace stays up-to-date.
3. A temporary status message will confirm if the sync succeeded or failed.

### 6️⃣ Adjust, Track, and Improve
- You can adjust your plan anytime; simply edit the table and re-submit.
- Future versions will incorporate your Supabase data to refine time predictions for similar task types.
- Use color trends and stats to track planning consistency week-to-week.
>Note: If running locally launch both flask and vite servers and then access the app via the browser. Ensure the database has app_user records seeded so authentication is possible.

---

## Other
_Description:_ This section provides additional project details, including testing coverage, setup instructions, known limitations, and acknowledgements.

<details>
  <summary>More Details</summary>

### Testing
<details>
  <summary>Testing Coverage</summary>

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
    - Quantity: 5 tests
    - Description: simulates full user interactions, from plan creation to submission and system feedback
</details>

<details>
  <summary>How to Run Tests</summary>

#### 1️⃣ Frontend (Vitest)
```
cd PlanGauge/src/frontend  
npm run test
```

#### 2️⃣ Backend (pytest)
```
cd PlanGauge/src/backend  
.\venv\Scripts\activate  
pytest -q
```

#### 3️⃣ End-to-End Testing with Playwright
Step 1 – Navigate to `/PlanGauge/src/frontend`
```cd /PlanGauge/src/frontend```

Step 2 – Verify installation  
You should see a version number like `Version 1.48.0`:
```npx playwright test --version```

Step 3 – Run the e2e script
Uses nodejs to launch frontend + backend servers and then launch playwright testing
```npm run e2e``
</details>



### Limitations
- Unused DB: 
    - the database doesn't really do a lot at this point aside from holding work records
    - However, the ground work is laid for editing/viewing/deleting previous plan submissions & corresponding plan records alongside other stats processing
    - work is not being differentiated into assigned_work and general_work, same thing with plans
    - assignment records aren't being used for anything and there is no way to assign plan records to them

### Assets Relocation
_Description:_ Assets stored on the repo were taking up too much memory so they were moved to a public google drive folder.
link: https://drive.google.com/drive/folders/1ylNBF8Pxizt8jqIWyW43tcWaGgYTfZv_?usp=sharing

### 🙏 Acknowledgements
- Dr. Raymer for giving me feedback on my early project design
- Uncle Steve for reviewing project from both an end user & tech writer perspective
- Intro to SWE Course: Dr. Shimizu + swe peers for learning the basics of SWE and how to implement an Agile methodology
- Parents for giving me feedback from the perspective of an engineering project manager

</details>