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
- [x] Normalize all datetimes to `UTC ISO-8601` before returning JSON.
- [x] Solve Internal Error issue
- [x] Briefly look into race conditions issue
- [x] Write validation + reformatting function for posting data from flask to Notion

---

## 🗓️ Standup 4 – Response Verification & Management

### 🧾 Overview
* **Date:** Saturday, September 20th (2025)  
* **Time:** 3:48 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Got the React button to successfully store data and check for sync errors.  
- Current implementation is messy and will require significant refactoring.  
- Begin designing response management: what happens if one API call fails?

#### 📈 Previous Progress
- Passed an informal end-to-end test posting tasks to **Notion** & **Supabase** with sync updates.  
- Resolved the internal error issue from the last standup.  
- Verified all datetime key pairs in Flask are using `UTC ISO-8601`.  
  - Example: `"created_at": datetime.now(timezone.utc).isoformat()`.  
- Created a comprehensive list of current problems for debugging.

#### 🧱 Problems & Blockers
- **React**
  - Need to collect dynamic date ranges for stat calculations and pass them to backend.  
    - Question: store in state, context, or props? Currently hard-coded.  
  - Fetches run only once; `persistent_fetch` is not modular enough for reuse across components.  
- **Flask**
  - Data verification coverage exists but is incomplete.  
  - `plan_submission` dict is hard-coded → not adaptive to real API responses.  
  - No retry implementation.  
  - Random IDs for test records risk collision; need proper unique record IDs.  
  - `validate_react_data` function is written but not used.  
- Race condition issues expected; will require careful handling.

#### ⏳ Pending Actions
- Build response management: define failure/partial-success handling for internal API calls.

#### 🔜 Next Steps
- Add response management to `/api/plan-submissions`.  
- Implement `validate_react_data` for payload validation.  
- Review Excel docs and implement at least 2 of the planned routes.

### 🤖 ChatGPT Reflection

#### ❓ Question 1
**Would backend retry logic be worth adding?**  
- Probably not. Retry handling inside Flask adds complexity and risk since the number of API calls is already high (Notion requires individual calls per row, plus Supabase insert/update).  
- Retries might be better handled selectively in backend for testing, but not worth a full implementation at this stage.

#### ❓ Question 2
**Are today’s tasks missing dependencies?**  
- No blocking external dependencies noted. Current tasks depend only on internal fixes (React state mgmt, Flask validation, response handling).

### 🧾 Results

#### 🧠 Discussion Notes
- Backend should be the source of truth for `last_modified`. Avoid relying on Supabase auto-triggers.  
- Retry logic will not be implemented in React. If retries are needed, they’ll be handled in backend for debugging purposes.  

#### 🗝️ Key Decisions
- Manage `last_modified` attribute in Flask backend.  
- Do not implement retry functionality in React fetches for the `/api/plan-submissions` endpoint; consider lightweight retry logic in Flask only if needed.  

#### 📌 Action Items
- [x] Use `validate_react_data` in `/api/plan-submissions` to verify incoming data.   
- [x] Add response management to `/api/plan-submissions`.
  - [ ] Review Excel docs and implement at least 2 of the planned routes.
---

## 🗓️ Standup 5 – Flask Route Refactoring

