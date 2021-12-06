import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import QuestionnaireList from '../questionnaireList/questionnaireList';

const LandingPage = () => {
  const history = useHistory();

  return (
    <div>
      <h1>Access questionnaire by ID</h1>
      <div>
<<<<<<< HEAD
        <h1 data-testid="title1">Access questionnaire by ID</h1>
        <div>
=======
>>>>>>> 79b4353c8c3f59b0b69e98ffaa345ab4b0f83b60
        <Formik
          initialValues={{ qid: '' }}
          onSubmit={(values, actions) => {
            console.log(JSON.stringify(values, null, 2)); // for debugging
            history.push({
              pathname: `/form`,
              search: `?id=${values.qid}`,
            });
          }}
        >
          <Form>
<<<<<<< HEAD
            <Field name="qid" label='qid'/>
=======
            <Field name="qid" />
>>>>>>> 79b4353c8c3f59b0b69e98ffaa345ab4b0f83b60
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <h3>Or..</h3>
<<<<<<< HEAD
      <h1 data-testid="title2">Select a questionnaire</h1>
      <QuestionnaireList/>
=======
      <h1>Select a questionnaire</h1>
      <QuestionnaireList />
>>>>>>> 79b4353c8c3f59b0b69e98ffaa345ab4b0f83b60
    </div>
  );
};

export default LandingPage;
