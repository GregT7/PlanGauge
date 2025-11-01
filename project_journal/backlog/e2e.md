# End-to-End Testing

## 📝 Task Overview
* Sprint: #10
* Dates: October 3rd - October 31st (2025)
* Status: Completed
* Story Points: #10
* Dependencies:
  * `Feedback System`
  * `Backend Setup`
  * `Intro to Flask`
  * `Subsystem Integration`
  * `Database Setup`
  * `UI UX Foundation`
  * `Intro to React`
  * `Data Entry Table`
* Task Description: Implement Playwright end-to-end tests to validate core user flows, error states, and status-driven UI styling.
* Expected Outcome: The user can launch the app, triggering a full workflow where `/api/stats` data is fetched, feasibility is calculated, and all UI components update in real time to reflect accurate scores, colors, and statuses. The experience should appear seamless from data retrieval to visual feedback, with no errors or noticeable lag.

---

## 🔧 Work

### ✅ Subtasks
1) Project Setup
- [x] Playwright installs and runs locally (npm i -D @playwright/test, npx playwright install).
- [x] playwright.config.ts includes a valid BaseURL and generates screenshots/traces on failure.
- [x] NPM scripts e2e:dev and e2e:report run tests successfully.

2) App Bootstrapping for Tests
- [x] Test script starts both Flask API (in test mode) and frontend (vite preview).
- [x] App waits until both are live before tests begin.
- [x] Add mock route to flask that returns static statistic values

3) Tests
- [x] Cold launch → stats render
----- Launch app → verify header “PlanGauge”.
----- Initial state shows unknown/error placeholder, then stats load → stat cards + overall summary color update.
- [x] Enter tasks → per-day totals & summary
----- Add 2–3 tasks (name, category, start, due, time).
----- Verify affected day-card totals change and overall summary recomputes.
- [x] Footer SUM accuracy
----- Edit time values across multiple rows; data-testid="time-display" reflects the correct sum.
- [x] Category & Date inputs basic UX
----- Change Category via dropdown; pill color updates.
----- Pick Start/Due via calendar; formatted date appears and popover closes.
- [x] Submit plan (happy path)
----- Intercept POSTs to Notion/Supabase (mock 200s).
----- Click submit → success toast appears; no duplicate requests on fast double-click.
- [x] Stats failure → user feedback
----- Mock /stats failure (timeout/500).
----- Error toast/state shows; retry (or reload) recovers with success fixture.
- [x] Fix any newly occurring errors

4) Fix .env files
- [x] Move .env files around
- [x] Update hard coded variables
- [x] Rerun app in all three modes to ensure things still work
- [x] Rerun all tests
- [x] Update readme

### 📘 Definition of Done
1) Project Setup
- [x] Playwright installs and runs locally (npm i -D @playwright/test, npx playwright install).
- [x] playwright.config.ts includes valid baseURL and saves screenshots/traces on failure.
- [x] npm run e2e:dev and npm run e2e:report execute successfully.

2) App Bootstrapping
- [x] Test script launches Flask (test mode) and Vite preview.
- [x] Waits until both are live before tests begin.

3) Core E2E Scenarios
- [x] Cold Launch → Stats Render: “PlanGauge” header visible; stat cards load and update summary color.
- [x] Task Entry → Summary Update: Adding tasks recalculates per-day totals and summary.
- [x] Footer SUM: Time edits update data-testid="time-display" correctly.
- [x] Category/Date Inputs: Changing category updates color; date pickers close after valid selection.
- [x] Plan Submission: Mocked POSTs succeed; success toast shown; no duplicate requests on double-click.
- [x] Stats Failure Recovery: Simulated /stats failure triggers error toast; reload or retry recovers.

4) Env organization
- [x] Readme contains updated instructions for setting up all related .env files
- [x] All of these script aliases work as intended when executing npm run ${alias}: dev, dev:demo, start, start:demo, test, e2e, build, preview
- [x] None of the frontend or backend files contain references to hard coded urls with the backends routes.py being the exception
- [x] Testing command aliases (dev:demo, start:demo, e2e) launches the flask server on port 5001 and react server on 4173
- [x] Non-testing aliases launch flask server on port 5000 and react server on 5173
- [x] Sensitive info is stored in it's own, separate env file containing no other non-sensitive variables
