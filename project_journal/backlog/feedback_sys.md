# Feedback System

## 📝 Task Overview
* Sprint: 9, 10
* Dates: September 17 - October 7 (2025)
* Status: Completed
* Story Points: #8
* Dependencies:
  * `Backend Setup`
  * `Intro to Flask`
  * `Subsystem Integration`
  * `Database Setup`
  * `UI UX Foundation`
  * `Intro to React`
  * `Data Entry Table`

* Task Description: Evaluate the feasibility of the overall plan by comparing the data entered in the task table with historical performance metrics. Include a summary of calculations done and visually update the system to reflect the current feasibility status.
* Expected Outcome: The system can evaluate the feasibility of the overall plan using the designed algorithms in real time as the user inputs data into the task table. The color scheme of subcomponents on the frontend will update to reflect the feasibility status. It will not be expected that the feasibility categorization algorithm will translate, with high accuracy, to the same status that a reasonable person may conclude without the use of the application. More research, fine tuning, data collection, and testing will probably be needed to settle on a robust algorithm that can, in practice, accurately evaluate feasibility.

---

## 🔧 Work

### ✅ Subtasks
1) Backend Support (Flask/Supabase)
- [x] Ensure /api/stats returns fields needed by UI (avg, std for week and daily values)
- [x] Add query params for date ranges; validate; 400 on bad input
- [x] Standardized JSON response (ok, service, now, response_time_ms, data{...}, error?)

2) Data Fetch & State (Frontend)
- [x] Call GET /api/stats from React (on mount + on date-range change)
- [x] State stores received statistical data locally
- [x] Handle loading + error states; show fallback message
- [x] Update swim lane diagram for the start up process (includes loading stats data)

3) Evaluation Section
- [x] Clearly displays the overall feasibility categorization along with the score
- [x] The categorization and score text are colored to match the current feasibility status
- [x] Uses one large shadcn card component to display the information within its designated container
- [x] Uses shadcn accordion component for a "details" section

4) Details Accordion
- [x] Has "details" as the accordion trigger text
- [x] Includes a textual description of whats going on
- [x] Contains the overall feasibility equation
- [x] If there are no "unknown" feasibility statuses for any of the components, then display the equation with filled in values
- [x] Displays the date ranges used to filter data when calculating statistical metrics
- [x] Contains four accordion elements in this order: week score, daily score, point thresholds, zscore thresholds

5) Week Feasibility Accordion
- [x] Contains the feasibility ranking and score for the week for the accordion trigger
- [x] The text for the accordion trigger is color coded to reflect the feasibility status
- [x] Accordion content: includes a description of whats going on
- [x] Accordion content: includes, total time, historical ave, historical std, and zscore

6) Daily Feasibility Accordion
- [x] Contains the feasibility ranking and score for all days for the accordion trigger
- [x] The text for the accordion trigger is color coded to reflect the feasibility status
- [x] Accordion content: includes a description of whats going on
- [x] Accordion content: includes the equation

7) Point Threshold Accordion
- [x] Contains a description of whats going on
- [x] Displays the point range mappings to feasibility categorization
- [x] Values printed are the same ones being used during calculations
- [x] Is cleanly styled

8) Zscore Threshold Accordion
- [x] Contains a description of whats going on
- [x] Displays the zscore range mappings to feasibility categorization
- [x] Values printed are the same ones being used during calculations
- [x] Is cleanly styled

9) Status-Driven UI Styling
- [x] Uses a status map to create a single source of truth for color shading
- [x] The outer border for each subsystem container changes color to reflect feasibility status
- [x] All subsystem styling reflects the current feasibility by coloring the outer border of the container holding the subsystem component
- [x] All subsystem styling updates when feasibility changes
- [x] Handles logic + shading for 'default' and 'unknown' states
  - [x] Default is used when data has been loaded but no task entries are in the table
  - [x] Unknown is used when any of the statuses are unknown

10) Testing
- [x] Unit: feasibility calculators (weekly, status-count, overall)
- [x] Unit: color mapping by feasibility
- [x] Integration (frontend): fetch success/error, loading, date-range update
- [x] Integration (backend): /api/stats happy path + validation error
- [x] E2E: user loads → stats fetched → feasibility computed → outlines + button color update (informal)

### 📘 Definition of Done

