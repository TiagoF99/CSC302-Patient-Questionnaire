# Dream Team's Meeting Notes

### Sept 20 - 24

- Discussed the preferred projects and submitted them ranked through top 3
    - Prioritized the health projects because of our preference to work with a 4th member
    - Wanted to be able to branch out on different technologies / areas of development
      -Patrick wanted to be able to learn more backend!
- Discussed preferred meeting times and locations for both the TA weekly meetings and to begin work on assignment 1
- Completed primer for FIHR and took notes on it for future reference
    - Learned that back-end development will likely center around the conversion of FHIR Questionnaire data into forms, and then converting the answers into QuestionnaireResponse format
    - We noticed that because of the type of work we’re doing, we will need to validate our solutions more.

### Sept 29
- Started work on Assignment 1:
    - Talked about team expectactions and roles
    - Discussed what the project is about and how we plan to solve the problem presented to us
    - Discussed a development plan that will feature three milestones that we will attempt to meet
    - Discussed a tech stack that the team is comfortable with and that will work well with the expectations of the project
- Decided that we will meet once a week to discuss team progress so that we can all align eachother on what we are each working on

### Sept 30
- Met with the TA to discuss:
    - How we as individuals are feeling about the course
    - If we have met to discuss A1 and team roles and expectations for future work and meetings
 - Met async with the industry partner for our project and had him look over our milestones for the project to verify that it is both fair and realistic within the given time frame
     - He agreed that we set out a good plan for the rest of the semester and gave good tips for some of the stuff we wrote 

### Oct 07
- Met with TA Julia:
    - Talked about A1 marking and what we can expect in terms of A2
    - Discussed how each group member felt about A1 and their own individual contributions and next steps
- Concerns:
    - Very similar open source tools already exist that do what we are trying to accomplish with this project. We do not think we will be able to build a better tool compared to those given we have such a limited amount of time.  

### Oct 13

- Reassessing and confirming goals/features discussed in a1
- Took a look at Formik docs, confirmed that it fits our use case
- Next steps:
    - Rishab will read up on FHIR
        - Complete by: Oct 20
    - Rish/Pat setup query to get Questionnaires and pass to frontend
        - Validate response from server
        - Test
        - Complete by: Oct 25
    - Kevin setup initial landing page and search bar/dropdown so user can select a questionnaire
        - Hardcode list of questionnaires at first until step 2 is complete
        - Complete by: Oct 27
    - Kevin: Integrate Questionnaire list using id’s from step 2
        - Test
        - Complete by: Oct 28
    - Rish/Pat setup query to get questionnaire based on ID selected by user in frontend 
        - Can be a hardcoded ID in beginning so not blocked 
        - Complete once step 4 is done
        - Complete by: Oct 31
    - Tiago: setup page to render form components based on questionnaire Object selected
        - Wait until 5 is completed 
        - Complete by: Nov 4

- Set up github issues for next steps: https://github.com/TiagoF99/CSC302-Patient-Questionnaire/issues
- Potentially important resources we found:	
https://docs.smarthealthit.org/client-js/
https://github.com/Vermonster/fhir-kit-client
