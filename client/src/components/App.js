import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from './common/header';
import Footer from './common/footer';
import * as authActions from '../actions/authActions';

/**
 * @override
 */
const App = props => (
  <div>
    <Header
      isAuthenticated={props.appState.auth.isAuthenticated}
      logoutUser={props.actions.logoutUser}
    />
    {props.children}
    <Footer />
  </div>
);

App.PropTypes = {
  children: PropTypes.object.isRequired,
  appState: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

/**
 * @override
 */
function mapStateToProps(state) {
  return {
    appState: state
  };
}

/**
 * @override
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
