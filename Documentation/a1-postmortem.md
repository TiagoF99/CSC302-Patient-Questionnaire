# Postmortem on A1

Here is our [development plan](development-plan.md)

## Q1. What goals have been achieved?

Based on what we had planned for milestones as part of A1, we successfully have completed all of Milestone 1 which includes setting up an initial landing page where users can select a questionnaire ID from a hardcoded list. We added the backend associated with retrieving the questionnaire from the server given an ID and a list of questionnaires that can be searched through by a user. We have also set up the initial testing infrastructure and some initial tests for this implementation.
Based on Milestone 2 we have built a page to render a form based on a questionnaire object pulled from the server which supports most of the FHIR fields. This includes some basic tests and validation on the frontend side. We also have set up backend verification of user submitted data and the construction of QuestionnaireResponse objects from user’s data and sending it to the HAPI server for validation and submission.
Lastly we have completed weekly meetings and have successfully been keeping meeting notes up to date as well as regular follow ups with our TA and industry partner.

## Q2. What goals have been missed, and by how much?

A major target of ours that we haven't achieved yet is writing thorough test cases. Although this wasn’t aligned with our original plan, we have shifted the focus of Milestone 1 and 2 to having a working prototype of the entire end to end user flow, from selecting a Questionnaire, rendering a form based on the Questionnaire, validating responses and creating a QuestionnaireResponse object.
We missed a goal in Milestone 2 to set up a search bar to search through questionnaires that the user can select from in the landing page. The reason for this is because we ran into some complications with the design of this feature. The issue is that, we’ve opted for an infinite scroll design for users to scroll through the (large) list of questionnaire ids we fetch from HAPI, but we can’t figure out how to integrate a search feature into a list of ids that we don't all fetch at once. This is something we’re planning to figure out for milestone 2.
Although we have a few tests written, we also missed our original intention of milestone 1 to have thorough tests completed for each functionality. This is still still a big priority on our minds and we will make sure to get it done by the next milestone.

## Q3. What, if any, adjustments or decisions need to be made in light of what we have learned about project scope and capacity, in particular what plans will need to be adjusted, based on remaining time available and project scope

We have had to make some adjustments to our goals. Given that we underestimated the complexity of questionnaire objects and in specific how many different fields and conditions the questionnaire objects have. We also underestimated the work it would take to validate the form values submitted given how many conditions there are. Therefore we have had to switch our prioritization for what we wanted to complete in A2 and focused on instead building a valid prototype of the entire end to end flow while still missing testing and edge cases in order to see what we need to prioritize for A3 and milestone 3.
However, when planning we gave ourselves breathing room during milestone 3 that we can now comfortably use to make up for the extra development time we would need and the increase in our planned project scope.
