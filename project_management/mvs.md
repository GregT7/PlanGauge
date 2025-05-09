# Minimum Viable Specification (MVS)

## Goal
- Build a simple, local web app that allows a user to enter weekly tasks, get a predicted time estimate for each task, and receive visual feedback on the realism of their plan.
---

## Core Features
1. Task Table (Notion-like input)
* Basic table to add/edit/delete tasks with the following fields:
  * Task Name
  * Category (Health, Career, School)
  * Due (date)
  * Start (date)
  * Estimated Time (auto-filled by model)
* (From R-6.10 to R-6.12)

2. Time Prediction
* Local model to estimate task duration based on class and assignment type.
* Basic threshold for using model (only course-related work: homework, quiz, exam, project).
* (From R-2.10 to R-2.14)

3. Stat Cards by Day
* Display a card per day with:
  * Total planned time for that day
  * Status indicator: "Poor", "Moderate", "Good" (based on hardcoded or simple rule-based time thresholds)
  * Simple color (e.g., red/yellow/green) to indicate status
* (From R-1.10 to R-1.14, R-1.22 to R-1.23)

4. Plan Summary
* Overall plan rating based on all stat cards.
* Color-coded summary (red/yellow/green) shown at the top or bottom.
* (From R-1.20, R-1.30 to R-1.31)

5. Submit Button (Triggers API POST to Notion)
* Basic button to send the task list to a connected Notion table.
* Include success/failure indicator.
* (From R-2.20, R-2.21, R-7.30 to R-7.31)

## Non-functional Features
* Minimal styling using modern CSS framework (Tailwind or similar).
* Responsive layout for 1920x1080 screens (R-3.30, R-4.22).
* Prediction model pre-trained and loaded on launch (R-4.11).

## Safety Basics
* Use .env file for Notion/MongoDB API keys.
* (From R-9.20)

## For later versions (if time permits)
* Tooltips, animations, transitions (R-3.10, R-4.20)
* Settings page (R-5)
* Custom time ranges / manual entry mode (R-5.12, R-5.13)
* Full stats page (R-8)
* Automatic model retraining (R-4.12)
* API status cooldown (R-9.10)
* Full Notion schema mapping (R-6.13)