import * as React from 'react';
import { useState, useEffect } from 'react';
import MyForm from './form';
import getQuestionnaire from '../../api/questionnaire';
import ErrorMessage from '../errorMessage/errorMessage';
import { useHistory, withRouter, useLocation } from 'react-router-dom';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const FormPage = () => {
  const history = useHistory();
  const query = useQuery();

  const [questionnaire, setQuestionnaire] = useState({
    title: '',
    description: '',
    id: '',
    item: [],
  });

  const questionnaireId = query.get('id'); // get id from query param

  useEffect(() => {
    const getQuestionnaireFromApi = async () => {
      setQuestionnaire(await getQuestionnaire(questionnaireId));
    };

    getQuestionnaireFromApi();
  }, []);

  const goToMainPage = () => {
    history.push({
      pathname: '/',
    });
  };

  if (questionnaire.id === '') {
    // empty object
    return <ErrorMessage />;
  }

  return (
    <div>
      <MyForm questionnaire={questionnaire} />
      <button onClick={goToMainPage} type="button">
        Go back to main page
      </button>
    </div>
  );
};

export default withRouter(FormPage);
