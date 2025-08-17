# 🌀 Retrospective #5 – Planning & Documentation Lag

## 📋 Summary
**Date:** Tuesday, June 24, 2025

**What Went Well**
- Finished all planned work
    - Completed all 3 assigned backlog items
    - Merged 2 pull requests with feature-ready code
- Improved consistency and discipline
    - Hosted standup meetings 6 out of 7 days — a major improvement over past sprints
    - Followed the personal improvement plan exactly as intended
- Strong execution on feedback and planning
    - Implemented many ideas discussed during standups
    - Created new backlog items thoughtfully (e.g., CI/CD for resume enhancement, testing prep for expected workload)
- High attention to quality
    - Thoroughly tested frontend components and added prop-level error handling
    - Acted quickly to fix code that caused tests to fail
    - Added GIFs to PRs to showcase features for clearer visibility
- Effective use of support tools
    - Created ChatGPT-guided quizzes to fill in knowledge gaps from incomplete content

**What Didn't Go Well**
- Retrospective was not completed during the sprint
    - The Sprint 5 retrospective carried over into Sprint 6, delaying the feedback loop.
    - This made it harder to immediately reflect on what worked and what could be improved.
- Sprint ended without a formal transition plan
    - Although it was a deliberate choice to wait on backend planning, this left Sprint 5 without a clear documented handoff.
    - As a result, Sprint 6 started with some ambiguity and required time to clarify the next steps.
- Sprint scope pushed energy limits by the end
    - Completing the stat card system was a solid technical milestone, but it consumed most available bandwidth.
    - This left little time or energy to close out the sprint process, suggesting the scope may have been slightly too ambitious.

---

## 🧩 Problems

**Issues Identified**
- Retrospective Slippage
    - The Sprint 5 retrospective was not completed on time, delaying reflection and causing some context loss heading into Sprint 6.
- Unclear Transition Planning
    - The sprint wrapped up without a defined path into backend or database work. This caused some friction at the start of Sprint 6 as direction had to be clarified reactively.
- No Architectural Diagrams Available
    - While not a blocker during Sprint 5, the lack of visuals (e.g. swim lane or data flow diagrams) became a bottleneck when planning Sprint 6 backend tasks.
- Slight Overextension Toward Sprint End
    - High output (e.g., two PRs, full backlog completion) led to energy depletion, which may have contributed to process tasks like retrospectives being skipped.

**Root Cause**
- Sprint reflection and planning was deprioritized due to fatigue
    - Focus and energy were concentrated on completing core technical tasks (e.g. stat card system), leaving limited bandwidth for reflective tasks like the retrospective and planning for the next sprint.
- Intentional deferral of planning tasks
    - Transition planning and visual diagrams were consciously delayed to avoid premature design. While a valid strategy, it led to ambiguity when the next sprint began.
- Backend planning lacked upstream alignment
    - The backend setup was initially scoped without fully recognizing its dependency on a defined database schema. This created uncertainty when implementation began.
- Planning buffer was not built into sprint schedule
    - All available time was allocated to feature work, leaving little slack for cleanup, planning, or architectural prep work near the sprint’s end.
- Testing priorities focused on UI functionality
    - Since backend work hadn’t started, integration testing wasn’t a priority — but the sprint didn’t include a placeholder or mock test plan, creating a gap.

---

## 🛠️ Solutions

**Proposed Solutions**
- Schedule and timebox retrospectives before sprint ends
    - Block out time on the final sprint day to complete the retrospective and next sprint planning. Treat it as non-negotiable to protect reflection and momentum.
- Create early-stage planning diagrams before development begins
    - Roughly sketch key workflows (e.g., data flow or swim lanes) before implementing features. These don’t need to be polished — they’re meant to support thinking, not presentation.
- Add 10–15% buffer in sprint scope for planning & process
    - Cap technical task load slightly below 100% capacity to preserve energy for retrospectives, diagrams, documentation, and architectural thinking.

**Action Plan**
- Timebox sprint retrospective and planning
    - Reserve the last day of the sprint for completing the retrospective and planning for the next sprint at the end of each sprint. at the Make it a recurring task in your system.
- Start visual planning earlier in each sprint
    - Begin rough diagrams (e.g., schema, dataflow, swim lanes) as soon as related backlog items are selected — not during implementation.
- Include a 10–15% buffer for planning and process work
    - Intentionally under-allocate technical tasks to preserve time for retrospectives, documentation, and architectural tasks.
    - Reassign backend integration backlog item to next sprint, dedicate this sprint to just setting up the database. If this item is finished early, then add backend task to this sprint.
- Maintain consistency with daily standups
    - Continue the strong habit of holding standups on 6 out of 7 days. Use them to self-correct drift and surface blockers early.