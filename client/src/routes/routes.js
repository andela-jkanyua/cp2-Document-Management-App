import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/home/HomePage';
import AboutPage from '../components/about/AboutPage';
import ViewDocuments from '../containers/Documents/DocumentsPage';
import AuthPage from '../containers/Auth/AuthPage';
import SignUp from '../containers/Auth/SignUpPage';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="documents" component={ViewDocuments} />
    <Route path="login" component={AuthPage} />
    <Route path="signup" component={SignUp} />
  </Route>
);
