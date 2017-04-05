import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { TextValidator } from 'react-material-ui-form-validator';

const divStyle = {
  margin: '0 auto',
  width: '400px',
  textAlign: 'center',
};
const SignUp = props => (
  <div style={divStyle}>
    <Card >
      <h2 className="card-heading">Sign Up</h2>
      <div className="field-line">
        <TextValidator
          floatingLabelText="Email"
          name="email"
          value={props.user.email}
          onChange={props.changeEmail}
          validators={['required', 'isEmail']}
          errorMessages={['Email is required', 'Email is not valid']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Username"
          name="Username"
          value={props.user.username}
          validators={['required']}
          onChange={props.changeUsername}
          errorMessages={['Username is required']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="First Name"
          name="firstName"
          value={props.user.firstName}
          validators={['required']}
          onChange={props.changeFirstName}
          errorMessages={['First Name is required']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Last Name"
          name="lastName"
          value={props.user.lastName}
          validators={['required']}
          onChange={props.changeLastName}
          errorMessages={['Last Name is required']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Password"
          type="password"
          name="password"
          value={props.user.password}
          validators={['required', 'passwordLength']}
          onChange={props.changePassword}
          errorMessages={['Password is required', 'Password must be greater than six(6) characters']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Confirm Password"
          type="password"
          name="confirmPassword"
          onChange={props.changePasswordConfirm}
          validators={['isPasswordMatch', 'required']}
          errorMessages={['Password mismatch', 'Confirm Password is required']}
          value={props.user.confirmPassword}
        />
      </div><br /><br /><br />
      {props.isFetching && <CircularProgress size={60} thickness={7} />}

      <div className="button-line">
        <RaisedButton type="submit" label="Sign Up" primary /><br /><br />
      </div>
    </Card><br /><br /><br />

  </div>
  );
export default SignUp;
