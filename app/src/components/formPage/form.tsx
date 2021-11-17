import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form } from 'formik';
import formPage from './formPage.module.css';
import { ItemType, postQuestionnaire } from '../../api/questionnaire';
import getField, { itemDefaultValue, MyFormProps, DefaultValuesType } from './questionnaireType';
import checkItemEnabled from './enableWhen/enableWhen';
import { findItemWithId, generateDefaultValues }from './formHelpers';

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
  const enabled = checkItemEnabled(items, values);
  items.forEach((item: ItemType) => {
    const enable = enabled[item.linkId];
    if (enable) {
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


const InnerForm = (props: MyFormProps & FormikProps<DefaultValuesType>) => {
  const { touched, errors, isSubmitting, questionnaire, values } = props;
  return (
    <div className={formPage.formContainer}>
      <Form className={formPage.form}>
        <h1 className={formPage.formHeader}>{questionnaire.title}</h1>
        <h2>{questionnaire.description}</h2>
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
      if ('required' in item && item.required && item.type === 'boolean' && values[key] === '') {
        errors[key] = 'A value must be selected';
      }
      if ('maxLength' in item && item.maxLength < values[key].length) {
        errors[key] = `Value must have a max length less that ${item.maxLength.toString()}`;
      }
    });

    return errors;
  },

  handleSubmit: async (values: DefaultValuesType, props) => {
    // do submitting things which only triggers once validate passes

    const { questionnaire } = props.props;
    const items = questionnaire.item;

    // only submit values that have been enabled so we only validate those values
    const enabled = checkItemEnabled(items, values);
    Object.keys(values).forEach((id: string) => {
      const enable = enabled[id];
      if (!enable) {
        values[id] = undefined;
      }
    });

    const res = await postQuestionnaire(questionnaire.id, values);
    if (res.status === 200) {
      props.props.setFormSubmit({show: true, data: {}, code: 200});
    } else {
      props.props.setFormSubmit({show: true, data: res.data, code: res.status});
    }
   
  },
})(InnerForm);

export default MyForm; 
