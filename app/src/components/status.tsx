import React from 'react';
import { useState, useEffect } from 'react';
import getStatus from '../api/status';

const Status = () => {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const getStatusFromApi = async () => {
      setStatus(await getStatus());
    };

    getStatusFromApi();
  }, []);

  return (
    <div>
      <h4>
        Questionnaire app backend: <b>{status || 'not running'}</b>.
      </h4>
    </div>
  );
};

export default Status;
