# Project Overview Proposal

## 1. Proposed Project Name
Planning Assistance Tool

## 2. Elevator Pitch
Making plans and goals for the week is imperative for building the life I want to live. However, this process does not come without additional problems. Specifically, my proclivity for overestimating my capabilities and underestimating task durations causes me devise unfeasible plans. For these reasons, I want to devise a planning tool that will help me evaluate the feasibility of my goals while saving me time in the planning process. The planning tool will be a web application that allows me to input my objectives for the week while seamlessly updating my main workflow management application called Notion. While inputting my goals, the application will make data-driven estimations of the feasibility of my plans and provide feedback in real time. The data-driven estimations will be based on my previous performances and limited to school related tasks only.

## 3. Complexity of the Project
### 3.1 Frontend
The user will input data into a table that mimics Notion's "database" component. There will be cards corresponding to the days of the week that show the task duration sum of the currently existing entries in the database and the predicted allowable time limit range. These time ranges will be calculated specific to each day of the week. The cards will be colored green if the current time sum is within range, yellow if it's under range, and red if it exceeds the range. At the bottom of the screen, there will be a button that will send the data entries to the Notion API to sync my plan with my daily management app. Depending on the distribution of card statuses, the button will be some shade of green, yellow, or red to indicate the feasibility of the project. Technologies: React, Tailwind CSS

### 3.2 Backend
The backend will handle database requests and fetches for updating the ml prediction model, loading the model, predicting task durations, posting newly generated tasks to Notion through its API, and handling security for Notion and mongoDB Atlas API access. Lastly, some settings will be stored locally that will determine things like the allowable time ranges for each day of the week. Technologies: Flask, Notion API

### 3.3 Database
The database will store all of my productivity related information where I document my everyday tasks. The data stored here will be used to train the machine learning model. If any updates in the database is detected, the database will be queried to retrain the predictive model. Technologies: MongoDB Atlas

### 3.4 Task Duration Predictor
The machine learning model will be used to predict the time duration for the following school related tasks: labs, projects, homework assignments, quizzes, and exams. Models will be trained and then stored for future use to eliminate unnecessary training. The model will be retrained if new changes in the database have been detected.
Technologies: Scikit-learn

### 3.5 Deployment
The application will be easy to install and setup through docker's environment maintainability functionality.
Technologies: Docker

## 4. Predicted Architecture
![Image](https://github.com/user-attachments/assets/e1996ab0-0d2d-4613-a773-6977feaba994)
### 4.1 Frontend
Tailwind CSS will be used for a responsive and nicely styled web application. React will be used to handle flask API exchanges and for dynamically updating the web page.

### 4.2 Backend
Flask will be used to load the predictive model, query the database for new data, initiate model retraining, send task data to Notion API, initiate time prediction calculations, apply default settings, and send prediction data to the React app.

### 4.3 Database
MongoDB Atlas will be used to store, update, delete, and retrieve productivity data.

### 4.4 Task Duration Predictor
Scikit-learn will be used to train the prediction model. The prediction model will estimate individual task durations and a feasible work duration range.

### 4.5 Deployment
Docker will be used as a simple form of deploy to help with environment consistency.

## 5. Architecture Justification
- **Tailwind CSS:** provides responsive, nice styling for web applications, abundant examples and tutorials published on the internet
- **React:** popular framework, strong community support, good documentation
- **MongoDB Atlas:** cloud data management eliminates the need to launch or run a database every time the application is booted, free subscription plan with ample memory for application, offers easier app integration for future improvements.
- **Flask:** python library, easy to install and use, comprehensive use
- **Scikit-learn:** trains the model, good documentation and project examples, high ease of use
- **Docker:** offers consistency and portability, simplifies deployment and ongoing management

## 6. Predicted Life Cycle/Methodology
Since I am not working with a team and want to adapt to the software production industry, I will be using an informal methodology I've coined as "Solo-scrum". Solo-scrum will be an approximation of Scrum while missing the core-team element of the methodology. However, in place of a team, I will be receiving feedback by completing a standup meeting with my parents every working day (6 days a week). My Dad worked for the government as a project manager for roughly 10 years which makes his feedback especially helpful. I will still be completing daily standups, retrospectives, backlogs, and sprints. Furthermore, I will be maintaining proper documentation of the project including documents: minimum viable specifications, software development plan, project overview proposal, requirement specifications, and design specifications.

## 7. Notes
Over the past year and a half, I've been collecting data for a variety of different tasks. One of the metrics collected is task duration which is vital in considering when making plans for the week. More importantly, when grouped together, the amount of time spent planning per week can be summed, providing baseline metrics for future comparisons. This will allow for me to objectively determine the efficacy of the planning tool in regards to time reduction. The following stats were calculated on a dataset spanning from 8/14/2023 to 3/9/2025
* 43 weeks out of the 82 weeks included a plan
* statistics - time spent planning summed by week
  * average = 66 mins
  * median = 50 mins
  * standard deviation = 52.5 mins
  * min = 6 mins
  * max = 216 mins
