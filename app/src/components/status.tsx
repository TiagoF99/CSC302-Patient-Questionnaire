import * as React from 'react';
import { Dispatch, SetStateAction } from "react";
import getStatus from '../api/status';

type Dispatcher<S> = Dispatch<SetStateAction<S>>;

const Status = ({ setRenderFormPage }: {setRenderFormPage: Dispatcher<boolean>}) => {
  const [status, setStatus] = React.useState('');

  React.useEffect(() => {
    const getStatusFromApi = async () => {
      setStatus(await getStatus());
    };

    getStatusFromApi();
  }, []);

  const goToFormPage = () => {
    setRenderFormPage(true);
  }

  return (
    <div>
      <h1>
        Questionnaire app backend: <b>{status || 'not running'}</b>.
      </h1>
      <button onClick={goToFormPage} >go to form page</button>
    </div>
  );
};

export default Status;
