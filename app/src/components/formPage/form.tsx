import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import formPage from './formPage.module.css';
import { ItemType } from '../../api/questionnaire';
import getField, { itemDefaultValue, MyFormProps, DefaultValuesType } from './questionnaireType';

const generateQuestion = (
  obj: ItemType,
  touched: DefaultValuesType,
  errors: DefaultValuesType,
  values: DefaultValuesType,
) => {
  return (
    <div
      key={obj.linkId}
      className={(obj.type === 'group' && formPage.qGroup) || (obj.type !== 'group' && formPage.qItem)}
    >
      <div
        className={
          (obj.type === 'display' && formPage.qDisplay) ||
          (obj.type === 'group' && formPage.groupHead) ||
          formPage.fieldText
        }
      >
        {'prefix' in obj && <span>{obj.prefix}. </span>}
        {obj.text}
      </div>
      <div>
        {touched[obj.linkId] && errors[obj.linkId] && (
          <span className={formPage.fieldError}> {errors[obj.linkId]}: </span>
        )}
        {addFormFields(obj, touched, errors, values)}
        {'required' in obj && obj.required && obj.type !== 'group' && obj.type !== 'display' && (
          <span className={formPage.requiredAsterix}>*</span>
        )}
      </div>
    </div>
  );
};

const addFormFields = (
  obj: ItemType,
  touched: DefaultValuesType,
  errors: DefaultValuesType,
  values: DefaultValuesType,
) => {
  if (obj.type === 'group') {
    return generateForm(obj.item || [], touched, errors, values);
  }
  if ('item' in obj) {
    return (
      <>
        {getField(obj, touched, errors)}
        {generateForm(obj.item || [], touched, errors, values)}
      </>
    );
  }
  return getField(obj, touched, errors);
};

const generateForm = (
  items: Array<ItemType>,
  touched: DefaultValuesType,
  errors: DefaultValuesType,
  values: DefaultValuesType,
) => {
  const questions: any = [];
  items.forEach((item: ItemType) => {
    let enabled = true;

    if ('enableWhen' in item) {
      item.enableWhen.forEach((enabler) => {
        if (enabler.operator === 'exists') {
          if (enabler.question in values && (values[enabler.question].length === 0) === enabler.answerBoolean) {
            enabled = false;
          }
        }
      });
    }

    if (enabled) {
      if (item.type === 'group') {
        questions.push(generateQuestion(item, touched, errors, values)); // add div elements for group which may have items

        // recursively add items in group
        // questions.push(...generateForm(item.item || [], touched, errors));
      } else {
        questions.push(generateQuestion(item, touched, errors, values));
      }
    }
  });

  return questions;
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

const InnerForm = (props: MyFormProps & FormikProps<DefaultValuesType>) => {
  const { touched, errors, isSubmitting, questionnaire, values } = props;
  return (
    <div className={formPage.formContainer}>
      <Form className={formPage.form}>
        <h1 className={formPage.formHeader}>{questionnaire.title}</h1>
        <h3>{questionnaire.description}</h3>
        <div className={formPage.formBody}>
          {generateForm(questionnaire.item, touched, errors, values)}
          <div className={formPage.asterixText}>All Fields with an * are required.</div>
        </div>
        <button className={formPage.formSubmit} type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </Form>
    </div>
  );
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
      if (item.type === 'integer' && !Number.isInteger(values[key])) {
        errors[key] = 'Value must be an Integer';
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
