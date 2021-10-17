import * as React from 'react';
import errorMessage from './errorMessage.module.css';

const ErrorMessage = () => {
  return (
    <div className={errorMessage.errorTitle}>
      There was an issue loading the page. Please reload and try again. 
    </div>
  );
};

export default ErrorMessage;
