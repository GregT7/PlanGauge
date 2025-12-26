# Security Setup

## 📝 Task Overview
* Sprint: #12
* Dates: November 1 - December 25 (2025)
* Status: Completed
* Story Points: #16
* Dependencies:
  * `Deployment Prep`
  * `Security Design`
* Task Description: Strengthen the application’s overall security posture by safeguarding API keys, databases, and external integrations from unauthorized access or misuse. Establish clear boundaries between demo and production environments while ensuring users can safely interact with the demo mode.
* Expected Outcome: The deployed application resists unauthorized access, data corruption, and resource abuse. Sensitive information remains protected, demo mode operates safely with no external dependencies, and the owner retains full secure access to production features.

---

## 🔧 Work
### ✅ Subtasks
#### 🔐 1. Authentication System
- [x] Create app_user table with email, password_hash, and role ('owner' | 'guest').
- [x] Add /auth/login endpoint: verify Argon2id password, create session record, set secure HttpOnly cookie.
- [x] Add /auth/logout endpoint: revoke current session and clear cookie.
- [x] Hash passwords using Argon2id and seed one owner user manually.

#### 🍪 2. Server-Side Sessions
- [x] Create sessions table with user_id, created_at, expires_at, revoked, last_seen.
- [x] Implement cookie-based session system (pg_sid):
- HttpOnly, Secure, SameSite=None cookie (in production, over HTTPS).
- Sliding TTL refresh (extend expires_at on activity).
- [x] Add middleware/decorator to verify active sessions and attach g.user.
- [x] Add /auth/me route to verify login state (for frontend).

#### ⚙️ 3. Role-Based Access (RBAC)
- [x] Add @require_session and @require_owner decorators.
- [x] Restrict write routes (e.g., /api/plan-submissions) to owner only.
- [x] Allow read-only stats retrieval for guest users.

#### 🧠 4. CSRF & CORS Configuration
- [x] Enable supports_credentials=True in Flask-CORS and whitelist your Vercel origin.
- [x] Add simple Origin check for state-changing routes (reject if Origin is not your Vercel frontend).
- [x] Ensure all frontend fetches include { credentials: 'include' }.

#### 🔨 5. Frontend Mode Refactor
- [x] "Demo" mode code is removed
- [x] Create new AuthContext
- [x] Create a centralized provider wrapper (e.g., AppProviders) that nests all context providers and update App.jsx / main.jsx to use it
- [x] Build a MODE_CONFIG object for modular and swappable design (visitor | guest | owner)
- [x] Replace "demo" mode code with new mode code (ie SubmissionButton no longer uses config.isDemo to determine if submission is allowed)

#### 🔓 6. Frontend Login UI
- [x] Add Login button component on frontend navbar or landing screen.
- [x] Implement login form modal or inline section w/ Fields: email, password.
- [x] POST /auth/login on submit with { credentials: 'include' }.
- [x] If successful, update UI state → “Mode: {role}”.

#### 🔒 7. Frontend Logout UI
- [x] Add Logout button component on frontend navbar or landing screen when a user is logged in
- [x] POST /auth/logout on submit with { credentials: 'include' }.
- [x] If successful
----- [x] Make revoked=True for login session in DB
----- [x] Make role visitor
----- [x] Have login button be visible
- [x] Show Logout button that calls /auth/logout and clears state.

#### 🖧 8. AuthorizationSystem
- [x] Combines both login and logout buttons, showing them depending on the mode
- [x] Puts login/logout buttons in a stylized container
- [x] Shows text indicator of current user mode (ie "User: Owner" in the left hand corner)

#### 🗝️ 9. AuthContext
- [x] Establishes initial mode status via loading the session on mount (is there a valid cookie stored in the browser?)
- [x] Stores & shares getters/setters on the logged in user, initial loading status, and current mode (role of user)

#### 🛂 10. RBAC Rework
- [x] Plan submission restrictions (visitor/guest - mock submission, owner - real submission)
- [x] Stat retrieval restrictions (visitor - mock data, guest/owner - real data)
- [x] Dummy task loading (visitor/guest - mock data, owner - empty data)
- [x] API connection testing (visitor/guest - mock test, owner - real test)

#### 🧪 10. Testing & Verification
- [x] Verify owner and guest login persists until manual logout when not passed expiration time.
- [x] Verify mode permissions enforced
---- [x] visitors can't submit plans, can't view real stats data, and have dummy task data loaded into the table, login button present
---- [x] guests can't submit plans, can view real stats data, and have some dummy data loaded into the table, logout button present
---- [x] Owner can submit plans, can view real data, and has empty tasks loaded on launch, logout button present
- [x] Login button only appears when no one is logged in and the mode is "visitor"
- [x] Logout button only appears when a guest or owner is logged in

