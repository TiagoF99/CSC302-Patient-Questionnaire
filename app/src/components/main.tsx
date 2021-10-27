import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Status from './status';
import LandingPage from './landingPage/landingPage';
import FormPage from './formPage/formPage';

const Main = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/form">
            <FormPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );

  //return <LandingPage/>

  const [renderFormPage, setRenderFormPage] = React.useState(false);

  if (!renderFormPage) {
    return <Status setRenderFormPage={setRenderFormPage} />;
  }

  return <FormPage setRenderFormPage={setRenderFormPage} />;
};

export default Main;
