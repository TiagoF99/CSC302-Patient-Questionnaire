# The Tech Stack

We have decided on:
- **React** for our frontend
- The **Formik** library
- **Node.js** with **Express** backend
- **Docker** for containerization
- **Jest** for testing

$~$

## Reasoning
The reasons we settled on this choice of tech stack, explained under the specific posed problems:
- *Your project has a client, with development experience and specific integration needs*
  - After talking to **Alex Goel**, we found out that **Purajuniper** uses the same stack we have chosen for our front and backend development
  - If they ever want to take over the project, it should be a much more straightforward process
  - We understand this isn’t a strict requirement but it’s just an added benefit. This was a big deciding factor for us.

$~$
- Your team is composed of people with varying degrees of expertise across various disciplines
  - Everyone on our team has experience with all technologies so we won’t have a single point of failure. We’ve specifically chosen the stack for this reason.

$~$
- Your team members have different workloads, schedules and educational goals.
  - We’ve all come to an agreement that despite busy schedules, we will come together at least once a week to sync up on this project
  - We’re splitting up the work based on who wants to learn what technology more

$~$
- Your team might have wildly divergent hardware, or access to different hardware, but you've still got to work together
  - This tech stack would work across our divergent hardware, specifically in that we are not dependent on a platform
  - Our choice to containerize our project using docker is so that anyone using any hardware/os can run our app

$~$
- Your team understands and has accounted for potential risks to this approach.
  - This is our strongest shared tech stack, so from a development perspective there is a reduced risk of facing technical hurdles
  - Using the Formik library will allow us to more easily render Questionnaires, and validate responses, at the added risk of the library having it's own issues, or eventually becoming obsolete/unsupported

$~$
## Additional reasoning
Quick setup time so we can get to work on implementation ASAP
- Lots of support for libraries and packages especially on the UI side of things
Jest was a no-brainer here as it’s the most popular and well supported testing library for JS projects.
