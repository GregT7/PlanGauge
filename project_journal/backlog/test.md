# Intro to Code Reviews & Testing

## 📝 Task Overview
* Sprint: 3, 4, 5
* Dates: June 7 - June 19 (2025)
* Status: Completed
* Story Points: 6
* Dependencies:
  * Data Entry Table - need to have at least one component of the project written before something can be tested or have code be reviewed
* Task Description: Complete some integration and unit testing of react code for data entry table in addition to leveraging ChatGPT for my first time code review. A brief report will be generated documenting the code review.
* Expected Outcome: I have learned the basics of code review and unit/integration testing and verified the data table's functionality

---

## 🔧 Work

### ✅ Subtasks
- [x] Create new Git branch: feature/datatable
- [x] Delete empty test files from main (optional)
- [x] Research Vitest + React Testing Library best practices
- [x] Write unit tests:
    - [x] Render rows with mock data
    - [x] Test click events on row selectors
    - [x] Test edge cases: empty table, long strings
- [x] Research integration testing
- [x] Create a pull request on GitHub with summary and scope
- [x] Leave self-review comments simulating real feedback
- [x] Commit code changes in response to feedback
- [x] Document what changed, why the issue existed, and how it was fixed
- [x] Merge the PR into main once everything is complete and reviewed

### 📘 Definition of Done
- [x] A separate feature branch named feature/datatable has been created from main
- [x] All essential unit tests for the DataTable component are implemented using Vitest and React Testing Library
- [x] Tests pass locally via npm run test without errors or warnings
- [x] A GitHub pull request is created with:
    - [x] A clear title and summary of changes
    - [x] A checklist of what is tested
    - [x] Notes simulating code review comments (can be self-authored)
- [x] The pull request contains follow-up commits that respond to review feedback
- [x] Each follow-up commit includes a message explaining what was changed and why
- [x] PR is reviewed and merged into main
- [x] A short changelog is written explaining:
    - [x] What issues were discovered during testing
    - [x] Why they occurred
    - [x] How they were resolved
- [x] Two individual quizzes for the following topics are created, taken, and passed with at a score of 75% or greater
    - [x] Unit testing
    - [x] Integration testing