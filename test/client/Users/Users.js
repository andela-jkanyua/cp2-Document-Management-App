import expect from 'expect';
import React from 'React';
import TestUtils from 'react-addons-test-utils';
import User from '../../../client/src/components/Users/Users';

function setup() {
  let user = {
    email:'',
    firstName: '',
    lastName: '',
    Documents: []
  }
  let props ={
    user,
    state: {
      user,
      error: '',
      open: false,
    },
    isFetching: false,
    handleOpen: () => {},
    dialogActions: {},
    changeEmail: () => {},
    changePassword:() => {},
    changePasswordConfirm: () => {},
    changeFirstName: () => {},
    changeLastName: () => {},
    changeUsername: () => {},
    submitForm: () => {},
  };

  let renderer = TestUtils.createRenderer();
  renderer.render(<User { ...props }/>);
  let output = renderer.getRenderOutput();
  return {
    props,
    output,
    renderer
  };
}
describe('User Component', () => {
  it ('renders div and material-ui CARD', () => {
    const { output } = setup();
    expect(output.type).toBe('div')
    let [Card] = output.props.children;
    expect(Card.type).toBe('Card');

  })
})
