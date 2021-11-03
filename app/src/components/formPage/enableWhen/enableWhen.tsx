import * as React from 'react';
import { ItemType } from '../../../api/questionnaire';
import getField, { itemDefaultValue, DefaultValuesType } from '../questionnaireType';

const getEnablerValue = (enabler: DefaultValuesType) => {
  let types = ['answerDecimal', 'answerInteger', 'answerDate', 'answerDateTime', 
              'answerTime', 'answerString', 'answerCoding', 'answerQuantity'];
  let value = null;

  if ('answerBoolean' in enabler) {
    // since option for booleans in formik is 'true'/'false' so we compare against string reps.
    value = enabler.answerBoolean.toString();
  } else {
     types.forEach((type) => {
      if (type in enabler) {
        value = enabler[type];
      }
    })
  }

  return value;
}

const checkItemEnabled = (items: Array<ItemType>,  values: DefaultValuesType) => {

  let enabled: DefaultValuesType = {};

  items.forEach((item: ItemType) => {
    if ('enableWhen' in item) {

      let howManyFalse = 0;
      item.enableWhen.forEach((enabler) => {
        var question_answer = values[enabler.question];
        let value = getEnablerValue(enabler);

        if (enabler.operator === 'exists') {
          if (enabler.question in values && (values[enabler.question].length === 0) === enabler.answerBoolean) {
            howManyFalse++;
          }
        } else if (enabler.operator === '=') {
           if (question_answer !== value || !enabled[enabler.question]) {
             howManyFalse++;
           }

        } else if (enabler.operator === '!=') {
           if (question_answer === value || !enabled[enabler.question]) {
             howManyFalse++;
           }
        } else if (enabler.operator === '>') {
           if (question_answer <= value || !enabled[enabler.question]) {
             howManyFalse++;
           }
        } else if (enabler.operator === '<') {
           if (question_answer >= value || !enabled[enabler.question]) {
             howManyFalse++;
           }
        } else if (enabler.operator === '>=') {
           if (question_answer < value || !enabled[enabler.question]) {
             howManyFalse++;
           }
        } else if (enabler.operator === '<=') {
           if (question_answer > value || !enabled[enabler.question]) {
             howManyFalse++;
           }
        }
      });

      if (item.enableWhen.length > 1 && item.enableBehaviour === 'all') {
        enabled[item.linkId] = !(howManyFalse === item.enableWhen.length);
      } else {
        enabled[item.linkId] = !(howManyFalse > 0);
      }
    } else {
      enabled[item.linkId] = true;
    }
  });  
  

  return enabled; 
}

export default checkItemEnabled;