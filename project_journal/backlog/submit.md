# Plan Submission

## 📝 Task Overview
* Sprint: 8, 9
* Dates: September 12th - September 26th (2025)
* Status: Completed
* Story Points: 7
* Dependencies:
  * `Backend Setup`
  * `Intro to Flask`
  * `Subsystem Integration`
  * `Database Setup`

* Task Description: Send and save data stored in the task table to Notion database + Supabase database using a button
* Expected Outcome: The app includes a submission button that will post data to the database and my personal Notion database with error and synchronization issue handling. Additionally, the styling of the button will match the overall aesthetic of the application so far.

---

## 🔧 Work

### ✅ Subtasks
- [x] Create a swimlane diagram to plan out the process of submitting plan data
- [x] Create + implement button component with styling
- [x] Design /api/plan-submissions route in the documentation
- [x] Write basic /api/plan-submissions route in Flask --> sends data to Notion + Supabase
- [x] Update basic /api/plan-submissions to verify synchronization and handle errors
- [x] Write React/javascript function that will handle the new api call + attach to button
- [x] Add notification system showing the success/error of submission attempt

### 📘 Definition of Done
- [x] Swimlane diagram
  - [x] Shows all actors (UI, React, Flask, Supabase, Notion)
  - [x] Includes success + error paths
  - [x] Fully updated, reflecting most up to date design
  - [x] Exported and saved in project folder

- [x] Button component
  - [x] Works with click + loading states
  - [x] Styled consistently
  - [x] Temporarily disables after being clicked
  - [x] Basic unit tests

- [x] /api/plan-submissions docs
  - [x] Method, path, request, response
  - [x] Error codes listed
  - [x] Example success + error

- [x] Flask route
  - [x] Accepts request + validates input
  - [x] Sends data to Supabase + Notion
  - [x] Manage Supabase + Notion initial responses
  - [x] Synchronization verification handling
  - [x] Returns standard JSON with status
  - [x] Unit + integration test

- [x] React function
  - [x] Calls API, handles success + error
  - [x] Connected to button
  - [x] Basic tests

- [x] Notifications
  - [x] Show success or error toast
  - [x] Tested

- [x] Global
  - [x] End-to-end test: button → API → DB/Notion → toast
  - [x] Finalize Pull Request
    - [x] Create Gifs + screenshots displaying functionality
    - [x] Finish pr documentation
    - [x] Solve merge conflicts + complete merge
    - [x] Delete side branch + update remote repo