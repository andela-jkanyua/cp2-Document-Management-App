import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { TextValidator } from 'react-material-ui-form-validator';


const Users = props => (
  <div className="container">
    <Card>
      <CardHeader
        title={`${props.user.firstName} ${props.user.lastName}`}
        subtitle={`Email: ${props.user.email}`}
        avatar="images/avatar.png"
      />
      <CardMedia
        overlay={<CardTitle title="User Details" />}
      >
        <img src="images/header10.png" />
      </CardMedia>
      <CardText>
        <List>
          <ListItem insetChildren secondaryText={`${props.user.firstName}`} primaryText={'First Name'} />
          <ListItem insetChildren secondaryText={`${props.user.lastName}`} primaryText={'Last Name'} />
        </List>
        <Divider inset />
        <List>
          <ListItem insetChildren primaryText="Username" secondaryText={`${props.user.username}`} />
          <ListItem insetChildren secondaryText={`${props.user.email}`} primaryText={'Email'} />
        </List>
        <Divider inset />
        <List>
          <ListItem insetChildren primaryText="Documents Created" secondaryText={`${props.user.Documents.length}`} />
          <ListItem insetChildren secondaryText={`${props.user.email}`} primaryText={'Email'} />
        </List>
      </CardText>
      <CardActions>
        <FlatButton label="Edit Details" primary onClick={props.handleOpen} />
      </CardActions>
    </Card>
    <br /> <br /><br /> <br />

    <Dialog
      title="Edit Profile Details"
      actions={props.dialogActions}
      modal={false}
      open={props.state.open}
      onRequestClose={props.handleClose}
    >
      <div className="field-line">
        <TextValidator
          disabled
          floatingLabelText="Email cannot be changed"
          name="email"
          value={props.state.user.email}
          onChange={props.changeEmail}
          validators={['required', 'isEmail']}
          errorMessages={['Email is required', 'Email is not valid']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          disabled
          floatingLabelText="You annot change your Username"
          name="Username"
          value={props.state.user.username}
          validators={['required']}
          onChange={props.changeUsername}
          errorMessages={['Username is required']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="First Name"
          name="firstName"
          value={props.state.user.firstName}
          validators={['required']}
          onChange={props.changeFirstName}
          errorMessages={['First Name is required']}
        />
      </div>

      <div className="field-line">
        <TextValidator
          floatingLabelText="Last Name"
          name="lastName"
          value={props.state.user.lastName}
          validators={['required']}
          onChange={props.changeLastName}
          errorMessages={['Last Name is required']}
        />
      </div>

    </Dialog>
  </div>
  );
export default Users;
