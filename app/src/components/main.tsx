import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Status from './status';
import LandingPage from './landingPage/landingPage';
import FormPage from './formPage/formPage';
import Header from './header/header';
import main from './main.module.css';

const Main = () => {
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path="/">
            <div className={main.container}>
              <Status />
              <LandingPage />
            </div>
          </Route>
          <Route exact path="/form">
            <FormPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default Main;
