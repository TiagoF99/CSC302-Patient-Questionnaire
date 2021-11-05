## Features to Implement

A description of the features your project intends to implement (or next steps that you need to pursue) with sub-tasks prioritized. These descriptions should involve:

Our overall goal with the features we have so far is to get a working prototype with all of the necessary but incomplete requirements to have a user go through the full flow of our webapp.

0. Team: Investigate the FHIR documentation

   - **Rationale** : We need to understand how the FHIR API works and the details around a Questionnaire object and how to retrieve, validate, and submit them before we begin coding our project.
   - **Acceptance criteria:** We feel ready to start working on the backend logic that works with FHIR.
   - **Complete by:** Oct 20

1. Rishab: Setup query to get Questionnaires and pass to frontend

   - Setup the backend API that will retrieve a list of questionnaires from the FHIR server that can be searched and filtered through by the user
   - Validate response from server
   - **Rationale** : We need to be able to retrieve a list of questionnaires that the user can select from so that we then know which questionnaire to render as a form.
   - **Acceptance criteria:** Validate by passing along the api response from FHIR (questionnaire page) and verifying that the result is what we expect.
   - **Complete by:** Oct 25

2. Kevin: Setup initial landing page and search bar/dropdown so user can select a questionnaire

   - Setup the initial landing page that the user will come into when visiting our webapp
   - Add a search bar functionality that the user can search for questionnaires from
   - Hardcode list of questionnaires at first until step 2 is complete
   - **Rationale:** We need to setup the frontend so users have a way to actually select a questionnaire based on a list of them so that we know which form to render
   - **Acceptance criteria:** Validate by checking that there is an initial landing page that users can select from the dropdown and forward the selected id to the backend.
   - **Complete by:** Oct 27

3. Kevin: Integrate Questionnaire list using id from step 2

   - Query for questionnaires using the backend functionality given and integrate this into the frontend
   - Test
   - **Rationale:** We need to have a way for the user to actually select a questionnaire based on a list of them so that we know which form to render
   - **Acceptance criteria:** All questionnaire ids from fhir can be accessed from the UI.
   - **Complete by:** Oct 28

4. Patrick: Setup query to get questionnaire based on ID selected by user in frontend

   - Setup the API method that will query from the FHIR server for the questionnaire object of the passed in ID.
   - Can be a hardcoded ID in beginning so not blocked
   - **Rationale** : We need the backend functionality to actually get a questionnaire object based on the questionnaire selected in the landing page
   - **Acceptance criteria:** Validate by passing along the api response from FHIR (questionnaire page) and verifying it returns the correct results.
   - **Complete by:** Oct 31

5. Tiago: Setup frontend to render form components based on a Questionnaire object with client-side validation

   - Create a page to get the questionnaire object using the backend code completed above and render the object as a form in the frontend that the user can fill out and submit.
   - This comes with parsing the questionnaire object correctly and making sure we abide by all of the rules and attributes that come along with it
   - Basic frontend validation of user submitted values and testing for the necessary features
   - **Rationale** : We need to let users fill out the selected server so that we can send send their response back to the FHIR server
   - **Acceptance criteria:** Validate by checking that given any questionnaire, it appears in the UI as a form with the correct fields and attributes and can be filled out
   - **Complete by:** Nov 4

6. Rishab/Patrick: Set up validation of user responses on backend

   - **Rationale:** Need to validate user&#39;s response on backend before sending to FHIR server in case an issue occurs
   - **Acceptance criteria:** Can validate improper forms submitted on frontend in the backend
   - **Complete by:** Nov 4

7. Rishab: Construct QuestionnaireResponse from user data and send it to FHIR server

   - **Rationale:** FHIR needs a valid QuestionnaireResponse object to ingest user&#39;s response to a Questionnaire
   - **Acceptance criteria** : Entire end-to-end flow works, a form user submits on the frontend is validated both on the client and the backend, a valid QuestionnaireResponse is created, the FHIR server validates and accepts the QuestionnaireResponse.
   - **Complete by:** Nov 4
