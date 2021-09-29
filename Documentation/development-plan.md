# Development Plan


## Immediate next steps:
Tiago Ferreira:
- Select a random assortment of questionnaire types that will be selectable to the user

Rishab Luthra:
- Set up the required express js code to initialize the server

Kevin Ge:
- Start figuring out React components for the initial landing page where users can select a questionnaire type 

Patrick Vuscan:
-	Verify the express server works by calling the FHIR api.



## Milestone 1

### Main idea:
- Setup a list of a few random questionnaire types, randomly selected by us (using hardcoded questionnaire ids from this endpoint: ) so that the user can choose from
- Build an initial landing page where users can select a questionnaire type (with an ID)
- Be able to call the FHIR API using our express backend to retrieve any FHIR Questionnaire in JSON, using the inputted “questionnaire ID”
- Validate the Response from the server Make sure the FHIR Json is valid
- Write tests for both the front-end and backend 

### Project Member Responsibilities:


Kevin Ge & Tiago Ferreira: 
- Work together to build out the initial landing page where users can select a questionnaire type (with an ID)
    - This will involve setting up the list of random questionnaire types that users can select from
- Develop a user friendly landing page with a drop down that users can both select from, and search different questionnaire types
- Setup frontend tests for the newly added functionality 

Rishab Luthra & Patrick Vuscan:
- Work together to set up the express/node backend to be able to send and receive calls from the FHIR server. Once setup, send an initial call to the FHIR API to retrieve the selected FHIR Questionnaire using the ‘questionnaire ID’ the user selected
- Setup tests for the backend for the newly added functionality



## Milestone 2

### Main idea:
- Build a page to render the questionnaire from the selected type and allow users to fill it out. This will involve creating the right React components to represent the structure of FHIR questionnaire object.
- Backend verification of user submitted data(based on constraints).
- Write tests for both the front-end and backend using Jest.

### Project Member Responsibilities:

Patrick Vuscan & Rishab Luthra: 
- Work together to build backend verification of user submitted data (based on constraints) to fit with the QuestionnaireResponse object type
- Write tests for this new functionality.

Kevin Ge & Tiago Ferreira: 
- Pair to build the questionnaire form and all corresponding React components based on the structure of the FHIR’s questionnaire object.
- This will be a new page that the user is redirected to once they have selected a questionnaire type.  
- Implement the functionality to send the inputted data to the backend.
- Write tests for this new functionality


## Milestone 3

### Main idea:
- Containerize our app using Docker
- Create a QuestionnaireResponse type object using the inputted data from the user and send a final request to the server to submit the object data using HAPI
- Create final documentation and cleanup the project
- Add styling to the webapp to make it more accessible and user friendly

### Project Member Responsibilities:

Patrick Vuscan and Rishab Luthra: 
- Pair to create a QuestionnaireResponse type object using the inputted data from the user and send a final request to the server to submit the object data
- Pair to containerize the application using Docker so that the webapp and server and required dependencies are all built out with a simple command

Kevin Ge & Tiago Ferreira: 
- Create any final documentation that will be useful to the user
- Cleanup both the project code and web application as well as add additional styling to the webapp to make it more accessible and user friendly


