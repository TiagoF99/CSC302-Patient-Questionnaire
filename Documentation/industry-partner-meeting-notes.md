# Dream Team's Industry Partner Meeting Notes

## Industry partner
Our industry partner is Alex from Parajuniper

### Sept 30
 - Met async with the industry partner for our project and had him look over our milestones for the project to verify that it is both fair and realistic within the given time frame
     - He agreed that we set out a good plan for the rest of the semester and gave good tips for some of the stuff we wrote
     - Concluded that we will associate questionnaireResponses to hardcoded patients for now
     - He approved of our questionnaire pagination
       - We will query a set of 10 questionnaires amd allow people to choose one or select a new set of 10 questionnaires which will reduce server stress and app load times
     - Discussed external tools that currently exist and whether our project is really worth the effort if existing tools already do what we want to build
       - Tools
         - [https://lhcformbuilder.nlm.nih.gov/](https://lhcformbuilder.nlm.nih.gov/)
         - [http://smartqedit4.azurewebsites.net/Questionnaire](http://smartqedit4.azurewebsites.net/Questionnaire)
       - Industry partner confirmed that while certain tools do exist, and some do things of similar scope, they do not tackle our problem space exactly
       - Mentioned that there are opportunities for adding additional scope, if our project's scope becomes too small

### October 1
- Industry partner recommended some solid working projects to build on top of:
	- [https://github.com/asbi-cds-tools/questionnaire-to-survey](https://github.com/asbi-cds-tools/questionnaire-to-survey) which is used in [https://github.com/asbi-cds-tools/asbi-screening-app](https://github.com/asbi-cds-tools/asbi-screening-app)
	- Once again covered different aspects in the tools of what's worth building on top of, what is worth replacing, scopes, etc.
	- Gave us further confidence in our direction

### October 18
- Followed up with our industry partner to discuss some difficulties we have been having regarding converting a questionnaire object to a HTML form given all of its unique conditions
- Industry partner shared some usefull links around getting aquainted with the [FHIR community](https://chat.fhir.org/) and other useful links:
	- [Questionnaire-Populate](https://build.fhir.org/ig/HL7/sdc/OperationDefinition-Questionnaire-populate.html)
	- [Questionnaire-Community-Stream](https://chat.fhir.org/#narrow/stream/179255-questionnaire)
	- [Questionnaire-to-survey](https://github.com/asbi-cds-tools/questionnaire-to-survey)
