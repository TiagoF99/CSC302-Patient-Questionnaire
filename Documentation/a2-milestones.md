# Milestone Progress

Demonstrated progress towards one or two of your next milestones. Demonstrating progress includes:

- Clarity from your industry partner about what constitutes success in this milestone, in a paragraph.

Tbd: tiago will add this to meeting notes once he responds...

- Each team member's responsibilities for reaching the milestone, with a status (complete, in progress, not started)

## Milestone 1:

1. **Team:** Investigate the FHIR Documentation

   - **Completed on: Oct 20**

2. **Rishab:** Setup query to get Questionnaires and pass to frontend

   - Validate response from server
   - **Completed on: Oct 25**

3. **Kevin:** Setup routing for frontend

   - Hardcode list of questionnaires at first until step 2 is complete
   - **Completed on: Oct 27**

4. **Kevin:** Setup initial landing page and search bar/dropdown so user can select a questionnaire

   - Hardcode list of questionnaires at first until step 2 is complete
   - **Completed on: Oct 27**

5. **Kevin** : Integrate Questionnaire list using id from step 2

   - Test
   - **Blocked due to needing to design a way to get questions from FHIR in a suitable manner.**

6. **Patrick:** Setup query to get questionnaire based on ID selected by user in frontend

   - Can be a hardcoded ID in beginning so not blocked
   - **Completed on: Oct 31**

## Milestone 2:

1. **Tiago** : Setup page to render form components based on questionnaire Object selected

   - **Completed on: Nov 4**

2. **Rishab/Patrick** : Set up validation of user responses on backend.

   - Only validated the most common types right now, creation and submission working fully, no tests written.
   - **Completed on: Nov 3**

3. **Rishab** : Construct QuestionnaireResponse from user data and send it to FHIR server.

   - Only can construct QuestionnaireResponse for the most common types right now, creation and submission working fully, no tests written
   - Full end to end flow working for certain questionnaires
   - **Completed on: Nov 3**

## Validation Process:

We will know that we have completed the milestone fully once we have completed all of the intended features that we set out to complete. This will include both frontend testing and integration testing to validate it all works correctly. We will also validate our progress with our industry partner to make sure our work is on the right track and progress matches what we have set out to complete.
