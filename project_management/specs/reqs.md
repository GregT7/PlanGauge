# Requirements Specification

## R-1 Feasibility Categorization
### R-1.1 General
- R-1.10: The application shall use the following feasibility categories:
  - Good: Planned durations closely match historical averages.
  - Moderate: Planned durations deviate slightly from historical averages but remain achievable.
  - Poor: Planned durations deviate significantly, making completion unlikely.
- R-1.11: The application shall use two additional statuses to reflect stat data retrieval success/failure
  - Unknown: Stats data has yet to be retrieved or retrieval attempts failed
  - Neutral: Stats retrieval was successful but all entries in the task table do not have both the "start date" AND "time" columns filled in
- R-1.12: Feasibility categories shall incorporate the following color scheme mapping:
  - Good: green
  - Moderate: orange/yellow
  - Poor: rose
  - Neutral: gray
  - Unknown: red
- R-1.13: Statistical metric calculations shall filter data within a passed start and end date range
- R-1.14: The date range used for data filtering when processing statistical metrics shall be in increments of whole weeks
  - Monday 10/06/25 --> Sunday 10/12/2025 is 1 whole week
  - Monday 10/06/25 --> Wednesday 10/15/2025 is 1.5 weeks and would need to be rounded to a whole number
### R-1.2 Overall Feasibility
- R-1.20: The system shall compute an overall plan feasibility rating using an aggregate algorithm that incorporates both weekly and daily categorizations.
- R-1.21: Weekly and daily categorizations shall be derived from filtered task-table data and compared to corresponding statistical averages and standard deviations.
- R-1.22: Feasibility determination shall rely on Z-scores, computed as:
  - `Z = (X - μ) / σ`
  - where X = observed time sum, μ = population average sum, σ = population standard deviation.
- R-1.23: Z-scores shall be mapped to feasibility categories according to absolute value ranges:
  - Good: 0 ≤ |Z| < 1
  - Moderate: 1 ≤ |Z| < 2
  - Poor: |Z| ≥ 2
- R-1.24: Weekly and daily results shall be normalized by converting each category to a point value for aggregation.
  - Example mapping: Good = 100 pts, Moderate = 60 pts, Poor = 0 pts.
- R-1.25: The weekly score shall be calculated using the point mapping.
- R-1.26: The daily score shall be calculated by mapping all individual, categorized days to points and then averaging the points.
- R-1.27: The overall feasibility score shall be computed as a weighted combination of weekly and daily scores.
  - Example weighting: daily = 60%, weekly = 40%.
- R-1.28: The final overall feasibility category shall be derived by mapping the overall score back to a labeled range:
  - Good: 75 < score ≤ 100
  - Moderate: 50 < score ≤ 75
  - Poor: score ≤ 50

## R-2 Task Entry Table (Notion-like Input)
### R-2.1 Table Structure
- R-2.10: The application shall provide a data entry table for inputting planned tasks for the week
- R-2.11: The table shall include a text input column named "Task Name" for entering the name of the task.
- R-2.12: The table shall include a selector input column named "Category" for selecting the task’s category.
- R-2.13: The table shall include two date input columns named "Due Date" and "Start Date".
- R-2.14: The table shall include a number input column named "Time" for entering estimated task duration.
- R-2.15: The table shall display its columns in the same ordering as the Notion DB schema. 
  - "Task Name", "Category", "Due Date", "Start Date", "Time"
### R-2.2 CRUD
- R-2.20: The application shall support adding and deleting tasks from the table.
- R-2.21: Each cell in the table shall be directly editable.
- R-2.22: The application shall allow users to add an unlimited number of tasks.
- R-2.23: The application shall allow users to delete multiple tasks in a single action.
- R-2.24: The application shall automatically adapt the size of the table based on the number of tasks present.
- R-2.25: The application shall maintain the visibility, accessibility, and styling of all other user interface components regardless of user interaction with the task table.
- R-2.26: The application shall allow multiple rows to be selected
- R-2.27: The system shall automatically deselect all currently selected rows when the user interacts with any element other than a selection checkbox.
### R-2.3 Notion-like
- R-2.30: The application shall enforce column domain constraints that match the Notion schema (e.g., predefined categories, numeric limits).
- R-2.31: The available categories and their respective colors for the "Category" column shall be loaded from a local data file.
- R-2.32: The "Time" input column shall accept only positive whole numbers.
- R-2.33: The "Due Date" and "Start Date" columns shall restrict input to valid calendar dates.
- R-2.34: The table shall employ a dark-mode aesthetic consistent with the Notion interface style.

## R-3 Stat Card System
### R-3.1 Overview
- R-3.10: The application shall display seven stat cards, one representing each day of the week.
- R-3.11: Each card shall display the following data: day name, date, feasibility status, and total planned time
- R-3.12: Each card shall be color-coded and visually styled according to its current feasibility status, including Good, Moderate, Poor, Neutral, and Unknown.
- R-3.13: Stat cards shall update their displayed data and visual styling in real time as user inputs in the task table change.
- R-3.14: The Stat Card System shall display a status summary count (e.g., “Good: 3, Moderate: 4, Poor: 0”) within its container and update dynamically as tasks are modified.

