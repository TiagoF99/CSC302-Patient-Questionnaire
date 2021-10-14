import * as React from 'react';
import Status from './status';
import FormPage from './formPage/formPage';

const Main = () => {

  const [renderFormPage, setRenderFormPage] = React.useState(false);

  if (!renderFormPage) {
    return (
      <Status setRenderFormPage={setRenderFormPage}/>
    );
  } else {
    return (
      <FormPage setRenderFormPage={setRenderFormPage}/>
    );
  }
};

export default Main;
