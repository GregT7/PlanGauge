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
- [x] Figure out formatting issues
  - [x] Structure of state data for the plans entered in the task table
  - [x] Structure of payload sent to Supabase
  - [x] Structure of payload sent to Notion
- [ ] Write helper function that validates formatting structure prior to making external API calls
- [x] Send mock plan_record data to Supabase
- [x] Send mock data to Notion database
- [ ] Have route send post requests to both supabase and notion

---

## 🗓️ Standup 3 – Plan Submission Is Going To Take Some Time

### 🧾 Overview
* **Date:** Friday, September 19th (2025)
* **Time:** 11:33 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Work for `Plan Submission` will probably take the entire sprint

#### 📈 Previous Progress
- Wrote js script for submitting data through and attached to SubmissionButton
  - React <--> Flask <--> Supabase/Notion
- Refactored connectionTest.js by moving helper functions into separate file -- intended to be reused in the plan submission script
- Successfully wrote a basic POST flask API endpoint and a basic POST fetch request
  - Data was stored to both Supabase and Notion with test code + records (not at same time though)
- Wrote function that validates plan data sent from react and received by flask prior to attempting a POST request to Supabase (on flask end and does not consider formatting for Notion yet)

#### 🧱 Problems & Blockers
- I might be introducing race conditions with plan submission functions (react + flask), need to look into this
- Can post data to Supabase using the submit button but this always throws an Internal Error for some reason
- As I started writing code, realized the API documentation will probably need to be updated to account for additional errors
- Separated connectionTest helper functions persistentFetch and timedFetch into independent file for reuse in submitTasks but need modification to work in both js scripts

#### ⏳ Pending Actions
- Finish writing validation functions
- Fix problem with Internal Error throwing when posting data to Supabase
- Have /api/plan-submissions send data to both Notion and Supabase without problems

#### 🔜 Next Steps
- Solve Internal Error issue
- Briefly look into race conditions issue
- Write validation + reformatting function for posting data from flask to Notion

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**Have you detected any potential for race conditions with my code so far?**

**Likely hotspots & fixes:**
1) **Double-submit from UI** (rapid clicks, retries in `persistentFetch`): causes duplicate inserts.  
→ *Frontend*: disable the button while `isSubmitting`, use an `AbortController` for retries, and debounce (250–400ms). Also keep a client idempotency key per submission (e.g., `submission_id: UUIDv7`).  
→ *Backend*: enforce idempotency with a **unique constraint** on `submission_id` or a server-computed `submission_hash` (hash of normalized plan list). Use `INSERT ... ON CONFLICT DO NOTHING` (or upsert).

2) **Parallel writes to the same `plan_submission` row** (Supabase + Notion updates running concurrently): last writer wins on `sync_status` / `synced_with_notion`.  
→ Serialize server work: do Supabase write first (transaction), then Notion; update `sync_status` at the end. If you must parallelize, update separate columns and compute final status atomically (transaction or one `UPDATE` that derives final state).

3) **Retries without idempotency** (network flakiness + your `persistentFetch`): the server may process the same payload twice.  
→ Require header `Idempotency-Key` or field `submission_id`. On the server, if a row already exists with that key, return 200/201 with the existing resource rather than inserting again.

4) **Flask concurrency in prod** (gunicorn/uwsgi multi-workers): any shared globals or in-memory queues could race.  
→ Keep Supabase client stateless, avoid mutable module-level structures, and push all coordination to the DB (constraints/transactions).

5) **Out-of-order updates** (client fires `/submit` then `/sync` quickly): later request can finish before the first.  
→ Gate follow-ups behind the created resource (`/plan-submissions/{id}`) and only allow sync transitions that make sense (state machine: `pending` → `in_progress` → `success|failed`), enforced by a guarded `UPDATE ... WHERE state IN (...)`.

**DB-side guards you can add now (fast wins):**
- Unique index: `UNIQUE(submission_id)` or `UNIQUE(submission_hash)`.  
- Use **upsert** when inserting plans: `ON CONFLICT (plan_id) DO UPDATE ...` or `DO NOTHING`.  
- Wrap related writes in a transaction and return a single response.

#### ❓ Question 2
**Do you think I can finish `Plan Submission` this sprint (duration is 2 weeks and the first week is almost over)?**

It’s possible, but tight. You’ve already set up the major plumbing (React form, Flask endpoint, Supabase/Notion test inserts). The biggest time sinks left are:  
- Debugging the Supabase Internal Error (likely serialization/response shape).  
- Adding robust validation + reformatting logic for Notion.  
- Ensuring idempotency and race condition safety.  
- Updating API docs to reflect real-world error handling.

If you dedicate the remaining week fully to this backlog item and accept a **“first draft” definition of done** (working but not perfectly polished), you can likely finish. If you aim for a fully production-ready version (with all error codes, retries, retries with exponential backoff, etc.), it might slip past the sprint. Prioritizing “good enough, consistent with docs” will help you land it.

### 🧾 Results

#### 🧠 Discussion Notes
- UI + network retries can easily produce duplicate inserts without idempotency; solve with a client key and DB uniqueness.
- Supabase write should happen inside a transaction; Notion sync occurs after, then update `sync_status` once.
- Flask 500s today are likely serialization/return-shape problems rather than the DB write itself.

#### 🗝️ Key Decisions
- Disable submit button during in-flight request; add debounce + `AbortController` for retries.
- Sequence: Supabase (transaction) → Notion → final `sync_status` update; no parallel writes to the same row.
- Standardize responses to be JSON-safe (ISO datetimes, no raw client objects).
- Address race condition problems later

#### 📌 Action Items
- [ ] Normalize all datetimes to `UTC ISO-8601` before returning JSON.
- [ ] Solve Internal Error issue
- [x] Briefly look into race conditions issue
- [ ] Write validation + reformatting function for posting data from flask to Notion

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