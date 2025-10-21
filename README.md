# PlanGauge - Planning Assistance Tool
_Description_: PlanGauge is a full-stack planning assistant that helps users create, evaluate, and submit weekly plans through a clean, Notion-style interface. It visualizes plan feasibility using statistical metrics and dynamic color-coded feedback, then syncs finalized plans to connected Notion and Supabase databases via a Flask API.


<details>
  <summary>Table of Contents</summary>

  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [How to Install](#how-to-install)
  - [How to Use Tool](#how-to-use-tool)
  - [How to Run Tests](#how-to-run-tests)
  - [Limitations](#limitations)
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

## How to Install

> **Note:**  
> The steps in this section are all that’s required to **demo and run PlanGauge locally** without setting up Notion or Supabase integration. If you want to fully connect external services and enable plan synchronization, continue to the **Full Mode** section below.

<details>
<summary><b>Click to expand installation steps</b></summary>

### Installation
1. **Clone the repository**
   ```
   git clone https://github.com/GregT7/PlanGauge.git
   ```

2. **Install frontend dependencies**
   ```
   cd PlanGauge/src/frontend
   npm install
   npm audit fix
   ```

3. **Install backend dependencies**
   ```
   cd PlanGauge/src/backend
   python -m venv venv
   .\venv\Scripts\activate
   pip install -r requirements.txt
   ```
</details>

### Full Mode
> **Note:**  
> Complete setup for integrating Notion, Supabase, and environment configuration.

<details>
<summary><b>Click to expand installation steps</b></summary>

1. **Setup Notion**
   1. Create or log into your Notion account.
   2. Create a new page.
   3. Add a database within that page.
   4. Create a new integration under [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations).
   5. Grant the integration full access to your database.
   6. Copy and store your Notion API key for later use.

2. **Setup Supabase**
   1. Create a free account at [https://app.supabase.com](https://app.supabase.com).
   2. Run the SQL scripts in `/PlanGauge/src/database/`:
      - `db_setup.sql` — Initializes database tables.  
      - `row_security.sql` — Enables row-level security (prevents unauthorized access).  
      - `init_records.sql` — Populates dummy records (optional).
   3. Note your **Project URL** and **anon public key** for the `.env` file.

3. **Setup frontend environment files**

   1. **`.env`** – Date ranges for retrieving data in statistical calculations:
      ```
      cd /PlanGauge/src/frontend
      echo VITE_DEFAULT_PLAN_START=2025-06-01> .env && echo VITE_DEFAULT_PLAN_END=2025-06-30>> .env
      ```

   2. **`.env.test`** – Playwright testing configuration  
      **Windows**
      ```
      cd /PlanGauge/src/frontend
      (echo # Base URL that Playwright uses for page.goto("/") && echo VITE_E2E_BASE_URL=http://localhost:4173 && echo. && echo # Frontend uses this to call Flask && echo VITE_API_URL=http://localhost:5001) > .env.test
      ```

      **Linux / macOS**
      ```
      cd /PlanGauge/src/frontend
      echo -e "# Base URL that Playwright uses for page.goto(\"/\")\nVITE_E2E_BASE_URL=http://localhost:4173\n\n# Frontend uses this to call Flask\nVITE_API_URL=http://localhost:5001" > .env.test
      ```

4. **Setup backend environment files**

   1. **`.env`** – Stores API keys for Supabase and Notion.  
      **Windows**
      ```
      cd /PlanGauge/src/backend
      (echo SUPABASE_URL=&& echo SUPABASE_KEY=&& echo NOTION_API_KEY=&& echo NOTION_PAGE_ID=&& echo NOTION_DB_ID=&& echo NOTION_VERSION="2022-06-28") > .env
      ```

      **Linux / macOS**
      ```
      cd /PlanGauge/src/backend
      echo -e "SUPABASE_URL=\nSUPABASE_KEY=\nNOTION_API_KEY=\nNOTION_PAGE_ID=\nNOTION_DB_ID=\nNOTION_VERSION=\"2022-06-28\"" > .env
      ```

   2. **`.env.test`** – For backend testing (used by Playwright).  
      **Windows**
      ```
      cd /PlanGauge/src/backend
      (echo # Ports && echo PORT=5001 && echo. && echo # Toggleable test modes && echo TEST_MODE=true && echo STATS_MODE=ok ^# ok ^| error ^| empty ^| unknown && echo NOTION_MODE=up ^# up ^| down && echo DB_MODE=up ^# up ^| down && echo. && echo # Use a dedicated test DB or in-memory store && echo USE_IN_MEMORY_DB=true) > .env.test
      ```

      **Linux / macOS**
      ```
      cd /PlanGauge/src/backend
      echo -e "# Ports\nPORT=5001\n\n# Toggleable test modes\nTEST_MODE=true\nSTATS_MODE=ok       # ok | error | empty | unknown\nNOTION_MODE=up      # up | down\nDB_MODE=up          # up | down\n\n# Use a dedicated test DB or in-memory store\nUSE_IN_MEMORY_DB=true" > .env.test
      ```

5. **Find API keys / info for Notion & Supabase and update backend `.env` file**
   - `SUPABASE_URL`  
     - _Description_: The unique base URL endpoint for your Supabase project.  
     - How to find:
       1. Log in to [https://app.supabase.com](https://app.supabase.com)
       2. Select your project.
       3. Go to **Project Settings → API**.
       4. Copy the **Project URL**.
     - Example:
       ```
       SUPABASE_URL=https://abcde12345.supabase.co
       ```

   - `SUPABASE_KEY`  
     - _Description_: Your Supabase authentication key — typically the “anon public” key.  
     - How to find:
       1. In **Project Settings → API**, scroll to **Project API Keys**.
       2. Copy the **anon public key**.
     - Example:
       ```
       SUPABASE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
       ```

   - `NOTION_API_KEY`  
     - _Description_: The token for your internal integration used to access Notion’s API.  
     - How to find:
       1. Go to [https://www.notion.so/my-integrations](https://www.notion.so/my-integrations)
       2. Create a new integration (e.g., “PlanGauge”).
       3. Copy the **Internal Integration Token**.
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

   - `NOTION_VERSION` = "2022-06-28"  
     - _Description_: Specifies the Notion API version for compatibility.  
     - How to find:
       - Refer to [Notion’s API versioning documentation](https://developers.notion.com/reference/versioning)
     - Example:
       ```
       NOTION_VERSION="2022-06-28"
       ```
</details>

## How to Use tool
### Demo Mode

### Full Mode


#### 1️⃣ Launch the Application

1. **Start the Flask backend**
   ```
   cd PlanGauge/src/backend
   .\venv\Scripts\activate
   python run.py
   ```

2. **Start the React frontend**
   ```
   cd PlanGauge/src/frontend
   npm run dev
   ```

3. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

#### 2️⃣ Create or Edit Weekly Tasks

1. Use the **Notion-like task table** to enter your weekly goals.  
   Each row represents a task with the following fields:
   - **Task Name** – Short description of your task.
   - **Category** – Choose from pre-defined options (e.g., Health, Career, School).
   - **Start / Due Date** – Select using the date picker.
   - **Estimated Time** – Enter manually or let the backend predict time (future feature).

2. Add new tasks using the **“+ New Page”** button at the bottom of the table.

3. Tasks update automatically as you edit fields — no need to manually save.

#### 3️⃣ Review Daily and Weekly Feasibility

- Each day displays a **stat card** showing:
  - The **total planned time** for that day.
  - A **color-coded status**:
    - 🟢 **Good** – Within target range.
    - 🟡 **Moderate** – Under or near threshold.
    - 🔴 **Poor** – Exceeds predicted workload limit.

- At the bottom, a **Plan Summary** indicator shows the overall feasibility rating for the week.

#### 4️⃣ Submit Your Plan

When satisfied with your plan, click the **Submit** button.  
This will:
1. Send your plan data to the **Flask backend**.  
2. The backend will:
   - Store your plan data in **Supabase** for long-term tracking.
   - Sync your updated plan to **Notion**, ensuring your Notion workspace stays up-to-date.
3. A temporary status message will confirm if the sync succeeded or failed.

#### 5️⃣ Adjust, Track, and Improve

- You can adjust your plan anytime; simply edit the table and re-submit.
- Future versions will incorporate your Supabase data to refine **time predictions** for similar task types.
- Use color trends and stats to track planning consistency week-to-week.

#### 🧠 Tips
- Ensure your `.env` files are properly configured for Supabase and Notion before launching.  
- Keep your **Flask server** running while using the frontend — it handles database communication.  
- If the **Submit button** doesn’t update colors or show feedback, check backend logs for any API key issues.

#### ✅ Example Workflow

1. Launch both servers.  
2. Open the app in your browser.  
3. Add your weekly school and career tasks.  
4. Check the daily time indicators to balance workload.  
5. Click **Submit** to sync your plan.  
6. Verify your plan appears in Notion under your linked database.

---

PlanGauge helps you plan smarter — not harder — by combining planning, feasibility analysis, and workflow synchronization into one cohesive system.


## How to Run Tests

### 1️⃣ Frontend (Vitest)
> **Note:** This does **not** include Playwright E2E tests — see the next section for setup.

```
cd PlanGauge/src/frontend  
npm run test
```

### 2️⃣ (Optional) End-to-End Testing with Playwright

**Step 1 – Install Playwright**  
cd PlanGauge/src/frontend  
```npm init playwright@latest```

**Step 2 – Follow setup prompts**  
Answer the following during setup:  
- ✔ Language: JavaScript  
- ✔ Test directory: `tests`  
- ✔ Add GitHub Actions workflow: No (optional)  
- ✔ Install browsers: Yes  

**Step 3 – Verify installation**  
You should see a version number like `Version 1.48.0`:
```npx playwright test --version```

**Step 4 – Run default Playwright tests**  
Run the sample tests provided by Playwright (all six should pass):  
```npx playwright test```



### 3️⃣ Backend (pytest)
```
cd PlanGauge/src/backend  
.\venv\Scripts\activate  
pytest -q
```

## Limitations
- Unused DB: 
    - the database doesn't really do a lot at this point aside from holding work records
    - However, the ground work is laid for editing/viewing/deleting previous plan submissions & corresponding plan records alongside other stats processing
    - work is not being differentiated into assigned_work and general_work, same thing with plans
    - assignment records aren't being used for anything and there is no way to assign plan records to them
- Not Deployed: Using flask & vite servers


## 🙏 Acknowledgements
- Dr. Raymer for giving me feedback on my early project design
- Uncle Steve for reviewing project from both an end user & tech writer perspective
- Intro to SWE Course: Dr. Shimizu + swe peers for learning the basics of SWE and how to implement an Agile methodology
- Parents for giving me feedback from the perspective of an engineering project manager