1) Backend Support (Flask/Supabase)
- [x] /api/db/stats returns all required statistical fields for both weekly and daily evaluations (avg, std, sums).
- [x] Date range query parameters (start, end) are validated; invalid input returns HTTP 400 with structured error JSON.
- [x] Standardized JSON envelope is used for every response with: { ok, service, now, response_time_ms, data{...}, error? }.
- Evidence
- [x] curl collection showing: valid request, invalid range, and malformed params.
- [x] Example JSON payloads saved under /project_management/api/flask_apis/xlsx.
- [x] Passing backend tests verifying structure and validation.

2) Data Fetch & State (Frontend)
- [x] React app calls GET /api/stats on mount and whenever date range changes.
- [x] Fetched data is stored in local state and parsed safely (guards against nulls, NaN, or missing keys).
- [x] Loading and error states render visible feedback (skeleton + retry or fallback message).
- [x] Swimlane diagram updated to include “stats fetch” step during startup flow.
- Evidence
- [x] Screenshot or GIF showing loading → render → error fallback sequence.
- [x] Updated swimlane diagram under /project_management/diagrams/startup_swimlane.png.

3) Evaluation Section
- [x] Displays overall feasibility status and numerical score clearly at the top.
- [x] Text color reflects current feasibility (good, moderate, poor, unknown, default).
- [x] Uses one large shadcn <Card> within the main container for consistency.
- [x] “Details” section implemented using shadcn <Accordion>.
- Evidence
- [x] Gif quickly showing evaluation section with all accordions opened

4) Details Accordion
- [x] Accordion trigger text is exactly "details".
- [x] Contains a short explanation of how feasibility is determined.
- [x] Displays the overall feasibility equation; if no “unknown” components exist, shows substituted equation with actual values.
- [x] Shows the date range currently used for filtering stats.
- [x] Contains four accordion items in this order: Week Score, Daily Score, Point Thresholds, Zscore Thresholds.
- Evidence
- [x] Gif of details accordion expanding but with more time for viewer to see info

5) Week Feasibility Accordion
- [x] Trigger text: Week: <Status> (Score: N.N) and colored according to feasibility.
- [x] Content includes: short explanation + total time, historical average, standard deviation, and zscore.
- Evidence
- [x] Gif of week accordion expanding but with more time for viewer to see info

6) Daily Feasibility Accordion
- [x] Trigger text: Daily: <Status> (Score: N.N) and color-coded to status.
- [x] Content includes: description of logic + displayed per-day table (Mon–Sun) showing sum, avg, std, z, points, and status.
- Evidence
- [x] Gif of daily accordion expanding but with more time for viewer to see info

7) Point Threshold Accordion
- [x] Contains a short explanation of the point-to-category mapping system.
- [x] Displays point ranges and corresponding feasibility categories.
- [x] Values shown are pulled directly from the same constants used in calculations.
- [x] Styling matches the app’s typography and spacing.
- Evidence
- [x] Gif of points accordion expanding but with more time for viewer to see info

8) Zscore Threshold Accordion
- [x] Describes how z-score bands map to feasibility categories.
- [x] Displays actual z-score threshold values used in computation (including behavior for std=0 → “unknown”).
- [x] Uses same constants file as the point thresholds for single source of truth.
- [x] Cleanly styled and consistent with the rest of the UI.
- Evidence
- [x] Gif of zscore accordion expanding but with more time for viewer to see info

9) Status-Driven UI Styling
- [x] A shared status map defines color classes for default, unknown, good, moderate, and poor.
- [x] Outer border of each subsystem container changes color based on feasibility.
- [x] All subsystem styling updates reactively when feasibility changes.
- [x] “Default” status used when data loaded but no entries exist.
- [x] “Unknown” status used when any component has undefined or invalid data (e.g., std=0).
- Evidence
- [x] Before/after GIF showing color changes as statuses update.

10) Testing
#Unit Tests
- [x] Feasibility calculators (weekly, daily, overall).
- [x] Status color mapping returns expected class names.

#Integration Tests (Frontend)
- [x] Fetch success and error paths work as expected.
- [x] Loading skeletons and retry actions function correctly.
- [x] Date range change triggers new fetch and re-render.

#Integration Tests (Backend)
- [x] /api/db/stats happy path returns correct structure.
- [x] Invalid date range returns HTTP 400 and error JSON.

#E2E (Manual or Automated)
- [x] User loads → stats fetched → feasibility computed → borders and buttons update color according to status.
Evidence
- [x] Passing test summary from Vitest and/or Pytest.
- [x] Short screen capture of E2E flow.

### Informal End-to-End Test
#### Description: Test user loads → stats fetched → feasibility computed → outlines + button color update (informal)
![Image](https://github.com/user-attachments/assets/72d58815-bf79-4825-b430-c3bc05b51242)