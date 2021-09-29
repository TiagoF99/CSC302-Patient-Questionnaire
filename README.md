# CSC302-Patient-Questionnaire
This application's purpose is to display FHIR Questionnaires, and submit them to a test FHIR server.

# How to navigate this repo
Please find our  [meeting notes](Documentation/meeting-notes.md), [tech stack discussion](Documentation/tech-stack.md) and [development roadmap](Documentation/development-plan.md) within the [Documentation](Documentation) directory.
Continue reading this README to see what commands to run to install our project on your machines.


# Getting Set Up
Once this repository has been cloned, ensure that you have Docker downloaded. If not, please download it for this step.

## Running the Application
To run our project, just run this command! It will make sure no docker image is left over as well
```
docker run --rm -it $(docker build -q .)
```

## Running Tests
We use Jest for our testing, and to run our tests, it's as simple as running
```
npm test
```
