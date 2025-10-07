# 🧾 Overview
The purpose of this PR is to implement the Feedback System, which evaluates the feasibility of user-created weekly plans in real time. It introduces the EvaluationSection, a dynamic interface that visualizes how realistic a user’s plan is by comparing planned task durations with historical performance data retrieved from the /api/db/stats endpoint. The EvaluationSection displays a color-coded summary of overall, weekly, and daily feasibility scores, updating automatically as users modify their plans. This PR also strengthens data flow between the frontend and backend, ensuring accurate statistical retrieval, consistent JSON responses, and stable rendering under all states. Extensive testing—including unit, integration, and informal end-to-end validation—confirms that the system reliably communicates performance insights across the Flask backend, Supabase database, and React frontend.

---

## 🛠️ Changes

### ✅ Created New Files
- `/frontend/src/components/EvaluationSection/EvaluationSection.jsx`: 
- `/frontend/src/components/EvaluationSection/DetailsAccordion.jsx`: 
- `/frontend/src/components/EvaluationSection/WeekAccordion.jsx`: 
- `/frontend/src/components/EvaluationSection/DailyAccordion.jsx`: 
- `/frontend/src/components/EvaluationSection/ZAccordion.jsx`: 
- `/frontend/src/components/EvaluationSection/PointsAccordion.jsx`: 
- `/frontend/src/components/ui/accordion.jsx`:
- `/frontend/src/contexts/ProcessingContext.jsx`:
- `frontend/src/utils/capitalizeFirstLetter.js`:
- `frontend/src/utils/default_stats.json`:
- `frontend/src/utils/defaultThresholds.json`:
- `frontend/src/utils/determineStatusStyle.js`:
- `frontend/src/utils/emptyTasks.json`:
- `frontend/src/utils/genDefaultCardData.js`:
- `frontend/src/utils/isSameDay`:
- `frontend/src/utils/test_tasks2.json`:
- `frontend/src/utils/updateCardStats.js`:
- `frontend/src/utils/validateCardData.js`:
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
Description:
![startup_swimlane](https://github.com/user-attachments/assets/76e31c5a-2130-40e6-b420-51ccab094d43)

### Adaptive UI
Description: 
![adaptive_ui](https://github.com/user-attachments/assets/2d0b157f-87a6-458a-a59e-999568f774a4)

### Statistical Data Retrieval
Description:

**Frontend Statistical Data Retrieval**
Description: 
![stats_retrieval](https://github.com/user-attachments/assets/4a2bbb29-7792-4787-b8f3-12245d907431)

**Stats Retrieval API Endpoint (`/api/db/stats`)**
Description:
![stats_api](https://github.com/user-attachments/assets/d254eacf-e581-41a1-912b-4644b9f02704)

### Statistical Retrieval & Adaptive UI (E2E Test)**
Description: 
![feedback_e2e](https://github.com/user-attachments/assets/61b73ea9-c549-4bd8-9ab7-c0692e0f86c3)

### Evaluation Section
Description:

**Component Demo**
Description:
![eval_section](https://github.com/user-attachments/assets/404a6504-70dc-4329-b064-5753130a4813)

**Details Accordion**
Description:
![details_accordion](https://github.com/user-attachments/assets/316a88e3-24ad-47dc-8280-f7acd959adb9)

**Week Accordion**
Description:
![week_accordion](https://github.com/user-attachments/assets/c936a150-1afe-429b-8ac9-cce10de71faa)

**Daily Accordion**
Description:
![daily_accordion](https://github.com/user-attachments/assets/a3a8f04a-c338-4c5b-b716-21d30b698da2)

**Z-Score Accordion**
Description:
![zscore_accordion](https://github.com/user-attachments/assets/76f68329-d8a2-496e-89b7-0b491862487f)

**Points Accordion**
Description:
![points_accordion](https://github.com/user-attachments/assets/dbd9a8f6-58a8-409b-a9b4-de024d668ceb)

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