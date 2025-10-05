# Feedback System

## 📝 Task Overview
* Sprint: 9, 10
* Dates: September 17 - Month day (2025)
* Status: In Progress
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
- [ ] Update swim lane diagram for the start up process (includes loading stats data)

3) Evaluation Section
- [ ] Clearly displays the overall feasibility categorization along with the score
- [ ] The categorization and score text are colored to match the current feasibility status
- [ ] Uses one large shadcn card component to display the information within its designated container
- [ ] Uses shadcn accordion component for a "details" section

4) Details Accordion
- [ ] Has "details" as the accordion trigger text
- [ ] Includes a textual description of whats going on
- [ ] Contains the overall feasibility equation
- [ ] If there are no "unknown" feasibility statuses for any of the components, then display the equation with filled in values
- [ ] Displays the date ranges used to filter data when calculating statistical metrics
- [ ] Contains four accordion elements in this order: week score, daily score, point thresholds, zscore thresholds

5) Week Feasibility Accordion
- [ ] Contains the feasibility ranking and score for the week for the accordion trigger
- [ ] The text for the accordion trigger is color coded to reflect the feasibility status
- [ ] Accordion content: includes a description of whats going on
- [ ] Accordion content: includes, total time, historical ave, historical std, and zscore

6) Daily Feasibility Accordion
- [ ] Contains the feasibility ranking and score for all days for the accordion trigger
- [ ] The text for the accordion trigger is color coded to reflect the feasibility status
- [ ] Accordion content: includes a description of whats going on
- [ ] Accordion content: includes the equation

7) Point Threshold Accordion
- [ ] Contains a description of whats going on
- [ ] Displays the point range mappings to feasibility categorization
- [ ] Values printed are the same ones being used during calculations
- [ ] Is cleanly styled

8) Zscore Threshold Accordion
- [ ] Contains a description of whats going on
- [ ] Displays the point range mappings to feasibility categorization
- [ ] Values printed are the same ones being used during calculations
- [ ] Is cleanly styled

9) Status-Driven UI Styling
- [ ] Uses a status map to create a single source of truth for color shading
- [ ] The outer border for each subsystem container changes color to reflect feasibility status
- [ ] All subsystem styling reflects the current feasibility by coloring the outer border of the container holding the subsystem component
- [ ] All subsystem styling updates when feasibility changes
- [ ] Handles logic + shading for 'default' and 'unknown' states
---- [ ] Default is used when data has been loaded but no task entries are in the table
---- [ ] Unknown is used when any of the statuses are unknown

10) Testing
- [ ] Unit: feasibility calculators (weekly, status-count, overall)
- [ ] Unit: color mapping by feasibility
- [ ] Integration (frontend): fetch success/error, loading, date-range update
- [ ] Integration (backend): /api/stats happy path + validation error
- [ ] E2E: user loads → stats fetched → feasibility computed → outlines + button color update

### 📘 Definition of Done

1) Backend Support (Flask/Supabase)
- [ ] /api/stats returns all required statistical fields for both weekly and daily evaluations (avg, std, sums).
- [ ] Date range query parameters (start, end) are validated; invalid input returns HTTP 400 with structured error JSON.
- [ ] Standardized JSON envelope is used for every response with:{ ok, service, now, response_time_ms, data{...}, error? }.
- Evidence
--- [ ] Postman or curl collection showing: valid request, invalid range, and malformed params.
--- [ ] Example JSON payloads saved under /docs/samples/stats_*.json.
--- [ ] Passing backend tests verifying structure and validation.

2) Data Fetch & State (Frontend)
- [ ] React app calls GET /api/stats on mount and whenever date range changes.
- [ ] Fetched data is stored in local state and parsed safely (guards against nulls, NaN, or missing keys).
- [ ] Loading and error states render visible feedback (skeleton + retry or fallback message).
- [ ] Swimlane diagram updated to include “stats fetch” step during startup flow.
- Evidence
--- [ ] Screenshot or GIF showing loading → render → error fallback sequence.
--- [ ] Updated swimlane diagram under /docs/diagrams/startup_swimlane.png.

