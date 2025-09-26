# 🧾 Overview
The purpose of this PR is to create a button that can save user inputted data to the database and Notion API. The code across the frontend and backend employs robust error handling to ensure nothing brakes during use. This includes synchronization verification which required an update to the database schema. Moreover, some additional database changes were needed to reflect the desired design implementation such as generating `submission_id` for `plan_submission` records using the database not the backend. Moving on, user notification alerts will be generated when a response is finally received from the initial request launched by clicking the submission button. These features were supported by refactoring the existing routes in `routes.py` and designing a new route for `plan-submissions` alongside rigorous testing for new & modified files.

---

## 🛠️ Changes

### ✅ Created New Files
- `SubmissionButton.jsx`: Button component at bottom of page responsible for initiating HTTP post requests to DB + Notion API
- `formatDateToYYYYMMDD.js`: Helper function used in `SubmissionButton.jsx` to clean date data before sending it to backend
- `persistentFetch.js`: Includes two helper functions used in `connectionTest.js` that will make 3 delayed attempts to reach flask before giving up
- `planningRange.js`: loads in default dates used to filter data for stat calculations
- `submitPlans.js`: helper function used in `SubmissionButton.jsx` as the button's attachment function
- `verifyPayload.js`: Helper function used in `submitPlans.js` to verify the entire react payload prior to sending it to flask
- created testing files for every new script file

### 🔧 Modified Files
- `flask_api.xlsx`: added/modified/deleted many example responses after modifying route implementation
- `App.jsx`: Uses a promise based toaster for the connectionTest for better user communication
- `submission_swimlane.png`: Updated diagram to reflect most up to date design for the submission process
- `StatCardSystem.jsx`: added default card data in the case that no data is passed as props
- `connectionTest.jsx`: added more data verification methods, refactored to make code more clean
- `cardData.jsx` --> `testCardData.jsx`: renamed data file to reflect how its currently being used
- `db_setup.sql`: Modified the `plan` and `plan_submission` schemas to hold synchronization data and automatically generate new record ids
- `routes.py`: refactored existing routes for improved error handling + consistent responses and added a new route for submitting data (`/api/plan-submissions`)
- updated corresponding testing files to ensure all passing cases

---

## 🔗 Context
This covers the following backlog items:
- `Plan Submission`: Submit and save plan data to Notion & Database with sync checking & error handling

---

## 🧪 Testing

All components were tested using:

- **Testing Libraries**: React Testing Library, pytest
- **Test Runner**: Vitest + Jest

### 🔍 Coverage includes:

- System: regression testing - reran all currently existing tests (react + python) and then modified a combination of test cases and source code to ensure everything passed
- System: end-to-end testing - informal test conducted to see if plan submission works when involving all subsystems (refer to gif below)
- React: unit testing - new tests were added to account for modifications in old code
- React: unit testing - new tests added to cover new helper functions
- React: integration & unit testing - tested new `SubmissionButton.jsx` component to ensure it works by itself and doesn't cause problems when loaded in with the entire application
- React: integration testing - fixed previous issue of `StatCardSystem` failing tests (due to rendering issues when no props passed)
- Flask: unit testing - ensure modifications to previous routes don't cause any issues
- Flask: unit testing - ensure new `/api/plan-submission` posts data to the DB + Supabase and responds to react in an expected fashion

---

## 🎥 Visuals

