import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import SignUp from '../../components/Auth/signup';
import * as authActions from '../../actions/authActions';

/**
 * Represents a SignupWrapper class component.
 */
class SignupWrapper extends React.Component {
  /**
 * @param {object} props  Redux store updates.
 * @param {object} context pass data through the component tree
 */
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
    this.onfirstNameChange = this.onfirstNameChange.bind(this);
    this.onlastNameChange = this.onlastNameChange.bind(this);
    this.onusernameChange = this.onusernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  /**
   * @override
   */
  componentWillMount() {
    // custom rule will have name 'isPasswordMatch'
    ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
      if (value !== this.state.user.password) {
        return false;
      }
      return true;
    });
  }

  /**
 * Submits Form calls dispatch action.
 * @param {object} event The submit event.
 * @returns {void}
 */
  onSubmit() {
    this.props.actions.signupUser(this.state.user);
    this.context.router.push('/login');
  }

  /**
 * Modifies state.user.email when email is typed
 * @param {object} event The change event.
 * @returns {void}
 */
  onEmailChange(event) {
    const usr = this.state.user;
    usr.email = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  onPasswordChange(event) {
    const usr = this.state.user;
    usr.password = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  onConfirmPasswordChange(event) {
    const usr = this.state.user;
    usr.confirmPassword = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  onfirstNameChange(event) {
    const usr = this.state.user;
    usr.firstName = event.target.value;
    this.setState({ user: usr });
  }
  /**
   * @override
   */
  onlastNameChange(event) {
    const usr = this.state.user;
    usr.lastName = event.target.value;
    this.setState({ user: usr });
  }
  /**
   * @override
   */
  onusernameChange(event) {
    const usr = this.state.user;
    usr.username = event.target.value;
    this.setState({ user: usr });
  }

  /**
   * @override
   */
  render() {
    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.onSubmit}
        >
          <SignUp
            changeEmail={this.onEmailChange}
            changePassword={this.onPasswordChange}
            changePasswordConfirm={this.onConfirmPasswordChange}
            changeFirstName={this.onfirstNameChange}
            changeLastName={this.onlastNameChange}
            changeUsername={this.onusernameChange}
            submitForm={this.onSubmit}
            user={this.state.user}
            isFetching={this.props.authState.isFetching}
          />

        </ValidatorForm>
      </div>

    );
  }
}
SignupWrapper.propTypes = {
  actions: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired
};
SignupWrapper.contextTypes = {
  router: PropTypes.object
};
/**
 * @override
 */
function mapStateToProps(state) {
  return {
    authState: state.auth
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
export default connect(mapStateToProps, mapDispatchToProps)(SignupWrapper);
