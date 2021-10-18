import * as React from 'react';
import { FormikProps, Field, FieldProps } from 'formik';
import { ItemType, QuestionnaireType } from '../../api/questionnaire';

export interface MyFormProps {
  questionnaire: QuestionnaireType;
}

export interface DefaultValuesType {
  [key: string]: any;
}

const getField = (obj: ItemType) => {
  const { type } = obj;
  const name = obj.linkId;

  if (type === 'boolean') {
    return (
      <Field name={name} component="select">
        <option value="true">Yes</option>
        <option value="false">No</option>
      </Field>
    );
  }
  if (type === 'decimal') {
    const CustomInputComponent: React.FC<MyFormProps & FormikProps<DefaultValuesType> & FieldProps> = ({
      field,
      ...props
    }) => (
      <div>
        <input type="number" step="0.01" {...field} {...props} />
      </div>
    );
    return <Field name={name} component={CustomInputComponent} placeholder="Decimal Value (ex. 2.25)" />;
  }
  if (type === 'integer') {
    return <Field type="number" name={name} />;
  }
  if (type === 'date') {
    return <Field type="date" name={name} />;
  }
  if (type === 'dateTime') {
    return <Field type="datetime-local" name={name} />;
  }
  if (type === 'time') {
    return <Field type="time" name={name} />;
  }
  if (type === 'url' || type === 'reference') {
    return <Field type="url" name={name} />;
  }
  if (type === 'attachment') {
    return <Field type="file" name={name} />;
  }
  if (type === 'choice') {
    const options: any = [];
    (obj.answerOption || []).forEach((valueObj) => {
      options.push(<option value={valueObj.valueString}>{valueObj.valueString}</option>);
    });
    return (
      <Field name={name} component="select">
        {options}
      </Field>
    );
  }
  if (type === 'string' || type === 'text') {
  	return <Field type="text" name={name} />;
  }

  // string, text, open-choice
  return;

  // TODO: missing integration of types choice, group, display, question, open-choice
};

// more information: https://www.hl7.org/fhir/datatypes.html
export const itemDefaultValue: DefaultValuesType = {
  string: '',
  text: '',
  'open-choice': '',
  boolean: false,
  decimal: 0.0,
  integer: 0,
  date: '2021-11-04',
  dateTime: '2021-11-04T00:00:00',
  time: '00:00:00',
  url: '',
  reference: '',
  attachment: '',
  quantity: '',
  group: '',
  display: '',
  question: '',
};

export default getField;