### System - Plan Submission
- Description: Demonstration showing the plan data being stored to the database and target Notion DB with notifications
![submit_gif](https://github.com/user-attachments/assets/c5f0720c-d734-42c3-827e-fa74ef04c224)

### System - Submission Process Swim Lane Diagram
- Description: Visually explains the algorithm used across systems to submit the plan records while managing errors
![submit_swimlane](https://github.com/user-attachments/assets/af1c8506-b8b6-4aa8-b8bc-66a486e7e5e2)

### React - Submission Button
- Description: New component that is responsible for storing user entered plan records
![submit_button](https://github.com/user-attachments/assets/825e1f2b-2174-44df-87fa-4665448d7ee3)

### React - Loading Toasts
- Description: Toast notifications are sent as soon as the app launches or user clicks the submission button for improved feedback. Once launching or submission is done, the notification will update to reflect its status (success/failure)
![connect_toast](https://github.com/user-attachments/assets/0d256b90-c623-4856-b840-7ab8fdd2d5d9)
![submit_toast](https://github.com/user-attachments/assets/6df78f6c-7f8e-4c14-b43f-25c8c500fa9e)


### Flask - Updated API Documentation
- Description: Added two additional documentation pages + modified & appended more entries to the examples page

#### Response Keys
- Description: Details the keys included in the responses return by Flask, their purpose, location area, example, and shape
![flask_key1](https://github.com/user-attachments/assets/cb386baa-ca1b-4753-a250-71cb40926f5d)
![flask_key2](https://github.com/user-attachments/assets/f586d851-327e-4b30-a2b6-b19ecc580442)

#### Flask Response Examples
- Description: Shows the non-exhaustive potential responses that can be returned from each api endpoint
![flask_api_examples](https://github.com/user-attachments/assets/fab8400a-e10d-4611-accd-8fe4dc16a2fc)

#### Flask HTTP Code Explanations
- Description: Adds further context to the HTTP codes returned by flask
![flask_http](https://github.com/user-attachments/assets/7c82d768-458d-4157-b763-77047a145667)


### Database - Schema Updates For `plan_submission` Records
- Description: Updated schema for `plan_submission` to manage synchronization handling
![fdd_schema](https://github.com/user-attachments/assets/7859ea2f-b201-4494-9fe5-1e8cd48e95ba)

---

## 👀 Reviewers
Tag teammates for code review and feedback.  
Example:
@teammate-name (for test logic review)

I'd appreciate feedback on:

- 🧪 Test coverage
- 🧱 Component or logic design
- ⏱️ Pacing of work
- 🚧 Scope creep analysis
- 🧠 Overall quality — score 1–10 with reasoning

---

## 📂 Branch Info
- **Base branch**: `main`
- **Feature branch**: `plan_submission`

--- 

# 📋 ChatGPT PR Review – Plan Submission

End-to-end “Plan Submission” is a solid, traceable slice: button → payload verification → Flask route → DB + Notion → user toasts. The PR description is clear and the visuals help reviewers understand the flow and success criteria. Nice job keeping `/api/plan-submissions` and the DB UUID generation in scope.

---

## 🧪 Test Coverage

**What’s good**
- Added unit + integration tests across React and Flask
- Regression reruns mentioned
- Coverage list shows happy & unhappy paths

**Gaps / high-leverage adds**
1. **Date handling edge cases**
   - ISO strings with `Z` at midnight (e.g., `"2025-09-24T00:00:00Z"`)
   - Non-zero-padded dates (`"2025-6-01"`) → should reject
   - Add tests for `formatDateToYYYYMMDD`, `verifyPayload`, and BE `is_valid_date`

2. **Idempotency / double-click**
   - Test button disables after first click
   - Rapid-fire clicks should yield **one** request + one toast

3. **Retry semantics**
   - Unit test `persistentFetch`:
     - Stops after 3 tries
     - Delays correct (mock timers)
     - Aborts properly
     - Propagates error

4. **Error propagation & UX**
   - Case: Supabase fails, Notion succeeds (and vice-versa)
   - Ensure correct toast + sync status

5. **Contract tests for `/api/plan-submissions`**
   - Minimal valid payload
   - Missing required key
   - Bad date format
   - Empty task array
   - Duplicate submission (idempotency)

---

## 🧱 Component / Logic Design

- **Thin `SubmissionButton`**: delegate orchestration to `submitPlans.js`
- **Validation consistency**: FE + BE should share rules (required keys, strict date regex)
- **Idempotency**: add `submission_hash` unique index; return `{ok:true, idempotent:true}`
- **Consistent error shape**: `{ ok:false, error:{ code, message, details }, service:[...] }` everywhere
- **Toast lifecycle**: always transition once (loading → success/error)

---

## ⏱️ Pacing of Work

- Shipped a meaningful vertical slice quickly
- ~59 files and ~+6.3k/−2.4k changes → heavy for review
- Future: split PRs into:
  - Backend (route + schema + tests)
  - Frontend (button + helpers + tests)
  - Docs/visuals

---

## 🚧 Scope Creep Analysis

- Core stayed on track (button, helpers, route, schema)
- Extras included:
  - StatCard defaults
  - Docs/visuals
  - File renames
- Minor creep: not harmful, but splitable for clarity

---

## 🧠 Overall Quality — Score

**7.8 / 10**

**Why:**  
Strong cross-stack slice with UX + tests. Points off for PR size, missing edge-case tests, and potential FE/BE validation drift.

---

## ✅ Recommended Next Steps

- Add **idempotency** via `submission_hash` unique index
- Tighten **date handling** (`YYYY-MM-DD`, timezone safe, mirrored FE/BE validators)
- Harden **persistentFetch** with retry tests & jitter
- Add **double-click safety** tests for button
- Enforce **uniform error shape** on BE
- Keep future PRs **≤ 400–800 LOC** and split docs/visuals