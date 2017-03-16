import React, {PropTypes}  from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
class AddDocument extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      document: {
        title: "",
        content: "",
        datecreated: "",
        access: undefined
      }
    };
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onDateChange = this.onDateChange.bind(this);
    this.onClickSave = this.onClickSave.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);

  }
  onSetAccess(event, index, value) {
    const doc = this.state.document;
    doc.access = value;
    this.setState({document: doc});
  }
  onTitleChange(event) {
    const doc = this.state.document;
    doc.title = event.target.value;
    this.setState({document: doc});
  }
  onContentChange(event) {
    const doc = this.state.document;
    doc.content = event.target.value;
    this.setState({document: doc});
  }
  onDateChange(event) {
    const doc = this.state.document;
    doc.datecreated = event.target.value;
    this.setState({document: doc});
  }
  onClickSave(){
    alert(`Saving ${this.state.document.title}  ${this.state.document.content} ${this.state.document.datecreated } ${this.state.document.access }`);
  }

  render () {
    return (
      <div>
      <h1> Documents </h1>
      <h2>Create Document</h2>
      <TextField
        name="title"
        hintText="Title"
        type="text"
        onChange={this.onTitleChange}
        defaultValue={this.state.document.title}
        fullWidth={false} /> <br /><br />

        <TextField
          className="content"
          name="content"
          type="text"
          onChange={this.onContentChange}
          defaultValue={this.state.document.content}
          fullWidth={false}
          hintText="Content"
          multiLine={true}
          rows={2}
          rowsMax={10} /><br /> <br />



        <TextField
          className="date"
          name="date"
          type="text"
          onChange={this.onDateChange}
          defaultValue ={this.state.document.dateCreated}
          fullWidth={false}
          hintText="Date Created" /> <br /> <br />

          <SelectField
                    floatingLabelText="Access"
                    value={this.state.document.access}
                    onChange={this.onSetAccess}
                  >
                    <MenuItem value={'public'} primaryText="Public" />
                    <MenuItem value={'private'} primaryText="Private" />

                  </SelectField>
                  <br />
        <FlatButton
          label="Submit"
          value= "Save"
          onClick={this.onClickSave} /> <br />
      </div>
    );
  }
}
export default AddDocument;
