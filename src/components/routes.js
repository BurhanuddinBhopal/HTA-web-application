import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Login from '../containers/Login Page/login';
import Dashboard from '../containers/Dashboard Page/dashboard';
import Organizations from '../containers/Organizations Page/organizations';
const Routes = () => {
  const isLoggedIn = !!localStorage.getItem('mobileNumber'); 

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isLoggedIn ? <Redirect to="/dashboard" /> : <Login />}
        </Route>
        <Route path="/dashboard">
          {isLoggedIn ? <Dashboard /> : <Redirect to="/" />}
        </Route>
        <Route path="/organizations">
          {isLoggedIn ? <Organizations /> : <Redirect to="/" />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
  
};

export default Routes;