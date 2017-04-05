import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';

import * as documentActions from '../../actions/documentActions';
import DocumentsList from '../../components/Documents/DocumentsList';
import AddDocument from '../../components/Documents/AddDocument';
import SearchDoc from '../../components/Documents/SearchDocuments';
import * as tokenUtils from '../../utils/tokenUtility';

const style = {
  position: 'fixed',
  bottom: 20,
  right: 20,
  marginRight: 20,
};
const selectorDiv = {
  display: 'inline-block',
};
const searchDiv = {
  display: 'inline-block',
  marginLeft: 590
};

class ViewDocuments extends React.Component {
  constructor(props, context) {
    super(props, context);
    const arr = props.documents.map(doc => doc.title);
    this.state = {
      open: false,
      document: {
        title: '',
        content: '',
        access: '',
      },
      docToLoad: 'public',
      dataSource: arr,
      searchValue: ''
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.onSetAccess = this.onSetAccess.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.updateDoc = this.updateDoc.bind(this);
    this.changeLoadDoc = this.changeLoadDoc.bind(this);
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.searchDocument = this.searchDocument.bind(this);
  }
  componentDidMount() {
    this.props.actions.loadDocuments();
  }
  handleUpdateInput(value) {
    this.setState({ searchValue: value });
  }
  searchDocument(value) {

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
  changeLoadDoc(event, index, value) {
    this.setState({ docToLoad: value });
    if (value === 'private') {
      this.props.actions.loadPrivateDocuments(
        JSON.parse(tokenUtils.getUserDetails()).id);
    } else {
      this.props.actions.loadDocuments();
    }
  }

  isAdmin() {
    // check admin
  }
  updateDoc(document) {
    this.props.actions.editDocumentsRequest(document);
    this.context.router.push('/editdoc');
  }

  render() {
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
        <div style={selectorDiv}>
          <DropDownMenu value={this.state.docToLoad} onChange={this.changeLoadDoc} >
            <MenuItem value={'public'} primaryText="Public Documents" />
            <MenuItem value={'private'} primaryText="My Documents" />

          </DropDownMenu>
        </div>
        <div style={searchDiv}>
          <SearchDoc
            dataSource={this.state.dataSource}
            onUpdateInput={this.handleUpdateInput}
            searchDocument={this.searchDocument}
            searchTerm={this.state.searchValue}
            loadDocuments={this.props.actions.loadDocuments}
          />

        </div>
        <br />
        <DocumentsList
          documents={this.props.documents}
          handleOpen={this.handleOpen}
          style={style}
          onUpdate={this.updateDoc}
          error={this.props.documents.error}
          deleteDocument={this.props.actions.deleteDocument}
          loadDocuments={this.props.actions.loadDocuments}
        />
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
ViewDocuments.contextTypes = {
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
export default connect(mapStateToProps, mapDispatchToProps)(ViewDocuments);
