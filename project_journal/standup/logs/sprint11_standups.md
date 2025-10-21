# 📅 Sprint #11 – Project Polishing
* **Dates:** October 17th - October 31st (2025)

---

## 🗓️ Standup 1 – Getting Started Up Again

### 🧾 Overview
* **Date:** Friday, October 17th (2025)
* **Time:** 1:46 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Presentation Readiness`
  - `End-to-End Testing`

---

### 📋 Contents

#### ✅ Planned Agenda
- Transitioning focus toward job applications but still want to push to finalize the project.
- Sprint 10 is over — need to plan Sprint 11 realistically with reduced available time.
- Focus for the next sprint will be on completing documentation and final end-to-end (E2E) testing setup.

#### 📈 Previous Progress
- Finalized documentation of major project management artifacts:
  - `user-stories.md`, `mvs.md`, `design.md`, `reqs.md`, `pop.md`, `sdp.md`
- Made strong progress on the `README` file:
  - Added title and description
  - Implemented collapsible table of contents
  - Expanded “Overview” section to include descriptions, testing coverage, and updated architecture diagram

#### 🧱 Problems & Blockers
- Sprint 10 ended without fully completing the E2E testing setup or demo preparation.
- Need to define and plan Sprint 11 with realistic expectations given job application priorities.
- Balancing time between portfolio work and active job search is now a key constraint.

#### ⏳ Pending Actions
- Complete `README.md`
- Finalize and test the launch script for end-to-end testing (`test-boot.js`)

#### 🔜 Next Steps
- Wrap up remaining Sprint 10 deliverables:
  - Write Sprint 10 retrospective (`sprint10.md`)
- Begin Sprint 11 planning and documentation:
  - Define sprint goals and estimated duration
  - Add `sprint11.md` based on `sprint_template.md`
- Run final debugging on the Playwright configuration and test server script.

---

### 🤖 ChatGPT Reflection

#### ❓ Question 1
> How many days do you think it will take to complete Sprint 11? I barely made any progress with E2E testing and finishing the README will take some time as it’s very detail-oriented. Also, I will be spending most of my time on applying to jobs so I won’t be able to dedicate a lot of time per day to this project. Refer to the attached backlog items to get an idea of all the work that needs to be completed.

**Answer:**  
Based on the current workload and reduced daily focus, Sprint 11 should span **7–10 days**.  
- The `End-to-End Testing` backlog involves multiple subtasks (Playwright setup, selectors, accessibility checks, and test server orchestration) that will each require focused but short working sessions.  
- The `Presentation Readiness` backlog (from `pres.md`) will primarily involve finishing documentation (`README`, `sdp.md`, `pop.md`, etc.) and adding evidence/screenshots for completeness.  
A 10-day window allows realistic pacing without burnout or neglecting job applications.

---

#### ❓ Question 2
> Summarize Sprint 10 for me. What were my greatest weaknesses and strengths exemplified through my performance?

**Answer:**  
**Summary:** Sprint 10 marked the transition from heavy development to polish and delivery. Most of the system’s architecture, design documentation, and MVS-level functionality were finalized. However, the sprint was slowed by the detailed nature of final documentation and setup tasks.  

**Strengths:**
- **High documentation quality:** Completed key specs (`reqs.md`, `design.md`, `mvs.md`) with professional formatting and traceable requirements.
- **Testing rigor:** Maintained emphasis on testing readiness, outlining clear E2E criteria in `e2e.md`.
- **Consistency:** Continued Solo-Scrum methodology even during shifting priorities.

**Weaknesses:**
- **Time management:** Overestimated available focus time due to job application workload.
- **E2E implementation delays:** Progress on automated Playwright testing stalled midway due to complexity of concurrent server management and debugging.
- **Sprint boundary awareness:** Some Sprint 10 goals (notably the demo and script automation) rolled over into Sprint 11.

---

### 🧾 Results

#### 🧠 Discussion Notes
- Sprint 11 will emphasize **closure and deliverables** — specifically completing the README, adding missing screenshots/evidence for backlogs, and performing at least one successful end-to-end run.
- Presentation mode setup (`debug=true` in React) will be prioritized to allow quick demo readiness.

#### 🗝️ Key Decisions
- Limit Sprint 11 scope to **final documentation + testing completion**, no new features.
- Maintain lightweight sprints going forward, with shorter daily time allocations.
- Continue using ChatGPT as a reflection and planning tool post-Sprint 11 for project wrap-up review.

#### 📌 Action Items
- [x] Wrap up remaining Sprint 10 deliverables:
  - [x] Write Sprint 10 retrospective (`sprint10.md`)
  - [x] Update sprint10.md
- [x] Begin Sprint 11 planning and documentation:
  - [x] Define sprint goals and estimated duration
  - [x] Add `sprint11.md` based on `sprint_template.md`
- [x] Work on readme
  - [x]  Create system demo
  - [x]  Define project structure items

---

## 🗓️ Standup 2 – Install & Run

### 🧾 Overview
* **Date:** Saturday, October 18th (2025)
* **Time:** 11:42 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Presentation Readiness`

### 📋 Contents

#### ✅ Planned Agenda
- Finished sprint 10 and started sprint 11  
- Want to continue working on README

#### 📈 Previous Progress
- Sprint 10 documentation completed: `sprint10.md` + `sprint10_retro.md`  
- Sprint 11 documentation draft: `sprint11.md`  
- Continued working on README  
  - Created a demo  
  - Finished **Project Structure** section describing each folder and its contents

#### 🧱 Problems & Blockers
- Need to install the project on Raspberry Pi to confirm it runs properly  
- Unsure if the installation tutorial covers every dependency and setup step  

#### ⏳ Pending Actions
- Continue writing and refining the README  

