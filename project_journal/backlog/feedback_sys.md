# Feedback System

## 📝 Task Overview
* Sprint: 9
* Dates: September 17 - Month day (2025)
* Status: In Progress
* Story Points: #
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
1) Data Fetch & State (Frontend)
- [ ] Call GET /api/stats from React (on mount + on date-range change)
- [ ] State stores received statistical data locally
- [ ] Handle loading + error states; retry once; show fallback message

2) Weekly Time Comparison Section (Frontend)
- [ ] Show current plan time sum
- [ ] Show historical weekly average + std dev
- [ ] Date range selector updates stats + recomputes feasibility
- [ ] Compute feasibility (same method as daily categorization)

3) Status Count Section (Frontend)
- [ ] Show point legend (status → points)
- [ ] Calculate total points = Σ(statusCount * points)
- [ ] Compare to threshold ranges → feasibility

4) Evaluation Section (Frontend)
- [ ] Compute overall feasibility = combine (Weekly Time Feasibility, Status Count Feasibility)
- [ ] Display overall feasibility rating + short explanation

5) Status-Driven UI Styling (Frontend)
- [ ] All major section outlines reflect overall feasibility color
- [ ] Submission button color reflects overall feasibility

6) Container & Wiring (Frontend)
- [ ] Render the Feedback System container with three sections: 'Weekly Time Comparison Section', 'Status Count Section', and 'Evaluation Section'
- [ ] Bind outline colors + button color to overall feasibility state

7) Backend Support (Flask/Supabase)
- [ ] Ensure /api/stats returns fields needed by UI (avg, std, dateRange, statusCounts)
- [ ] Add input params for date range; validate; 400 on bad input
- [ ] Standardized JSON response (ok, service, now, response_time_ms, data{...}, error?)

8) Testing
- [ ] Unit: feasibility calculators (weekly, status-count, overall)
- [ ] Unit: color mapping by feasibility
- [ ] Integration (frontend): fetch success/error, loading, date-range update
- [ ] Integration (backend): /api/stats happy path + validation error
- [ ] E2E: user loads → stats fetched → feasibility computed → outlines + button color update

### 📘 Definition of Done
1. Data Fetch & State (Frontend)
- [ ] GET /api/stats called on mount
- [ ] State holds statistical data locally
- [ ] Loading + error UI shown appropriately
- [ ] Network timeout/abort handled; no unhandled promise rejections
- [ ] Basic unit tests for success, error, and retry paths

2. Weekly Time Comparison Section (Frontend)
- [ ] Renders current plan time sum, historical weekly average + std dev, date range, weekly time sum feasibility
- [ ] Feasibility matches daily-categorization method
- [ ] Snapshot/basic render test passes

3. Status Count Section (Frontend)
- [ ] Point legend visible; mapping matches source of truth
- [ ] Total points = Σ(statusCount * points) computed and displayed
- [ ] Feasibility derived from thresholds (config/constant) and shown
- [ ] Unit test covers legend mapping, total points calc, threshold branching

4. Evaluation Section (Frontend)
- [ ] Overall feasibility combines Weekly Time Feasibility + Status Count Feasibility (document formula)
- [ ] Rating and short explanation/calculation rendered; updates when inputs change
- [ ] Unit test validates combination logic and renders expected label

5. Status-Driven UI Styling (Frontend.
- [ ] All major section outlines change with overall feasibility
- [ ] Submission button color changes with overall feasibility
- [ ] Unit test covers color mapping for each state

6. Container & Wiring (Frontend)
- [ ] Container renders three sections: Weekly Time Comparison, Status Count, Evaluation
- [ ] Single source of truth for overall feasibility; sections + button subscribe to it
- [ ] No console warnings; lint passes
- [ ] Basic test ensures wiring updates all dependents on state change

7. Backend Support (Flask/Supabase)
- [ ] /api/stats returns required fields (avg, std, dateRange) with stable schema
- [ ] Accepts/validates date range params; returns 400 on invalid input
- [ ] Standard JSON envelope: { ok, service, now, response_time_ms, data, error? }
- [ ] Unit tests: happy path, validation error; measured response time included

8. Testing
- [ ] Unit: weekly feasibility, status-count feasibility, overall feasibility
- [ ] Unit: feasibility→color mapping for each state
- [ ] Frontend integration: fetch success/error, loading states
- [ ] Backend integration: /api/stats happy path + 400 invalid input
- [ ] E2E: user loads → stats fetched → feasibility computed → outlines + button color update