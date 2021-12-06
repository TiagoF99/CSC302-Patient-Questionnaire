import getField from './../src/components/formPage/questionnaireType';

/* These tests act as validation criteria for the acceptance criteria for the client-side UI form generation of Questionnaires 
with validation, type and error checking as defined in our documentation
https://github.com/TiagoF99/CSC302-Patient-Questionnaire/blob/main/Documentation/a3-features.md */

describe('test get Field', function () {
  it('test string field', () => {
    var item = {
      linkId: '1',
      text: 'test',
      type: 'string',
    };
    const res = getField(item, {}, {});
    expect(res.props).toEqual({ type: 'text', name: '1' });
  });

  it('test date field', () => {
    var item = {
      linkId: '1',
      text: 'test',
      type: 'date',
    };
    const res = getField(item, {}, {});
    expect(res.props).toEqual({ type: 'date', name: '1' });
  });

  it('test decimal field', () => {
    var item = {
      linkId: '1',
      text: 'test',
      type: 'decimal',
    };
    const res = getField(item, {}, {});
    expect(res.props.name).toEqual('1');
    expect(res.props.placeholder).toEqual('Decimal Value (ex. 2.25)');
  });
});
