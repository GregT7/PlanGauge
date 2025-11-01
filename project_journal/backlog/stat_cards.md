# Stat Card System

## 📝 Task Overview
* Sprint: 4, 5
* Dates: June 10 - June 23 (2025)
* Status: Completed
* Story Points: 7
* Dependencies:
    * Data Table: Need basic CRUD table implemented so the stat cards can take the data from the table and other sources to make calculations
    * Code Review & Testing: Need to verify the data table is functional prior to starting development on this for debugging and design purposes
* Task Description: The stat card system shows time-based stats for each day of the week, based on current tasks and past performance. It uses average and standard deviation of past time data to judge how realistic the plan is. The cards help visually assess if the weekly plan is doable.
* Expected Outcome: A working Stat Card System is added to the planning tool. Each card shows daily workload details like total time, average, standard deviation, and a color-coded status. Users can easily check how realistic their weekly plan is. The system handles missing data well and shows a summary of status counts. All features are tested and reviewed.

---

## 🔧 Work

### ✅ Subtasks
- [x] Create new Git branch: feature/stat-cards
- [x] Create a master container component titled "Stat Cards System"
- [x] Define and store mock test data locally for development and testing
- [x] Build React components for individual Stat Cards displaying:
    - [x] Day of the week + date (e.g., Monday 6/9)
    - [x] Current plan's time sum
    - [x] Average time
    - [x] Standard deviation
    - [x] Status (e.g., Good, Moderate, Poor)
- [x] Implement default "no data" UI for missing metrics or table data
- [x] Apply dynamic color styling to each card based on status:
    - [x] Good → green
    - [x] Moderate → yellow/orange
    - [x] Poor → red
- [x] Add a component or section that counts total statuses (e.g., 3 good, 2 moderate)
- [x] Write unit tests for:
    - [x] Correct rendering with test data
    - [x] Proper color changes based on status
    - [x] Fallback/default rendering when no data is present
- [x] Open a pull request with summary and test coverage checklist
- [x] Simulate a code review (self or with ChatGPT):
    - [x] Leave 2–3 comments about areas for improvement
- [x] Apply code review changes:
    - [x] Refactor, fix, or expand tests based on comments
- [x] Conduct a final review and merge the branch into main


### 📘 Definition of Done
- [x] A new feature branch named feature/stat-cards has been created from main
- [x] The "Stat Cards System" container component is implemented and renders properly
- [x] Each stat card displays:
    - [x] Day of the week and date
    - [x] Current plan's time sum
    - [x] Average time
    - [x] Standard deviation
    - [x] Status label (e.g., Good, Moderate, Poor)
- [x] Cards dynamically change color based on status: green (good), yellow/orange (moderate), red (poor)
- [x] A default/fallback UI is displayed when data is missing
- [x] A visible status count feature is added below the cards (e.g., 3 Good, 2 Poor)
- [x] Mock test data is used to populate and verify component functionality
- [x] Unit tests cover:
    - [x] Correct rendering with mock data
    - [x] Color logic based on status
    - [x] Fallback behavior when no data is present
- [x] A GitHub pull request is created with a summary, screenshots (optional), and a test checklist
- [x] A code review is conducted (self-review or simulated)
- [x] Feedback from the review is addressed through follow-up commits
- [x] The branch passes all tests and is merged into main