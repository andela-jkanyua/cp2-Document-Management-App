import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as documentActions from '../../actions/documentActions';
import DocumentsList from '../../components/Documents/DocumentsList';
import AddDocument from '../../components/Documents/AddDocument';

const style = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  marginRight: 20,
};

class ViewDocuments extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      open: false,
      document: {
        title: '',
        content: '',
        access: '',
      }
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);

    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
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
  handleOpen() {
    this.setState({ open: true });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    {console.log(this.props)}
    const dialogActions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Create Document"
        primary
        keyboardFocused
        onTouchTap={(e) => {
          e.preventDefault();
          this.props.actions.createDocument(this.state.document);
          this.props.actions.loadDocuments();
          this.handleClose();
        }}
      />,
    ];
    return (
      <div className="container">
        <br />
        <DocumentsList documents={this.props.documents} handleOpen={this.handleOpen} style={style} />
        <br />
        <Dialog
          title="Create a new Document"
          actions={dialogActions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <AddDocument
            style={style}
            onSetAccess={this.onSetAccess}
            doc={this.state.document}
            onTitleChange={this.onTitleChange}
            onContentChange={this.onContentChange}
          />

        </Dialog>
      </div>
    );
  }
}
ViewDocuments.PropTypes = {
  documents: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewDocuments);
