import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes/routes';
import './styles/material.css';
import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
  <MuiThemeProvider>
   <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
);

render(
   <App />,
   document.getElementById('app')
);
