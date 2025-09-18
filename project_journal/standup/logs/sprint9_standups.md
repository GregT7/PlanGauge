# 📅 Sprint #9 – Approaching MVS Design Completion
* **Dates:** September 17th - October 1 (2025)

---

## 🗓️ Standup 1 – Schema Changes... Again!

### 🧾 Overview
* **Date:** Wednesday, September 17th (2025)  
* **Time:** 10:17 AM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Continue working on Plan Submission  
- Updated MVS: now working towards more realistic goals  
- Worked on flask API documentation but still need to make big changes again  

#### 📈 Previous Progress
- Redefined + Updated MVS with the Feedback System functionality being defined  
- Completed API documentation draft for `/api/plan-submissions`  
- Filled out draft of `Feedback System` backlog item  

#### 🧱 Problems & Blockers
- Flask documentation is inconsistent and not complete  
  - Does not define the structure of the response like `{id: integer, sync_with_notion: boolean}` with clear key–type mapping  
  - Does not include the error "codes" that appear repetitively (e.g., `"internal_error"` = meaning)  
  - Does not include response codes and their meanings (e.g., `503` = internal error)  
  - Plan Submission schema is constantly changing so it’s likely not up to date  
- Some quizzes created in the beginning for learning React were discovered in an ignored file -- need to transfer to an asset folder at some point  

#### ⏳ Pending Actions
- Flask API documentation  
- Flask API route implementation  

#### 🔜 Next Steps
- Determine `plan_submission`’s new schema design  
  - Supabase: alter existing tables  
  - Supabase + local script: update original tables creating script with new schema design  
- Update Flask API documentation  
  - Account for new `plan_submission` schema  
  - Create new sheet for key pair data types (e.g., `"id": integer`)  
  - Create new sheet for examples → copy from original sheet, swap with key pair data sheet  
  - Create new sheet for error codes + HTTP codes  
- Route implementation  
  - Send a test POST request using curl  
  - Send test data to Supabase for General_Plan and Plan_Submission  

---

### 🤖 ChatGPT Reflection  

#### ❓ Question 1  
**Give me a burn-down style overview for this sprint. Reference the attached documentation for the 2 backlog items assigned to this sprint and the sprint itself.**

- **Sprint 9 Duration:** Sept 17 – Oct 1 (15 days)  
- **Backlog Items Assigned:** `Plan Submission` + `Feedback System`  
- **Planned Milestones:**  
  - *Plan Submission:* button styled + implemented → API routes documented + implemented → data flows to Supabase + Notion → error handling added  
  - *Feedback System:* backend support for `/api/stats` → frontend sections (Weekly Time, Status Count, Evaluation) → feasibility computation → UI binding + color feedback  
- **Current Status (Day 1):**  
  - API documentation draft exists, but schema design is unstable  
  - MVS updated to reflect new goals  
  - Plan Submission backlog item partially complete (button + swimlane started, docs incomplete)  
- **Burn-down Path:**  
  - Early sprint focus = schema + API docs  
  - Mid sprint = Flask route implementations + React connections  
  - Late sprint = testing, E2E flow, finalizing PR with docs/screenshots  

Overall, velocity depends on stabilizing the schema quickly; risk is high if changes continue late into the sprint.  

#### ❓ Question 2  
**What feels unclear or risky about today’s tasks?**

- The `plan_submission` schema is still shifting; without locking it down, all downstream work (Supabase migration, Flask route definitions, frontend POST) risks rework.  
- Flask API documentation gaps (response structure, error codes, status code mapping) could cause misalignment between backend + frontend expectations.  
- Implementing Notion sync adds an external dependency; failures there could stall testing and integration late in the sprint.  
- Burn risk: too much time could be spent restructuring docs rather than implementing/test-driving routes.  

---

### 🧾 Results

#### 🧠 Discussion Notes
- Schema instability is the main blocker. Locking it down should be top priority to prevent rework later in Sprint 9.  
- Need to define standard JSON response shape + error code mapping early to keep consistency across `/api/stats` and `/api/plan-submissions`.  

#### 🗝️ Key Decisions
- Prioritize schema stabilization before touching Supabase migrations or Flask routes.  
- Documentation must include key–type definitions and error/HTTP code mapping before implementation proceeds.  

#### 📌 Action Items
- [x] Redefine + finalize `plan_submission` schema today  
- [x] Add data type sheet + error code sheet to Flask API docs  
- [x] Send first test POST request to Flask after schema finalized for storing data to Supabase

---

