# Requirements Specification

## 1. Realistic Plan Feedback
- FR-1.1: The application shall incorporate 'stat cards' for each day of the week based on the date tasks are intending to be worked on
- FR-1.2: The application shall include the following metrics on each stat card: category time ranges, duration sum, status
- FR-1.9: The time ranges of the stat cards shall be based on either predictions from a trained prediction model or manual input
- FR-1.9: The time ranges of the stat cards shall be specific to each unique day of the week
- FR-1.5: The application shall categorize the overall plan using the summed time duration and status count of the cards
- FR-1.9: The time ranges for the overall plan shall be based on either predictions from a trained statistical model or manual input
- FR-1.5: The application shall offer three different plan statuses: 'poor', 'moderate', or 'good'
- FR-1.6: The application shall use distinct colors corresponding to the three statuses to quickly convey the plan's condition
- FR-1.7: The application shall color the following components based on status categorization: submission button, stat cards, and status text
- FR-1.10: The contents and coloring of the status text and submission button shall be based on the categorization of the overall plan
- FR-5.3: The contents and coloring of each stat card is based on individual categorization

## 2. Efficient
- FR-5.69: The application shall use a trained prediction model for calculations related to time duration
- FR-5.69: The trained model shall estimate the duration length for each qualifying task
- FR-5.70: Each task shall qualify for time estimation if it's category is specific to a college course and has the following type: exam, quiz, homework, project
- FR-4.3: The trained model shall estimate the time ranges used to categorize the status of each stat card and the overall plan
- FR 1.D: The trained prediction model shall be used locally to quickly make predictions
- FR 1.4: The trained model shall achieve a mean absolute error evaluation of 15 minutes or less
- FR 1.x: The trained model shall achieve an R^2 value of 0.75 or greater
- FR 1.E: The application shall send an API post request to Notion, seamlessly updating a specific table used for time management
- FR 6.54: The application shall trigger the API post request using a button
- FR 1.X: The application automatically populates the estimated time column of the data table for that specific task as soon as both the class and assignment type has been entered

## 3. Aesthetics
- FR 1.D: Changes in color shall use animations
- FR 1.D: The application uses at least one modern styling technology
- FR 1.X: All stat cards shall be fully visible on the screen without scrolling
- FR 5.R: The styling of font, color, spacing, and components shall be consistent across the application

## 4. Convenience
- FR 1.x: The application shall make API requests to the connected database to check for any updates on launch
- FR 1.C: The trained prediction model shall be stored and retrieved instead of retrained upon launch if no database changes are detected
- FR 1.a: The application shall retrain and save the prediction model if any changes in the database have been detected
- FR 1.y: The application shall include a hover tooltip that displays historic metrics specific to the class and type of a specific task
- FR 1.a: The tooltip shall be triggered when the mouse's position overlaps with a row in the task entry data table that has the class and type already entered
- FR 1.E: The visuals on the page shall stay within the horizontal dimensions of the digital resolution 1920 x 1080 pixels, limiting scrolling to the vertical axis
- FR 1.X: All pages shall be directly accessible from one another
- FR 1.y: Settings data shall be retrieved and implemented upon launch
- FR 1.E: Changes made on the settings page shall automatically be saved

## 5. Control
- FR 1.x The application shall provide a settings page that manages desired configurations for the tool
- FR 1.X: The settings page shall provide the option to toggle the tool tip on and off
- FR 1.C: The settings page shall provide the option to use predicted time ranges or manually enter time ranges
- FR 1.C: The settings page shall provide an interface for entering time ranges for each day of the week and the week itself
- FR 1.D: The settings page shall provide an interface for changing the impact of stat cards on the status of the overall plan
- FR 1.F: Settings data shall be stored and retrieved locally in case the database connection fails

## 6. Notion-like
- FR 6.7: The application shall use a data entry table that corresponds to a specific table in Notion
- FR 5.6: The data entry table shall have the option to add and delete entries
- FR 4.5: Each cell in the data entry table shall be editable
- FR 6.3: The application shall map the domains of each column in the Notion table to the data entry table with their associated restrictions
- FR 3.4: The application shall employ the same dark mode aesthetic as my current Notion configuration

## 7. Responsive
- FR-1.2: The application shall update colors each time status changes
- FR-1.2: The application shall update relevant text each time the time summation changes
- FR 1.F: Hovering over the submit button shall trigger some visual change
- FR-1.6: The application shall display some temporary indicator showing the status of Notion API requests
- FR-1.6: The API request indicator shall disappear once the status has transitioned to a conclusive state: failure or success
- FR-1.8: The application shall display a temporary status indicator if any issues occur when setting up the prediction model

## 8. Stats & Manual Predictions
- FR 1.X: The application shall include a separate stats page for viewing
- FR 1.a: The stats page shall include a region for statistics grouped by class and assignment type
- FR 1.A: The grouped assignment region shall include a way to filter data by class
- FR 1.c: The stats page shall include the previous time sums grouped by week including predicted time vs actual time spent
- FR 1.d: The stats page shall include a region showing estimated time saved

## 9. Safety & Security
- FR 4.5: The application shall employ a short cooldown on the submission button immediately after activation to prevent excessive API calls
- FR 4.5: The application shall use hidden environment files stored locally to access private Notion API keys and MongoDB Atlas keys
- FR 3.5: The data on the MongoDB atlas database shall be stored in a uniform format to prevent calculation and handling errors
