import React from 'react';
import { Link } from 'react-router';

class HomePage extends React.Component {
  render() {
    return (
      <div className="section no-pad-bot" id="index-banner">
        <div className="container">
          <div className="row center">
            <h5 className=" col s12 light">A modern responsive react app to manage documents. Front-end framework based on Material Design</h5>
          </div>
          <div className="row center">
            <Link to="about" className="btn-large waves-effect waves-light orange"> Learn More </Link>
          </div>
        </div>
      </div>
    );
  }
}
export default HomePage;
