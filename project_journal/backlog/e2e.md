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
* Expected Outcome: insert text here...

---

## 🔧 Work

### ✅ Subtasks
1) Project Setup
- [ ] Add Playwright: `npm i -D @playwright/test` and `npx playwright install`
- [ ] Create `playwright.config.ts`
  - [ ] BaseURL (Vite dev or preview)
  - [ ] 2 retries on CI, trace on retry, screenshots/video on failure
  - [ ] Parallel workers tuned for CI
- [ ] Add `npm` scripts: `e2e:dev`, `e2e:ci`, `e2e:report`

2) App Bootstrapping for Tests
- [ ] Add a test server script that:
  - [ ] Starts Flask API (test env, seeded/mocked)
  - [ ] Starts frontend (vite `preview`)
  - [ ] Exposes a health endpoint wait (both up before tests run)
- [ ] Document `.env.test` for frontend/backend
- [ ] Option A (preferred): lightweight seed route in Flask for deterministic stats
- [ ] Option B: network mocking in Playwright via `page.route('**/api/stats', ...)`

3) Selectors & Testability
- [ ] Add stable `data-testid` attributes for:
  - [ ] `eval-card`, `eval-status`, `eval-score`
  - [ ] `accordion-details`, `accordion-week`, `accordion-daily`, `accordion-points`, `accordion-zbands`
  - [ ] `date-start`, `date-end`, `retry-button`, `error-banner`, `loading-skeleton`
- [ ] Centralize them in a small constants file for reuse in tests

4) Core Journeys (Happy Paths)
- [ ] **App Load → Stats Fetched → UI Renders**
  - [ ] Assert skeleton visible then hidden
  - [ ] Assert `/api/stats` called once on load
  - [ ] Assert overall status label + numeric score visible
  - [ ] Assert border class reflects status mapping
- [ ] **Open Details**
  - [ ] Expand “details” accordion
  - [ ] Verify equation block present (and substituted values if not unknown)
  - [ ] Verify filter date range rendered
  - [ ] Verify four items are in correct order
- [ ] **Week & Daily Items**
  - [ ] Week trigger shows `Week: <Status> (Score: N.N)` and colored correctly
  - [ ] Week content shows total, avg, std, zscore
  - [ ] Daily trigger shows aggregated status/score
  - [ ] Daily content shows Mon–Sun table with `sum, avg, std, z, points, status`

5) Date Range Interaction
- [ ] Change start/end dates → debounce respected → single refetch
- [ ] Assert new stats reflected (status/score/border color update)
- [ ] Verify query params passed to backend

6) Error & Empty States
- [ ] **Backend 400** on bad date range
  - [ ] Mock or seed to return 400 → error banner visible, retry works
- [ ] **Network failure/timeout**
  - [ ] Simulate fetch failure → skeleton then error banner
- [ ] **Default state (no tasks)**
  - [ ] Seed response indicating “no entries” → renders `default` status, neutral colors
- [ ] **Unknown state**
  - [ ] Seed `std = 0` (or missing inputs) → `unknown` status, appropriate copy

7) Status-Driven Styling Assertions
- [ ] For each status `default | unknown | good | moderate | poor`:
  - [ ] Assert border class on `eval-card` equals the status token mapping
  - [ ] Assert text/badge classes match mapping
  - [ ] Snapshot class names (string compare) to catch regressions

8) Accessibility & Usability
- [ ] Accordion triggers are buttons with `aria-expanded`
- [ ] Keyboard toggling works (Enter/Space)
- [ ] Color not sole indicator: status text present
- [ ] Focus is visible when navigating accordions

9) Visual Smoke (Optional but Useful)
- [ ] Per-status screenshots of `eval-card` (mobile & desktop)
- [ ] Store in Playwright’s snapshot folder; review on CI only for large diffs

10) Performance Smoke
- [ ] Capture response time of `/api/stats` (via `middleware` or PW route timing)
- [ ] Warn if > 300ms local (non-blocking)

11) CI Integration
- [ ] GitHub Actions (or runner of choice):
  - [ ] Cache node modules + Playwright browsers
  - [ ] Spin up Flask (test), run migrations/seed
  - [ ] Start frontend preview
  - [ ] Run `npx playwright test` with `--reporter=line,html`
  - [ ] Upload Playwright report + traces as artifacts

12) Maintenance & DX
- [ ] Add `tests/e2e/fixtures/stats.ts` deterministic payloads for: good/moderate/poor/default/unknown
- [ ] Add helper `expectStatusClasses(page, 'good')` util
- [ ] Document “How to run e2e locally” in README with troubleshooting

### 📘 Definition of Done
0) Global Requirements
- [ ] **Determinism:** Tests pass locally and on CI with seeded/mocked data; no reliance on live/external services.
- [ ] **Flake Control:** Last 3 CI runs show **0 flaky failures** (≤1 rerun allowed via retries) with the same commit.
- [ ] **Docs:** README includes “How to run E2E locally,” env vars, and troubleshooting.
- [ ] **Artifacts:** CI uploads Playwright HTML report and traces/videos on failure.

