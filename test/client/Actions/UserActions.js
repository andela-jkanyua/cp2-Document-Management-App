import expect from 'expect';
import * as userActions from '../../../client/src/actions/userActions';
import * as types from '../../../client/src/actions/actionTypes';
const user = {
  email: 'test@example.com',
  firstName: 'test',
  lastName: 'example',
  username: 'TestE',
  Documents: [],
  success: true,
  token: 'XXTOKENXX'
}

describe('User Actions', () => {
  it('should create a request user course action', () => {
    const expectedAction = {
      type: types.GET_USERS_REQUEST,
      isFetching: true,
    }
    const action = userActions.requestUser();
    expect(action).toEqual(expectedAction)
  });

  it('should create a receive user course action', () => {
    const expectedAction = {
      type: types.GET_USERS_SUCCESS,
      isFetching: false,
      user
    }
    const action = userActions.receiveUser(user);
    expect(action).toEqual(expectedAction)
  });

  it('should create a get user error action', () => {
    const error = {error: 'error'}
    const expectedAction = {
      type: types.GET_USER_FAILURE,
      isFetching: false,
      error
    }
    const action = userActions.receiveUserFailure(error);
    expect(action).toEqual(expectedAction)
  });
});
