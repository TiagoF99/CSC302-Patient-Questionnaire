import React from 'react';
import { Formik, Field, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import QuestionnaireList from '../questionnaireList/questionnaireList';
import landingPage from './landingPage.module.css';

const LandingPage = () => {
  const history = useHistory();

  return (
      <div className={landingPage.body}>
        <h2 data-testid="title1">Access Questionnaire by ID</h2>
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
      <h3>or..</h3>
      <h2 data-testid="title2">Select a Questionnaire</h2>
      <QuestionnaireList/>
    </div>
  );
};

export default LandingPage;
