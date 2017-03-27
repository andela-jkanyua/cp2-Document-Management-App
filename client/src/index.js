import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes/routes';
import './styles/material.css';
import './styles/styles.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
import { loadDocuments } from './actions/documentActions';

const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const store = configureStore();
store.dispatch(loadDocuments());
const App = () => (
  <MuiThemeProvider>
    <Router history={browserHistory} routes={routes} />
  </MuiThemeProvider>
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
   document.getElementById('app')
);
