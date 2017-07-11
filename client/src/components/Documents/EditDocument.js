import React, { PropTypes } from 'react';
import Document from './Document';
import { TextValidator } from 'react-material-ui-form-validator';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const EditDocument = props => (
  <div>

    <TextValidator
      name="title"
      floatingLabelText="Title"
      type="text"
      onChange={props.onTitleChange}
      value={props.document.title}
      fullWidth
      validators={['required']}
      errorMessages={['Title cannot be empty']}
    /> <br /><br />

    <TextValidator
      className="content"
      name="content"
      type="text"
      onChange={props.onContentChange}
      defaultValue={props.document.content}
      fullWidth
      hintText="Content"
      multiLine
      rows={10}
      rowsMax={10}
      fullWidth
    /><br /> <br />

    <SelectField
      floatingLabelText="Access"
      value={props.document.access}
      onChange={props.onSetAccess}
    >
      <MenuItem value={'public'} primaryText="Public" />
      <MenuItem value={'private'} primaryText="Private" />

    </SelectField> <br /> <br />

    <RaisedButton
      label="Save Document"
      primary
      keyboardFocused
      type="submit"
    /> <br /> <br /><br /> <br />
  </div>
);

export default EditDocument;
