import React, { PropTypes } from 'react'
import expect from 'expect';
import {mount, shallow} from 'enzyme';
import {ViewDocuments} from '../../../../client/src/containers/Documents/DocumentsPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import Gravatar from 'react-gravatar';
import IconMenu from 'material-ui/IconMenu';

const props = {
  documents: [
    {
      id: 1,
      title: 'test',
      content: 'My New Test',
      access: 'public',
      createdAt: 'Fri, 07 Apr 2017 07:55:09 GMT',

      User: {
        id: 1,
        firstName: 'Jimnah',
        lastName: 'Kanyua'
      }
    },
    {
      id: 2,
      title: 'New Test',
      content: 'My New Test',
      access: 'public',
      createdAt: 'Fri, 07 Apr 2017 07:55:09 GMT',
      User: {
        id: 2,
        firstName: 'Test',
        lastName: 'Test'
      }
    },
  ],
  actions: {loadDocuments: () => { return Promise.resolve(); }},
  onSetAccess: () => Promise.resolve(),
  handleUpdateInput: () => Promise.resolve(),
  handleOpen: () => Promise.resolve(),
  handleClose: () => Promise.resolve(),
}
const App = () => (
  <MuiThemeProvider>
    <ViewDocuments {...props} />
  </MuiThemeProvider>
);

describe('Documents Container', () => {

  it ('Renders html', () => {
    const wrapper = mount(
      <MuiThemeProvider>
        <App />
      </MuiThemeProvider>
    )
    expect(wrapper.html()).toExist
  });

  it('shows document card', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Card)).toBe.defined
  });

  it('shows card header contents', () => {
    const wrapper = mount(<App {...props} />);
    expect(wrapper.find(CardHeader).first().props().title).toEqual('Jimnah Kanyua');
    expect(wrapper.find(CardHeader).last().props().subtitle).toEqual('Created on: Fri, 07 Apr 2017 07:55:09 GMT');
  });

  it('displays a gravatar', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(Gravatar)).toBe.defined;
  });

  it('displays document title', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(CardTitle)).toBe.defined;
    expect(wrapper.find(CardTitle).last().props().title).toEqual('Title: New Test');
  });

  it('ensures document content is hidden by default', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(CardTitle).last().props().actAsExpander).toEqual(true);
  });

  it('displays document content', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(CardText)).toBe.defined;
  });

  it('shows icon menu if user is able to edit', () => {
    const wrapper = mount(<App />);
    expect(wrapper.find(IconMenu)).toBe.defined;
  });

});
