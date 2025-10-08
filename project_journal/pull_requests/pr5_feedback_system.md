# 🧾 Overview
The purpose of this PR is to implement the Feedback System, which evaluates the feasibility of user-created weekly plans in real time. It introduces the EvaluationSection, a dynamic interface that visualizes how realistic a user’s plan is by comparing planned task durations with historical performance data retrieved from the /api/db/stats endpoint. The EvaluationSection displays a color-coded summary of overall, weekly, and daily feasibility scores, updating automatically as users modify their plans. This PR also strengthens data flow between the frontend and backend, ensuring accurate statistical retrieval, consistent JSON responses, and stable rendering under all states. Extensive testing—including unit, integration, and informal end-to-end validation—confirms that the system reliably communicates performance insights across the Flask backend, Supabase database, and React frontend.

---

## 🛠️ Changes

### ✅ Created New Files
- `/frontend/src/components/EvaluationSection/EvaluationSection.jsx`: Serves as the top-level summary card for the plan’s evaluation, combining overall, weekly, and daily scores with expandable details.
- `/frontend/src/components/EvaluationSection/DetailsAccordion.jsx`: Provides a detailed explanation of the overall feasibility score with sub-accordions for weekly, daily, z-score, and point thresholds.
- `/frontend/src/components/EvaluationSection/WeekAccordion.jsx`: Calculates and displays weekly feasibility using z-scores derived from total task time, averages, and standard deviation.
- `/frontend/src/components/EvaluationSection/DailyAccordion.jsx`: Displays the daily evaluation breakdown showing day status counts and the weighted equation used to compute daily points.
- `/frontend/src/components/EvaluationSection/ZAccordion.jsx`: Explains the z-score thresholds used for categorizing weekly feasibility into Good, Moderate, or Poor
- `/frontend/src/components/EvaluationSection/PointsAccordion.jsx`: Lists how point values map to feasibility categories and shows the numeric ranges used to assign “Good,” “Moderate,” or “Poor” labels.
- `/frontend/src/components/ui/accordion.jsx`: Shadcn ui component for toggling a hidden, expandable container
- `/frontend/src/contexts/ProcessingContext.jsx`:
- `frontend/src/utils/capitalizeFirstLetter.js`: Returns a string with the first letter capitalized with some error handling to make it safer
- `frontend/src/utils/default_stats.json`: The stats object that is loaded on default until the flask API retrieves and sends the real stats data, has all the expected keys but the values are all null
- `frontend/src/utils/defaultThresholds.json`: Stores values for the point-feasibility mapping (Good --> 100 points), point range categorization (100 < x points < 75 points = good), zscore to feasibility ranges, and the weight value used in the equation that calcs the overall feasibility
- `frontend/src/utils/determineStatusStyle.js`: selects the dynamic ui styling reflecting the feasibility status safely with error handling
- `frontend/src/utils/emptyTasks.json`: An array of 3 empty tasks used to populate the task table on launch for easy data entry
- `frontend/src/utils/genDefaultCardData.js`: Creates starting card objects that stores data for statistics and other metrics that is used by the StatCardSystem
- `frontend/src/utils/isSameDay`: safely compares two dates to see if they have the same year, month, and date 
- `frontend/src/utils/test_tasks2.json`: task data used for testing
- `frontend/src/utils/updateCardStats.js`: function used to update card data when react receives stat data from the flask http request
- `frontend/src/utils/validateCardData.js`: moved a local helper function from the Stat Card System into its own separate file
- + all test files for newly created files


### 🔧 Modified Files
- `frontend/src/utils/`: 

---

## 🔗 Context
This covers the following backlog items:
- `Feedback System`: Enables the EvaluationSection to display real-time feasibility insights by comparing user plans with historical performance data from /api/db/stats, updating the UI and outer container border color to reflect the current overall feasibility categorization.

---

## 🧪 Testing

All components were tested using:

- **Testing Library**: React Testing Library
- **Test Runner**: Vitest / Jest
- **Assertions**: Jest-DOM

### 🔍 Coverage includes:

- System: end-to-end testing - informal test that checks the app launches, retrieves stats data, makes calculations for overall feasibility, and then updates UI
- React: integration testing + unit tests - tests for the EvaluationSection and related subcomponents
- React: integration testing + unit tests - tests new context provider ProcessingContext.jsx that retrieves/stores stats data, calcs feasibility + scores, and provides the overall feasibility to all subsystem components
- React: regression testing - previously created React components still work
- React: integration + unit testing - all newly created utility files
- React: regression testing - previously created utility files that were modified
- Flask: integration testing - informal tests curling the stats api endpoint with incorrect + correct query parameters to ensure errors are handled and stats data is accurately calculated + retrieved
- Flask: regression testing - previously created files still work (routing + app)

