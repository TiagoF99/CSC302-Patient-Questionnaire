import Header from './../src/components/header/header';
import ErrorMessage from './../src/components/errorMessage/errorMessage';


describe('test component divs', function() {
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
})