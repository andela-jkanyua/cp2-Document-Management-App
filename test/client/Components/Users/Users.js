import expect from 'expect';
import React from 'React';
import {mount, shallow} from 'enzyme';
import TestUtils from 'react-addons-test-utils';
import User from '../../../../client/src/components/Users/Users';

let user = {
  email: 'test@example.com',
  firstName: 'test',
  lastName: 'example',
  username: 'TestE',
  Documents: []
}
function setup(user) {
  let props ={
    user,
    state: {
      user,
      error: '',
      open: false,
    },
    isFetching: false,
    handleOpen: () => {},
    dialogActions: [],
    changeEmail: () => {},
    changePassword:() => {},
    changePasswordConfirm: () => {},
    changeFirstName: () => {},
    changeLastName: () => {},
    changeUsername: () => {},
    submitForm: () => {},
  };
  return shallow(<User {...props}/>);
}
describe('User Component', () => {
  it ('renders material-ui User CARD Header', () => {
    const wrapper = setup(user);
    expect(wrapper.find('CardHeader').props().title).toEqual('test example');
    expect(wrapper.find('CardHeader').props().subtitle).toEqual('Email: test@example.com');
  });

  it ('renders material-ui User CARD List Items', () => {
    const wrapper = setup(user);
    expect(wrapper.find('ListItem').first().props().secondaryText).toEqual('test');
    expect(wrapper.find('ListItem').at(1).props().secondaryText).toEqual('example');
    expect(wrapper.find('ListItem').at(2).props().secondaryText).toEqual('TestE');
    expect(wrapper.find('ListItem').at(3).props().secondaryText).toEqual('test@example.com');
    expect(wrapper.find('ListItem').at(4).props().secondaryText).toEqual('0');
  });

  it ('renders correct number of created documents', () => {
    const wrapper = setup(Object.assign({}, user, {Documents: ['Doc1', 'Doc2', 'Doc3']}));
    expect(wrapper.find('ListItem').at(4).props().secondaryText).toEqual('3');
  });
});
