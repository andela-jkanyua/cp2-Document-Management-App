import React, { PropTypes } from 'react'
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {UserWrapper} from '../../../../client/src/containers/Users/UsersPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

let state = {
  user: {
    id: 1,
    email: 'test@example.com',
    firstName: 'test',
    lastName: 'example',
    username: 'TestE',
    Documents: []
  },
  error: '',
  open: false,
}
let actions = {
  getUser: ()=>{},
}
let props ={
  userState: {
  isFetching: false
}
}

describe('User Container', () => {

  it ('Renders html', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <UserWrapper userState={state} actions={actions} />
      </MuiThemeProvider>
    )
    expect(wrapper.html()).toExist
  });

  it ('opens a dialog when you click edit details', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <UserWrapper userState={state} actions={actions} />
      </MuiThemeProvider>
    )
    const editDetailsButton = wrapper.find('FlatButton').last();
    editDetailsButton.simulate('click');
    expect(wrapper.find('Dialog').props().open).toEqual(true);
  });


});
