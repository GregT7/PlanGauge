# Database Setup

## 📝 Task Overview
* Sprint: 6, 7
* Dates: June 24 - August 24 (2025)
* Status: Completed
* Story Points: 5
* Dependencies:
  * None
* Task Description: Design and setup the database with an efficient schema and cleaned data
* Expected Outcome: The database schema and cluster is established. The Supabase project and corresponding keys are secured but locally accessible. Lastly, data collected up until this point is cleaned and then inserted into the cluster.

---

## 🔧 Work

### ✅ Subtasks
- [x] Design SQL schema
- [x] Create Supabase account and project cluster
- [x] Design an ER diagram
- [x] Design relational schemas using a functional dependency diagram
- [x] Define the corresponding schemas on the Supabase cluster
- [x] Establish Row Level Security (RLS) with existing tables
- [x] Update excel sheet storing data with most recent timesheets
- [x] Clean and insert data to cluster
- [x] Store environment keys in a local environment file
- [x] Add environment file to .gitignore file

### 📘 Definition of Done
- [x] All data stored in the comprehensive excel data file is stored onto the Supabase cluster after cleaning
- [x] The stored data can be visually expected by visiting the Supabase website and logging in
- [x] The environment file contains keys that perfectly match the database keys provided on the Supabase website for the corresponding project cluster
- [x] The database schema is in BCNF (Boyce Codd Normal Form)
- [x] Inspect the supabase website to ensure RSL is turned on
- [x] GitHub is inspected to verify the env file is not uploaded
- [x] The functional dependency diagram and the ER diagram both match and reflect supabase's most up-to-date schema design
- [x] The functional dependency and ER diagrams are properly added to documentation (design.md)