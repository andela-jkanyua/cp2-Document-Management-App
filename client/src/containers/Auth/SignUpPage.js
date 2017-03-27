import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tokenUtils from '../../utils/tokenUtility';
import SignUp from '../../components/Auth/signup';
import * as authActions from '../../actions/authActions';
import validator from 'email-validator';

class SignupWrapper extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        username: '',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
      },
      error: ''
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.firstNameChange = this.firstNameChange.bind(this);
    this.lastNameChange = this.lastNameChange.bind(this);
    this.usernameChange = this.usernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {

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
  onConfirmPasswordChange(event) {
    const usr = this.state.user;
    usr.confirmPassword = event.target.value;
    this.setState({ user: usr });
  }
  firstNameChange(event) {
    const usr = this.state.user;
    usr.firstName = event.target.value;
    this.setState({ user: usr });
  }
  lastNameChange(event) {
    const usr = this.state.user;
    usr.lastName = event.target.value;
    this.setState({ user: usr });
  }
  usernameChange(event) {
    const usr = this.state.user;
    usr.username = event.target.value;
    this.setState({ user: usr });
  }
  validate() {
    return validator.validate(this.state.user.email);
  }

  render() {
    { console.log(this.props); }

    return (
      <div>
        <SignUp />
      </div>

    );
  }
}
SignupWrapper.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state, ownProps) {
  return {
    authState: state.auth
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(authActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignupWrapper);
