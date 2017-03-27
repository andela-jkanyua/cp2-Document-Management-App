import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Header from './common/header';
import Footer from './common/footer';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';

class App extends React.Component {
  render() {
    return (
      <div>
        <Header isAuthenticated={this.props.appState.auth.isAuthenticated} logoutUser={this.props.actions.logoutUser} />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
App.PropTypes = {
  children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    appState: state
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