1) Tooling & Config
- [ ] Playwright installed and configured in `playwright.config.ts` with:
  - [ ] `baseURL` set; `webServer` starts Vite preview and Flask test server.
  - [ ] `retries: 2` on CI, `trace: 'on-first-retry'`, screenshots and video **on failure**.
  - [ ] Sensible workers (e.g., `workers: process.env.CI ? '50%' : undefined`).
- **Evidence**
  - [ ] `playwright.config.ts` in repo, reviewed.

2) Test Environment Bootstrap
- [ ] Single test command starts: Flask (test mode, seeded/mocked), Vite preview, waits on health checks.
- [ ] `.env.test` samples committed (no secrets).
- [ ] Either:
  - [ ] **Seed route** in Flask for deterministic `/api/stats` payloads (good/moderate/poor/default/unknown), or
  - [ ] **Network mocking** in Playwright via `page.route('**/api/stats', handler)`.
- **Evidence**
  - [ ] Script or npm target (`e2e:dev`, `e2e:ci`) verified in PR.

3) Selectors & Testability
- [ ] Stable `data-testid` attributes exist for core surfaces:
  - [ ] `eval-card`, `eval-status`, `eval-score`
  - [ ] `accordion-details`, `accordion-week`, `accordion-daily`, `accordion-points`, `accordion-zbands`
  - [ ] `date-start`, `date-end`, `retry-button`, `error-banner`, `loading-skeleton`
- **Evidence**
  - [ ] Selector constants file imported by tests.

4) Happy Path Journeys
- [ ] **App Load → Stats Render:**
  - [ ] Skeleton appears then disappears.
  - [ ] Overall status label + numeric score visible.
  - [ ] Border/text class matches the status map.
- [ ] **Details Accordion:**
  - [ ] “details” expands; equation + substituted values (when not unknown) displayed.
  - [ ] Filter date range rendered.
  - [ ] Items order: week → daily → point thresholds → zscore thresholds.
- [ ] **Week/Daily Accordions:**
  - [ ] Week trigger: `Week: <Status> (Score: N.N)` + correct color.
  - [ ] Week content: total, avg, std, zscore visible.
  - [ ] Daily trigger: `Daily: <Status> (Score: N.N)` + correct color.
  - [ ] Daily table Mon–Sun with `sum, avg, std, z, points, status`.
- **Evidence**
  - [ ] `app.spec.ts` and screenshots in report.

5) Interactions & State Changes
- [ ] **Date Range Update:** Changing start/end causes one debounced refetch, and the UI updates (status, score, border).
- [ ] **Retry Flow:** When error occurs, clicking retry re-executes fetch and resolves.
- **Evidence**
  - [ ] Tests asserting network call count and query params.

6) Error, Default, and Unknown States
- [ ] **Invalid Range (400):** Error banner visible; retry works.
- [ ] **Network Failure:** Skeleton → error banner; no uncaught errors in console.
- [ ] **Default State (no tasks):** Renders `default` status with neutral colors and explanatory copy.
- [ ] **Unknown State:** Seed `std=0`/missing inputs → `unknown` status + copy.
- **Evidence**
  - [ ] Dedicated specs with seeded/mocked payloads.

7) Status-Driven Styling
- [ ] For each status `default | unknown | good | moderate | poor`:
  - [ ] Outer border class on `eval-card` equals status map value.
  - [ ] Text/badge classes match mapping.
- **Evidence**
  - [ ] Single parametrized test verifies classes for all statuses (string equality, not screenshot only).

8) Accessibility & Usability
- [ ] Accordion triggers are `<button>`s with `aria-expanded` toggling.
- [ ] Keyboard (Enter/Space) toggles accordions.
- [ ] Status text present so color isn’t the only indicator.
- **Evidence**
  - [ ] A11y assertions in tests (roles/attrs).

9) Performance Smoke (Non-blocking but enforced locally)
- [ ] Capture `/api/stats` response time during test; warn if > 300ms locally (does not fail CI).
- **Evidence**
  - [ ] Logged timing in test output.

10) CI Integration
- [ ] GitHub Actions (or equivalent) job:
  - [ ] Caches Node + Playwright browsers.
  - [ ] Starts Flask (test) + Vite preview; waits for both.
  - [ ] Runs `npx playwright test` with `--reporter=line,html`.
  - [ ] Uploads `playwright-report` + `test-results` (traces/videos) as artifacts.
- **Evidence**
  - [ ] Passing CI run linked to PR.

11) Maintenance & DX
- [ ] Test fixtures live in `tests/e2e/fixtures/stats.ts` for all status payloads.
- [ ] Helper in `tests/e2e/utils/expectStatus.ts` to assert classes by status.
- [ ] `npm run e2e:dev` for hot local loops (mocking) and `npm run e2e:ci` for full boot.
- **Evidence**
  - [ ] Files present and referenced in specs.

Exit Criteria Summary
- [ ] All required specs green locally and in CI (2 consecutive runs).
- [ ] No flaky tests recorded across the last 3 CI attempts.
- [ ] Reports, traces, and docs included.