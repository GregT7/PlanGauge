# Database Setup & Integration

## 📝 Task Overview
* Sprint: #6
* Dates: June 24 - ... (2025)
* Status: In Progress
* Story Points: #
* Dependencies:
  * Stat Card System: requested data formatting is more clearly defined
* Task Description: Setup database so that it contains cleaned data in a consistent, logical format and is ready to connect with the backend for data processing
* Expected Outcome: Database is ready to connect with the backend, data is all cleaned so queries won’t cause strange responses, a rough connection with the backend is secured

---

## 🔧 Work

### ✅ Subtasks
1. Audit and inventory raw data
- Review your collected productivity and task tracking data
- Identify key fields (e.g., name, category, date, duration, class info, etc.)
- Note any inconsistencies or formatting issues

2. Define cleaning and privacy rules
- List sensitive fields to remove or anonymize (e.g., notes, names)
- Set rules for handling missing or corrupted entries

3. Clean and preprocess data
- Apply filters, conversions, and normalization steps
- Output should be ready for ingestion into MongoDB

4. Design MongoDB schema with visual diagram
- Draft document structure for primary collections (e.g., tasks, logs, predictions)
- Define field types and relationships
- Use a tool like dbdiagram.io, Lucidchart, or draw.io

5. Verify existing MongoDB Atlas cluster setup
- Confirm cluster is active and accessible
- Check user roles, network access, and IP whitelist
- Ensure correct database and collections exist or can be created

6. Insert cleaned data
- Use pymongo or MongoDB Compass to batch-insert processed records
- Confirm insertion with sample queries

7. Create indexes for common queries
- Identify likely query patterns (e.g., by date, class, task type)
- Create single or compound indexes for those fields

8. Test access and security
- Connect using test credentials
- Verify access rules and IP whitelisting work as expected

9. Perform connectivity test with sample document
- Insert and retrieve a dummy task document using insertOne and findOne
- Prepare a working .env file with MONGO_URI for reuse
- Save a small Flask + pymongo connection script for backend integration testing

10. Write backend connection instructions
- Document required env variables, connection string format, and access steps
- Provide short code snippet (Flask/pymongo) to test connection

### 📘 Definition of Done
1. Raw data is inventoried and cleaned
- All relevant fields from your productivity/task dataset are identified
- Sensitive data is anonymized or removed
- Formatting and missing data issues are resolved

2. A visual MongoDB schema is created
- A document structure is defined and documented with a visual diagram
- The schema aligns with frontend needs (e.g., TaskTable fields)

3. MongoDB Atlas cluster is fully configured
- Cluster is confirmed active and accessible
- Network/IP settings are in place and tested
- Proper user roles and permissions are assigned

4. Cleaned data is inserted into the database
- Initial records are batch-inserted into the appropriate collection(s)
- Sample queries confirm successful storage

5. Query performance is considered
- Indexes are created for expected query patterns
- Index configuration is documented or visually tracked

6. Secure and verified access is in place
- Database can be accessed securely via connection string
- Test users and access controls work as intended

7. Connectivity is validated with real data
- A dummy task is inserted and retrieved using insertOne/findOne
- .env file is set up with a working MONGO_URI
- A small Flask script confirms the backend can access the DB

8. Backend connection instructions are complete
- Required connection details (URI, env setup, etc.) are documented
- Connection code snippet is available for backend integration