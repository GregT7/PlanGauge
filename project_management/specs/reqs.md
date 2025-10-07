# Requirements Specification

## 1. Feasibility Categorization

### 1.1 Daily Feasibility
- R-1.10: The application shall compute the total planned time for each day based on current user input.
- R-1.11: The application shall retrieve historical average task durations (`μ_d`) and standard deviations (`σ_d`) for each day of the week.
- R-1.12: The application shall categorize each day's feasibility as follows:
  - Good: Within 1σ of μ_d
  - Moderate: Within 2σ of μ_d
  - Poor: More than 2σ away from μ_d
- R-1.13: The application shall display feasibility status on a visual stat card with color-coded indicators using the following mapping:
  - Good: green
  - Moderate: yellow/orange
  - Poor: red
- R-1.14: Stat cards shall update dynamically as user input changes, including color styling and presentation of data.

### 1.2 Weekly Feasibility
- R-1.20: The application shall compute the total planned time for the week (`T_week`).
- R-1.21: The application shall tally the count of daily statuses (e.g., {Good: 3, Moderate: 3, Poor: 1}).
- R-1.22: The application shall categorize overall weekly feasibility using a heuristic rule based on `T_week` and status count.
- R-1.23: The weekly plan status shall be visualized using a summary component with corresponding color coding and text.
- R-1.24: The weekly feasibility rating shall influence the visual styling of the submission button and plan feedback.

## 2. Task Entry Table (Notion-like Input)
- R-2.10: The application shall use a data entry table that corresponds to a specific Notion table schema.
- R-2.11: The application shall include a text input column named "Task Name" for entering the name of the task.
- R-2.12: The application shall include a selector input column named "Category" for selecting the task’s category.
- R-2.13: The application shall include two date input columns named "Due Date" and "Start Date".
- R-2.14: The application shall include a number input column named "Time" for entering estimated task duration.
- R-2.15: The table shall display its columns in the following order: "Task Name", "Category", "Due Date", "Start Date", "Time", consistent with the Notion table schema.
- R-2.20: The application shall support adding and deleting tasks from the table.
- R-2.21: Each cell in the table shall be editable.
- R-2.22: The application shall allow users to add an unlimited number of tasks.
- R-2.23: The application shall allow users to delete multiple tasks in a single action.
- R-2.24: The application shall automatically adapt the size of the table based on the number of tasks present.
- R-2.25: The data entry table shall resize responsively while preserving the visibility, accessibility, and styling of all other user interface components.
- R-2.30: The application shall enforce column domain constraints that match the Notion schema.
- R-2.31: The available categories and their respective colors for the "Category" column shall be loaded from a local data file.
- R-2.32: The "Time" input column shall accept only positive whole numbers.
- R-2.33: The "Due Date" and "Start Date" columns shall restrict input to valid calendar dates.
- R-2.40: The table shall employ a dark mode aesthetic that matches the user's Notion configuration.

## 3. Stat Card System
- R-3.10: The application shall display one stat card for each day with planned tasks.
- R-3.11: Each card shall display: total time, feasibility status, color-coded border, historical average, and historical standard deviation.
- R-3.13: Cards shall update their display in real time as user inputs change.
- R-3.14: The stat card system shall display the status number count somewhere within the system's container (e.g., Good: 3, Moderate: 4, Poor: 0) and update dynamically as tasks are modified.

## 4. Weekly Summary System
- R-4.10: The application shall contain a plan summary component that displays the feasibility estimation of the overall plan.
- R-4.11: The summary shall display total planned time, weekly feasibility status, and details behind the calculation that categorizes the plan.
- R-4.12: The summary's component border and text shall reflect the weekly plan status while maintaining the established status:category color mapping.

## 5. Submission
- R-5.10: The application shall include a button that triggers an API POST request to update a connected Notion table.
- R-5.11: The application shall display a temporary success/failure indicator for the API request.
- R-5.12: The submission button shall implement a short cooldown to prevent repeated submissions.
- R-5.13: During cooldowns, the button shall temporarily change its styling until the cooldown ends.
- R-5.14: The button and internal text coloring shall reflect the weekly plan status.

## 6. UI/UX and Styling
- R-6.10: The application shall use a modern styling technology (e.g., TailwindCSS).
- R-6.11: All visual components shall fit within 1920x1080 screens without horizontal scrolling.
- R-6.12: Colors shall update dynamically as plan data changes using transition animations.
- R-6.13: Hovering over the submission button shall trigger a visual effect.
- R-6.14: Fonts, spacing, and layout shall remain consistent across the interface.

## 7. System Behavior
- R-7.10: The application shall store API keys in a local `.env` file for safety.
- R-7.11: The application shall load historical task data from a local or remote database on launch.

## 8. Optional / Future
- R-8.10: The application shall include a settings page for customizing tooltip visibility, time thresholds, and stat weighting.
- R-8.11: The application shall include a stats page that displays weekly summaries, time trends, and class-level breakdowns.
- R-8.12: The application shall support exporting plans as PDF or CSV.
- R-8.13: The application shall support toggling between manual and historical baseline methods for feasibility ratings.
