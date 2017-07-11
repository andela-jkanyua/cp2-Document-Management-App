import React, { PropTypes } from 'react'
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import { AuthWrapper } from '../../../../client/src/containers/Auth/AuthPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { TextValidator } from 'react-material-ui-form-validator';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TestUtils from 'react-addons-test-utils';

const props = {
  actions: {loginUser: () => { return Promise.resolve(); }},
  appState: {},
}
const App = () => (
  <MuiThemeProvider>
    <AuthWrapper {...props} />
  </MuiThemeProvider>
);
describe('Auth Container', () => {

  it ('Renders html', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    )
    expect(wrapper.html()).toExist
  });

  it('renders two text fields', () => {
    const wrapper = mount(<App {...props}/>);
    expect(wrapper.find(TextValidator).length).toEqual(2);
  });
  it('renders a email text field', () => {
    const wrapper = mount(<App {...props}/>);
    expect(wrapper.find(TextValidator).first().props().name).toEqual('email');
  });

  it('renders a password field', () => {
    const wrapper = mount(<App {...props}/>);
    expect(wrapper.find(TextValidator).last().props().name).toEqual('password');
  });

  it('renders a log in button', () => {
    const wrapper = mount(<App {...props}/>);
    expect(wrapper.find(RaisedButton).length).toEqual(1);
  });

});
