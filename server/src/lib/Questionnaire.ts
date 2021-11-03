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

const validateQuestion = (question: any, values: any) => {
  const errors: any = {};
  if (
    question.required &&
    (!(question.linkId in values) || values[question.linkId] === '' || values[question.linkId] === undefined)
  ) {
    errors[question.linkId] = 'This field is required';
  } else if ('maxLength' in question && values[question.linkId].length > question.maxLength) {
    errors[question.linkId] = `This field is over max length of ${question.maxLength}`;
  } else if (question.type === 'boolean' && values[question.linkId] !== 'true' && values[question.linkId] !== 'false') {
    errors[question.linkId] = `This field is not a boolean`;
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
            } else {
              item.answer.push({
                valueStr: values[item.linkId],
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
