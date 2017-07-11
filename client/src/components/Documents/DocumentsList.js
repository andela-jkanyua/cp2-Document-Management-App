import React, { PropTypes } from 'react';
import Document from './Document';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

const DocumentList = ({ documents, handleOpen, style, onUpdate, error, deleteDocument, loadDocuments }) => (
  <div>
    {error ?
      <Snackbar
        open
        message={error.message}
        autoHideDuration={4000}
      /> : documents.map(document =>
        <Document
          key={document.id}
          document={document}
          onUpdate={onUpdate}
          deleteDocument={deleteDocument}
          loadDocuments={loadDocuments}
        />
      )}
    <div>
      <FloatingActionButton onClick={handleOpen} style={style} id="addDoc">
        <ContentAdd />
      </FloatingActionButton>
    </div>
  </div>
  );
DocumentList.PropTypes = {
  documents: PropTypes.array.isRequired,
};

export default DocumentList;