## R-4 Evaluation Section
### R-4.1 Overview
- R-4.10: The application shall display an Evaluation Section summarizing the plan’s overall feasibility based on weekly and daily performance metrics.
- R-4.11: The Evaluation Section shall consist of a summary card and a detailed breakdown accordion.
- R-4.12: The Evaluation Section shall visually match the application’s styling conventions, including a dashed border container whose color reflects the current feasibility status.
### R-4.2 Summary Card
- R-4.20: The summary card shall display the following data elements:
  - Overall feasibility label (Good, Moderate, Poor, etc.)
  - Overall numerical score (points)
  - Weekly feasibility label and score
  - Daily feasibility label and score
- R-4.21: Each label shall be represented by a color-coded badge according to the system’s style data.
- R-4.22: The summary card shall dynamically update its displayed scores and labels in real time as the underlying task or statistical data changes.
- R-4.23: A short descriptive message shall appear beneath the summary card explaining the evaluation purpose and instructing users to expand the detailed breakdown for further insights.
### R-4.3 Detailed Breakdown (Details Accordion)
- R-4.30: The detailed breakdown shall be displayed as a collapsible accordion containing the following nested accordions:
  - Weekly Evaluation
  - Daily Evaluation
  - Z-Score Thresholds
  - Point Thresholds
- R-4.31: The detailed breakdown shall show intermediate values used in the overall feasibility computation, including:
  - Weekly and daily points
  - Weight coefficient (w) used to blend weekly and daily scores
  - Input statistics such as average, standard deviation, and z-score
- R-4.32: The system shall present the overall score calculation formula and show a worked example using live data.
- R-4.33: The detailed view shall include the active date filter range and the statistical metrics used for evaluation (average, standard deviation).
- R-4.34: Each nested accordion shall contain explanatory text, labeled equations, and color-coded examples derived from live evaluation data.
### R-4.4 Status Mapping and Classification
- R-4.40: The Z-Score Thresholds view shall explain how absolute z-score values are translated into feasibility categories using predefined bands (e.g., Good: 0 ≤ |Z| < 1).
- R-4.41: The Point Thresholds view shall show the mapping between feasibility categories and their numeric point equivalents (e.g., Good = 100 pts, Moderate = 60 pts, Poor = 0 pts).
- R-4.42: The Point Thresholds view shall also display the score ranges used to convert overall scores back into category labels (e.g., Good: 75–100, Moderate: 50–75).

## R-5 Submission
### R-5.1 Core Functionality
- R-5.10: The application shall include a submission button that triggers an API POST request to update both the connected Notion table and the Supabase database with the current plan data.
- R-5.11: Upon submission, the application shall display a temporary toast or visual indicator showing the API request status (e.g., Success or Failure).
- R-5.12: The submission button shall implement a cooldown period immediately after activation to prevent duplicate or rapid submissions.
- R-5.13: During the cooldown period, the button’s styling and interactivity shall change to indicate that submission is temporarily disabled.

### R-5.2 Visual Feedback and Real-Time Updates
- R-5.14: The button’s default styling shall reflect the current overall plan feasibility status (e.g., green for Good, yellow/orange for Moderate, red for Poor).
- R-5.15: The button styling shall update dynamically in real time whenever the overall plan feasibility status changes.

### R-5.3 Synchronization and Record Tracking
- R-5.16: The connected database schema shall include a synchronization field (sync) for tracking plan submission records.
- R-5.17: The sync field shall be initialized to False by default and updated to True only when the corresponding plan data has been successfully stored in both Notion and the database.

## R-6 UI/UX and Styling
### R-6.1 General Design
- R-6.10: The application shall employ a modern CSS framework such as TailwindCSS for styling and responsive layout management.
- R-6.11: All primary visual components shall render fully within a 1920×1080 viewport without requiring horizontal scrolling under normal usage conditions.
- R-6.12: Each major subsystem — including the Task Table, Stat Card System, and Evaluation Section — shall be displayed within a titled container bordered with a dotted or dashed outline for clear visual separation.
- R-6.12: Color themes, component highlights, subsystem container borders, and feasibility indicators shall update dynamically as plan data changes
- R-6.13: Color themes, component highlights, subsystem borders, and feasibility indicators shall update dynamically as plan data changes, maintaining real-time visual feedback.
- R-6.14: The application shall maintain consistent fonts, spacing, and layout hierarchy across all interface components.
- R-6.15: The interface shall implement a dark mode aesthetic consistent with the overall visual theme of the application.

## R-7 System Behavior
### R-7.1 Configuration & Data Loading
- R-7.10: The application shall read API credentials from a local .env file (or process environment) and shall not require hard-coded secrets in source code.
- R-7.11: On application launch, the system shall attempt to load historical task statistics from the configured data source (local or remote).
### R-7.2 Stats Retrieval & Default States
- R-7.20: Until statistics are successfully retrieved, the feasibility status for all stat cards, the weekly score, and the overall categorization shall be unknown.
- R-7.21: If statistics retrieval succeeds but the task table contains no entries with both Start Date and Time, the affected components shall display neutral.
- R-7.22: When any day’s or the week’s time sum becomes non-zero, the corresponding component’s status shall transition from neutral to one of Good / Moderate / Poor based on the active thresholds.
### R-7.3 User Feedback (Toasts)
- R-7.30: The system shall display a toast indicating the statistics retrieval status and keep it visible until resolution:
  - Loading → Success or Failure.
- R-7.31: The system shall display a toast indicating the service connectivity test status and keep it visible until resolution:
  - Loading → Success or Failure.
### R-7.4 Connectivity Health Check
- R-7.40: On application launch, the system shall initiate a connectivity test targeting the Flask API, the database (Supabase), and the Notion API.
- R-7.41: Each unreachable service shall be retried up to 3 times with a bounded backoff before being marked Failure.