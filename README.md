# PlanGauge - Planning Assistance Tool
_Description_: PlanGauge is a full-stack planning assistant that helps users create, evaluate, and submit weekly plans through a clean, Notion-style interface. It visualizes plan feasibility using statistical metrics and dynamic color-coded feedback, then syncs finalized plans to connected Notion and Supabase databases via a Flask API.


<details>
  <summary>Table of Contents</summary>

  - [Overview](#overview)
  - [Project Structure](#project-structure)
  - [How to Install & Run](#how-to-install-&-run)
  - [How to Use Tool](#how-to-use-tool)
  - [How to Run Tools](#how-to-run-rools)
  - [Limitations](#limitations)
  - [Motivation & Inspiration](#motivation-&-inspiration)
  - [Reflection](#reflection)
  - [Acknowledgements](#acknowledgements)
</details>

## Overview
Describe:
- What the application does (task entry → feasibility categorization → Notion sync).  
- Mention testing coverage (unit, integration, E2E).  
- Tech Stack overview **and** brief reasoning for each major technology.  
- High-level architecture summary (React frontend + Flask backend + Supabase + Notion API).  
- Include a short paragraph on your **pseudo-Agile process** (Solo-Scrum).

## Project Structure
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

## How to Use tool
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