import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const Footer = () => (
  <footer className="mdl-mega-footer">
    <div className="mdl-mega-footer--middle-section">
      <div className="mdl-mega-footer--drop-down-section">
        <h1 className="mdl-mega-footer--heading">Site Map</h1>
        <ul className="mdl-mega-footer--link-list">
          <li><Link to="about">About</Link></li>
          <li><Link to="profile">Profile</Link></li>
          <li><Link to="documents">Documents</Link></li>
        </ul>
      </div>
    </div>
    <div className="mdl-mega-footer--bottom-section">
      <div className="mdl-logo">
                  More Information
                </div>
      <ul className="mdl-mega-footer--link-list">
        <li><a href="https://github.com/andela-jkanyua/cp2-Document-Management-App.git">Github</a></li>
      </ul>
    </div>
  </footer>
  );
export default Footer;