### 📘 Definition of Done
#### 🔐 1. Authentication System — DoD
- [x] app_user table exists with email, password_hash, role (owner | guest) and constraints (unique email, non-null fields).
- [x] /auth/login validates credentials using Argon2id and issues a secure HttpOnly cookie + creates a session row.
- [x] /auth/logout revokes the current session row and clears the cookie in the browser.
- [x] Owner seed user exists and can successfully log in; invalid credentials fail with appropriate status + message.

#### 🍪 2. Server-Side Sessions — DoD
- [x] sessions table exists with user_id, created_at, expires_at, revoked, last_seen.
- [x] Session cookie is set with correct attributes (HttpOnly; Secure + SameSite=None in prod/HTTPS).
- [x] Sliding TTL works: active requests extend expires_at and update last_seen.
- [x] @require_session (or middleware) blocks requests without a valid session and attaches g.user when valid.
- [x] /auth/me accurately reports login status + role so frontend can establish initial mode.

#### ⚙️ 3. Role-Based Access (RBAC) — DoD
- [x] @require_owner blocks restricted routes for non-owner users with clear 401/403 behavior.
- [x] Write routes are owner-only (e.g., /api/plan-submissions).
- [x] Guests can access read-only stats endpoints; visitors cannot access real data.
- [x] RBAC rules are enforced server-side (frontend restrictions are treated as convenience only).

#### 🧠 4. CSRF & CORS Configuration — DoD
- [x] Flask-CORS configured with supports_credentials=True and only approved origins (Vercel + local dev).
- [x] State-changing routes reject requests when Origin is not the approved frontend origin.
- [x] All frontend fetch calls that rely on cookies include { credentials: "include" }.
- [x] Cookie-based auth works cross-origin in production (no silent cookie drop due to SameSite/CORS misconfig).

#### 🔨 5. Frontend Mode Refactor — DoD
- [x] All deprecated “Demo mode” logic removed or fully isolated (no lingering isDemo checks).
- [x] AuthContext is the single source of truth for mode, user, and authLoaded/loading.
- [x] AppProviders cleanly wraps contexts; app launches without provider order bugs.
- [x] MODE_CONFIG drives capability switches consistently across UI + data fetching behaviors.

#### 🔓 6. Frontend Login UI — DoD
- [x] Login control is visible only when mode is visitor.
- [x] Login form accepts email/password, validates required fields, and handles API failures cleanly.
- [x] Successful login updates app state to mode = role and updates UI indicator immediately.
- [x] Login request uses { credentials: "include" } and results in persisted session behavior on refresh.

#### 🔒 7. Frontend Logout UI — DoD
- [x] Logout control visible only for guest or owner.
- [x] Logout request uses { credentials: "include" } and clears auth state on success.
- [x] After logout: mode becomes visitor, login button reappears, and restricted UI is removed/disabled.
- [x] Backend session is revoked (DB reflects revoked flag) and cannot be used again.

#### 🖧 8. AuthorizationSystem Component — DoD
- [x] Login/logout buttons are conditionally rendered correctly based on mode.
- [x] Component is visually consistent (container styling) and doesn’t break layout.
- [x] Mode indicator text updates correctly (e.g., “User: Visitor/Guest/Owner”).

#### 🗝️ 9. AuthContext — DoD
- [x] On mount, calls /auth/me to determine initial auth state (handles both success and failure).
- [x] Provides stable getters/setters for user, mode, and authLoaded/loading to all consumers.
- [x] Refreshing the page preserves login state (if session valid) and restores the correct mode.

#### 🛂 10. RBAC Rework — DoD
- [x] Plan submission behavior matches role: visitor/guest = mock submission; owner = real submission.
- [x] Stats retrieval: visitor = mock data; guest/owner = real data.
- [x] Task loading: visitor/guest = dummy tasks; owner = empty tasks.
- [x] Connection testing: visitor/guest = mock tests; owner = real tests.
- [x] Capability switching is driven by a single configuration source (MODE_CONFIG) and behaves consistently.

#### 🧪 11. Informal Testing & Verification — DoD
- [x] Owner + guest sessions persist across refresh until logout (assuming not expired).
- [x] Visitors can't submit plans or view real stats; guests can view real stats but can't submit; owners can do both.
- [x] Login button only shows for visitor; logout button only shows for guest/owner.
- [x] Negative tests pass: invalid password, revoked session cookie, missing cookie, wrong Origin, etc.