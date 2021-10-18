import * as React from 'react';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import MyForm from './form';
import getQuestionnaire from '../../api/questionnaire';
import ErrorMessage from '../errorMessage/errorMessage';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

const FormPage = ({ setRenderFormPage }: { setRenderFormPage: Dispatcher<boolean> }) => {
  const [questionnaire, setQuestionnaire] = useState({
    title: '',
    description: '',
    id: '',
    item: [],
  });
  const questionnaireId: string = '2638765'; // harcoded for now

  useEffect(() => {
    const getQuestionnaireFromApi = async () => {
      setQuestionnaire(await getQuestionnaire(questionnaireId));
    };

    getQuestionnaireFromApi();
  }, []);

  const goToMainPage = () => {
    setRenderFormPage(false);
  };

  if (questionnaire.id === '') {
    // empty object
    return <ErrorMessage />;
  }

  return (
    <div>
      <MyForm questionnaire={questionnaire} />
      <button onClick={goToMainPage}>go to the main page</button>
    </div>
  );
};

export default FormPage;
