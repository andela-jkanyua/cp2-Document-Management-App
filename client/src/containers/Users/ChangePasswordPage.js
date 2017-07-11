import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ValidatorForm } from 'react-material-ui-form-validator';
import Users from '../../components/Users/Users';
import * as userActions from '../../actions/userActions';
import * as authActions from '../../actions/authActions';
import * as tokenUtils from '../../utils/tokenUtility';
import FlatButton from 'material-ui/FlatButton';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
/**
 * Represents a UserpWrapper class component.
 */
class ChangePasswordWrapper extends React.Component {
  /**
 * @param {object} props  Redux store updates.
 * @param {object} context pass data through the component tree
 */
  constructor(props, context) {
    super(props, context);
    this.state = {
      user: {
        oldPassword: '',
        password: '',
        confirmPassword: ''
      },
      error: '',
    };
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onConfirmPasswordChange = this.onConfirmPasswordChange.bind(this);
    this.onChangeOldPassword = this.onChangeOldPassword.bind(this);
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
    //this.props.actions.getUser(JSON.parse(tokenUtils.getUserDetails()).id);
  }

  /**
 * Submits Form calls dispatch action.
 * @param {object} event The submit event.
 * @returns {void}
 */
  onSubmit() {
    this.props.state.authActions.loginUser(
      Object.assign({},
        this.state.user,
        JSON.parse(tokenUtils.getUserDetails()).id
      )).then(()=>{
        console.log(this.props)
      })
  }


  /**
   * @override
   */
  onPasswordChange(event) {
    console.log(this.props)
    const usr = this.state.user;
    usr.password = event.target.value;
    this.setState({ user: usr });
  }
  onChangeOldPassword(event) {
    console.log(this.state.user)
    const usr = this.state.user;
    usr.oldPassword = event.target.value;
    this.setState({ user: usr });
  }
  /**
   * @override
   */
  onConfirmPasswordChange(event) {
        console.log(this.state.user)
    const usr = this.state.user;
    usr.confirmPassword = event.target.value;
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
        <div className="field-line">
          <TextValidator
            floatingLabelText="Old password"
            type="password"
            name="oldPassword"
            value={this.state.user.oldPassword}
            validators={['required']}
            onChange={this.onChangeOldPassword}
            errorMessages={['Old Password is required']}
          />
        </div>
        <div className="field-line">
          <TextValidator
            floatingLabelText="New password"
            type="password"
            name="newPassword"
            value={this.state.user.password}
            validators={['required']}
            onChange={this.onPasswordChange}
            errorMessages={['Old Password is required']}
          />
        </div>

        <div className="field-line">
          <TextValidator
            floatingLabelText="Confirm New password"
            type="password"
            name="confirmPassword"
            value={this.state.user.confirmPassword}
            validators={['required', 'isPasswordMatch']}
            onChange={this.onConfirmPasswordChange}
            errorMessages={['Old Password is required', 'passwords do not match']}
          />
        </div>
        <div className="button-line">
          <RaisedButton type="submit" label="Change Password" primary /><br /><br />
        </div>
        </ValidatorForm>
      </div>

    );
  }
}
ChangePasswordWrapper.propTypes = {
  authActions: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
};
ChangePasswordWrapper.contextTypes = {
  router: PropTypes.object
};
/**
 * @override
 */
function mapStateToProps(state) {
  return {
    state
  };
}
/**
 * @override
 */
function mapDispatchToProps(dispatch) {
  return {
    authActions: bindActionCreators(authActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordWrapper);
