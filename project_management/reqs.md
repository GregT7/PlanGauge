# Requirements Specification

## 1. Realistic Plan Feedback
- R-1.10: The application shall incorporate 'stat cards' for each day of the week based on the date tasks are intending to be worked on
- R-1.11: The application shall include the following metrics on each stat card: category time ranges, duration sum, status
- R-1.12: The time ranges of the stat cards shall be based on either predictions from a trained prediction model or manual input
- R-1.13: The time ranges of the stat cards shall be specific to each unique day of the week
- R-1.14: The contents and coloring of each stat card is based on individual categorization
- R-1.20: The application shall categorize the overall plan using the summed time duration and status count of the cards
- R-1.21: The time ranges for the overall plan shall be based on either predictions from a trained statistical model or manual input
- R-1.22: The application shall offer three different plan statuses: 'poor', 'moderate', or 'good'
- R-1.23: The application shall use distinct colors corresponding to the three statuses to quickly convey the plan's condition
- R-1.30: The application shall color the following components based on status categorization: submission button, stat cards, and status text
- R-1.31: The contents and coloring of the status text and submission button shall be based on the categorization of the overall plan

## 2. Efficient
- R-2.10: The application shall use a trained prediction model for calculations related to time duration
- R-2.11: The trained model shall estimate the duration length for each qualifying task
- R-2.12: Each task shall qualify for time estimation by the prediction model if it's category is specific to a college course and has the following type: exam, quiz, homework, project
- R-2.13: The trained model shall estimate the time ranges used to categorize the status of each stat card and the overall plan
- R-2.14: The trained prediction model shall be used locally to quickly make predictions
- R-2.15: The trained model shall achieve a mean absolute error evaluation of 15 minutes or less
- R-2.16: The trained model shall achieve an R^2 value of 0.75 or greater
- R-2.20: The application shall send an API post request to Notion, seamlessly updating a specific table used for time management
- R-2.21: The application shall trigger the API post request using a button
- R-2.30: The application automatically populates the estimated time column of the data table for that specific task as soon as both the class and assignment type has been entered

## 3. Aesthetics
- R-3.10: Changes in color shall use animations
- R-3.20: The application uses at least one modern styling technology
- R-3.30: All stat cards shall be fully visible on the screen without scrolling
- R-3.40: The styling of font, color, spacing, and components shall be consistent across the application

## 4. Convenience
- R-4.10: The application shall make API requests to the connected database to check for any updates on launch
- R-4.11: The trained prediction model shall be stored and retrieved instead of retrained upon launch if no database changes are detected
- R-4.12: The application shall retrain and save the prediction model if any changes in the database have been detected
- R-4.20: The application shall include a hover tooltip that displays historic metrics specific to the class and type of a specific task
- R-4.21: The tooltip shall be triggered when the mouse's position overlaps with a row in the task entry data table that has the class and type already entered
- R-4.22: The visuals on the page shall stay within the horizontal dimensions of the digital resolution 1920 x 1080 pixels, limiting scrolling to the vertical axis
- R-4.30: All pages shall be directly accessible from one another
- R-4.40: Settings data shall be retrieved and implemented upon launch
- R-4.41: Changes made on the settings page shall automatically be saved

## 5. Control
- R-5.10 The application shall provide a settings page that manages desired configurations for the tool
- R-5.11: The settings page shall provide the option to toggle the tool tip on and off
- R-5.12: The settings page shall provide the option to use predicted time ranges or manually enter time ranges
- R-5.13: The settings page shall provide an interface for entering time ranges for each day of the week and the week itself
- R-5.14: The settings page shall provide an interface for changing the impact of stat cards on the status of the overall plan
- R-5.15: Settings data shall be stored and retrieved locally in case the database connection fails

## 6. Notion-like
- R-6.10: The application shall use a data entry table that corresponds to a specific table in Notion
- R-6.11: The data entry table shall have the option to add and delete entries
- R-6.12: Each cell in the data entry table shall be editable
- R-6.13: The application shall map the domains of each column in the Notion table to the data entry table with their associated restrictions
- R-6.20: The application shall employ the same dark mode aesthetic as my current Notion configuration

## 7. Responsive
- R-7.10: The application shall update colors each time status changes
- R-7.11: The application shall update relevant text each time the time summation changes
- R-7.20: Hovering over the submit button shall trigger some visual change
- R-7.30: The application shall display some temporary indicator showing the status of Notion API requests
- R-7.31: The API request indicator shall disappear once the status has transitioned to a conclusive state: failure or success
- R-7.32: The application shall display a temporary status indicator if any issues occur when setting up the prediction model

## 8. Stats & Manual Predictions
- R-8.10: The application shall include a separate stats page for viewing
- R-8.11: The stats page shall include a region for statistics grouped by class and assignment type
- R-8.12: The grouped assignment region shall include a way to filter data by class
- R-8.13: The stats page shall include the previous time sums grouped by week including predicted time vs actual time spent
- R-8.14: The stats page shall include a region showing estimated time saved

## 9. Safety & Security
- R-9.10: The application shall employ a short cooldown on the submission button immediately after activation to prevent excessive API calls
- R-9.20: The application shall use hidden environment files stored locally to access private Notion API keys and MongoDB Atlas keys
- R-9.30: The data on the MongoDB atlas database shall be stored in a uniform format to prevent calculation and handling errors
