const { sanitizeUrl } = require('@braintree/sanitize-url');

const validateQuestion = (question: any, values: any) => {
  const errors: any = {};
  if (
    question.required &&
    (!(question.linkId in values) || values[question.linkId] === '' || values[question.linkId] === undefined)
  ) {
    errors[question.linkId] = 'This field is required';
  } else if ('maxLength' in question && values[question.linkId].length > question.maxLength) {
    // maxlength
    errors[question.linkId] = `This field is over max length of ${question.maxLength}`;
  } else if (question.type === 'display' && values[question.linkId]) {
    // display
    errors[question.linkId] = `This field should not have an answer...`;
  } else if (question.type === 'boolean' && values[question.linkId] !== 'true' && values[question.linkId] !== 'false') {
    // boolean
    errors[question.linkId] = `This field is not a boolean`;
  } else if (question.type === 'decimal' && typeof values[question.linkId] !== 'number') {
    // decimal
    errors[question.linkId] = `This field is not a decimal`;
  } else if (
    question.type === 'integer' &&
    (typeof values[question.linkId] !== 'number' || values[question.linkId] % 1 !== 0)
  ) {
    // integer
    errors[question.linkId] = `This field is not an integer`;
  } else if (
    (question.type === 'string' || question.type === 'text') &&
    (typeof values[question.linkId] !== 'string' ||
      /[ \r\n\t\S]+/.test(values[question.linkId]) === false ||
      values[question.linkId].length >= 1048576 - 1) // This verifies string is < 1MB, including terminating char?
  ) {
    // string or text
    errors[
      question.linkId
    ] = `This field is not a string containing only accepted unicode characters, and below 1MB in size`;
  } else if (question.type === 'url' && sanitizeUrl(values[question.linkId]) !== values[question.linkId]) {
    // url
    errors[question.linkId] = `This field is not a valid/safe url`;
  } else if (
    question.type === 'date' &&
    (/([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?/.test(
      values[question.linkId],
    ) === false ||
      Number.isNaN(Date.parse(values[question.linkId])) === true)
  ) {
    // date
    errors[
      question.linkId
    ] = `This field is not a valid date of the format YYYY, YYYY-MM, or YYYY-MM-DD. No timezone should be added.`;
  } else if (question.type === 'dateTime' && Number.isNaN(Date.parse(values[question.linkId])) === true) {
    // dateTime
    if (
      /([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1])(T([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)((0[0-9]|1[0-3]):[0-5][0-9]|14:00)))?)?)?/.test(
        values[question.linkId],
      ) === false
    ) {
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
    (/([01][0-9]|2[0-3]):[0-5][0-9]:([0-5][0-9]|60)(\.[0-9]+)?/.test(values[question.linkId]) === false ||
      Number.isNaN(Date.parse(values[question.linkId])) === true)
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

  // Have not implemented choice - too weird
  // enable whens - question has no data when not enabled

  return errors;
};

const validateQuestionnaire = (questionnaireItems: any, values: any) => {
  let errors: any = {};
  const questionStack = [];
  questionStack.push(questionnaireItems);

  while (questionStack.length > 0) {
    const questionnaireItem: any = questionStack.pop();

    for (let i = 0; i < questionnaireItem.length; i += 1) {
      const item = questionnaireItem[i];

      if (item.type === 'group') {
        questionStack.push(item.item);
      } else {
        errors = { ...validateQuestion(item, values), ...errors };

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

  response.item = questionnaireData.item;

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

export { validateQuestionnaire, constructResponse };