### 🧾 Overview
* **Date:** Sunday September 21 (2025)  
* **Time:** 2:24 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Had ChatGPT review current `routes.py` implementation; received 10 solid critiques + recommended changes. Will implement before moving forward  
  - [Reference conversation](https://chatgpt.com/g/g-p-682a71da88288191bc7dd5bec7990532-plangauge/c/68cf0f81-1c9c-8325-8301-135b7f60ce8f)
- Finished a basic working draft of `/api/plan-submissions`

#### 📈 Previous Progress
- `/api/plan-submissions` passed an informal end-to-end test (data posted to Supabase + Notion; sync update succeeded)

#### 🧱 Problems & Blockers
- `/api/plan-submissions` implementation still has some logic + syntax bugs  
- `routes.py` has a lot of repetition → can be simplified  
- Flask-generated record IDs for `plans` and `plan_submissions` aren’t ideal

#### ⏳ Pending Actions
- Achieve 100% response management coverage for `/api/plan-submissions`

#### 🔜 Next Steps
- Address ChatGPT critiques of routes.py:
  1. `generate_db_error_response(response)` bug  
  2. Dead branch for non-POST requests in `/api/plan-submissions`  
  3. Parameter validation for `/api/db/stats`  
  4. Request validation naming + payload shape  
  5. Consistency of `service` and `error` fields  
  6. Partial-failure semantics for Notion / Supabase  
  7. Notion error detail quality  
  8. Reduce repetition with tiny helpers  
  9. IDs: avoid random collisions  
  10. Health endpoints: unify error signaling  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- *What assumptions am I making that might be wrong?*  
  → Assuming record ID generation can be left to Flask/Supabase; this may create collisions or non-ideal formats. Also assuming error detail consistency won’t matter until later, when it may actually matter a lot for debugging.

#### ❓ Question 2
- *Do today’s tasks contribute to this sprint’s goals?*  
  → Yes. Sprint goal is to stabilize `Plan Submission`. Cleaning and refactoring routes is directly aligned, especially for correctness + maintainability.

### 🧾 Results

#### 🧠 Discussion Notes
- The critiques highlighted structural issues rather than just bugs. Fixing them should reduce technical debt early.  
- Getting consistent error responses across endpoints will pay off when I start adding retries or debugging sync issues with Notion.  

#### 🗝️ Key Decisions
- Adopt helper functions to reduce repetition in response handling.  
- Replace Flask-generated IDs with deterministic UUIDs to prevent collisions for `plan` and `plan_submission` records
  - Don't worry about other records like `work` using incrementing integers for ids
- Standardize error + service fields in all JSON responses.  

#### 📌 Action Items
- [x] Fix bug in `generate_db_error_response(response)`  
- [x] Remove dead branch for non-POST requests in `/api/plan-submissions`  
- [x] Add parameter validation for `/api/db/stats`  
- [x] Update request validation naming + enforce payload shape  
- [x] Standardize `service` and `error` fields across responses  
- [x] Define partial-failure semantics for Notion and Supabase syncs  
- ~~Improve detail quality of Notion error messages~~
- [x] Create tiny helper functions to reduce repetition in routes  
- [x] Replace Flask-generated IDs with UUIDs (or similar deterministic IDs)  
- [x] Unify error signaling in health endpoints  

---

## 🗓️ Standup 6 – Route Refactoring Continued

### 🧾 Overview
* **Date:** Monday, September 22nd (2025)
* **Time:** 3:42 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Finished implementing first round of ChatGPT recommendations for `routes.py`
- Need to spend more time ironing out `routes.py` implementation and supporting documentation still
- Almost ready to move on to other aspects of `Plan Submission` backlog

#### 📈 Previous Progress
- Completed first round of ChatGPT recommendations for `routes.py` and `utils.py`, got feedback, and want to implement a second round of changes
- Made c

#### 🧱 Problems & Blockers
- New changes introduced a bug where data submission no longer works when initiated from the frontend for Supabase + Notion (raises an exception)
- There are inconsistencies/confusion/redundant code for date handling on both the React side and Flask side
- There are additional bugs/inconsistencies in new code that need to be ironed out

#### ⏳ Pending Actions
- Complete Flask routing code + documentation

#### 🔜 Next Steps
- **Big Issues/Problems with `routes.py`**
  - Fix Notion failure branch: swap the two `err_resp(...)` returns so they match the actual failure; update `plan_submission` to `"failure"` first; use `pack_requests_response(notion_response)` in details.
  - Stop generating `plan_id` app-side; let Postgres default `gen_random_uuid()` fill it. Remove `generate_unique_integer_id()` and omit `plan_id` from inserts.
  - Normalize date fields for Supabase: if columns are `DATE`, truncate to `YYYY-MM-DD` (`iso_to_date()`); if `timestamptz`, keep full ISO.
  - Include the DB-assigned `submission_id` in the final success response (`plan_submission` object).
  - Wrap Notion POST in `try/except requests.exceptions.RequestException`; treat exceptions as failures and pack details (`pack_exc(...)` / `pack_requests_response(None)`).
  - Remove unused local UUID in `submit_plans()` and any unused helpers (e.g., inner `pack` in Notion health).
  - Provide a clear message for `/api/db/stats` bad requests (insufficient data) instead of an empty string.
- **Polishing / Consistency**
  - Flatten response params: use `"params": {"start": ..., "end": ...}` (no nested `{"params": {...}}`).
  - Add `"Content-Type": "application/json"` to Notion request headers.
  - Fix typos (e.g., `occured` → `occurred`).
  - Standardize `pack_requests_response` keys (use `"status"` everywhere, or `"status_code"`—pick one and stick to it).
  - Rename inner loop variable in `calc_day_stats` to avoid shadowing (use `j` instead of reusing `i`).
- Investigate issue causing React-initiated submissions to fail

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Do you think all of the next steps can be accomplished today?**  
  Probably not all at once — there’s both bug-fixing and cleanup work, and some of the Notion/Supabase issues may require debugging time. It would be more realistic to finish 2–3 high-impact fixes (e.g., `plan_id` handling, Notion failure branch, and React submission failure) today, then handle polish (typos, response flattening) later.

#### ❓ Question 2
- **How would you rate progress so far in this sprint? Do you think I'll be able to finish `Plan Submission` in time?**  
  Progress has been steady, though slightly slowed by the introduction of new bugs after the refactor. The fact that you’re already iterating on a second round of recommendations means you’re moving toward a clean, maintainable implementation. If you focus on core functionality first (ensuring successful Supabase + Notion submissions end-to-end) and treat polish as stretch tasks, you should still be on track to finish `Plan Submission` by the sprint deadline.

### 🧾 Results

#### 🧠 Discussion Notes
- Refactoring improved code readability but introduced new bugs with frontend-triggered submissions.  
- Date handling is inconsistent across React and Flask — must be standardized before moving forward.  
- The current Notion error-handling flow is misleading, and the response details aren’t consistent.  
- Postgres should generate UUIDs for IDs, reducing reliance on custom ID generation.  
- Polishing tasks (typos, param flattening, consistency) should be deprioritized until core submission flow is reliable.

#### 🗝️ Key Decisions
- Let Postgres handle UUID generation (`gen_random_uuid()`) instead of app-side functions.  
- Standardize date formatting early to prevent downstream errors.  
- Treat Notion POST exceptions explicitly with try/except and consistent error packing.  

#### 📌 Action Items
- [x] Debug and fix frontend-initiated submission failure.  
- [x] Swap Notion failure branch logic and ensure `plan_submission` updates to `"failure"`.  
- [x] Remove `generate_unique_integer_id()` and stop passing `plan_id` in inserts.  
- [x] Normalize date handling: `DATE` → `YYYY-MM-DD`, `timestamptz` → full ISO.  
- [x] Ensure DB-assigned `submission_id` is included in final success response.  
- [x] Wrap Notion POST in `try/except` for robust error handling.  
- [x] Clean up unused helpers (local UUID, inner pack in Notion health).  
- [x] Update `/api/db/stats` bad request responses with a clear error message.  
- [x] After core fixes, polish: flatten response params, add `Content-Type` header, fix typos, standardize keys, rename loop vars.

---

## 🗓️ Standup 7 – Review ChatGPT Code Changes

### 🧾 Overview
* **Date:** Tuesday, September 23rd (2025)
* **Time:** 3:30 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Review ChatGPT generated code changes to make sure I understand it and decide if I want to keep it
- Want to start implementing other parts of `Plan Submission` like the button disabling thing and come back to routes.py later for testing
- Testing is going to be a nightmare and will take up a lot of time

#### 📈 Previous Progress
- Fixed submission bug -- can now post to Supabase and Notion DB without issues
- Fixed inconsistency/inefficiency/redundant code issues in routes.py

#### 🧱 Problems & Blockers
- Need to understand ChatGPT generated code better
- Still haven't updated flask API documentation

#### ⏳ Pending Actions
- Update flask api documentation

#### 🔜 Next Steps
- Implement button feature: Temporarily disables after being clicked  
    - Can’t click it  
    - Color changes when disabled
- Review chatGPT generated changes more thoroughly  
  - Backend  
    - routes.py — `/api/plan-submissions`  
    - utils.py  
  - Frontend  
    - utils/submitPlans.js  
    - context/TaskContext.jsx  
    - components/SubmissionButton.jsx  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- What feels unclear or risky about today's tasks?  
  → Understanding all the code changes and confirming they don’t introduce silent issues. Testing burden feels heavy.

#### ❓ Question 2
- What am I assuming that might be wrong?  
  → Assuming button disabling is trivial; may require careful state handling with async calls.  
  → Assuming code generated by ChatGPT is consistent with the intended Supabase schema.  

### 🧾 Results

#### 🧠 Discussion Notes
- Reviewing changes shows TaskContext, TaskTable, and supporting components are cleaner and modular, but I still need to check if the changes align with API expectations.  
- The button disabling feature should integrate with React state cleanly, but I’ll need to ensure that it re-enables only when submission is complete or fails.  
- Flask API documentation gap is becoming more critical, since it ties directly into testing clarity.  

#### 🗝️ Key Decisions
- Postpone deep dive into `routes.py` testing until after the button disabling feature is working.  
- Keep ChatGPT’s refactoring changes but double-check against Supabase/Notion requirements.  
- Update API documentation in parallel with reviewing code so I don’t lose track of intended schema and response formats.  

#### 📌 Action Items
- [x]  Implement button feature: Temporarily disables after being clicked
    - [x]  Can’t click it
    - [x]  Color changes when disabled
- [x]  Review chatGPT generated changes more thoroughly
    - [x]  Backend
        - [x]  [routes.py](http://routes.py/) — `/api/plan-submissions`
        - [x]  [utils.py](http://utils.py/)
    - [x]  Frontend
        - [x]  utils/submitPlans.js
        - [x]  context/TaskContext.jsx
        - [x]  components/SubmissionButton.jsx
- [x]  Write/update Flask API documentation to match current reality.
- [x]  Outline testing plan to avoid being overwhelmed later.
- [x]  submitPlans — verify payload before sending (tasks, filter_start, filter_end)
    - [x]  add error handling
    - [x]  also load in the submit url from env file
- [x]  add Toast feature for plan-submissions
    - [x]  Loading toast
    - [x]  Resolves: Success & Failure coverage
- [x]  Reformat connectionTest

---

## 🗓️ Standup 8 – Start Testing

### 🧾 Overview
* **Date:** Wednesday, September 24th (2025)  
* **Time:** 2:08 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Want to start writing some unit tests & resolve previous tests that now fail
- Implemented some data verification on the frontend but this has caused some issues  
  - Not completely done yet

#### 📈 Previous Progress
- Changed connectionTest & planSubmit toast to be a loading toast that resolves to success or error
- Added payload verification on frontend prior to making http POST request -- but still in progress
- Added additional error handling to frontend
- Finished updating flask api documentation

#### 🧱 Problems & Blockers
- Reformatting of submitPlans to verify payload has created new bugs that crash the app
- Rerunning previous tests for the frontend results in:  
  - 4 failed test files, 10 passed test files (14 total test files)  
  - 23 tests failed, 65 tests passed (88 total test cases)  
  - StatCardSystem still has unresolved failing test cases (introduced in previous sprints)

#### ⏳ Pending Actions
- Reformatting of submitPlans to verify payload has created new bugs that crash the app
- Resolve previous tests from failing
- Fix swim lane diagram for the plan submission process

#### 🔜 Next Steps
- Resolve submitPlans refactoring bug
- Resolve previously written failed test cases  
  - Fix 5 total test cases  
  - Fix 10 total test cases  
  - Fix 15 total test cases  
  - Fix 20 total test cases  
  - Fix 23 total test cases  

---

### 🤖 ChatGPT Reflection

**Overall Trends/Concerns (last 3 standups):**  
- Each improvement/refactor introduces instability, creating a cycle of fixing breakage before moving on.  
- Technical debt in testing is mounting, slowing down momentum.  
- Risk of scope creep when overengineering (e.g., TaskContext changes).  
- Need a stronger stabilization phase before adding features.  

**Assumptions that might be wrong:**  
- That payload validation must live inside submitPlans instead of being factored into a utility or input-level validation.  
- That all failing tests should be fixed as-is (some may need rewriting or removal due to design evolution).  
- That test failures equal regressions rather than mismatches between old expectations and new architecture.

---

### 🧾 Results

#### 🧠 Discussion Notes
- Testing backlog is now a major focus — must be prioritized before further features.  
- Payload validation approach may need redesign for maintainability.  
- Consider whether to mark some tests as obsolete and prune them.  

#### 🗝️ Key Decisions
- Won’t be using the `TaskContext.jsx` ChatGPT recommended changes — too complicated.  
- Will keep modifications for `routes.py`, `utils.py`, `submitPlans.js`, and `SubmissionButton.jsx`.  
- Prioritize test stabilization before new features.  
- Allow incremental bug fixing/testing (batch approach) to avoid being overwhelmed.  
- Redesign validation to live in a utility/helper function instead of deeply tied to submitPlans.  

#### 📌 Action Items
- [x] Debug and fix submitPlans refactoring crash.  
- [x] Refactor payload validation into a dedicated utility function.  
- [x] Resolve 23 failing test cases incrementally (in batches of 5).
  - [x] 5 total
  - [x] 10 total
  - [x] 15 total
  - [x] 20 total
  - [x] 23 total
- [x]  Write new test cases - Frontend
  - [x]  utils
    - [x]  planningRange
    - [x]  submitPlans
    - [x]  toLocalMidnight
    - [x]  verifyPayload
  - [x]  SubmissionButton

---

## 🗓️ Standup 9 – Almost Done with Plan Submission

### 🧾 Overview
* **Date:** Thursday, September 25th (2025)
* **Time:** 2:08 PM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Plan Submission`

### 📋 Contents

#### ✅ Planned Agenda
- Need to review ChatGPT generated unit tests for backend + frontend
- Getting close to finishing `Plan Submission`
- Will probably need 2 additional sprints to complete the project

#### 📈 Previous Progress
- Solved plan submission bug caused by planSubmission.js refactoring
- Solved the long-standing StatCardSystem test file issues
- Got 100% of javascript/react tests to pass
- Had ChatGPT quickly generate test cases for the rest of the new files
  - utility files
  - SubmissionButton.jsx
  - test_routes.py
  - test_utils.py

#### 🧱 Problems & Blockers
- Didn't thoroughly read through the test files generated by ChatGPT

#### ⏳ Pending Actions
- Need to update the swimlane diagram for the submission process

#### 🔜 Next Steps
- Update swimlane diagram
- Review ChatGPT generated code
- Complete informal end-to-end test  
  - Conduct test  
  - Record, edit, and convert video into gif
- Update + upload documentation  
  - sprint9  
  - plan_submit.md (backlog)
- Start PR documentation  
  - Outline the gifs needed  
  - Open a request on github

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- *What am I assuming that may be incorrect? What dependencies are today's tasks missing?*  
  → Assumption: the generated test cases are “good enough” without detailed review. Dependency gap: lack of manual verification and alignment with backend/frontend requirements. The swimlane diagram update is also a dependency for the PR/docs.

#### ❓ Question 2
- *How do you feel about generative AI being used to create unit tests?*  
  → It accelerates coverage but risks shallow tests (e.g., only checking happy paths or duplicating logic instead of verifying behavior). They’re useful as scaffolding but require careful human review for meaningful assertions.

### 🧾 Results

#### 🧠 Discussion Notes
- Test coverage looks strong but needs human verification.
- Swimlane diagram will help confirm the overall flow before PR.
- Informal end-to-end test is critical before wrapping up Sprint 9.

#### 🗝️ Key Decisions
- Accept AI-generated tests as a baseline, but must review line-by-line.
- Document submission workflow via swimlane diagram before finalizing PR.
- Schedule at least 2 more sprints for polishing and documentation.

#### 📌 Action Items
- [x] Update swimlane diagram to include plan submission flow  
- [x] Review and refine generated test files  
- [x] Conduct informal end-to-end test and record gif  
- [x] Upload sprint9 + plan_submit.md documentation  
- [x] Draft PR doc, outline required gifs, open request on GitHub

---

## 🗓️ Standup 10 – Bad Merge Conflict Resolution - Oops!

### 🧾 Overview
* **Date:** Friday, September 26th (2025)  
* **Time:** 11:05 AM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Plan Submission`  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Completely screwed up the merge conflict resolution and now a lot of files are incomplete or missing  
- Can start `Feedback System` today & getting close to finishing the project  
- Need to update req & mvs again  

#### 📈 Previous Progress
- Completed testing  
- Reviewed and approved ChatGPT generated tests/code  
- Completed PR request documentation + merging  
  - Created gifs showing functionality  
  - Passed E2E test showing successful plan submission  
  - Updated swim lane diagram for the plan submission process  

#### 🧱 Problems & Blockers
- Made a lot of mistakes with merge conflict resolution during PR finalization  
- Testing at the end was a pain, want to incrementally test things as I go  

#### ⏳ Pending Actions
- Finishing PR request (solve merge conflict resolution mistakes)  

#### 🔜 Next Steps
- Rectify PR conflict resolution mistakes  
- Feedback Sys p1  
  - Make call to `/api/stats` on mount or date-range change?  
    - consider combining `connectionTest` with stats retrieval and putting into separate file  
    - handle loading + error states  
  - Figure out how stat data will be stored
    - Consider storing date-range data as state or by using context provider (`filter_start_date`)  
    - Consider storing stats data with context  

### 🤖 ChatGPT Reflection  

#### ❓ Question 1
- What am I assuming that might be wrong?  
  → That merge conflicts can be fixed quickly without re-checking every component — in reality, given the repo complexity, it’s safer to restore known-good files and reapply changes incrementally.  

#### ❓ Question 2
- What feels unclear or risky about today’s tasks?  
  → The design choice for where feedback data (`/api/stats`) should live: context vs local state. If chosen poorly, this could introduce re-render issues or make debugging harder down the line.  

### 🧾 Results

#### 🧠 Discussion Notes
- Merge conflict recovery is higher priority than adding new features.  
- Incremental testing after each file restore/change will reduce wasted effort.  
- Feedback system will likely need a **stats context** to align with MVS’s stat cards requirement.  
- Keeping POP’s feedback promise requires making `/api/stats` resilient, so user always sees feasibility insights.  

#### 🗝️ Key Decisions
- Incrementally test files as they are created/restored.  
- Postpone any “nice-to-have” Feedback System features until core plan submission is stable.   

#### 📌 Action Items
- [x] Rectify PR conflict resolution mistakes  
- [ ] Feedback Sys p1  
  - [x] Make call to `/api/stats` on mount or date-range change?  
    - [x] consider combining `connectionTest` with stats retrieval and putting into separate file  
    - [x] handle loading + error states  
  - [ ] Figure out how stat data will be stored  
    - [ ] Consider storing date-range data as state or by using context provider (`filter_start_date`)  
    - [ ] Consider storing stats data with context   

---

## 🗓️ Standup 11 – Finally Working on Frontend Design

### 🧾 Overview
* **Date:** Saturday, September 27th (2025)  
* **Time:** 2:06 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Want to:
  - Finally decide on how to approach storing stats data
  - Start creating the Evaluation System subcomponents
- Job search transition starts tomorrow, still have three backlog items to complete, need to think about approach

#### 📈 Previous Progress
- Combined `connectionTest` with stats retrieval into a singular function that launches once on mount
- Created some test files for the newly created functions

#### 🧱 Problems & Blockers
- Limited time for implementing features

#### ⏳ Pending Actions
- Decide on how to approach storing stats data

#### 🔜 Next Steps
- Figure out how stat data will be stored  
  - Consider storing date-range data as state or by using context provider (`filter_start_date`)  
  - Consider storing stats data with context  
- Implement stats data storage based on previous decision  
- Create feasibility evaluation algorithm draft  
- Create the weekly time sum stat card subcomponent  

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **Q:** Do you think the project is in a state or close to a state that is presentable to employers? What could make this project more attractive to prospective employers?  
- **A:** Yes, it’s close. The current frontend already demonstrates interactive tables, context usage, and stateful components. To stand out to employers:
  - Add polish with stat cards and summary views (ties to your MVS goals).  
  - Highlight Notion API integration and ML prediction (those are differentiators).  
  - Make the README/demo clear and include screenshots/GIFs.  
  - If possible, deploy a demo (e.g., Docker/Heroku/Vercel) to show the app running.

#### ❓ Question 2
- **Q:** What am I assuming that might be wrong? Can I realistically complete all of today's tasks?  
- **A:** The assumption that you can fully decide the storage strategy, implement it, draft the evaluation algorithm, and build the weekly stat card all in one day may be ambitious. A more realistic slice would be:
  1. Decide and implement **just the storage strategy**.  
  2. Sketch/draft the feasibility algorithm (pseudo-code, not full implementation).  
  3. Start the stat card component, even if it only shows summed hours.

### 🧾 Results

#### 🧠 Discussion Notes
- Context is the likely right place for storing stat data since it will be needed across multiple subcomponents.  
- Storing `filter_start_date` / `filter_end_date` in context keeps things extensible if you later add a date range selector.  
- The first evaluation algorithm can be rule-based (compare against fixed thresholds), then evolve into ML-based predictions.

#### 🗝️ Key Decisions
- Prioritize storing stat data in a context provider.  
- Break up today’s “Next Steps” into smaller increments to avoid overcommitment.  

#### 📌 Action Items
- [x] Implement a `StatsContext` (or extend `TaskContext`) for holding stats and date ranges.  
- [x] Write feasibility evaluation algorithm draft
- [ ] Draft a simple weekly stat card that shows total hours and a color status

--- 

## 🗓️ Standup 12 – MVS Detour

### 🧾 Overview
* **Date:** Sunday, September 28th (2025)
* **Time:** 11:40 AM
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Consider creating a comprehensive summary/eval card instead of 3 in the evaluation section
- Want to start implementing StatsContext and create at least one sub component for the EvaluationSection


#### 📈 Previous Progress
- Made draft for feasibility evaluation script
- Refactored setupApp.js script -- moved stat retrieval to inside the StatsContext.jsx provider
- Created StatsContext.jsx provider that will hold stats data
- Started draft for `WeekEvalCard.jsx` but this component is subject to change or deletion

#### 🧱 Problems & Blockers
- Not sure how to handle feasibility evaluation
  - All major subcomponents need access to the feasibility evaluation but the feasibility evaluation depends on stat context
  - Only 2 major subcomponents rely on the stat context so do I have a context provider subscribe to another context provider? Seems messy/complicated
- Want to change design from mvs proposition
  - Want to create a singular comprehensive card, not 3 different cards with different info spread across each
  - Simplifies things, doesn't divide users attention or confuse them, is more visually appealing
- Running out of time to finalize features

#### ⏳ Pending Actions
- Finalize StatsContext.jsx and implement into the app

#### 🔜 Next Steps
- Decide on design changes for eval section
- Implement StatsContext into the App and available subcomponents
  - App
  - StatCardSystem
    - Has the stats data
    - Uses the stats data for daily categorization instead of the default data
  - EvaluationSection subcomponent drafts
    - Displays basic info
    - Includes a shadcn card component
- Have EvaluationSection display stats info -- visually verify its accuracy
- Start verifying that StatCardSystem implements stats
  - Create test file and copy/paste stats data previously calculated and verified (on the backend) as mockup values

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- I am thinking of just making one big stat card for the evaluation section instead of creating 3 (for week eval, daily status count eval, and overall eval) but this design changes differs from the mvs. What do you think I should do?  
**Answer:** It makes sense to consolidate into one card. The MVS (`mvs.md`) only required showing daily stats and an overall plan rating:contentReference[oaicite:0]{index=0}—it didn’t specify 3 separate cards. A single comprehensive card still satisfies the MVS while being simpler, easier to maintain, and more user-friendly. You’re not breaking the MVS, just refining its presentation.

#### ❓ Question 2
- What assumptions am I making that might be wrong?  
**Answer:**  
1. Assuming feasibility must be tied directly to StatsContext — it could also be derived in a utility hook or selector function instead of a nested provider.  
2. Assuming three separate cards were mandatory for the MVS — the spec only required “stat cards by day” and a plan summary, so consolidation is allowed.  
3. Assuming every subcomponent needs raw stats — in reality, some may only need derived feasibility values, which could be memoized and shared globally.

### 🧾 Results

#### 🧠 Discussion Notes
- Consolidating evaluation into one card aligns with both usability and MVS requirements.  
- Feasibility evaluation does not necessarily require its own provider; could be derived from StatsContext with helper functions.  
- Time constraints push toward simpler design decisions over maintaining multiple, redundant subcomponents.

#### 🗝️ Key Decisions
- Use a single comprehensive evaluation card for clarity and reduced complexity.  
- Keep StatsContext as the single source of truth for stats; feasibility logic will be computed from it, not stored separately.  
- Prioritize feature completeness (StatsContext + eval card) over perfect modularity for this sprint.

#### 📌 Action Items
- [x] Finalize StatsContext with fetch + update logic.  
- [x] Start implementing single evaluation card (replace `WeekEvalCard.jsx` draft).  
- [ ] Create mock test data to verify the evaluation card displays correct values.  
- [ ] Update sprint documentation to reflect design pivot from 3-card layout to 1-card layout.

---


## 🗓️ Standup 13 – Ran Into Some Bugs

### 🧾 Overview
* **Date:** Monday, September 29th (2025)  
* **Time:** 11:51 AM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Didn’t make a ton of progress yesterday, ran into a bunch of new bugs/problems while trying to implement `StatsContext`
- Need to rework a lot of `StatCardSystem` and subcomponents
- Will continue to work on implementing `StatsContext` and fixing related bugs

#### 📈 Previous Progress
- Created `EvaluationSection.jsx` to print out test data to see if `StatsContext` & `FeasibilityContext` are working
- Started working on `FeasibilityContext.jsx`
- Finished draft of `StatsContext.jsx`
- Solved bugs with `evaluateFeasibility.js` — got the weekly score to display to screen

#### 🧱 Problems & Blockers
- **StatCardSystem issues**
  - `cardData` is hardcoded testing values → no formatting pipeline for real incoming stats
  - Some files mix multiple React components + helper functions → harder to debug & reuse
  - Local memoization of stats conflicts with global feasibility evaluation → needs to be lifted higher in scope
- **evaluateFeasibility.js**
  - Very fragile; poor error handling → crashes ripple into multiple components

#### ⏳ Pending Actions
- Solve bugs surrounding `FeasibilityContext.jsx`, `EvaluationSection.jsx`, and `evaluateFeasibility.js`

#### 🔜 Next Steps
- Continue to work on `FeasibilityContext` + its implementation + solve related bugs
- Refactor parts of `StatCardSystem` to cleanly separate components and shared helpers

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**What am I assuming that might be wrong?**  
- That feasibility evaluation must live in a dedicated context. It might be simpler to derive feasibility from `StatsContext` directly and only expose what’s needed to the global UI.  
- That error handling can be bolted on later. In reality, feasibility relies on stable calculations, so robust error handling is foundational.

#### ❓ Question 2  
**What are the biggest risks in today’s tasks?**  
- Breaking core features outlined in the **MVS** (stat cards, plan summary) by restructuring context providers incorrectly.  
- Getting stuck in refactor loops if `StatCardSystem` isn’t modularized before adding more features.  
- Overcomplicating feasibility calculations and delaying integration with the feedback system.

### 🧾 Results

#### 🧠 Discussion Notes
- The current bugs highlight a **tight coupling problem** between feasibility and stats logic.  
- Context layering may need to be revisited: instead of parallel providers (`StatsContext`, `FeasibilityContext`), feasibility could be computed inside stats and memoized for global use.  
- File hygiene is now becoming important; too many inline components + helper functions → harder to test/debug.

#### 🗝️ Key Decisions
- Error handling in `evaluateFeasibility.js` must be improved before more features depend on it.  
- Restructure `StatCardSystem` to separate presentational and logic-heavy components.  
- Investigate merging `StatsContext` and `FeasibilityContext` or ensuring one consumes the other cleanly.

#### 📌 Action Items
- [x] Add error boundaries / safe defaults to `evaluateFeasibility.js`  
- [x] Clean up `StatCardSystem` file structure (one component per file + shared helpers)  
- [x] Decide whether to merge or stack `StatsContext` + `FeasibilityContext`  
- [ ] Implement formatting pipeline to transform real stats data into `cardData` format  

---

## 🗓️ Standup 14 – Nearing the End

### 🧾 Overview
* **Date:** Tuesday, September 30th (2025)  
* **Time:** 3:50 PM  
* **Attendees:** Self (Solo)  
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Decided on combining context providers to make things simpler to implement  
- Need to start wrapping things up documentation wise  

#### 📈 Previous Progress
- Briefly did some refactoring of StatCardSystem (moved helper functions and React subcomponents to independent files)  
- Added error handling to `evaluateFeasibility.js`  
- Started implementing the combined context provider  
  - Generates default card data (dates: this week → Monday to Sunday)  
  - Retrieves and stores stats data from Flask API  
  - Evaluates time sums by day per card  
  - Evaluates feasibility status by day per card  

#### 🧱 Problems & Blockers
- StatCardSystem needs additional refactoring — for now commented out in `App.jsx`  
  - Needs to subscribe to new context provider once it’s completed  
  - Needs regression tests rewritten so they all pass  
  - Old code performing memoization/feasibility evaluation needs deletion  
- Need to wrap up documentation  

#### ⏳ Pending Actions
- Continue implementing `ProcessingContext.jsx`  
  - React updates cardData once stats data retrieved from Flask is received  
  - Counts number of statuses per card  
  - Processes overall feasibility  
  - Double check that context calculates and provides all values needed for StatCardSystem  

#### 🔜 Next Steps
- Finish `ProcessingContext.jsx` implementation  
- Final documentation pass (standups, backlog, sprint summaries, DoD notes)  

### 🤖 ChatGPT Reflection

#### ❓ Question 1  
**What assumptions am I assuming that might be wrong?**  
- That combining contexts won’t create unnecessary re-renders — may still need memoization or selector-style hooks.  
- That ProcessingContext will provide all data needs without introducing duplication between TaskContext and stats/feasibility logic.  
- That regression tests will be straightforward — the new provider may change the shape of consumed props, requiring deeper test rewrites.  

#### ❓ Question 2  
**How much longer in days do you think this project will take to conclude?**  
- With three backlog items left (`Feedback System`, `End-to-End Testing`, `Presentation Readiness`), a realistic estimate is **5–7 working days**:  
  - 2–3 days to complete ProcessingContext + refactor StatCardSystem + regression tests.  
  - 1–2 days for feedback system UI/UX polish.  
  - 2 days for end-to-end testing, documentation, and presentation prep.  

### 🧾 Results

#### 🧠 Discussion Notes
- Project has entered the “stabilization” phase: fewer new features, more polish, testing, and documentation.  
- Risk is scope creep — need to hold back from adding features not in MVS.  

#### 🗝️ Key Decisions
- Use **ProcessingContext** as the single combined provider for stats + feasibility evaluation.  
- Comment out old StatCardSystem logic until refactor is complete.  
- Prioritize documentation alongside coding to avoid last-minute backlog.  

#### 📌 Action Items
- [x] Continue implementing ProcessingContext.jsx 
  - [x] React updates cardData once stats data retrieved from flask is received 
  - [x] Counts the number of statuses per card 
  - [x] Processes overall feasibility 
  - [x] Double check that context calculates and provides all values needed for StatCardSystem to function
- [ ] Complete Retrospective Draft (in Notion)
  - [ ] What didn't go well
  - [ ] What went well
  - [ ] Issue Identified
  - [ ] Root Cause
  - [ ] Proposed Solutions
  - [ ] Action Plan

--- 

## 🗓️ Standup 15 – Late Start

### 🧾 Overview
* **Date:** Wednesday, October 1st (2025)
* **Time:** 6:13 pm
* **Attendees:** Self (Solo)
* **Discussed Backlog Items:**  
  - `Feedback System`

### 📋 Contents

#### ✅ Planned Agenda
- Starting documentation & planning late but need to finish by tomorrow
- Want to create a new presentation detailing progress

#### 📈 Previous Progress
- Got basic version of ProcessingContext to work
- Updated StatCardSystem to work with the new context, removing old context implementation

#### 🧱 Problems & Blockers
- Regression testing may take longer
- Will take some time to write up new tests

#### ⏳ Pending Actions
- Finish documentation for sprint 9
- Complete plan draft for sprint 10

#### 🔜 Next Steps
- Finish documentation for sprint 9
  - Update `Plan Submission` + `Feedback System` backlog items if necessary
  - Complete sprint 9 retrospective
  - Finalize sprint9.md file
- Set things up for sprint 10
  - Get draft of sprint10.md file up
  - Create copies for standup log, retro, assets folder, new backlog items (End-to-End testing + Presentation Readiness)

### 🤖 ChatGPT Reflection

#### ❓ Question 1
- **What assumptions am I making that might be incorrect?**  
  You may be assuming regression testing will only cover `StatCardSystem` updates. In reality, changes to the ProcessingContext can ripple through other consumers (e.g., TaskTable integration, feasibility cards). Test coverage should include interactions, not just isolated unit tests.

#### ❓ Question 2
- **Are today's tasks missing any dependencies?**  
  Yes: Sprint 10 setup depends on completing the Sprint 9 retrospective, because backlog refinements are derived from that reflection. Without that, new backlog items (`End-to-End testing`, `Presentation Readiness`) may not capture all necessary adjustments.

---

### 🧾 Results

#### 🧠 Discussion Notes
- The ProcessingContext milestone puts you closer to MVS feature parity (`Stat Cards by Day` + feedback loop).  
- Documentation for Sprint 9 should tie progress back to the original architecture justification, showing how context refactoring supports maintainability and feasibility feedback.

#### 🗝️ Key Decisions
- Regression testing scope expanded to include all failed test cases that previously passed
- Will create a presentation to communicate progress and remaining work

#### 📌 Action Items
- [x] Finish documentation for sprint 9
  - [x] Update `Plan Submission` + `Feedback System` backlog items if necessary
  - [x] Complete sprint 9 retrospective
  - [x] Finalize sprint9.md file
- [x] Set things up for sprint 10
  - [x] Get draft of sprint10.md file up
  - [x] Create copies for standup log, retro, assets folder, new backlog items (End-to-End testing + Presentation Readiness)  