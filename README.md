# CSC302-Patient-Questionnaire

This application's purpose is to display FHIR Questionnaires, and submit them to a test FHIR server.

App is deployed [here](https://thoughtful-sticks-production.up.railway.app/)

# Assignment 3 documentation

Please find our

- [A2 Postmortem](Documentation/a2-postmortem.md)
- [A3 final features overview](Documentation/a3-features.md)

# Assignment 2 documentation

Please find our

- [A1 postmortem](Documentation/a1-postmortem.md)
- [A2 features to implement](Documentation/a2-features.md)
- [A2 milestone progress](Documentation/a2-milestones.md)

# How to navigate this repo

Please find our

- [team meeting notes](Documentation/team-meeting-notes.md),
- [ta meeting notes](Documentation/ta-meeting-notes.md),
- [industry partner meeting notes](Documentation/industry-partner-meeting-notes.md),
- [A1 postmortem](Documentation/a1-postmortem.md)
- [A2 features to implement](Documentation/a2-features.md)
- [A2 milestone progress](Documentation/a2-milestones.md)
- [Postmortem on A2](Documentation/postmortem-on-a2.md)
- [A3 final features overview](Documentation/a3-features.md)
- [tech stack discussion](Documentation/tech-stack.md) and
- [development roadmap](Documentation/development-plan.md) within the [Documentation](Documentation) directory.

Continue reading this README to see what commands to run to install our project on your machines.

### Tests

Please find our frontend component tests at:

- [App tests](app/test)

Please find our backend server tests at:

- [Backend tests](server/src/test)

# Getting Set Up

Once this repository has been cloned, ensure that you have Docker downloaded. If not, please download it for this step.

## Running the Application

To run our project, install [Docker](https://www.docker.com/) for your machine!

Then there are two options you can run our project with, with the [live HAPI FHIR test server]([http:](http://hapi.fhir.org/baseR4)) which has a lot of bad data and is extremely buggy or a local HAPI FHIR server with good data.

## Local HAPI Server
Start up the docker container
```
docker-compose -f local-fhir.yml up --build
```

Then you can goto (http://localhost:8080) and see the app's main page.

## Live HAPI Server
Start up the docker container
```
docker-compose -f live-fhir.yml up --build
```

Then you can goto (http://localhost:8080) and see the app's main page.

## Running Tests

Run the tests in the docker container.

```
docker-compose -f local-fhir.yml run --rm main npm run test
```