---

## 🎥 Visuals
### Application Startup Process Swimlane Diagram

_Description:_ Shows the cross system logic for launching the app where the ui is loaded, all system connections are tested, and initial stats data is requested and hopefully received

![startup_swimlane](https://github.com/user-attachments/assets/76e31c5a-2130-40e6-b420-51ccab094d43)

### Adaptive UI

_Description:_ The outer border of each subsystem container updates to reflect the current feasibility status (good - green, moderate - orange, poor - rose) based on the current state of the Task Table and retrieved statistical data

![adaptive_ui](https://github.com/user-attachments/assets/1b1b515d-7a8a-4050-9cf3-5f7494550ef3)

### Statistical Data Retrieval

_Description:_ Demonstrates how the frontend requests statistical data from the backend and handles different outcomes. This includes the UI behavior during successful and failed fetches, the toast notifications that confirm request status, and terminal results from curling the /api/db/stats endpoint with both valid and invalid query parameters.

### Frontend-initiated Request & Retrieval

_Description:_ Shows how the frontend responds when the backend is offline versus when it becomes active and successfully returns data. The UI transitions from an error state to a neutral gray state once stats data is retrieved, indicating that the backend is running but no tasks are currently present in the table.

![stats_retrieval](https://github.com/user-attachments/assets/4a2bbb29-7792-4787-b8f3-12245d907431)

### Frontend Retrieval Toast Notification

_Description:_ Displays the toast messages that appear on app launch, capturing both the stats retrieval attempt and the initial connection check that pings all system APIs to verify backend availability.

![stats_toast](https://github.com/user-attachments/assets/407b4481-fe45-46b3-842d-bae8cc15bf9a)

### Stats Retrieval API Endpoint (`/api/db/stats`)

_Description:_ Demonstrates terminal outputs from curling the Flask stats API using different query parameters to test both error and success cases. This includes validation feedback for malformed inputs and the structured JSON response returned when valid date ranges are provided.

![stats_api](https://github.com/user-attachments/assets/d254eacf-e581-41a1-912b-4644b9f02704)

### Statistical Retrieval E2E Test

_Description:_ Showcases an end-to-end test verifying the full stats retrieval workflow—from frontend request initiation to backend response and UI feedback—confirming that valid data updates visual elements and toast notifications as expected.

![feedback_e2e](https://github.com/user-attachments/assets/708ef933-3a19-484e-90b6-fac08093284f)

### Evaluation Section
_Description:_ Displays the results of the feasibility analysis by summarizing weekly and daily performance metrics, visual feedback colors, and categorized feasibility levels. This section integrates multiple data sources from the backend and presents a structured, readable breakdown of how the user’s plan aligns with predicted workload capacity.

### Component Demo

_Description:_ Provides an overview of the full Evaluation Section in action, showing how overall feasibility, daily summaries, and supporting details are visually combined into a cohesive UI.

![eval_section](https://github.com/user-attachments/assets/be3f6bf4-71e1-4316-b0c0-254570566a1a)

### Details Accordion

_Description:_ Breaks down how the overall feasibility score is computed, including equations, weighting factors, and status filters used to determine the final evaluation category.

![details_accordion](https://github.com/user-attachments/assets/7d251851-73c2-4c49-888a-00388da765c7)

### Week Accordion

_Description:_ Summarizes weekly-level performance metrics, including average planned time, standard deviation, and feasibility points. Offers a high-level view of consistency and time distribution across the week.

![week_accordion](https://github.com/user-attachments/assets/ec6e4fb2-ffb6-450d-9654-802e41b0743b)

### Daily Accordion

_Description:_ Highlights per-day statistics and categorical breakdowns of statuses (Good, Moderate, Poor). Displays how each day’s workload contributes to the overall feasibility score.

![daily_accordion](https://github.com/user-attachments/assets/54dd00c7-fc7b-406c-8aa5-bdf5eeeece21)

### Z-Score Accordion

_Description:_ Shows how z-score thresholds are applied to categorize deviations from expected time values, forming the statistical basis for the feasibility color mapping.

![zscore_accordion](https://github.com/user-attachments/assets/02a46068-4f32-4064-9b6c-1d80b663224a)

### Points Accordion

_Description:_ Defines the point ranges associated with each feasibility category (Good, Moderate, Poor) and visualizes how computed scores translate into qualitative ratings.

![points_accordion](https://github.com/user-attachments/assets/f7a3884d-5abb-4f16-98b0-ee27d1e253c7)

### React Testing Coverage

_Description:_ Displays the Vitest coverage summary generated from running `npm run test -- --coverage`. The report highlights overall testing completeness across frontend components, including statements, branches, functions, and lines—providing a clear overview of which UI and logic modules have been validated through unit and integration tests.

![vitest_coverage](https://github.com/user-attachments/assets/327e2068-d45b-42eb-8015-368a50055047)

---
## 🐞 Unresolved Bugs
### 

---


## 👀 ChatGPT Review
I'd appreciate feedback on:

- 🧪 Test coverage
- 🧱 Component or logic design
- ⏱️ Pacing of work
- 🚧 Scope creep analysis
- 🧠 Overall quality — score 1–10 with reasoning

---

## 📂 Branch Info
- **Base branch**: `main`
- **Feature branch**: `feedback_system`

This merges the final feature for the MVS with the main branch. After this, e2e testing will be conducted and documentation will be finalized. 

---

# 📋 ChatGPT PR Review – Feedback System

End-to-end “Feedback System” delivers a coherent evaluation layer that closes the loop between backend statistics and user-facing feasibility feedback. The PR successfully connects `/api/db/stats` to a dynamic `EvaluationSection` featuring color-coded cards, detailed accordions, and backend-driven categorization. The documentation and visuals clearly demonstrate UI states, error handling, and the E2E flow from API call → UI render → visual feedback.  

---

## 🧪 Test Coverage

**What’s good**
- Added E2E visuals verifying `/api/db/stats` success and validation error handling  
- Regression tests for core calculation functions and color mapping  
- Vitest coverage screenshots included with breakdown by component  

**Gaps / high-leverage adds**
1. **Frontend fetch lifecycle**
   - Add explicit tests for loading spinner/skeleton, error toasts, and border re-color after recovery  
   - Mock `/api/db/stats` to simulate `500` and delayed responses  

2. **Feasibility color mapping**
   - Unit tests for each possible state (`Good`, `Moderate`, `Poor`, `Default`, `Unknown`)  
   - Verify the correct outline and border colors render dynamically  

3. **Context & Prop handling**
   - Simulate default and missing data within `ProcessingContext` and `TaskContext`  
   - Confirm EvaluationSection gracefully handles blank stats or bad dates  

4. **Integration flow**
   - Test that a stats fetch triggers feasibility calculation  
   - Confirm `EvaluationSection` updates the parent container color and feasibility label  

5. **UI stability**
   - Ensure accordions render accessible labels, collapse properly, and persist expanded state  
   - Add keyboard navigation tests (Tab + Enter for expanding sections)  

---

## 🧱 Component / Logic Design

- **Modular composition:** EvaluationSection acts as a wrapper aggregating multiple accordions (`PointsAccordion`, `DetailsAccordion`, `ZAccordion`), following single-responsibility principles.  
- **State synchronization:** Uses consistent context-driven updates between `ProcessingContext` and task data.  
- **Color standardization:** Centralized logic ensures consistent mapping across cards, toasts, and outlines.  
- **Error resilience:** `/api/db/stats` endpoint responses are validated and surfaced via user toasts, reducing silent failures.  
- **Graceful degradation:** Default and “unknown” states visually distinguish incomplete data instead of crashing or rendering null.  

---

## ⏱️ Pacing of Work

- Scope is balanced—front-end logic, API testing, and documentation updates are cohesive.  
- Visuals make the workflow understandable without needing to run the app.  
- Moderate code churn (~+2.7k/−1.1k LOC estimated) is acceptable for a subsystem addition.  
- Suggest future PRs split into:
  - Evaluation UI / Logic (React)
  - `/api/db/stats` Testing & Integration
  - Visual documentation / assets  

---

## 🚧 Scope Creep Analysis

- Stayed aligned with original backlog item “Feedback System.”  
- Incorporated additional polish:
  - Standardized color tokens (okLCH theme)
  - Fixed text-image formatting issues in Markdown
  - Resized GIFs for better loading performance  
- Minor doc/UI adjustments beyond the DoD but all additive, not disruptive.  

---

## 🧠 Overall Quality — Score

**8.5 / 10**

**Why:**  
Feature is cohesive, intuitive, and backed by visible testing and visuals. Strong modular design and consistent feedback handling. Points off for a few untested UI flows (loading/error), accessibility gaps, and potential keyboard event side effects in the table components.

---

## ✅ Recommended Next Steps

- Add explicit tests for fetch lifecycle and border re-color logic  
- Scope keyboard `Backspace` handling only to non-input elements  
- Validate orange contrast ratio against dark backgrounds for WCAG AA  
- Add fallback placeholder labels for empty category selections  
- Introduce accessibility labels (`aria-live` for toast events, accordion headings)  
- Consider persisting table state to localStorage or Supabase to preserve user entries  
- Split future PRs to maintain a 400–800 LOC window and shorten review cycles  

---
