# Data Entry Table

## 📝 Task Overview
* Sprint: 3
* Dates: June 1 - June 7 (2025)
* Status: Completed
* Story Points: 6
* Dependencies:
  * UI/UX Foundation - needs mockup and wireframe + static placement of table in an already existing react application
* Task Description: Implement data entry table feature that supports CRUD functionality while matching my database schema in Notion
* Expected Outcome: The data table component allows the user to manage tasks in the same exact way the Notion database feature allows

---

## 🔧 Work

### ✅ Subtasks
- [x] Develop button feature that adds an additional page ideally at the bottom of the data table
- [x] Add update functionality that allows the user to click individual cells and modify their contents
- [x] Add calendar selection option for start date and end date columns
- [x] Implement numeric column that restricts user inputs to solely positive numbers
- [x] Implement dropdown selection menu for the categories column
- [x] Load in selectable categories and their colors from a text file
- [x] Add time sum feature that sums and displays all values from the "# Estimate" column below the last entry of the column
- [x] Add delete feature that allows the user to easily delete rows by selecting them with their mouse

### 📘 Definition of Done
- [x] Data table has a button that adds new tasks with a corresponding row to the table
- [x] Data table loads in tasks and populates rows with the data automatically
- [x] Data table has a dropdown menu for categories, a calendar popup for date selection, a text input box for task naming, and a number input for time estimations
- [x] Only numbers can be inputted into the number input
- [x] The table has a selection feature using a checkbox that allows the user to choose specific rows for deletion purposes
- [x] Selected rows are deleted when a 'backspace' or 'delete' key pushdown is detected
- [x] User can select any date from the calendar, and the text in the input will reflect the currently selected date
- [x] Selectable categories have their own color highlight based on data read from a json file
- [x] There is a time sum feature that accurately sums up all the numbers in the number input column located in the footer
- [x] The user can select all cells of the table to edit its contents in some way