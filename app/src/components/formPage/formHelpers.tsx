import React from 'react';
import { ItemType } from '../../api/questionnaire';
import { itemDefaultValue, DefaultValuesType } from './questionnaireType';

const findItemWithId = (id: string, items: Array<ItemType>): DefaultValuesType => {
  let found = false;
  let curr = items[0];
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];

    if (item.linkId === id) {
      found = true;
      curr = item;
      break;
    } else if (item.type === 'group') {
      const obj = findItemWithId(id, item.item || []);
      if (obj.found) {
        found = true;
        curr = obj.item;
        break;
      }
    }
  }

  return {
    found,
    item: curr,
  };
};

const generateDefaultValues = (items: Array<ItemType>) => {
  let defaultValues: DefaultValuesType = {};

  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (item.type === 'group') {
      const obj = generateDefaultValues(item.item || []);
      defaultValues = { ...defaultValues, ...obj };
      defaultValues[item.linkId] = itemDefaultValue[item.type];
    } else if (item.type === 'choice') {
      // set default value to be first option
      defaultValues[item.linkId] = '';
      // defaultValues[item.linkId] = (item.answerOption || [])[0].valueString;
    } else {
      defaultValues[item.linkId] = itemDefaultValue[item.type];
    }
  }

  return defaultValues;
};

export { findItemWithId, generateDefaultValues };
