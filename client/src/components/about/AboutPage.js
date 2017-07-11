import React from 'react';
import { Link } from 'react-router';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="container">
        <h1> About </h1>
        <p> This application uses React, Redux, React-Router and a variety of other helpful libraries</p>
        <blockquote>
         <p> The application is a full stack document management system,
           complete with roles and privileges. Each document defines access rights and the document defines which roles can access it.
           Also, each document specifies the date it was published.
           The application uses a log-in/ signup system, and allows a user to view profile details as well as edit them.
           One can also perform <code>CRUD</code> operations on their documents as well as search for public documents.
         </p>
         <footer>Jimnah Magira</footer>
       </blockquote>
      </div>
    );
  }
}

export default AboutPage;
