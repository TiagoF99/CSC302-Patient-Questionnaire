// import request from 'supertest';
import { validateQuestion } from '../lib/Questionnaire';

describe('Validation - Required', () => {
  test('Required with Valid Answer returns no error', () => {
    const question = {
      required: true,
      linkId: 0,
    };
    const values = {
      0: 'Answer',
    };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Required without Answer in Values returns an error', () => {
    const question = {
      required: true,
      linkId: '0',
    };
    const values = {};

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Required with Null Answer in Values returns an error', () => {
    const question = {
      required: true,
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Required with Undefined Answer in Values returns an error', () => {
    const question = {
      required: true,
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Required with Empty String Answer in Values returns an error', () => {
    const question = {
      required: true,
      linkId: '0',
    };
    const values = { 0: '' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - maxLength', () => {
  test('maxLength with Valid Answer returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = {
      0: 'Answer',
    };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength without Answer in Values returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = {};

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength with Null Answer in Values returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength with Undefined Answer in Values returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength with Empty String Answer in Values returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: '' };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength with Valid Number Answer in Values returns no error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: 123.4 };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('maxLength with too long Number Answer in Values returns an error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: 123456789.1 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('maxLength with too long string Answer in Values returns an error', () => {
    const question = {
      maxLength: 10,
      linkId: '0',
    };
    const values = { 0: 'Some Long Answer' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - display', () => {
  test('Display with an Answer returns an error', () => {
    const question = {
      type: 'display',
      linkId: '0',
    };
    const values = { 0: 'Answer' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Display with an Answer returns an error', () => {
    const question = {
      type: 'display',
      linkId: '0',
    };
    const values = {};

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });
});

describe('Validation - boolean', () => {
  test('Boolean with a boolean true Answer returns no error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: true };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Boolean with a boolean false Answer returns no error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: false };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Boolean with a string Answer returns an error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: 'Answer' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Boolean with a integer Answer returns an error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: 123 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Boolean with a decimal Answer returns an error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: 123.45 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Boolean with an undefined Answer returns no error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Boolean with a null Answer returns an error', () => {
    const question = {
      type: 'boolean',
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - decimal', () => {
  test('Decimal with a decimal Answer returns no error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: 123.45 };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Decimal with a integer Answer returns no error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: 123 };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Decimal with Infinity Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with -Infinity Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: -Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with a string Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: 'Answer' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with a boolean true Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: true };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with a boolean false Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: false };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with an undefined Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with a null Answer returns an error', () => {
    const question = {
      type: 'decimal',
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - integer', () => {
  test('Integer with an integer Answer returns no error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: 123 };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('Integer with a decimal Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: 123.45 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with Infinity Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Decimal with -Infinity Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: -Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Integer with a string Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: 'Answer' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Integer with a boolean true Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: true };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Integer with a boolean false Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: false };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Integer with an undefined Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('Integer with a null Answer returns an error', () => {
    const question = {
      type: 'integer',
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - string or text', () => {
  // 1MB long string
  const extremelyLongString = 'x'.repeat(10 * 1024 * 1024);

  test('String or Text with a string Answer returns no error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: 'Answer' };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('String or Text with a string Answer over 1MB in size returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: extremelyLongString };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with a integer Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: 123 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with Infinity Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with -Infinity Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: -Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with a boolean true Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: true };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with a boolean false Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: false };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with an undefined Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('String or Text with a null Answer returns an error', () => {
    const question = {
      type: 'string',
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

describe('Validation - url', () => {
  // 1MB long string
  const extremelyLongString = 'x'.repeat(10 * 1024 * 1024);

  test('URL with a valid URL Answer returns no error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: 'https://hapifhir.io/' };

    const errors = validateQuestion(question, values);
    // Expect no errors
    expect(Object.entries(errors).length).toBe(0);
  });

  test('URL with an invalid script Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    // eslint-disable-next-line no-script-url
    const values = { 0: 'javascript:alert(document.domain)' };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with an invalid decodeURI Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    // eslint-disable-next-line no-script-url
    const values = { 0: decodeURIComponent('JaVaScRiP%0at:alert(document.domain)') };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with a url Answer over 1MB in size returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: `https://hapifhir.io/${extremelyLongString}` };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with a integer Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: 123 };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with Infinity Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with -Infinity Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: -Infinity };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with a boolean true Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: true };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with a boolean false Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: false };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with an undefined Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: undefined };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });

  test('URL with a null Answer returns an error', () => {
    const question = {
      type: 'url',
      linkId: '0',
    };
    const values = { 0: null };

    const errors = validateQuestion(question, values);
    // Expect an error
    expect(errors).toHaveProperty(question.linkId);
  });
});

// TODO: Add tests for date, date-time, time, and choice
