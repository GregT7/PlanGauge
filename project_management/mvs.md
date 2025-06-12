# 🧩 Minimum Viable Specification (MVS) – Weekly Planning Assistant

## 🎯 Goal
Build a local web application that enables users to input weekly tasks, assess feasibility based on personal work history, and receive visual feedback that helps plan realistic and achievable schedules.

---

## 🔑 Core Features

### 1. Task Entry Table
- Provide a Notion-like data table interface for entering weekly tasks.
- Input fields include: Task Name, Category, Due Date, Start Date, and Time (in minutes).
- Table supports unlimited row addition, deletion, and cell editing.
- Enforce domain constraints and input validation based on Notion schema.
- Automatically resize to fit content and maintain accessibility.
- Display in dark mode aligned with Notion styling.

### 2. Daily Feasibility Categorization
- Calculate daily time totals based on tasks scheduled for each day.
- Retrieve historical averages (`μ_d`) and standard deviations (`σ_d`) for each weekday.
- Categorize feasibility as:
  - Good: within 1σ of μ_d
  - Moderate: within 2σ
  - Poor: beyond 2σ
- Show each day's status via a color-coded stat card (green, yellow/orange, red).

### 3. Weekly Plan Summary
- Compute total planned time for the week (`T_week`).
- Count number of Good/Moderate/Poor statuses across all days.
- Derive weekly feasibility rating using a heuristic combining `T_week` and daily counts.
- Display summary with matching color/style in a top/bottom plan summary component.

### 4. Submission System
- Include a submission button that sends data to a connected Notion table via POST request.
- Provide visual confirmation of request success or failure.
- Style button dynamically to reflect weekly feasibility rating.
- Apply cooldown styling and delay between subsequent requests.

---

## ⚙️ Non-Functional Requirements
- Responsive layout for 1920x1080 screens without horizontal scrolling.
- Use TailwindCSS or similar for consistent, modern design.
- Store API credentials in a local `.env` file.

---

## 🧪 Safety and Feedback
- Tooltip and visual feedback update in real time as tasks are changed.
- Button state and color change dynamically based on plan feasibility.
- All sensitive data (API keys, thresholds) is hidden and locally stored.

---

## 🌱 Stretch Features (Future Work)
- Settings page for toggling tooltips, customizing time thresholds, or adjusting weighting logic.
- Stats page to display weekly trends and class-specific breakdowns.
- Export option for saving weekly plans as PDF or CSV.
- Toggle between historical-based feasibility vs. manual time ranges.
