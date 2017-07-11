import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Header = ({ isAuthenticated, logoutUser }) => (
  <header className="mdl-layout__header mdl-layout__header--scroll mdl-color--primary">
    <div className="mdl-layout--large-screen-only mdl-layout__header-row" />
    <div className="mdl-layout--large-screen-only mdl-layout__header-row">
      <h3>Document Management System</h3>
    </div>
    <div className="mdl-layout--large-screen-only mdl-layout__header-row" />
    <div className="mdl-layout__tab-bar mdl-js-ripple-effect mdl-color--primary-dark">
      <Link to="/" className="mdl-layout__tab">Home</Link>
      <Link to="profile" className="mdl-layout__tab">Profile</Link>
      <Link to="documents" className="mdl-layout__tab">Documents</Link>
      <Link to="about" className="mdl-layout__tab">About</Link>
      {!isAuthenticated &&
        <Link to="login" className="mdl-layout__tab"> LogIn </Link>
              }
      {isAuthenticated &&
        <Link to="/" onClick={() => logoutUser()} className="mdl-layout__tab">Log Out</Link>
            }

    </div>
  </header>
  );
export default Header;
