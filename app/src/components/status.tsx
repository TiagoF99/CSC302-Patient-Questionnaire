import React, { useState, useEffect } from 'react';
import getStatus from '../api/status';
import status_css from './status.module.css'

const Status = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getStatusFromApi = async () => {
      setStatus(await getStatus());
    };

    getStatusFromApi();
  }, []);

  return (
    <div className={status_css.container}>
      <h4>
        Questionnaire app backend: <b className={status === 'RUNNING' ? status_css.green : status_css.red}>{status ?? 'NOT RUNNING'}</b>
      </h4>
    </div>
  );
};

export default Status;
