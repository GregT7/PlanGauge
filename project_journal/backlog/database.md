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
1. Design SQL schema
2. Create Supabase account and project cluster
3. Design an ER diagram
4. Design relational schemas using a functional dependency diagram
5. Define the corresponding schemas on the Supabase cluster
6. Establish Row Level Security (RLS) with existing tables
7. Update excel sheet storing data with most recent timesheets
8. Clean and insert data to cluster
9. Store environment keys in a local environment file
10. Add environment file to .gitignore file

### 📘 Definition of Done
1. All data stored in the comprehensive excel data file is stored onto the Supabase cluster after cleaning
2. The stored data can be visually expected by visiting the Supabase website and logging in
3. The environment file contains keys that perfectly match the database keys provided on the Supabase website for the corresponding project cluster
4. The database schema is in BCNF (Boyce Codd Normal Form)
5. Inspect the supabase website to ensure RSL is turned on
6. GitHub is inspected to verify the env file is not uploaded
7. The functional dependency diagram and the ER diagram both match and reflect supabase's most up-to-date schema design
8. The functional dependency and ER diagrams are properly added to documentation (design.md)