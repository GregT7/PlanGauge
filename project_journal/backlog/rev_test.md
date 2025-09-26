# Intro to Code Reviews & Testing

## 📝 Task Overview
* Sprint: 4
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
1. Create new Git branch: feature/datatable
2. Delete empty test files from main (optional)
3. Research Vitest + React Testing Library best practices
4. Write unit tests:
    1. Render rows with mock data
    2. Test click events on row selectors
    3. Test edge cases: empty table, long strings
5. Research integration testing
6. Create a pull request on GitHub with summary and scope
7. Leave self-review comments simulating real feedback
8. Commit code changes in response to feedback
9. Document what changed, why the issue existed, and how it was fixed
10. Merge the PR into main once everything is complete and reviewed

### 📘 Definition of Done
- A separate feature branch named feature/datatable has been created from main
- All essential unit tests for the DataTable component are implemented using Vitest and React Testing Library
- Tests pass locally via npm run test without errors or warnings
- A GitHub pull request is created with:
    * A clear title and summary of changes
    * A checklist of what is tested
    * Notes simulating code review comments (can be self-authored)
- The pull request contains follow-up commits that respond to review feedback
- Each follow-up commit includes a message explaining what was changed and why
- PR is reviewed and merged into main
- A short changelog is written explaining:
    * What issues were discovered during testing
    * Why they occurred
    * How they were resolved
- Two individual quizzes for the following topics are created, taken, and passed with at a score of 75% or greater
    * Unit testing
    * Integration testing