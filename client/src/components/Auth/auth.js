import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
import { TextValidator } from 'react-material-ui-form-validator';

const divStyle = {
  margin: '0 auto',
  width: '344px',
  textAlign: 'center',
};
const Auth = props => (
  <div style={divStyle}>
    <Card >
      <h2 className="card-heading">Login</h2>

      {props.errorMessage && <p className="alert alert-danger"> Invalid Username or Password </p>}
      <div className="field-line">
        <TextValidator
          floatingLabelText="Email"
          name="email"
          onChange={props.onEmailChange}
          value={props.user.email}
          validators={['required', 'isEmail']}
          errorMessages={['Email is required', 'Email is not valid']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Password"
          type="password"
          name="password"
          value={props.user.password}
          onChange={props.onPasswordChange}
          validators={['required']}
          errorMessages={['Password is required']}
        />
      </div>
      <div>

        {props.isFetching && <CircularProgress size={60} thickness={7} />}

      </div> <br /> <br />

      <div className="button-line">
        <RaisedButton type="submit" label="Log in" primary /><br /><br />
        Don't have an account? <Link to="signup" >Sign Up</Link> here!<br /><br />
      </div>
    </Card><br /><br /><br />
  </div>
  );
Auth.PropTypes = {

};
export default Auth;
