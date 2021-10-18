import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field, FieldProps } from 'formik';
import formPage from './formPage.module.css';
import{ questionnaireType, itemType, groupItemType } from '../../api/questionnaire';
import getField, { itemDefaultValue }from './questionnaireType';


// The type of props MyForm receives
export interface MyFormProps {
  questionnaire: questionnaireType;
}

export interface defaultValuesType {
    [key: string]: any
}

const generateQuestion = (obj: itemType, touched: defaultValuesType, errors: defaultValuesType) => {
  return (
    <div>
      <div className={(obj.type === 'display' && formPage.qDisplay) || (obj.type === 'group' && formPage.qGroup)}>
        { obj.hasOwnProperty('prefix') &&
          <span>{obj.prefix}. </span>
        }
        {obj.text}
      </div>
      <div>
        {getField(obj)}
        {touched[obj.linkId] && errors[obj.linkId] && <span className={formPage.fieldError}>  {errors[obj.linkId]}</span>}
      </div>
    </div>
  );
}

const generateForm = (items: Array<itemType>, touched: defaultValuesType, errors: defaultValuesType) => {

    var questions = Array();
    items.forEach((item: itemType) => {
        if (item.type === 'group') {
          questions.push(generateQuestion(item, touched, errors)); // add div elements for group which may have items

          // recursively add items in group
          questions.push(...generateForm(item.item || Array(), touched, errors));
        } else {
          questions.push(generateQuestion(item, touched, errors));
        }
    });
     
    return questions;
}

const InnerForm = (props: MyFormProps & FormikProps<defaultValuesType>) => {
  const { touched, errors, isSubmitting, questionnaire } = props;
  
  return (
    <div className={formPage.formContainer}>
        <Form className={formPage.form}>
          <h1 className={formPage.formHeader}>{questionnaire.title}</h1>
          <h3>{questionnaire.description}</h3>
          <div className={formPage.formBody}>
            { generateForm(questionnaire.item, touched, errors) }
            <button className={formPage.formSubmit} type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </div>
        </Form>
    </div>
  );
};

const findItemWithId = (id: string, items: Array<itemType>): defaultValuesType => {
  
  var found = false;
  var curr = items[0];
  for(var i = 0; i < items.length; i++) {
    const item = items[i];
    
    if (item.linkId === id) {
      found = true;
      curr = item;
      break;
    } else if (item.type === 'group') {
      const obj = findItemWithId(id, item.item || Array());
      if (obj.found) {
        found = true;
        curr = obj.item;
        break;
      }
     
    }
  }

  return {
    found: found,
    item: curr
  };
}

const generateDefaultValues = (items: Array<itemType>) => {
    var defaultValues: defaultValuesType = {};

    for(var i = 0; i < items.length; i++) {
      const item = items[i];
      if (item.type === 'group') {
        const obj = generateDefaultValues(item.item || Array());
        defaultValues = {...defaultValues, ...obj};
        defaultValues[item.linkId] = itemDefaultValue[item.type];
      } else if (item.type === 'choice') {
        // set default value to be first option
        defaultValues[item.linkId] = (item.answerOption || Array())[0].valueString;
      } else {
        defaultValues[item.linkId] = itemDefaultValue[item.type];
      }
    }

    return defaultValues;
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, defaultValuesType>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const items = props.questionnaire.item;
    return generateDefaultValues(items);
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: defaultValuesType, props) => {
    console.log(values);
    const errors: FormikErrors<defaultValuesType> = {};
    const valuesKeys = Object.keys(values);
    
    valuesKeys.forEach((key) => {
      const item = findItemWithId(key, props.questionnaire.item).item;
      if (item.hasOwnProperty('required') && item.required && !values[key]) {
        errors[key] = 'Required';
      }
    })
    
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things which only triggers once validate passes
    console.log('values: ', values);
  },
})(InnerForm);

export default MyForm;
