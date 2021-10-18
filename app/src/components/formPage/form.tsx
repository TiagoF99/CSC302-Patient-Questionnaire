import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import formPage from './formPage.module.css';
import { ItemType } from '../../api/questionnaire';
import getField, { itemDefaultValue, MyFormProps, DefaultValuesType } from './questionnaireType';

const generateQuestion = (obj: ItemType, touched: DefaultValuesType, errors: DefaultValuesType) => {
  return (
    <div>
      <div className={(obj.type === 'display' && formPage.qDisplay) || (obj.type === 'group' && formPage.qGroup)}>
        {'prefix' in obj && <span>{obj.prefix}. </span>}
        {obj.text}
      </div>
      <div>
        {getField(obj)}
        {touched[obj.linkId] && errors[obj.linkId] && (
          <span className={formPage.fieldError}> {errors[obj.linkId]}</span>
        )}
      </div>
    </div>
  );
};

const generateForm = (items: Array<ItemType>, touched: DefaultValuesType, errors: defaultValuesType) => {
  const questions: any = [];
  items.forEach((item: ItemType) => {
    if (item.type === 'group') {
      questions.push(generateQuestion(item, touched, errors)); // add div elements for group which may have items

      // recursively add items in group
      questions.push(...generateForm(item.item || [], touched, errors));
    } else {
      questions.push(generateQuestion(item, touched, errors));
    }
  });

  return questions;
};

const InnerForm = (props: MyFormProps & FormikProps<DefaultValuesType>) => {
  const { touched, errors, isSubmitting, questionnaire } = props;

  return (
    <div className={formPage.formContainer}>
      <Form className={formPage.form}>
        <h1 className={formPage.formHeader}>{questionnaire.title}</h1>
        <h3>{questionnaire.description}</h3>
        <div className={formPage.formBody}>
          {generateForm(questionnaire.item, touched, errors)}
          <button className={formPage.formSubmit} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </Form>
    </div>
  );
};

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
      defaultValues[item.linkId] = (item.answerOption || [])[0].valueString;
    } else {
      defaultValues[item.linkId] = itemDefaultValue[item.type];
    }
  }

  return defaultValues;
};

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, DefaultValuesType>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const items = props.questionnaire.item;
    return generateDefaultValues(items);
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: DefaultValuesType, props) => {
    const errors: FormikErrors<DefaultValuesType> = {};
    const valuesKeys = Object.keys(values);

    valuesKeys.forEach((key) => {
      const { item } = findItemWithId(key, props.questionnaire.item);
      if ('required' in item && item.required && !values[key]) {
        errors[key] = 'Required';
      }
    });

    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things which only triggers once validate passes
    return values;
  },
})(InnerForm);

export default MyForm;
