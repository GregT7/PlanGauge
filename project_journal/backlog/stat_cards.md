# Stat Card System

## 📝 Task Overview
* Sprint: 4
* Dates: June 19 - June 23 (2025)
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
1. Create new Git branch: feature/stat-cards
2. Create a master container component titled "Stat Cards System"
3. Define and store mock test data locally for development and testing
4. Build React components for individual Stat Cards displaying:
    * Day of the week + date (e.g., Monday 6/9)
    * Current plan's time sum
    * Average time
    * Standard deviation
    * Status (e.g., Good, Moderate, Poor)
5. Implement default "no data" UI for missing metrics or table data
6. Apply dynamic color styling to each card based on status:
    * Good → green
    * Moderate → yellow/orange
    * Poor → red
7. Add a component or section that counts total statuses (e.g., 3 good, 2 moderate)
8. Write unit tests for:
    * Correct rendering with test data
    * Proper color changes based on status
    * Fallback/default rendering when no data is present
9. Open a pull request with summary and test coverage checklist
10. Simulate a code review (self or with ChatGPT):
    * Leave 2–3 comments about areas for improvement
11. Apply code review changes:
    * Refactor, fix, or expand tests based on comments
12. Conduct a final review and merge the branch into main


### 📘 Definition of Done
- A new feature branch named feature/stat-cards has been created from main
- The "Stat Cards System" container component is implemented and renders properly
- Each stat card displays:
    * Day of the week and date
    * Current plan's time sum
    * Average time
    * Standard deviation
    * Status label (e.g., Good, Moderate, Poor)
- Cards dynamically change color based on status: green (good), yellow/orange (moderate), red (poor)
- A default/fallback UI is displayed when data is missing
- A visible status count feature is added below the cards (e.g., 3 Good, 2 Poor)
- Mock test data is used to populate and verify component functionality
- Unit tests cover:
    * Correct rendering with mock data
    * Color logic based on status
    * Fallback behavior when no data is present
- A GitHub pull request is created with a summary, screenshots (optional), and a test checklist
- A code review is conducted (self-review or simulated)
- Feedback from the review is addressed through follow-up commits
- The branch passes all tests and is merged into main