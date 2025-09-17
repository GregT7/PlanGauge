# 🧩 Minimum Viable Specification (MVS) – Weekly Planning Assistant

## 🎯 Goal
Build a local web application that enables users to input weekly tasks, assess feasibility based on personal work history, and receive visual feedback that helps plan realistic and achievable schedules.

---

## 🔑 Core Features

### 1. Task Entry Table
- Provide a Notion-like data table interface for entering weekly tasks.
- Input fields include: Task Name, Category, Type, Due Date, Start Date, and Time (in minutes).
- Table supports unlimited row addition, deletion, and cell editing.
- Selected rows are deselected when anything other than an additional checkbox is clicked.
- Display in dark mode aligned with Notion styling.
- A summation component adds up all currently entered values in the Time column, displayed immediately below the column and after the final row in the table.

### 2. Daily Feasibility Categorization
- Display 7 stat cards for each day of the week that include:
  - Day name  
  - Date  
  - Feasibility Status  
  - Time (sum)  
- The stat cards coloring reflects its status (Good: green, Moderate: orange, Poor: red).
- The stat cards `Time` field dynamically updates as new user input is entered.
- Stat card calculations are done efficiently using memoization.
- The dates on the stat cards correspond to the immediate next week.
- Retrieve historical time sum averages (`μ_d`) and standard deviations (`σ_d`) for each weekday.
- Categorize feasibility for each day using the statistics derived from historical data:  
  - Good: within 1σ of μ_d  
  - Moderate: within 2σ  
  - Poor: beyond 2σ  
- Display a status count component that includes an indicator of each feasibility category/status alongside the count value.

### 3. Feasibility Feedback System
- Display a container holding three different sections:
  - **Weekly Time Comparison Section**
    - Current plan time sum
    - Historical time sum average by week
    - Historical time sum standard deviation by week
    - Date range used to filter historical data for calculations
    - Weekly time sum feasibility
  - **Status Count Section**
    - Point legend
    - Point calculation
    - Status counts for all days
    - Status Count feasibility
  - **Evaluation Section**
    - Overall feasibility rating
    - Calculation used to calculate the feasibility
- Each individual subsection's outline color reflects its subsystem’s status.
- The feasibility of the weekly time sum is computed by comparing the current time sum with historical statistics using the same approach used for daily categorization.
- The status count feasibility is computed by using a point system where each status corresponds to a number of points and is multiplied against the count quantity, summed together, and compared to threshold ranges. *Thresholds are to be determined based on historical distribution.*
- The overall feasibility is computed using a combination of the status count feasibility and weekly time sum feasibility.

### 4. Submission System
- Include a submission button that sends data to a connected Notion table via POST request.
- Database is stored in the cloud for ease of use.
- Data is also stored to the database when the submission button is clicked.
- During a submission, the backend confirms the database and Notion database are synchronized.
- Provide visual confirmation of request success or failure.
- Style button dynamically to reflect weekly feasibility rating.
- Apply cooldown styling and delay between subsequent requests.
- **Sync Failure Handling**: Up to three total attempts are made to sync data. If all attempts fail, the user is notified of the sync issue. Nothing is deleted from the database, but the `synced_with_notion` attribute may remain `false`.

---

## ⚙️ Non-Functional Requirements
- Responsive layout for 1920x1080 screens without horizontal scrolling.
- Use TailwindCSS or similar for consistent, modern design.
- Store API credentials in a local `.env` file.

---

## 🧪 Safety and Feedback
- Button state and color change dynamically based on plan feasibility.
- All sensitive data (API keys, thresholds) is hidden and locally stored.
- When starting up the application, all external API endpoints are tested and the results are notified to the user.  
  - On failed attempts for each API endpoint, the application retries two additional times before stopping.  
- The stat cards coloring dynamically updates as time summation values change with user input.
- The status counts dynamically update as the user interacts with the application.
- Manages API error handling.
- The outline color of each major section reflects the current overall plan categorization.

---

## 🧪 Testing
- **Frontend**
  - Unit testing, Integration testing, Performance testing (focused on ensuring memoization and state updates do not cause unnecessary re-renders).
- **Backend**
  - Unit testing, Integration testing.
- **System**
  - End-to-end testing.

---

## 🚫 Deprioritized Features
- Linking plans to specific assignments.
- Time estimation autofill.  

*These features were born from scope creep, are time-consuming to implement, and do not align with the project’s new September 28th deadline. Priority is being placed on features that will strengthen the resume value of the project (e.g., Docker implementation, CI/CD pipeline setup). While these deprioritized features could improve personal usability, they will not provide the same career impact at this time.*

---

## 🧩 Example User Flow
1. User opens the application and adds weekly tasks into the Task Entry Table.  
2. Stat cards update automatically, showing daily feasibility statuses.  
3. The Feasibility Feedback System displays weekly statistics, status counts, and overall evaluation.  
4. The user reviews the plan’s feasibility and adjusts tasks as needed.  
5. Once satisfied, the user clicks the submission button.  
6. Data is saved to the cloud database and synced with Notion (up to three attempts).  
7. The application provides confirmation of success or a sync failure notification.  

---
