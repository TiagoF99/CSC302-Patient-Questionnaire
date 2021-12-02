const { sanitizeUrl } = require('@braintree/sanitize-url');

// Good future idea: add another level of validation/sanitization using Validatorjs

const safeStringRegx = /[ \r\n\t\S]+/;
const dateRegx = /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/;
const dateTimeRegx =
  /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/;
const timeRegx = /([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/;

// Method to validate questionnaire item, based on it's type, and other
// properties on the questionnaire item
const validateQuestion = (question: any, values: any) => {
  const errors: any = {};

  if (
    question.required &&
    (!(question.linkId in values) ||
      values[question.linkId] === '' ||
      values[question.linkId] === undefined ||
      values[question.linkId] === null)
  ) {
    // required
    errors[question.linkId] = 'This field requires a non-empty answer.';
  } else if (
    'maxLength' in question &&
    values[question.linkId] && // If there is no value, no need to check length
    !(
      values[question.linkId] === undefined || // If value is null/undefined, not meant to be checked
      values[question.linkId] === null
    ) &&
    String(values[question.linkId]).length > question.maxLength
  ) {
    // maxlength
    errors[question.linkId] = `This field is over max length of ${question.maxLength}`;
  } else if (question.type === 'display' && values[question.linkId]) {
    // display
    errors[question.linkId] = `This field should not have an answer.`;
  } else if (
    question.type === 'boolean' &&
    typeof values[question.linkId] !== 'boolean' &&
    values[question.linkId] !== 'true' &&
    values[question.linkId] !== 'false'
  ) {
    // boolean
    errors[question.linkId] = `This field requires a boolean answer.`;
  } else if (
    (question.type === 'decimal' || question.type === 'quantity') &&
    (typeof values[question.linkId] !== 'number' ||
      values[question.linkId] === Infinity ||
      values[question.linkId] === -Infinity)
  ) {
    // decimal or quantity
    errors[question.linkId] = `This field is not a decimal.`;
  } else if (
    question.type === 'integer' &&
    (typeof values[question.linkId] !== 'number' ||
      values[question.linkId] % 1 !== 0 ||
      values[question.linkId] === Infinity ||
      values[question.linkId] === -Infinity)
  ) {
    // integer
    errors[question.linkId] = `This field is not an integer.`;
  } else if (
    (question.type === 'string' || question.type === 'text') &&
    (typeof values[question.linkId] !== 'string' ||
      safeStringRegx.test(values[question.linkId]) === false || // This part ensures no weird string inputs
      values[question.linkId].length >= 1048576 - 1) // I believeThis verifies string is < 1MB, including terminating character
  ) {
    if (typeof values[question.linkId] === 'number') {
      // values[question.linkId] = String(values[question.linkId]);
      errors[question.linkId] = `This field is a number instead of a string. Try casting it to a string instead!`;
    } else {
      // string or text
      errors[
        question.linkId
      ] = `This field is not a string containing only accepted unicode characters, and below 1MB in size.`;
    }
  } else if (
    question.type === 'url' &&
    (typeof values[question.linkId] !== 'string' ||
      sanitizeUrl(values[question.linkId]) !== values[question.linkId] ||
      values[question.linkId].length >= 1048576 - 1)
  ) {
    // url
    errors[question.linkId] = `This field is not a valid/safe url.`;
  } else if (
    question.type === 'date' &&
    (dateRegx.test(values[question.linkId]) === false || Number.isNaN(Date.parse(values[question.linkId])) === true)
  ) {
    // date
    errors[
      question.linkId
    ] = `This field is not a valid date of the format YYYY, YYYY-MM, or YYYY-MM-DD. No timezone should be added.`;
  } else if (question.type === 'dateTime' && Number.isNaN(Date.parse(values[question.linkId])) === true) {
    // dateTime
    if (dateTimeRegx.test(values[question.linkId]) === false) {
      // ! TODO: Reassign the value here, if it's missing certain aspects but it otherwise is a valid datetime
      try {
        // values[question.linkId] = (new Date(values[question.linkId])).toLocaleString();
      } catch (error) {
        errors[
          question.linkId
        ] = `This field is not a valid date-time of the format YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz. ${error}`;
      }
    } else {
      errors[
        question.linkId
      ] = `This field is not a valid date-time of the format YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz.`;
    }
  } else if (
    question.type === 'time' &&
    (timeRegx.test(values[question.linkId]) === false || Number.isNaN(Date.parse(values[question.linkId])) === true)
  ) {
    // time
    errors[question.linkId] = `This field is not a valid time of the format hh:mm:ss. No timezone should be added.`;
  } else if (question.type === 'choice') {
    // choice
    let foundChoice = false;

    for (let i = 0; i < question.answerOption.length; i += 1) {
      if ('valueInteger' in question.answerOption) {
        if (question.answerOption.valueInteger === values[question.linkId]) {
          foundChoice = true;
        }
      } else if ('valueDate' in question.answerOption) {
        if (question.answerOption.valueDate === values[question.linkId]) {
          foundChoice = true;
        }
      } else if ('valueTime' in question.answerOption) {
        if (question.answerOption.valueTime === values[question.linkId]) {
          foundChoice = true;
        }
      } else if ('valueString' in question.answerOption) {
        if (question.answerOption.valueString === values[question.linkId]) {
          foundChoice = true;
        }
      } else if ('valueCoding' in question.answerOption) {
        if (question.answerOption.valueCoding === values[question.linkId]) {
          foundChoice = true;
        }
      }
    }

    if (!foundChoice) {
      errors[question.linkId] = `The choice chosen is not one of the accepted options`;
    }
  }

  // ! TODO: "enableWhen" not implemented - question should have no data when not enabled
  // See ~/app/src/components/formpage/enableWhen.tsx for example of interaction with
  // "enableWhen" in frontend, for guidance on how to implement this

  return errors;
};

// Validates a questionnaire, by going through all items, validating them one
// at a time. If a questionnaire item contains group items itself, it recurses through
// those items as well, to ensure the entire questionnaire is validated
const validateQuestionnaire = (questionnaireItems: any, values: any) => {
  let errors: any = {};
  const questionStack = [];
  questionStack.push(questionnaireItems);

  while (questionStack.length > 0) {
    const questionnaireItem: any = questionStack.pop();

    // Check if there are things to validate
    for (let i = 0; i < questionnaireItem.length; i += 1) {
      const item = questionnaireItem[i];

      // If an item is actually a group, add it to the stack and move on
      if (item.type === 'group') {
        questionStack.push(item.item);
      } else if (item.linkId in values) {
        // Validate the question, retrieve any errors that may exist
        errors = { ...validateQuestion(item, values), ...errors };

        // Handle recurrsion
        if ('item' in item) {
          questionStack.push(item.item);
        }
      }
    }
  }

  return errors;
};

const constructResponse = (questionnaireData: any, values: any) => {
  const response = {
    resourceType: 'QuestionnaireResponse',
    questionnaire: questionnaireData.url,
    item: questionnaireData.item,
    status: 'completed',
  };

  const questionStack = [];
  questionStack.push(response.item);

  while (questionStack.length > 0) {
    const questionnaireItem: any = questionStack.pop();

    for (let i = 0; i < questionnaireItem.length; i += 1) {
      const item = questionnaireItem[i];

      if (item.type === 'group') {
        questionStack.push(item.item);
      } else {
        if (item.linkId in values) {
          item.answer = [];
          if (item.type === 'boolean' && values[item.linkId] !== '') {
            item.answer.push({
              valueBoolean: values[item.linkId] === 'true',
            });
          } else if (item.type === 'choice') {
            if ('valueCoding' in item.answerOption[0]) {
              item.answer.push({
                valueCoding: JSON.parse(values[item.linkId]),
              });
            } else if ('valueInteger' in item.answerOption[0]) {
              item.answer.push({
                valueInteger: JSON.parse(values[item.linkId]),
              });
            } else if ('valueDecimal' in item.answerOption[0]) {
              item.answer.push({
                valueDecimal: JSON.parse(values[item.linkId]),
              });
            } else if ('valueDate' in item.answerOption[0]) {
              item.answer.push({
                valueDate: JSON.parse(values[item.linkId]),
              });
            } else if ('valueTime' in item.answerOption[0]) {
              item.answer.push({
                valueTime: JSON.parse(values[item.linkId]),
              });
            } else if ('valueString' in item.answerOption[0]) {
              item.answer.push({
                valueString: JSON.parse(values[item.linkId]),
              });
            }
          } else if (item.type === 'string' || item.type === 'text' || item.type === 'question') {
            item.answer.push({
              valueString: values[item.linkId],
            });
          } else if (item.type === 'integer') {
            item.answer.push({
              valueInteger: values[item.linkId],
            });
          } else if (item.type === 'decimal') {
            item.answer.push({
              valueDecimal: values[item.linkId],
            });
          } else if (item.type === 'date') {
            item.answer.push({
              valueDate: values[item.linkId],
            });
          } else if (item.type === 'dateTime') {
            item.answer.push({
              valueDateTime: values[item.linkId],
            });
          } else if (item.type === 'time') {
            item.answer.push({
              valueTime: values[item.linkId],
            });
          } else if (item.type === 'url') {
            item.answer.push({
              valueUrl: values[item.linkId],
            });
          }
        }

        if ('item' in item) {
          questionStack.push(item.item);
        }
      }

      const validKeys = ['linkId', 'answer', 'item'];
      Object.keys(item).forEach((key) => validKeys.includes(key) || delete item[key]);
      if (item.answer && item.answer.length === 0) {
        delete item.answer;
      }
    }
  }

  return response;
};

export { validateQuestion, validateQuestionnaire, constructResponse };
