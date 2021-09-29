# CSC302-Patient-Questionnaire
This application's purpose is to display FHIR Questionnaires, and submit them to a test FHIR server.

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