# Sprint 9 - Approaching Completion

## 📝 Overview
* Dates: September 17 - October 1 (2025)
* Status: Complete
* Backlog Progress: 1 backlogs assigned / 2 backlogs completed ( 50% )
* Tasks Assigned:
    * `Plan Submission`
    * `Feedback System`
* Goal: The application can evaluate the feasibility of the overall plan and update Notion
* Objective: Finish up basic application setup with feasibility categorization and Notion/DB submission capabilities. Also have the MVS redefined and updated to reflect current project status.
* Milestones:
    1. Submission button is styled and implemented
    2. New flask api routes are documented and implemented
    3. Plan data is successfully sent and stored to Supabase and Notion
    4. There is error handling of api requests
    5. The overall feasibility of the plan is evaluated where the weekly time sum and feasibility count of each day is accounted for
    6. A separate section is created and colored where the feasibility categorization is clearly labeled
    7. The colors of the button and separate feasibility section dynamically change to reflect the feasibility status

--- 

## 🔍 Review
* Major Sprint Feedback  
This sprint demonstrated strong consistency in daily standups and steady feature implementation, especially with the ProcessingContext refactor and evaluation/summary section design. I followed through on most key decisions (72.7%), but slipped on documentation and incremental testing, which caused bugs to ripple late in the sprint. Overreliance on AI-generated test cases also highlighted the need for stronger test discipline. Overall, the sprint made big strides in functionality but lacked balance in planning and documentation.

* Retro Notes  
The sprint succeeded in implementing new features, maintaining work consistency, and improving UI clarity, but it fell short in upfront planning and use of diagrams. Documentation was delayed to the last minute, and incremental testing was skipped, leading to compounded bugs. Root causes were avoiding diagrams due to time overhead and procrastinating on tests due to tedium. Next steps are to create lightweight diagrams before coding, integrate iterative testing into development, and prioritize documentation in parallel with feature work.