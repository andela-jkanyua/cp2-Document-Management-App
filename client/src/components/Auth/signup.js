import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import CircularProgress from 'material-ui/CircularProgress';
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
        <TextField
          floatingLabelText="Email"
          name="email"
        />

      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Username"
          name="Username"
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="First Name"
          name="firstName"
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Last Name"
          name="lastName"
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Password"
          type="password"
          name="password"
        />
      </div>

      <div className="field-line">
        <TextField
          floatingLabelText="Confirm Password"
          type="password"
          name="confirmPassword"
        />
      </div><br /><br /><br />

      <div className="button-line">
        <RaisedButton onClick={props.onSubmit} label="Log in" primary /><br /><br />
      </div>
    </Card><br /><br /><br />
  </div>
  );
export default SignUp;
