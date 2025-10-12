# PlanGauge
_Description_: 

## Table of Contents
- have a toggle and hide links
- internal links to different parts of readme

## Overview
Describe:
- What the application does (task entry → feasibility categorization → Notion sync).  
- Mention testing coverage (unit, integration, E2E).  
- Tech Stack overview **and** brief reasoning for each major technology.  
- High-level architecture summary (React frontend + Flask backend + Supabase + Notion API).  
- Include a short paragraph on your **pseudo-Agile process** (Solo-Scrum).

## 💡 Motivation & Inspiration
**Problems:**
- Difficulty estimating task durations → unrealistic weekly plans.  
- Overreliance on GenAI for structure and accountability.  
- Limited time during your SWE course to apply Agile practically.  
- Desire to gain real project management experience before job hunting.

**Solutions:**
- Created your own pseudo-Agile environment (“Solo-Scrum”) to simulate a team setting.  
- Incorporated real planning data + machine learning for feasibility evaluation.  
- Used quizzes, documentation, and coding exercises to actively learn missing concepts.  

*(Optional: include a “What inspired this idea?” subsection about combining Notion workflow with data analysis.)*

## Project Storage Structure
- have a table of contents for different files like mvs.md and design.md
    - title + embedded link, role, description
- explain the project_management directory + the project_journal directory

## How to Install & Run
- consider:
    - 1. creating a separate file
        - writing a brief description in place here
        - add a link to detailed file
    - 2.
        - adding a dependencies section (Notion, Supabase account)

## How to Use
- Explain the goal is to enter tasks into the task table and then use the feasibility categorizations to edit plans to make them mroe realistic and then send data to Notion DB when satisfied

## How to Run Tests
- pytest, vitest, playwright
- snapshot tests likely to fail
- need to install playwright, install and run from right location

## Limitations
- a lot of the database schema currently has no use
- everything is done through testing servers / no deployment
- etc

## Reflection
- what did i learn about software engineering
- biggest challenges/wins
- what would i do differently?

## Acknowledgements
- parents, Dr. Raymer, uncle steve, Cogan Shimizu, swe peers