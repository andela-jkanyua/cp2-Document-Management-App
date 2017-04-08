import React, { PropTypes } from 'react';
import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card';
import Chip from 'material-ui/Chip';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/MenuItem';
import Gravatar from 'react-gravatar';
import md5 from 'blueimp-md5';
import * as tokenUtils from '../../utils/tokenUtility';

const Document = props => (

  <div className="container">

    <Card>
      { JSON.parse(tokenUtils.getUserDetails()).id === props.document.User.id ?
        <IconMenu
          style={{ float: 'right' }}
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText="Edit Document" onTouchTap={() => props.onUpdate(props.document)} />
          <MenuItem
            primaryText="Delete Document" onTouchTap={() => {
              props.deleteDocument(props.document.id)
              .then(() => {
                props.loadDocuments();
              });
            }
          }
          />
        </IconMenu> : <span />
        }
      <CardHeader
        className="card-header"
        textStyle={{ paddingLeft: 10, verticalAlign: 'middle' }}
        title={`${props.document.User.firstName} ${props.document.User.lastName}`}
        subtitle={`Created on: ${new Date(props.document.createdAt).toUTCString()}`}
        actAsExpander
      >
        <Gravatar
          email={md5(props.document.User.email)}
          style={{ float: 'left' }}
          size={50}
          rating="pg"
          default="identicon"
          className="CustomAvatar-image"
        />
      </CardHeader>
      <CardTitle
        title={`Title: ${props.document.title}`}
        actAsExpander
      />
      <Chip style={{ margin: 10 }}>
        {props.document.access}
      </Chip> <br />
      <CardText className="card-text" expandable >
        <h5>{props.document.title}</h5> <br />
        {props.document.content}
      </CardText>

    </Card><br /><br />
  </div>
  );
Document.PropTypes = {
  document: PropTypes.object.isRequired
};
export default Document;
