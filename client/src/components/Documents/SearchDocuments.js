import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import AutoComplete from 'material-ui/AutoComplete';


const SearchDoc = props => (
  <div>
    <AutoComplete
      hintText="Search Documents"
      dataSource={props.dataSource}
      onUpdateInput={props.onUpdateInput}
    />

    <FlatButton
      label="Search" primary
      onTouchTap={(e) => {
        e.preventDefault();
        props.loadDocuments(props.searchTerm);
      }}
    />
  </div>
  );
SearchDoc.PropTypes = {
  dataSource: PropTypes.array.isRequired,
  handleUpdateInput: PropTypes.func.isRequired,
  searchDocument: PropTypes.func.isRequired,
};

export default SearchDoc;
