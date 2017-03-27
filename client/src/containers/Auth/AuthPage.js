import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tokenUtils from '../../utils/tokenUtility';
import Auth from '../../components/Auth/auth';
import * as authActions from '../../actions/authActions';
import validator from 'email-validator';

class AuthWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        email: '',
        password: ''
      },
      error: ''
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentWillMount() {
    const token = tokenUtils.getAuthToken();
    if (token) {
      this.context.router.push('/');
    }
  }
  componentWillReceiveProps() {
    const token = tokenUtils.getAuthToken();
    if (token) {
      this.context.router.push('/');
    }
  }
  onSubmit(event) {
    if (this.validate()) {
      const stateHolder = this.state;
      stateHolder.error = null;
      this.setState({ error: stateHolder });
      this.props.actions.loginUser(this.state.user);
      if (tokenUtils.getAuthToken()) {
        this.context.router.push('/');
      }
    } else {
      const stateHolder = this.state;
      stateHolder.error = '*Invalid email*';
      this.setState({ error: stateHolder });
    }
  }
  onEmailChange(event) {
    const usr = this.state.user;
    usr.email = event.target.value;
    this.setState({ user: usr });
  }
  onPasswordChange(event) {
    const usr = this.state.user;
    usr.password = event.target.value;
    this.setState({ user: usr });
  }
  validate() {
    return validator.validate(this.state.user.email);
  }


  render() {
    { console.log(this.props.appState); }
    return (
      <div>
        <Auth
          user={this.state.user}
          onSubmit={this.onSubmit}
          onEmailChange={this.onEmailChange}
          onPasswordChange={this.onPasswordChange}
          isFetching={this.props.appState.isFetching}
          errorMessage={this.props.appState.errorMessage}
          validatorError={this.state.error}
        />
      </div>

    );
  }
}
AuthWrapper.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    appState: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthWrapper);
