# 🧾 Overview
This PR focused on implementing a role-based authentication system to help protect my assets/systems when redeploying the app for public usage.  There is now a login button that triggers a dialog popup form where the user can enter in their email/password info and submit their details for an authentication attempt. The users email address and password correspond to a user record that has a specified role: `guest` or `owner`. Upon successful authentication, the mode will change to reflect the user's role alongside a mode display. The frontend was also reworked a little bit to make managing configuration easier via a context object shared through the context API. Additionally, flask routes were implemented to enforce sessions and the db was updated to manage sessions and users. Diagraming was done to design the login/logout process, session lifecycle, and role-based access. There was some additional diagramming done for sending/accepting invites but this feature was not implemented. Lastly, prep for redeployment was completed to expedite this process.

---

## 🛠️ Changes
### ✅ Created New Files
- `/project_management/diagrams/login_swimlane.png`: describes the cross-system process of logging in
- `/project_management/diagrams/logout_swimlane.png`: describes the cross-system process of logging out
- `/project_management/diagrams/rbac_matrix.png`: the permission structure spread across groups 'owner', 'guest', and 'visitor'
- `/project_management/diagrams/session_lifecycle.png`: describes the cookie/session journey from: logging in to logging out/expiring
- `/project_journal/pull_requests/pr7_security.md`: pr request documentation for the authentication feature
- `/project_journal/backlog/sec_setup.md`: backlog item doc for setting up security (implementing the design)
- `/project_journal/backlog/sec_design.md`: backlog item doc for creating the security design and learning more security concepts
- `/project_journal/standup/logs/sprint12_standups.md`: standups for sprint 12
- `/src/backend/.env`: deleted previous env file and recreated this one, has non secret local-testing variables
- `/src/backend/.env.prod`: deleted previous env file, recreated this one to store vars for me to easily paste when I deploy to prod
- `/src/backend/app/auth_utils.py`: utility cake decorators for enforcing valid cookies
- `/src/backend/app/clients.py`: functions that retrieve objects for accessing the supabase api and for attaching headers onto notion requests
- `/src/backend/docker-compose.yml`: messing around with docker
- `/src/backend/Dockerfile`: containerizes the backend using gunicorn to launch the web server
- `/src/backend/.dockerignore`: files to ignore when containerizing backend app
- `/src/frontend/src/contexts/AppProviders.jsx`: Combined all the context providers into a singular provider to make management of contexts easier
- `/src/frontend/src/contexts/AuthContext.jsx`: Context for managing sessions and role based access
- `/src/frontend/src/contexts/ConfigContext.jsx`: Context that provides a config object that contains url routes to centralize env management
- `/src/frontend/src/contexts/modeConfig.js`: functions that help determine permissions based on the role of the currently logged in user
- `/src/frontend/src/utils/config.js`: functions that help manage or return a config object that resolves env variables in central area, utilized by ConfigContext
- `/src/frontend/src/utils/modeUtils.js`: helper functions used to make mock/real functions for connectionTest, retrieveStats, and submitPlans
- `/src/frontend/src/utils/resolveUser.js`: simple helper function used to return only "owner", "guest" and "visitor" to lower risk of errors when accessing the config object
- `/src/frontend/src/components/AuthenticationSystem/AuthenticationSystem.jsx`: integrates the login/logout buttons, input modal, and mode display (showing different components based on who's logged in)
- `/src/frontend/src/components/AuthenticationSystem/LoginModal.jsx`: Popup form spawned when the login button is pressed used to collect login credentials
- `/src/frontend/src/components/AuthenticationSystem/LogoutButton.jsx`: Button that revokes the current session and turning the current mode to 'visitor'
- `/src/frontend/src/components/AuthenticationSystem/ModeDisplay.jsx`: Displays the current mode ("owner"|"guest"|"visitor")
- `/src/frontend/src/components/AuthenticationSystem/PasswordField.jsx`: Custom component added to the LoginModal so the input field had a toggleable "eye" icon to hide/show inputted text
- `/src/frontend/src/components/AuthenticationSystem/login.js`: function that attempts to login the user launched when the LoginModal submission button is clicked
- `/src/frontend/src/components/AuthenticationSystem/logout.js`: function that attempts to logout the user by revoking current access
- `/src/frontend/src/components/ui/dialog.jsx`: shadcn component for dialog box used to gather user credentials when logging in

### 🔧 Modified Files
- `/.gitignore`: appended some more files to ignore
- `/README.md`: Removed the "demo"/"full" mode related sections, updated installation & usage steps, project structure, and more
- `/project_management/specs/design.md`: added security feature diagrams
- `/project_management/specs/reqs.md`: added security feature requirements
- `/project_management/specs/user-stories.md`: added new security-based user stories
- `/project_management/diagrams/submission_swimlane.png`: fixed some small issues with arrows and text
- `/src/backend/.env.local`: added new private variables for authentication
- `/src/backend/requirements.txt`: added gunnicorn for prod level web server management to host the flask api, and asgiref (but not sure if using it?)
- `/src/backend/run.py`: removed some of the code added for "demo" and "full" mode, returned it to its simple form, just runs the flask server
- `/src/backend/app/__init__.py`: removed the "demo" and "full" mode code
- `/src/backend/app/routes.py`: applied authentication decorators to protected routes so a valid session is required
- `/src/database/db_setup.sql`: added three queries for creating two new tables (session and app_user) and an index for authentication purposes
- `/src/database/row_security.sql`: added row security to the new tables
- `/src/frontend/package.json`: deleted some of the scripts related to "demo"/"full" modes and "start" -- launches both frontend and backend scripts
- `/src/frontend/package-lock.json`: added new dependencies from shadcn for the login dialog popup
- `/src/frontend/.env`: added auth env variables
- `/src/frontend/src/App.jsx`: integrated auth context and config context, removed setupApp, made the connectionTest version launched (real/mock) role & permission based
- `/src/frontend/src/contexts/ProcessingContext.jsx`: integrated auth and config context, launches permission based retrieveStat function (real/dummy)
- `/src/frontend/src/contexts/TaskContext.jsx`: added auth and config context, added permission based task loading (real-empty, mock-sample data)
- `/src/frontend/src/utils/connectionTest.js`: replaced parameter with config object to integrate config context
- `/src/frontend/src/utils/persistentFetch.js`: ensured `credentials: "include"` in fetch requests so cookies can be appended
- `/src/frontend/src/utils/retrieveStats.js`: reworked parameters to integrate the config object
- `/src/frontend/src/components/SubmissionButton/SubmissionButton.jsx`: removed the confusing ChatGPT useRef code, also made submission function permission based (real/mock)

---
## 🔗 Context
This covers the following backlog items:
- `Security Setup`: Implement the features outlined in the `Security Design` backlog item below so there is some protections set in place for deployment
- `Security Design`: Create diagrams outlining the design for logging in, logging out, Role based access definition, and the session lifecycle. Additionally, review/learn authentication/security concepts with three quizzes and update supporting documentation (mvs, design, etc)
---

## 🧪 Testing

Only rough conducting was implemented, no frameworks used. More thorough and official testing will be conducted later if possible.

---

## 🎥 Visuals
### Security DB Design
_Description:_ Shows the db schema for the newly created tables `session` and `app_user`. Sessions are for temporary instances that allow users to gain access based on their allowed permissions while app users are linked to sessions and determine the role and degree of permissions a person has. 

![db_auth](https://github.com/user-attachments/assets/e65b2976-7bd6-4501-b60b-d210349c2763)

### Session Lifecycle
_Description:_ State diagram that describes the session lifecycle including the creation, expiration, and revocation of access for a user.

![session_life](https://github.com/user-attachments/assets/09196ef9-046a-4bb8-b2d3-69b92bf1dd46)

### Login Process
_Description:_ Swimlane diagram used to show the cross-system process of a user authenticating into the system

![login_swimlane](https://github.com/user-attachments/assets/604868b8-11a6-4f6e-8493-2ba37da72e3c)

### Login Modal
_Description:_ The popup component used to collect login credentials from the user and to attempt authentication. Created using shadcn dialog component.

![login_modal](https://github.com/user-attachments/assets/6b01b68a-83f4-40f1-bc0d-57019b66c924)

### Login Demo
_Description:_ Shows an instance of the login process: person clicks the login button, dialog popup spawns, user inputs the wrong credentials, submit is clicked, loading toast is launched, toast is resolved to show an error, user inputs the correct credentials, loading toast is launched, toast resolves to show success, visitor modal updates to "guest"

![login_demo](https://github.com/user-attachments/assets/f3f1042f-7417-48de-8f83-0732d49db8f2)

### Logout Process
_Description:_ Swimlane diagram used to show the cross-system process of a user logging out of the system

![logout_swimlane](https://github.com/user-attachments/assets/8297325e-a057-45c5-b9b1-1c936d48e985)

### Logout Button
_Description:_ Simple logout button with a logout api requesting function attached. Included for thoroughness.

![logout_button](https://github.com/user-attachments/assets/8abce149-650c-4158-8a64-21d912900e31)

### Logout Demo
_Description:_ Shows an instance of the logout process: user clicks logout button, loading toast spawns and resolves to success, mode display updates to 'visitor' which is the role of a logged out user.

![logout_demo](https://github.com/user-attachments/assets/322db104-bf28-4fb2-a804-d05f1d533215)

### RBAC Matrix
_Description:_ Shows the permissions allowed to the three user roles: "owner" (most permissions), "guest" (almost all permissions aside from record storage), and "visitor" (least privileges, uses mock data/toasts)

![rbac_mtrx](https://github.com/user-attachments/assets/9d12555e-e4a7-495e-9571-589c3f3582ea)

### Mode Display
_Description:_ Displays the role of the currently logged in user ("owner"|"guest"|"visitor")

![mode_display](https://github.com/user-attachments/assets/f88b9aa5-3b24-4196-b38d-ab057ee68f4c)

### Mock Processes
_Description:_ Shows the mock plan submission, stat retrieval, and connection test launched with mock task data loaded when a logged out user visits the app (role is "visitor"). The mock stat retrieval function retrieves a static json object from the frontend that represents old, derived data. The connection test and plan submission functions simply wait on a timeout function and the mock task data is also retrieved from the frontend. These features are intended to give visitors to the app a brief idea of what's going on without granting them unnecessary functionality (ie they can't submit plan data to my Notion database or make API calls to retrieve and derive up-to-date stat values). This limits the usage of free tier deployment services I am utilizing which will improve the longevity of personal usage each month without paying additional fees.

![mock_process](https://github.com/user-attachments/assets/4fa7203f-851a-428d-bdc6-fb1ba340a765)

---

## 👀 ChatGPT Review
I'd appreciate feedback on:

- 🧪 Test coverage
- 🧱 Component or logic design
- ⏱️ Pacing of work
- 🚧 Scope creep analysis
- 🧠 Overall quality — score 1–10 with reasoning

---

## 📂 Branch Info
- **Base branch**: `main`
- **Feature branch**: `security`

This merge accounts for two backlog items: `Security Design`, `Security Setup`