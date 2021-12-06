import { findItemWithId, generateDefaultValues } from './../src/components/formPage/formHelpers';

/* These tests act as validation criteria for the acceptance criteria for the client-side UI form generation of Questionnaires 
with validation, type and error checking as defined in our documentation
https://github.com/TiagoF99/CSC302-Patient-Questionnaire/blob/main/Documentation/a3-features.md */

describe('test for find item with Id', function () {
  it('test one item found', () => {
    var items = Array({
      linkId: '1',
      text: 'test',
      type: 'boolean',
    });

    const res = findItemWithId('1', items);
    expect(res).toEqual({ found: true, item: { linkId: '1', text: 'test', type: 'boolean' } });
  });

  it('test one item not found', () => {
    var items = Array({
      linkId: '1',
      text: 'test',
      type: 'boolean',
    });

    const res = findItemWithId('testing', items);
    expect(res).toEqual({ found: false, item: { linkId: '1', text: 'test', type: 'boolean' } });
  });

  it('test multiple items found', () => {
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
      },
    );

    const res = findItemWithId('1', items);
    expect(res).toEqual({ found: true, item: { linkId: '1', text: 'test', type: 'boolean' } });
  });

  it('test multiple items not found', () => {
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
      },
    );

    const res = findItemWithId('testing', items);
    expect(res).toEqual({ found: false, item: { linkId: '1', text: 'test', type: 'boolean' } });
  });

  it('test multiple items with embedded group item found', () => {
    var items = Array(
      {
        linkId: '1',
        text: 'test',
        type: 'boolean',
      },
      {
        linkId: '2',
        text: 'test',
        type: 'group',
        item: Array({
          linkId: '4',
          text: 'test',
          type: 'boolean',
        }),
      },
      {
        linkId: '3',
        text: 'test',
        type: 'boolean',
      },
    );

    const res = findItemWithId('4', items);
    expect(res).toEqual({ found: true, item: { linkId: '4', text: 'test', type: 'boolean' } });
  });
});

describe('test for generating default values', function () {
  it('test no items', () => {
    var items = Array();

    const res = generateDefaultValues(items);
    expect(res).toEqual({});
  });

  it('test one item', () => {
    var items = Array({
      linkId: '1',
      text: 'test',
      type: 'boolean',
    });

    const res = generateDefaultValues(items);
    expect(res).toEqual({ '1': '' });
  });

  it('test two items', () => {
    var items = Array(
      {
        linkId: '1',
        text: 'test',
        type: 'boolean',
      },
      {
        linkId: '2',
        text: 'test',
        type: 'decimal',
      },
    );

    const res = generateDefaultValues(items);
    expect(res).toEqual({ '1': '', '2': undefined });
  });

  it('test mulitple items with embedded group item', () => {
    var items = Array(
      {
        linkId: '1',
        text: 'test',
        type: 'boolean',
      },
      {
        linkId: '2',
        text: 'test',
        type: 'group',
        item: Array({
          linkId: '4',
          text: 'test',
          type: 'date',
        }),
      },
      {
        linkId: '3',
        text: 'test',
        type: 'decimal',
      },
    );

    const res = generateDefaultValues(items);
    expect(res).toEqual({ '1': '', '2': '', '3': undefined, '4': '2021-11-04' });
  });
});
