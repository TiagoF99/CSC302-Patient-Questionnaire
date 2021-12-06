import Header from './../src/components/header/header';
import ErrorMessage from './../src/components/errorMessage/errorMessage';

/* These tests act as validation criteria for the acceptance criteria for the client-side UI form generation of Questionnaires 
with validation, type and error checking as defined in our documentation
https://github.com/TiagoF99/CSC302-Patient-Questionnaire/blob/main/Documentation/a3-features.md */

describe('test component divs', function () {
  it('header is div with correct inner message', () => {
    const comp = Header();
    expect(comp.type).toEqual('div');
    expect(comp.props.children).toEqual('FHIR Questionnaire');
  });

  it('errorMessage is div with correct inner message', () => {
    const comp = ErrorMessage();
    expect(comp.type).toEqual('div');
    expect(comp.props.children).toEqual('There was an issue loading the page. Please reload and try again.');
  });
});
