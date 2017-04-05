import request from 'superagent';
import * as constants from './actionTypes';
import * as tokenUtils from '../utils/tokenUtility';

/**
 * Request log in.
 * @param {object} creds Log in credentials.
 * @returns {object} creds and action type
 */
export function requestLogin(creds) {
  return {
    type: constants.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

/**
 * Receive log in.
 * @param {object} user  user details object.
 * @returns {object} user and action type object
 */
export function receiveLogin(user) {
  return {
    type: constants.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: user.success,
    token: user.token,
    user
  };
}

/**
 * Receive log in Error.
 * @param {object} message  Error object.
 * @returns {object} Error and action type object
 */
export function loginError(message) {
  return {
    type: constants.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: JSON.parse(message.text)

  };
}

/**
 * Request logout
 * @returns {object} isFetching, isAuthenticated, and action type object
 */
export function requestLogout() {
  return {
    type: constants.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

/**
 * Receive logout
 * @returns {object} isFetching, isAuthenticated, and action type object
 */
export function receiveLogout() {
  return {
    type: constants.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

/**
 * Request signup.
 * @param {object} userDetails  User signup details.
 * @returns {object} action type object
 */
export function requestSignup(userDetails) {
  return {
    type: constants.SIGNUP_REQUEST,
    isFetching: true,
    isSignedUp: false,
    userDetails
  };
}

/**
 * @override
 */
export function receiveSignup(user) {
  return {
    type: constants.SIGNUP_SUCCESS,
    isFetching: false,
    isSignedUp: user.success,
  };
}

/**
 * @override
 */
export function signupError(error) {
  return {
    type: constants.SIGNUP_FAILURE,
    isFetching: false,
    isSignedUp: error.success,
    message: error
  };
}

/**
 * @override
 */
export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(requestLogin(credentials));
    return (
      request
        .post('api/login')
        .send(credentials)
        .then((response) => {
          tokenUtils.setAuthToken(response.body.token);
          tokenUtils.setUserDetails(JSON.stringify(response.body.user));
          dispatch(receiveLogin(response.body));
        }).catch((err) => {
          dispatch(loginError(err.response));
        })
    );
  };
}
/**
 * @override
 */
export function signupUser(userDetails) {
  return (dispatch) => {
    dispatch(requestLogin(userDetails));
    return (
      request
        .post('api/users')
        .send(
          Object.assign({}, userDetails, {
            roleId: 2
          }))
        .then((response) => {
          dispatch(receiveSignup(response.body));
        }).catch((err) => {
          dispatch(signupError(err.response));
        })
    );
  };
}

/**
 * @override
 */
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    tokenUtils.removeAuthToken();
    tokenUtils.removeUserDetails();
    dispatch(receiveLogout());
  };
}
