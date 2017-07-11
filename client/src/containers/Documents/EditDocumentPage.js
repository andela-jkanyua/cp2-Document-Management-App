import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import EditDocument from '../../components/Documents/EditDocument';
import * as documentActions from '../../actions/documentActions';
import { ValidatorForm } from 'react-material-ui-form-validator';

const style = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  marginRight: 20,
};

class EditDocuments extends React.Component {
  constructor(props, context) {
    super(props, context);
    if (!props.documents[0]) {
      return this.context.router.push('/');
    }
    this.state = {
      document: {
        id: this.props.documents[0].id,
        title: this.props.documents[0].title,
        content: this.props.documents[0].content,
        access: this.props.documents[0].access,
      }
    };
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSetAccess(event, index, value) {
    const doc = this.state.document;
    doc.access = value;
    this.setState({ document: doc });
  }
  onTitleChange(event) {
    const doc = this.state.document;
    doc.title = event.target.value;
    this.setState({ document: doc });
  }
  onContentChange(event) {
    const doc = this.state.document;
    doc.content = event.target.value;
    this.setState({ document: doc });
  }
  onSubmit() {
    this.props.actions.editDocument(this.state.document);
    this.context.router.push('/documents');
  }

  render() {
    return (

      <div className="container">
        <ValidatorForm
          ref="form"
          onSubmit={this.onSubmit}
        >
          <EditDocument
            document={this.state.document}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
            onSetAccess={this.onSetAccess}
          />
        </ValidatorForm>
      </div>
    );
  }
}
EditDocuments.PropTypes = {
  documents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};
EditDocuments.contextTypes = {
  router: PropTypes.object
};
function mapStateToProps(state) {
  return {
    documents: state.documents
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(EditDocuments);
