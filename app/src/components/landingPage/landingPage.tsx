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
        <Formik
          initialValues={{qid: ''}}
          
          onSubmit={(values, actions) => {
            console.log(JSON.stringify(values, null, 2)); // for debugging
            history.push({
              pathname: `/form`,
              search: `?id=${values.qid}`,
            });
          }}
        >
          <Form>
            <Field name="qid"/>
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
      <h3>Or..</h3>
      <h1>Select a questionnaire</h1>
      <QuestionnaireList/>
    </div>
  );
};

export default LandingPage;
