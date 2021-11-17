import * as React from 'react';
import { useState, useEffect } from 'react';
import { useHistory, withRouter, useLocation, Link } from 'react-router-dom';
import MyForm from './form';
import { getQuestionnaire } from '../../api/questionnaire';
import ErrorMessage from '../errorMessage/errorMessage';
import formPage from './formPage.module.css';
import ReactModal from 'react-modal';

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

  const [formSubmit, setFormSubmit] = useState({
    show: false,
    data: {},
    code: 0
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
    <div className={formPage.contentBody}>
      {!loading && <MyForm questionnaire={questionnaire} setFormSubmit={setFormSubmit}/>}
      <Link to="/">
        <button onClick={goToMainPage} type="button" className={formPage.returnToMainButton}>
          <span>&#8592; </span>
          Return To Main Page
        </button>
      </Link>
      <ReactModal
        style={{
          overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.75)'
          },
          content: {
            position: 'absolute',
            top: '200px',
            left: '200px',
            right: '200px',
            bottom: '200px',
            border: '1px solid #ccc',
            background: '#fff',
            overflow: 'auto',
            WebkitOverflowScrolling: 'touch',
            borderRadius: '4px',
            outline: 'none',
            padding: '20px'
          }
        }}
        isOpen={formSubmit.show}>
          <div className={formPage.modalHead}>
            <div className={formPage.modalClose} onClick={() => setFormSubmit({show: false, data: {}, code: 0})}>
              &times;
            </div>
            <hr></hr>
          </div>
          <div className={formPage.modalContent}>
            { formSubmit.code === 200 && (
                <>
                  <div>Your form submission was a success! <span>&#127881;</span></div>
                  <div>
                    You can now either update your form and send it again or you can 
                    return to the main page and choose to fill another survey if needed.
                  </div>
                </>
              )
            }
            {
              formSubmit.code >= 400 && (
                <>
                  <div>
                    <span>&#10060;</span>
                    There was an error with your submission
                    <span>&#10060;</span>
                  </div>
                  <div>
                    Here are the reported errors:
                  </div>
                  {
                    Object.keys(formSubmit.data).map((key: any, i) => {
                      return(
                        <div key={i}>
                          {key.toString()}: {formSubmit.data[key].toString()}
                        </div>
                      );
                    })
                  }
                </>
              )
            }
          </div>
      </ReactModal>
    </div>
  );
};

export default withRouter(FormPage);
