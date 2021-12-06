import checkItemEnabled from '../src/components/formPage/enableWhen/enableWhen';

/* These tests act as validation criteria for the acceptance criteria for the client-side UI form generation of Questionnaires 
with validation, type and error checking as defined in our documentation
https://github.com/TiagoF99/CSC302-Patient-Questionnaire/blob/main/Documentation/a3-features.md */

describe('test check enabled', function () {
  it('no enabler objects', () => {
    var res = checkItemEnabled(Array(), {});
    expect(res).toEqual({});
  });

  it('no enablers', () => {
    var items = Array({
      linkId: '1',
      text: 'test',
      type: 'boolean',
    });
    var res = checkItemEnabled(items, {});
    expect(res).toEqual({ '1': true });
  });

  it('1 enabler that is true', () => {
    var items = Array(
      {
        linkId: '1',
        text: 'test',
        type: 'boolean',
      },
      {
        linkId: '2',
        text: 'test',
        type: 'boolean',
        enableWhen: Array({
          question: '1',
          operator: '=',
          answerBoolean: false,
        }),
      },
    );
    var values = {
      '1': 'false',
    };
    var res = checkItemEnabled(items, values);
    expect(res).toEqual({ '1': true, '2': true });
  });

  it('1 enabler that is false', () => {
    var items = Array(
      {
        linkId: '1',
        text: 'test',
        type: 'boolean',
      },
      {
        linkId: '2',
        text: 'test',
        type: 'boolean',
        enableWhen: Array({
          question: '1',
          operator: '=',
          answerBoolean: false,
        }),
      },
    );
    var values = {
      '1': 'true',
    };
    var res = checkItemEnabled(items, values);
    expect(res).toEqual({ '1': true, '2': false });
  });
});
