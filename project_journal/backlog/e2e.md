# End-to-End Testing

## 📝 Task Overview
* Sprint: #10
* Dates: October 3rd - Month day (2025)
* Status: (Completed/In Progress/Not Started)
* Story Points: #10
* Dependencies:
  * `Feedback System`
  * `Backend Setup`
  * `Intro to Flask`
  * `Subsystem Integration`
  * `Database Setup`
  * `UI UX Foundation`
  * `Intro to React`
  * `Data Entry Table`
* Task Description: Implement Playwright end-to-end tests to validate core user flows, error states, and status-driven UI styling. Integrate with CI for automated regression checks and reporting.
* Expected Outcome: The user can launch the app, triggering a full workflow where `/api/stats` data is fetched, feasibility is calculated, and all UI components update in real time to reflect accurate scores, colors, and statuses. The experience should appear seamless from data retrieval to visual feedback, with no errors or noticeable lag.

---

## 🔧 Work

### ✅ Subtasks
1. Project Setup
- [ ] Add Playwright: npm i -D @playwright/test and npx playwright install
- [ ] Create playwright.config.ts
- [ ] BaseURL (Vite dev or preview)
- [ ] Local-only retries, trace on retry, screenshots/video on failure
- [ ] Add npm scripts: e2e:dev, e2e:report

2. App Bootstrapping for Tests
- [ ] Add a test server script that:
- [ ] Starts Flask API (test env, seeded/mocked)
- [ ] Starts frontend (vite preview)
- [ ] Waits until both health endpoints are ready
- [ ] Document .env.test for frontend/backend
- [ ] Option A (preferred): lightweight seed route in Flask for deterministic stats
- [ ] Option B: network mocking in Playwright via page.route('**/api/stats', ...)

3. Selectors & Testability
- [ ] Add stable data-testid attributes for:
- [ ] eval-card, eval-status, eval-score
- [ ] accordion-details, accordion-week, accordion-daily, accordion-points, accordion-zbands
- [ ] date-start, date-end, retry-button, error-banner, loading-skeleton
- [ ] Centralize them in a constants file for reuse in tests

4. Core Journeys (Happy Paths)
- [ ] App Load → Stats Fetched → UI Renders
- [ ] Open Details (accordion behavior)
- [ ] Week & Daily Item evaluations (score, z-score, totals, etc.)

5. Date Range Interaction
- [ ] Change start/end dates → debounce respected → single refetch
- [ ] Assert updated stats and border color change

6. Error & Empty States
- [ ] Handle backend 400 (bad date range) → error banner visible, retry works
- [ ] Handle network failure → skeleton → error banner
- [ ] Default state (no tasks) → neutral UI
- [ ] Unknown state (e.g., std=0) → appropriate fallback copy

7. Status-Driven Styling Assertions
- [ ] Validate color and border mapping for all status types
- [ ] Snapshot class names for regression detection

8. Accessibility & Usability
- [ ] Accordion triggers use ARIA roles
- [ ] Keyboard toggling (Enter/Space)
- [ ] Focus visible and color not the only indicator

9. Visual Smoke (Optional)
- [ ] Capture per-status screenshots for local review only

10. Performance Smoke
- [ ] Measure /api/stats response time locally
- [ ] Warn if > 300ms (non-blocking)

### 📘 Definition of Done
1) Project Setup
- [ ] Playwright installs and runs locally (npm i -D @playwright/test, npx playwright install).
- [ ] playwright.config.ts includes a valid BaseURL and generates screenshots/traces on failure.
- [ ] NPM scripts e2e:dev and e2e:report run tests successfully.
- Evidence
--- [ ] Screenshot or log of successful Playwright test run.

2) App Bootstrapping for Tests
- [ ] Test script starts both Flask API (in test mode) and frontend (vite preview).
- [ ] .env.test files exist and load correctly for both services.
- [ ] App waits until both are live before tests begin.
- [ ] Deterministic seed data (via Flask route or network mock) is available for consistent results.
- Evidence
--- [ ] Console log showing both servers started before test run.

3) Selectors & Testability
- [ ] Key UI elements include stable data-testid attributes (eval-card, accordion-week, etc.).
- [ ] Test IDs stored in a shared constants file for reuse across tests.
- Evidence
--- [ ] Short snippet or screenshot showing test ID constants.

4) Core Journeys (Happy Paths)
- [ ] App loads, fetches /api/stats, shows skeleton, then renders evaluation UI.
- [ ] Accordions expand correctly and display expected stats (week + daily).
- [ ] Values for total, average, std, and zscore are visible in the correct sections.
- Evidence
--- [ ] Screenshot of successful app render during test.

5) Date Range Interaction
- [ ] Changing start/end dates triggers a single refetch of /api/stats.
- [ ] Updated data correctly changes scores, colors, and text.
- Evidence
--- [ ] Screenshot or log showing date change reflected in UI.

6) Error & Empty States
- [ ] 400 errors and network failures display a visible error banner with a working retry button.
- [ ] “Default” (no data) and “Unknown” (std=0) states each show proper fallback visuals.
- Evidence
--- [ ] Screenshots for error, default, and unknown states.

7) Status-Driven Styling
- [ ] All status types (default, unknown, good, moderate, poor) use correct border/text colors.
- [ ] Color changes reactively when status updates.
- Evidence
--- [ ] Screenshot or short video showing color change between statuses.

8) Accessibility & Usability
- [ ] Accordions use accessible buttons with aria-expanded.
- [ ] Keyboard controls (Enter/Space) toggle accordions properly.
- [ ] Color is not the only indicator of status (labels present).
- Evidence
--- [ ] Accessibility check (manual or using Lighthouse/axe).

9) Visual Smoke (Optional)
- [ ] Screenshots captured for each major status type (good/moderate/poor/unknown/default).
- [ ] Saved locally under /tests/e2e/snapshots/.
- Evidence
--- [ ] Folder screenshot showing captured images.

10) Performance Smoke
- [ ] /api/stats average response time under ~300 ms locally.
- [ ] No long delays or hangs when loading stats.
- Evidence
--- [ ] Console log of response time measurement.



# 🧾 Documentation & Developer Experience
- [ ] README includes a short section on “Running E2E Tests Locally” with:
- Setup steps
- How to start the servers
- Basic troubleshooting
- [ ] /tests/e2e/ folder includes clear structure for specs, fixtures, and utils.
- [ ] HTML test reports and screenshots can be easily viewed locally.
- Evidence
--- [ ] Screenshot of README section or test report folder.

# 🟢 Completion Criteria
- [ ] All 10 subtask groups above are complete and verified.
- [ ] Local Playwright tests pass twice in a row without flakiness.
- [ ] Documentation and supporting evidence (screenshots/logs) are finalized.
