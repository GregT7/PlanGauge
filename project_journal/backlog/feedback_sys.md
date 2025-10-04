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

1) Global Non-Functional Criteria
- [ ] **Types/Shapes Guarded:** Runtime validation (or robust type guards) ensures every numeric field from `/api/stats` is a number; invalid/missing → safe fallback + user-visible copy.
- [ ] **Performance:** p50 TTFB for `/api/stats` < 300ms locally; UI first meaningful paint shows skeletons within 150ms.
- [ ] **A11y:** Accordion triggers are buttons with `aria-expanded` and logical heading levels. Color is **not** the only status indicator (label present).
- [ ] **Empty/Error States:** “default” and “unknown” states render with distinct copy and neutral colors.
- [ ] **Docs:** README section updated with the equation, thresholds, and status map; link to the swimlane diagram.
- [ ] **Screenshots:** Attached for loading, error, default, unknown, good, moderate, poor (see Evidence).

2) Backend Support (Flask/Supabase)
- [ ] `/api/stats` response includes the fields needed by UI (week avg/std, day avg/std, daily sums) and a `filter` block with the active date range.
- [ ] Query params `start`, `end` validated; invalid → **HTTP 400** with structured error JSON.
- [ ] Standardized envelope fields present: `ok`, `service`, `now`, `response_time_ms`, `data`, `error`.
- **Evidence**
  - [ ] Postman (or curl) collection with: happy path, invalid range, missing params.
  - [ ] Saved sample JSON payloads (`/docs/samples/stats_*.json`).
  - [ ] Unit tests for validation & envelope (green).

3) Data Fetch & State (Frontend)
- [ ] App fetches `/api/stats` on mount and when date range changes (debounced where applicable).
- [ ] Local state stores parsed stats; guards against `null`, `NaN`, missing keys.
- [ ] Loading skeletons and inline error banner with retry action are rendered appropriately.
- [ ] **Swimlane diagram updated** to reflect startup (includes stats loading).
- **Evidence**
  - [ ] GIF or screenshot of loading → success and loading → error.
  - [ ] Diagram file added at `/docs/diagrams/startup_swimlane.png` (or `.svg`), referenced in README.

4) Evaluation Section (Top Card)
- [ ] Overall feasibility **label** and **numeric score** are visible at a glance.
- [ ] Label/score text color matches status via the status map.
- [ ] Content is presented inside a single shadcn `<Card>` within its designated container.
- [ ] “Details” are implemented using a shadcn `<Accordion>`.
- **Evidence**
  - [ ] Screenshot of the card in each status.

5) Details Accordion (Container)
- [ ] Trigger text is exactly **“details”** (case/style consistent).
- [ ] Contains a concise textual description of how feasibility is computed.
- [ ] Shows the overall feasibility **equation**.
- [ ] If no components are “unknown,” a substituted equation (with values) is displayed.
- [ ] Displays the active date range used for stats filtering.
- [ ] Contains **four** items in order: `week score`, `daily score`, `point thresholds`, `zscore thresholds`.
- **Evidence**
  - [ ] Screenshot of the expanded accordion showing all four items in order.

6) Week Feasibility Accordion
- [ ] Trigger shows: `Week: <Status> (Score: <N.N>)` with color per status.
- [ ] Content includes a clear description.
- [ ] Content lists: **total time**, historical **avg**, historical **std**, computed **zscore**.
- **Evidence**
  - [ ] Screenshot with visible numbers and status color.

7) Daily Feasibility Accordion
- [ ] Trigger shows: `Daily: <Status> (Score: <N.N>)` (aggregation rule applied).
- [ ] Trigger text color reflects the status.
- [ ] Content includes a plain-English description.
- [ ] Content shows the equation used (per-day and aggregation).
- **Evidence**
  - [ ] Screenshot of per-day table (Mon–Sun) including `{sum, avg, std, z, points, status}`.

8) Point Threshold Accordion
- [ ] Contains a short description of the point system.
- [ ] Displays **point range → category** mappings.
- [ ] Values displayed are the **exact** constants used in calculations (single source of truth).
- [ ] Styled consistently with the app’s design (spacing, typography, borders).
- **Evidence**
  - [ ] Screenshot + link to the source constants file (e.g., `/src/utils/feasibilityConfig.ts`).

9) Zscore Threshold Accordion
- [ ] Contains a short description of how zscore bands map to categories.
- [ ] Displays zscore bands used (including behavior for `std=0` → `unknown`).
- [ ] Values displayed are the **exact** constants used in calculations (single source of truth).
- [ ] Styled consistently.
- **Evidence**
  - [ ] Screenshot + link to the same source constants file.

10) Status-Driven UI Styling
- [ ] A **status map** (single source of truth) defines the border/text/badge classes for:
      `default`, `unknown`, `good`, `moderate`, `poor`.
- [ ] The **outer border** of each subsystem container changes color based on the current status.
- [ ] All subsystem styling updates reactively when status changes.
- [ ] “default” used when data loaded but no task entries exist.
- [ ] “unknown” used when any sub-status is unknown (e.g., `std=0` or missing inputs).
- **Evidence**
  - [ ] Code link to the status map.
  - [ ] Before/after GIF showing live color change on status flip.

11) Testing
- **Unit**
  - [ ] Weekly feasibility calculator (zscore, points, status).
  - [ ] Daily feasibility calculator (per-day + aggregation).
  - [ ] Overall calculator (combination/weighting).
  - [ ] Color/status mapping returns expected classes for each status.
- **Integration (Frontend)**
  - [ ] Fetch success path populates UI (card + accordions).
  - [ ] Fetch error shows banner + retry works.
  - [ ] Changing date range triggers re-fetch and re-render.
- **Integration (Backend)**
  - [ ] `/api/stats` happy path returns expected shape.
  - [ ] Invalid date range returns **400** with structured error.
- **E2E**
  - [ ] Flow: user loads → stats fetched → feasibility computed → outer borders & any relevant buttons adopt the correct color tokens.
- **Evidence**
  - [ ] Test results (Vitest/Pytest) green with coverage summary.