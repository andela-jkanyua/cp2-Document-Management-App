import expect from 'expect';
import * as authActions from '../../../client/src/actions/authActions';
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
describe('Auth Actions', () => {
  describe('Login Actions', () => {
    it('should create a login request course action', () => {
      const creds = {email: 'test@example.com', password: 'password'}
      const expectedAction = {
        type: types.LOGIN_REQUEST,
        isFetching: true,
        isAuthenticated: false,
        creds
      }
      const action = authActions.requestLogin(creds);
      expect(action).toEqual(expectedAction)
    });

    it('should create a receive login request course action', () => {
      const expectedAction = {
        type: types.LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user,
        token: 'XXTOKENXX'
      }
      const action = authActions.receiveLogin(user);
      expect(action).toEqual(expectedAction)
    });

    it('should create a  login error course action', () => {
      const expectedAction = {
        type: types.LOGIN_FAILURE,
        isFetching: false,
        isAuthenticated: false,
        message: "Error",
      }
      const msg = "Error"
      const action = authActions.loginError(msg);
      expect(action).toEqual(expectedAction)
    });

    it('should create a request logout action', () => {
      const expectedAction = {
        type: types.LOGOUT_REQUEST,
        isFetching: true,
        isAuthenticated: true,
      }
      const action = authActions.requestLogout();
      expect(action).toEqual(expectedAction)
    });

    it('should create a receive logout action', () => {
      const expectedAction = {
        type: types.LOGOUT_SUCCESS,
        isFetching: false,
        isAuthenticated: false,
      }
      const action = authActions.receiveLogout();
      expect(action).toEqual(expectedAction)
    });

    it('should create a request signup action', () => {
      const expectedAction = {
        type: types.SIGNUP_REQUEST,
        isFetching: true,
        isSignedUp: false,
        userDetails: user
      }
      const action = authActions.requestSignup(user);
      expect(action).toEqual(expectedAction)
    });

    it('should create a receive signup action', () => {
      const expectedAction = {
        type: types.SIGNUP_SUCCESS,
        isFetching: false,
        isSignedUp: true
      }
      const action = authActions.receiveSignup(user);
      expect(action).toEqual(expectedAction)
    });

    it('should create a receive signup error action', () => {
      const expectedAction = {
        type: types.SIGNUP_FAILURE,
        isFetching: false,
        isSignedUp: false,
        message: {message: 'test error', success:false}
      }
        const msg =  {message: 'test error', success:false}
      const action = authActions.signupError(msg);
      expect(action).toEqual(expectedAction)
    });

    it('should create a receive signup error action', () => {
      const expectedAction = {
        type: types.SIGNUP_FAILURE,
        isFetching: false,
        isSignedUp: false,
        message: {message: 'test error', success:false}
      }
        const msg =  {message: 'test error', success:false}
      const action = authActions.signupError(msg);
      expect(action).toEqual(expectedAction)
    });
  });
});
