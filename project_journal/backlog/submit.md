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
1. Create a swimlane diagram to plan out the process of submitting plan data
2. Create + implement button component with styling
3. Design /api/plan-submissions route in the documentation
4. Write basic /api/plan-submissions route in Flask --> sends data to Notion + Supabase
5. Update basic /api/plan-submissions to verify synchronization and handle errors
6. Write React/javascript function that will handle the new api call + attach to button
7. Add notification system showing the success/error of submission attempt

### 📘 Definition of Done
1. Swimlane diagram
- [x] Shows all actors (UI, React, Flask, Supabase, Notion)
- [x] Includes success + error paths
- [x] Fully updated, reflecting most up to date design
- [x] Exported and saved in project folder

2. Button component
- [x] Works with click + loading states
- [x] Styled consistently
- [x] Temporarily disables after being clicked
- [x] Basic unit tests

3. /api/plan-submissions docs
- [x] Method, path, request, response
- [x] Error codes listed
- [x] Example success + error

4. Flask route
- [x] Accepts request + validates input
- [x] Sends data to Supabase + Notion
- [x] Manage Supabase + Notion initial responses
- [x] Synchronization verification handling
- [x] Returns standard JSON with status
- [x] Unit + integration test

5. React function
- [x] Calls API, handles success + error
- [x] Connected to button
- [x] Basic tests

6. Notifications
- [x] Show success or error toast
- [x] Tested

7. Global
- [x] End-to-end test: button → API → DB/Notion → toast
- [x] Finalize Pull Request
------ [x] Create Gifs + screenshots displaying functionality
------ [x] Finish pr documentation
------ [x] Solve merge conflicts + complete merge
------ [x] Delete side branch + update remote repo