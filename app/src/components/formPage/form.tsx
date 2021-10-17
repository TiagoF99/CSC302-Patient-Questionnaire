import * as React from 'react';
import { withFormik, FormikProps, FormikErrors, Form, Field, FieldProps } from 'formik';
import formPage from './formPage.module.css';
import{ questionnaireType, itemType } from '../../api/questionnaire';


interface OtherProps {
  questionnaire: questionnaireType;
}

const getField = (type: string, name: string) => {

  if (type === "string" || type === "text" || type === "open-choice") {
    return(
      <Field type="text" name={name}/>
    );
  } else if (type === "boolean" ) {
     <Field name={name} component="select">
       <option value="true">Yes</option>
       <option value="false">No</option>
     </Field>
  } else if (type === "decimal") {
    const CustomInputComponent: React.FC<OtherProps & FormikProps<defaultValuesType> & FieldProps> = ({
      field,
      form: { touched, errors }, 
       ...props
     }) => (
       <div>
         <input type="number" step="0.01" {...field} {...props} />
       </div>
     );
      return(
        <Field name={name} component={CustomInputComponent} placeholder="Decimal Value (ex. 2.25)"/>
      ); 
  } else if (type === "integer") {
    return(
      <Field type="number" name={name}/>
    );
  } else if (type === "date") {
    return(
      <Field type="date" name={name}/>
    );
  } else if (type === "dateTime") {
    return(
      <Field type="datetime-local" name={name}/>
    );
  } else if (type === "time") {
    return(
      <Field type="time" name={name}/>
    );
  } else if (type === "url" || type === "reference") {
    return(
      <Field type="url" name={name}/>
    );
  } else if (type === "attachment") {
    return(
      <Field type="file" name={name}/>
    );
  } else if (type === "quantity") {
    return; // will just output the text
  } else if (type === "group") {
    
  } else if (type === "display") {
    
  } else if (type === "question") {
    
  } else if (type === "choice") {
    
  }

  // TODO: missing integration of types choice, group, display, question
}

// Aside: You may see InjectedFormikProps<OtherProps, FormValues> instead of what comes below in older code.. InjectedFormikProps was artifact of when Formik only exported a HoC. It is also less flexible as it MUST wrap all props (it passes them through).
const InnerForm = (props: OtherProps & FormikProps<defaultValuesType>) => {
  const { touched, errors, isSubmitting, questionnaire } = props;

  return (
    <Form className={formPage.form}>
      <h1 className={formPage.formHeader}>{questionnaire.title}</h1>
      <h3>{questionnaire.description}</h3>
      <div>
        { questionnaire.item.map((obj: itemType) => (
            <div>
              <div>
                {obj.text}
              </div>
              <div>
                {getField(obj.type, obj.linkId)}
                {touched[obj.linkId] && errors[obj.linkId] && <span className={formPage.fieldError}>  {errors[obj.linkId]}</span>}
              </div>
            </div>
          ))
        }

        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
      </div>
    </Form>
  );
};

// The type of props MyForm receives
interface MyFormProps {
  questionnaire: questionnaireType;
}

interface defaultValuesType {
    [key: string]: any
}

// Wrap our form with the withFormik HoC
const MyForm = withFormik<MyFormProps, defaultValuesType>({
  // Transform outer props into form values
  mapPropsToValues: (props) => {
    const items = props.questionnaire.item;
    var defaultValues: defaultValuesType = {};

    for(var i = 0; i < items.length; i++) {
      const item = items[i];
      defaultValues[item.linkId] = '';
    }

    return defaultValues;
  },

  // Add a custom validation function (this can be async too!)
  validate: (values: defaultValuesType) => {
    const errors: FormikErrors<defaultValuesType> = {};
    const valuesKeys = Object.keys(values);
    for(var i = 0; i < valuesKeys.length; i++) {
      const key = valuesKeys[i];
      if (!values[key]) {
        errors[key] = 'Required';
      }
    }
    return errors;
  },

  handleSubmit: (values) => {
    // do submitting things which only triggers once validate passes
    console.log('values: ', values);
  },
})(InnerForm);

export default MyForm;