#### 🔜 Next Steps
- Expand the README sections:  
  - How to install  
  - How to use the tool  
  - How to run tests  
  - Limitations  
  - Acknowledgements  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **What is most risky about today's tasks?**  
  The Raspberry Pi installation process — platform-specific dependency issues may arise, especially with Node or Python versions.

#### ❓ Question 2
- **What assumptions am I making that may be incorrect?**  
  Assuming the current README installation steps are complete without having tested them on a clean environment yet.

### 🧾 Results

#### 🧠 Discussion Notes
- Installation verification on Raspberry Pi is essential before finalizing the README setup tutorial.  
- Testing cross-platform compatibility will improve the documentation’s completeness and credibility for presentation.  

#### 🗝️ Key Decisions
- Postpone polishing of non-essential README sections until installation testing confirms that the project runs end-to-end.  

#### 📌 Action Items
- [x] Test installation via github download link
- [x] Work on Readme
  - [x] Installation tutorial draft
  - [x] How to use tool draft
  - [x] How to run tests
  - [x] Limitations
  - [x] Acknowledgements
- [x] Create launch script
  - [x] launches flask
  - [x] launches react
  - [x] opens web browser

---

## 🗓️ Standup 3 – Progress Consolidation & Readme Updates

### 🧾 Overview
* **Date:** Tuesday, October 21st, 2025  
* **Time:** 6:16 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Presentation Readiness`
  - `End-to-End Testing`

### 📋 Contents

#### ✅ Planned Agenda
- Further updated README & created script aliases for demoing and starting the app with one command.  
- Need to redefine backlog subtasks for `End-to-End Testing`.  
- Need to update README with recent changes.

#### 📈 Previous Progress
- Created two new launch scripts in `package.json`:  
  - `npm run start`: launches both servers and opens the browser for *Full Mode* usage.  
  - `npm run start:demo`: launches both servers and opens the browser for *Demo Mode*, allowing users to explore a functional version of the project without requiring setup.  
- Finished an outdated draft of the README that now needs revisions to reflect recent architecture and feature changes.

#### 🧱 Problems & Blockers
- When downloading the project, asset files take up significant memory and are unnecessary for users simply testing the demo version.  
  - These assets remain on GitHub for documentation purposes (tracking progress across sprint cycles).  

#### ⏳ Pending Actions
- Continue improving README.  
- Update `End-to-End Testing` subtasks and associated Definition of Done (DoD).  

#### 🔜 Next Steps
- **Update README:**
  - Resize the system architecture diagram.  
  - Add a short overview for the Use Case section, moving existing content into a toggle.  
  - Add a Dependencies section.  
  - Revise “How to Use Tool” section:
    - Add detailed explanations for *Demo Mode* and *Full Mode*.  
    - Simplify demo setup steps.  
    - Clarify full mode installation and API integration steps.  
    - Place current detailed instructions in collapsible toggles.  

- **Update `End-to-End Testing`:**
  - Redefine subtasks for Playwright coverage.  
  - Update DoD to include test completeness and trace/screenshot verification.  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**What are the biggest risks in today’s tasks? What assumptions am I making that may be incorrect?**  
- The biggest risk is over-prioritizing documentation refinement over practical testing progress. I’m assuming all current test cases will integrate smoothly with the new dual-mode launch scripts, but environment variable handling between *demo* and *full* modes could create inconsistent test outcomes if not mocked correctly.

#### ❓ Question 2
**Is my approach truly Agile, or is it more reminiscent of waterfall or another methodology?**  
- It’s still mostly Agile (iterative cycles, incremental improvements, reflection), but the documentation-heavy phase feels more like a brief Waterfall interlude — focused on stabilizing and finalizing deliverables before new iterations of functionality.  

### 🧾 Results

#### 🧠 Discussion Notes
- Creating demo launch scripts increased accessibility for reviewers and simplified showcasing the system.  
- README refinement will directly improve project presentation and reduce onboarding friction for future users or recruiters.

#### 🗝️ Key Decisions
- Keep large asset files on GitHub for transparency but mark them as optional.  
- Prioritize usability polish (README clarity, mode instructions) before returning to testing.  

#### 📌 Action Items
- [ ] Update README
  - [ ] Resize the system architecture diagram.  
  - [ ] Add a short overview for the Use Case section, moving existing content into a toggle.  
  - [ ] Add a Dependencies section.  
  - [ ] Revise “How to Use Tool” section:  
    - [ ] Add detailed explanations for *Demo Mode* and *Full Mode*.  
    - [ ] Simplify demo setup steps.  
    - [ ] Clarify full mode installation and API integration steps.  
    - [ ] Place current detailed instructions in collapsible toggles.  
- [ ] Update `End-to-End Testing`
  - [ ] Redefine subtasks for Playwright coverage.  
  - [ ] Update DoD to include test completeness and trace/screenshot verification.  
- [ ] Update `Presentation Readiness`
  - [ ] Move assets to google drive
  - [ ] Keep necessary assets if necessary
  - [ ] Add link + note to readme

---


## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---

## 🗓️ Standup [#] – [Standup Title]

### 🧾 Overview
* **Date:** 
* **Time:** 
* **Attendees:** 
* **Discussed Backlog Items:**  
  - 

### 📋 Contents

#### ✅ Planned Agenda
- 

#### 📈 Previous Progress
- 

#### 🧱 Problems & Blockers
- 

#### ⏳ Pending Actions
- 

#### 🔜 Next Steps
- 

### 🤖 ChatGPT Reflection (Insert questions recently asked with answers here and delete this line of text enclosed in parenthesis)

#### ❓ Question 1
- 

#### ❓ Question 2...
- 

### 🧾 Results

#### 🧠 Discussion Notes
- 

#### 🗝️ Key Decisions
- 

#### 📌 Action Items
- 

---