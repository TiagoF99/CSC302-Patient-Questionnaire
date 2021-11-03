import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation, Link } from 'react-router-dom';
import MyForm from './form';
import { getQuestionnaire } from '../../api/questionnaire';
import ErrorMessage from '../errorMessage/errorMessage';

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

  const [loading, setLoading] = useState(true);

  const questionnaireId = query.get('id') || ''; // get id from query param

  useEffect(() => {
    const getQuestionnaireFromApi = async () => {
      const q = await getQuestionnaire(questionnaireId);
      setQuestionnaire(q);
      setLoading(false);
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
      {!loading && <MyForm questionnaire={questionnaire} />}
      <Link to="/">
        <button onClick={goToMainPage} type="button">
          Go back to main page
        </button>
      </Link>
    </div>
  );
};

export default withRouter(FormPage);
