import React, { Dispatch, SetStateAction } from "react";
import { FormikProps, Field, FieldProps } from 'formik';
import { ItemType, QuestionnaireType } from '../../api/questionnaire';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

export interface MyFormProps {
  questionnaire: QuestionnaireType,
  setFormSubmit:  Dispatch<SetStateAction<{show: boolean, data: {[key: string]: any}, code: number}>>
}

export interface DefaultValuesType {
  [key: string]: any;
}

const getField = (obj: ItemType, touched: DefaultValuesType, errors: DefaultValuesType) => {
  const { type } = obj;
  const name = obj.linkId;

  if (type === 'boolean') {
    return (
      <Field name={name} component="select">
        <option value="true">Yes</option>
        <option value="false">No</option>
        <option value="" />
      </Field>
    );
  }
  if (type === 'decimal' || type === 'quantity') {
    const CustomInputComponent: React.FC<any> = ({
      field,
      ...props
    }) => (
      <div>
        <input type="number" step="0.01" {...field} {...props} />
      </div>
    );
    return <Field name={name} component={CustomInputComponent} placeholder="Decimal Value (ex. 2.25)" />;
  }
  if (type === 'integer' || type === 'quantity') {
    return (
      <Field
        className={touched[obj.linkId] && errors[obj.linkId]}
        type="number"
        name={name}
      />
    );
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
    options.push(<option value="" />);
    (obj.answerOption || []).forEach((valueObj) => {
      if ('valueCoding' in valueObj) {
        if (valueObj.valueCoding.display) {
          options.push(<option value={JSON.stringify(valueObj.valueCoding)}>{valueObj.valueCoding.display}</option>);
        } else {
          options.push(<option value={JSON.stringify(valueObj.valueCoding)}>{valueObj.valueCoding.code}</option>);
        }
      } else {
        options.push(<option value={valueObj.valueString}>{valueObj.valueString}</option>);
      }
    });
    options.push(<option value={undefined} />);
    return (
      <Field name={name} component="select">
        {options}
      </Field>
    );
  }
  if (type === 'string' || type === 'text' || type === 'question') {
    return <Field type="text" name={name} />;
  }

  // TODO: missing integration of types open-choice
};

// more information: https://www.hl7.org/fhir/datatypes.html
export const itemDefaultValue: DefaultValuesType = {
  string: undefined,
  text: undefined,
  'open-choice': '',
  boolean: '',
  decimal: undefined,
  integer: undefined,
  date: '2021-11-04',
  dateTime: '2021-11-04T00:00:00',
  time: '00:00:00',
  url: undefined,
  reference: '',
  attachment: '',
  quantity: undefined,
  group: '',
  display: '',
  question: undefined,
};

export default getField;
