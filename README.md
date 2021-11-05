# CSC302-Patient-Questionnaire

This application's purpose is to display FHIR Questionnaires, and submit them to a test FHIR server.

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
- [tech stack discussion](Documentation/tech-stack.md) and
- [development roadmap](Documentation/development-plan.md) within the [Documentation](Documentation) directory.

Continue reading this README to see what commands to run to install our project on your machines.

# Getting Set Up

Once this repository has been cloned, ensure that you have Docker downloaded. If not, please download it for this step.

## Running the Application

To run our project, install [Docker](https://www.docker.com/) for your machine!

Start up the docker container

```
docker-compose up --build
```

Then you can goto (http://localhost:8080) and see the app's main page.

## Running Tests

Run the tests in the docker container.

```
docker-compose -p tests run --rm main npm run test
```