3) Evaluation Section
- [ ] Displays overall feasibility status and numerical score clearly at the top.
- [ ] Text color reflects current feasibility (good, moderate, poor, unknown, default).
- [ ] Uses one large shadcn <Card> within the main container for consistency.
- [ ] “Details” section implemented using shadcn <Accordion>.
- Evidence
--- [ ] Screenshot of the main card in each status.
--- [ ] Code link to EvaluationSection.jsx confirming component structure.

4) Details Accordion
- [ ] Accordion trigger text is exactly "details".
- [ ] Contains a short explanation of how feasibility is determined.
- [ ] Displays the overall feasibility equation; if no “unknown” components exist, shows substituted equation with actual values.
- [ ] Shows the date range currently used for filtering stats.
- [ ] Contains four accordion items in this order: Week Score, Daily Score, Point Thresholds, Zscore Thresholds.
- Evidence
--- [ ] Screenshot of expanded accordion showing equation, date range, and four items in order.

5) Week Feasibility Accordion
- [ ] Trigger text: Week: <Status> (Score: N.N) and colored according to feasibility.
- [ ] Content includes: short explanation + total time, historical average, standard deviation, and zscore.
- Evidence
--- [ ] Screenshot of open Week accordion showing all metrics.

6) Daily Feasibility Accordion
- [ ] Trigger text: Daily: <Status> (Score: N.N) and color-coded to status.
- [ ] Content includes: description of logic + displayed per-day table (Mon–Sun) showing sum, avg, std, z, points, and status.
- Evidence
--- [ ] Screenshot of Daily accordion expanded with all data columns visible.

7) Point Threshold Accordion
- [ ] Contains a short explanation of the point-to-category mapping system.
- [ ] Displays point ranges and corresponding feasibility categories.
- [ ] Values shown are pulled directly from the same constants used in calculations.
- [ ] Styling matches the app’s typography and spacing.
- Evidence
--- [ ] Screenshot of Point Threshold accordion.
--- [ ] Link to /src/utils/feasibilityConfig.ts constants file.

8) Zscore Threshold Accordion
- [ ] Describes how z-score bands map to feasibility categories.
- [ ] Displays actual z-score threshold values used in computation (including behavior for std=0 → “unknown”).
- [ ] Uses same constants file as the point thresholds for single source of truth.
- [ ] Cleanly styled and consistent with the rest of the UI.
- Evidence
--- [ ] Screenshot of expanded Zscore Threshold accordion.
--- [ ] Code link to constants file verifying values.

9) Status-Driven UI Styling
- [ ] A shared status map defines color classes for default, unknown, good, moderate, and poor.
- [ ] Outer border of each subsystem container changes color based on feasibility.
- [ ] All subsystem styling updates reactively when feasibility changes.
- [ ] “Default” status used when data loaded but no entries exist.
- [ ] “Unknown” status used when any component has undefined or invalid data (e.g., std=0).
- Evidence
--- [ ] Before/after GIF showing color changes as statuses update.
--- [ ] Code link to status map source.

10) Testing
- Unit Tests
- [ ] Feasibility calculators (weekly, daily, overall).
- [ ] Status color mapping returns expected class names.
- Integration Tests (Frontend)
- [ ] Fetch success and error paths work as expected.
- [ ] Loading skeletons and retry actions function correctly.
- [ ] Date range change triggers new fetch and re-render.
- Integration Tests (Backend)
- [ ] /api/stats happy path returns correct structure.
- [ ] Invalid date range returns HTTP 400 and error JSON.
- E2E (Manual or Automated)
- [ ] User loads → stats fetched → feasibility computed → borders and buttons update color according to status.
- Evidence
--- [ ] Passing test summary from Vitest and/or Pytest.
--- [ ] Short screen capture of E2E flow.
