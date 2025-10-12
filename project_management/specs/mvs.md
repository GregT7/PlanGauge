# Minimum Viable Specification (MVS) – PlanGauge

## Goal
Build a minimal, end-to-end functional version of PlanGauge that allows users to input weekly tasks, evaluate feasibility based on historical performance data, and submit their plan to both a local and remote database. The system shall demonstrate full data flow from user input to backend synchronization while maintaining responsive and real-time feedback.

---

## R-1 Task Entry Table
### R-1.1 Structure
- M-1.10: The application shall include a data entry table for creating weekly task plans.
- M-1.11: The table shall include the following columns:
  - Task Name
  - Category
  - Due Date
  - Start Date
  - Time (minutes)
- M-1.12: The table shall allow users to add, edit, and delete tasks directly within table cells.
- M-1.13: The user shall be able to select multiple rows using checkboxes and deselect them by interacting outside the table area.
- M-1.14: The application shall support unlimited row entries and automatically adjust the table height to fit content.
- M-1.15: The table shall include a footer displaying the total sum of the “Time” column.
### R-1.2 Constraints and Data Loading
- M-1.20: The “Category” column shall load available categories and associated colors from a local JSON file (`categories.json`).
- M-1.21: The “Time” input column shall accept only positive whole numbers.
- M-1.22: The “Due Date” and “Start Date” columns shall restrict user input to valid calendar dates.
- M-1.23: Column domain constraints shall be consistent with the connected Notion database schema.
- M-1.24: The table shall maintain dark mode styling consistent with the Notion interface aesthetic.

## R-2 Daily Feasibility System (Stat Cards)
### R-2.1 Core Display
- M-2.10: The application shall display seven stat cards, each corresponding to one day of the week.
- M-2.11: Each card shall include:
  - Day name
  - Date
  - Total planned time sum
  - Feasibility status label
- M-2.12: Each card’s color and label shall reflect the current feasibility category.
### R-2.2 Category Logic
- M-2.20: Feasibility categories shall include: Good, Moderate, and Poor
- M-2.21: The category color scheme shall be:
  - Good → green
  - Moderate → orange/yellow
  - Poor → rose
- M-2.22: Feasibility shall be determined by comparing each day’s total planned time against historical averages and standard deviations.
- M-2.23: Stat cards shall dynamically update their displayed data in real time as the user modifies task table entries.
- M-2.24: A summary counter shall display the count of cards under each feasibility category (e.g., “Good: 3, Moderate: 2, Poor: 2”). 

## R-3 Evaluation Section (Weekly and Overall Feasibility)
### R-3.1 Structure
- M-3.10: The application shall include an Evaluation Section that summarizes the weekly and overall plan feasibility.
- M-3.11: The section shall consist of:
  - A Summary Card
  - A Detailed Breakdown Accordion
### R-3.2 Summary Card
- M-3.20: The Summary Card shall display:
  - Overall feasibility label
  - Overall score
  - Weekly score and label
  - Daily score and label
- M-3.21: Each label shall include a color-coded badge consistent with the feasibility mapping.
- M-3.22: The Summary Card shall automatically update when task data or statistical metrics change.
### R-3.3 Detailed Breakdown
- M-3.30: The Detailed Breakdown shall include the following nested accordions:
  - Weekly Evaluation
  - Daily Evaluation
  - Z-Score Thresholds
  - Point Thresholds
- M-3.31: The system shall display the formulas used in feasibility computation.
- M-3.32: The overall feasibility score shall incorporate both the week evaluation and daily evaluation.

## R-4 Submission System
### R-4.1 API Behavior
- M-4.10: The application shall include a submission button that triggers a POST request to both the Supabase database and Notion API.
- M-4.11: The submission shall include all currently entered task data.
- M-4.12: The button shall trigger the display of a temporary success or failure message.
- M-4.13: The button shall enforce a cooldown period immediately after submission to prevent repeated requests.
### R-4.2 Visual and Data Feedback
- M-4.20: The button’s base color shall reflect the current overall plan feasibility (green/orange/red).
- M-4.21: The button’s color and interactivity shall update dynamically when the overall status changes.

## R-5 System Behavior and Styling
### R-5.1 General
- M-5.10: The frontend shall use TailwindCSS for styling and responsive layout management.
- M-5.11: The interface shall fully render within a 1920×1080 viewport without horizontal scrolling.
- M-5.12: The default theme shall be dark mode.
- M-5.13: Fonts, spacing, and container hierarchy shall remain consistent across all major components.
### R-5.2 Configuration
- M-5.20: API keys and environment variables shall be stored locally and secretly.
- M-5.21: No sensitive credentials shall be hard-coded in the source code.
- M-5.22: On application launch, the system shall perform connectivity tests for Flask, Supabase, and Notion.
- M-5.23: Each test shall retry up to three times before marking the service as “Failed.”

## R-6 Non-Functional and Testing Requirements
### R-6.1 Non-Functional
- M-6.10: The interface shall respond to user interactions in under 300 ms.
### R-6.2 Testing
- M-6.20: The frontend shall include unit and integration tests verifying task editing, stat card updates, and evaluation calculations.
- M-6.21: The backend shall include unit and integration tests validating data submission and sync logic.
- M-6.22: End-to-end tests shall verify application startup, API connectivity, and successful plan submission across both Flask and React environments.