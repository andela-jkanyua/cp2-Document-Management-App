import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../components/App';
import HomePage from '../components/home/HomePage';
import AboutPage from '../components/about/AboutPage';
import ViewDocuments from '../containers/Documents/DocumentsPage';
import AuthPage from '../containers/Auth/AuthPage';
import SignUp from '../containers/Auth/SignUpPage';
import EditDocument from '../containers/Documents/EditDocumentPage';
import UserPage from '../containers/Users/UsersPage';
import changePassword from '../containers/Users/ChangePasswordPage';

import * as tokenUtils from '../utils/tokenUtility';

function loggedIn() {
  return !!tokenUtils.getAuthToken();
}

function requireAuth(nextState, replace) {
  if (!loggedIn()) {
    replace({
      pathname: '/login'
    });
  }
}
export default (
  <Route path="/" component={App} >
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
    <Route path="documents" component={ViewDocuments} onEnter={requireAuth} />
    <Route path="login" component={AuthPage} />
    <Route path="signup" component={SignUp} />
    <Route path="editdoc" component={EditDocument} onEnter={requireAuth} />
    <Route path="profile" component={UserPage} onEnter={requireAuth} />
  </Route>
);
