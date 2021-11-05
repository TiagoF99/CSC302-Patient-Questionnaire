import * as React from 'react';
import { Formik, Field, Form, FormikHelpers } from 'formik';
import { useHistory } from 'react-router-dom';

interface Values {
  id: number; // Selected questionnaire's id
}

const questionnaireIds = [78043];
// const questionnaireIds = [78043, 1167262, 2653405, 2638765, 2638766, 2638767, 2638768, 2638769]; // hardcoded for now
const idList = questionnaireIds.map((id) => <option value={id}>{id}</option>);

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Select a questionnaire by id</h1>
      <Formik
        initialValues={{
          id: questionnaireIds[0],
        }}
        onSubmit={(values: Values, { setSubmitting }: FormikHelpers<Values>) => {
          console.log(JSON.stringify(values, null, 2)); // for debugging
          setSubmitting(false);
          history.push({
            pathname: `/form`,
            search: `?id=${values.id}`,
          });
        }}
      >
        <Form>
          <Field as="select" name="id">
            {idList}
          </Field>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default LandingPage;
