import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Users from '../../components/Users/Users';
import * as userActions from '../../actions/userActions';
import * as tokenUtils from '../../utils/tokenUtility';
import FlatButton from 'material-ui/FlatButton';

/**
 * Represents a UserpWrapper class component.
 */
class UserWrapper extends React.Component {
  /**
 * @param {object} props  Redux store updates.
 * @param {object} context pass data through the component tree
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        id: props.userState.user.id,
        username: props.userState.user.username,
        email: props.userState.user.email,
        firstName: props.userState.user.firstName,
        lastName: props.userState.user.lastName,
        password: '',
        confirmPassword: ''
      },
      error: '',
      open: false,
    };
    this.onEmailChange = this.onEmailChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onfirstNameChange = this.onfirstNameChange.bind(this);
    this.onlastNameChange = this.onlastNameChange.bind(this);
    this.onusernameChange = this.onusernameChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
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
    this.props.actions.getUser(JSON.parse(tokenUtils.getUserDetails()).id);
  }

  /**
 * Submits Form calls dispatch action.
 * @param {object} event The submit event.
 * @returns {void}
 */
  onSubmit() {
    // this.props.actions.signupUser(this.state.user);
    // this.context.router.push('/login');
  }
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
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
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        type="submit"
        primary
        keyboardFocused
        onTouchTap={(e) => {
          e.preventDefault();
          this.props.actions.editUser(this.state.user);
          this.handleClose();
        }}
      />,
    ];

    return (
      <div>
        <ValidatorForm
          ref="form"
          onSubmit={this.onSubmit}
        >
          <Users
            user={this.props.userState.user}
            isFetching={this.props.userState.isFetching}
            handleOpen={this.handleOpen}
            state={this.state}
            dialogActions={dialogActions}
            changeEmail={this.onEmailChange}
            changePassword={this.onPasswordChange}
            changePasswordConfirm={this.onConfirmPasswordChange}
            changeFirstName={this.onfirstNameChange}
            changeLastName={this.onlastNameChange}
            changeUsername={this.onusernameChange}
            submitForm={this.onSubmit}
          />
        </ValidatorForm>
      </div>

    );
  }
}
UserWrapper.propTypes = {
  actions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
};
UserWrapper.contextTypes = {
  router: PropTypes.object
};
/**
 * @override
 */
function mapStateToProps(state) {
  return {
    userState: state.user
  };
}
/**
 * @override
 */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(UserWrapper);