## 🗓️ Standup 2 – Can I Finish Everything This Sprint?

### 🧾 Overview
* **Date:** Thursday, September 18th (2025)
* **Time:** 10:06 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Finish `Plan Submission` by the end of the week if possible
- Want to finish flask routing by the end of today if possible?

#### 📈 Previous Progress
- Reformatted inconsistencies in API structure in the docs and code with all previous pytest tests passing
- Created additional documentation for
  - Response keys including their data types, location, purpose, and examples
  - HTTP response codes and their meaning in context of this project
- Set up basic flask route that posts a mock plan_submission record to Supabase
- Updated SQL schema for plan_submission on Supabase
  - Added a lot of default values, NOT NULL restrictions, automatic checks (sync_attempts >= 0)
  - Created an automated trigger function that will update the `last_modified` attribute of plan_submissions that were recently changed

#### 🧱 Problems & Blockers
- Not sure if there is enough time in this sprint to implement both backlog items
  - `Plan Submission` will definitely spill into the next week, will probably be next Wednesday (24th) by the time I finish
  - Left over work: update swimlane diagram, finish flask routing, add disable feature to button, safely attach function to button, create toaster notifications, testing, and complete pull request (documentation + resolve merge conflicts)
- The task table on the frontend doesn't store 'Type' as a column but the database requires that type be not null so there will be difficulty storing plan records
- The automated trigger function for updating `last_modified` on Supabase is not working

#### ⏳ Pending Actions
- Finish flask routing

#### 🔜 Next Steps
- Figure out formatting issues
  - Structure of state data for the plans entered in the task table
  - Structure of payload sent to Supabase
  - Structure of payload sent to Notion
- Write helper function that validates formatting structure prior to making external API calls
- Send mock plan_record data to Supabase
- Send mock data to Notion database
- Have route send post requests to both supabase and notion

---

### 🤖 ChatGPT Reflection  

#### ❓ Question 1  
**Give me a confidence rating for sprint success based on current progress**  
- Confidence: **Medium–Low (40–50%)**.  
  - You’ve built momentum: your API structure is consistent, tests pass, docs are improving, and you already have a working Supabase insert route.  
  - The risk is time: `Plan Submission` has many moving pieces (routing, payload formatting, validation, frontend integration, button UX, Notion sync, toaster notifications, testing, PR/merge conflicts). Even with strong daily effort, finishing all of that by the end of this sprint looks unlikely—you’ll probably spill into next week.  

#### ❓ Question 2  
**What feels unclear or risky about today’s tasks? What assumptions am I making that might be wrong?**  
- **Risks / Unclear Areas:**  
  - Payload formatting: Your `TaskTable` doesn’t include a `Type` column, but the Supabase schema requires it (`NOT NULL`). That mismatch could break inserts unless you define a mapping/placeholder.  
  - Validation: Still undefined—without it, bad data could reach Supabase/Notion and cause cascading errors.  
  - Notion sync: It’s not yet tested, and error handling across both services may be more complex than expected.  
- **Assumptions that may be wrong:**  
  - That the backend formatting work can be completed in one day.  
  - That connecting Supabase + Notion can be done with minimal retries or error handling.  
  - That UI integration (button disable state, toasters) won’t slow you down—it often takes longer to get polished than expected.  

---

### 🧾 Results  

#### 🧠 Discussion Notes  
- Sprint goal of finishing everything is ambitious; more realistic to split into two milestones: (1) Flask route fully working with Supabase mock, (2) full Supabase + Notion sync with frontend polish.  
- Current major blocker is aligning frontend `TaskTable` structure with backend schema requirements (esp. `Type`).  
- Validation helper function is a priority before you send real payloads.  

#### 🗝️ Key Decisions  
- Accept that `Plan Submission` will spill over into next sprint; aim for partial completion by this weekend
- Remove `Feedback System` from this sprint and add later if `Plan Submission` is finished 
- Treat “finish flask routing” as the high-priority deliverable for today.  
- When sending plan record data to Supabase, assign a default value for 'Type' to temporarily solve the `NOT NULL` issue
  - Document this problem for later reference though

#### 📌 Action Items  
- [ ] Figure out formatting issues
  - [ ] Structure of state data for the plans entered in the task table
  - [ ] Structure of payload sent to Supabase
  - [ ] Structure of payload sent to Notion
- [ ] Write helper function that validates formatting structure prior to making external API calls
- [ ] Send mock plan_record data to Supabase
- [ ] Send mock data to Notion database
- [ ] Have route send post requests to both supabase and notion

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