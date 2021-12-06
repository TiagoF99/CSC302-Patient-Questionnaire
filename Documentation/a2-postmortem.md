# Postmortem on A2

Here is our [development plan](development-plan.md)

Our main focus for A3 after A2 included a few items.

1. We aimed to finish the users landing page. This required adding both the search and infinite scrolling capabilities. We were able to successfully complete the Infinite scrolling and successfully tested it. However, we had to pivot our originally planned search feature where users could search for a questionnaire based on its title or description to a manual input form where users can access a questionnare directly through the id. This was because we realized that there isn't an existing FHIR api to help faciliate this and building a search api would require more time than we had since we wanted to prioritize testing and documentation. Futhermore, it would make sense for users to have the id of the questionnare they wanted to access so having a textbox to do that would be user-friendly. 


2. We aimed to add testing for both the frontend and backend components. We were successfully able to fully test our frontend and backend components and functions. Due to time constraints, tests were prioritized over other features/improvements because we felt it was more important to a successful product and for the development cycle.

3. We aimed to clean up and polish the frontend UI and documentation. We also were able to complete this by improving the UI elements to make it more appealing and user friendly and by improving our README and A3 docs to make it easier to navigate.

4. We aimed to add validation and error checking for the submitted questionnaire data both in the frontend and in the backend. We were able to add more validation and type checks for the submitted data in both the frontend and backend but were not able fully complete all of the rule and type validations due to the sheer complexity of the Questionnaire FHIR requirements. There were alot of different types and conditions that the HAPI API introduced and due to the complexity and inconsistency of the data, it was very hard for us to cover all of the edge cases. It was even harder for us to find good resources out there that could help with this. We had to move away from this after establishing a working product that works for most questionnaires that we came across and move towards focusing on completing documentation and testing.

We have completed weekly meetings and have successfully been keeping meeting notes up to date as well as regular follow ups with our TA and industry partner.

Overall, looking back at our original development plan, we have been able to complete our overall goal which was to provide a working end-to-end product where users can select a questionnaire and fill it out and then submit that questionnaire while also providing documentation and tests to support the functionality. We of course had to switch our prioritization to meet assignment deadlines and had to adjust certain features throughout the term, but it is all a part of the process!
