import * as constants from './actionTypes';
import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtility';


export function requestLogin(creds) {
  return {
    type: constants.LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  };
}

export function receiveLogin(user) {
  return {
    type: constants.LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: user.success,
    token: user.token,
    user
  };
}

export function loginError(message) {
  return {
    type: constants.LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message: JSON.parse(message.text)

  };
}
export function requestLogout() {
  return {
    type: constants.LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  };
}

export function receiveLogout() {
  return {
    type: constants.LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  };
}

export function loginUser(credentials) {
  return (dispatch) => {
    dispatch(requestLogin(credentials));
    return (
      request
        .post('api/login')
        .send(credentials)
        .then((response) => {
          tokenUtils.setAuthToken(response.body.token);
          dispatch(receiveLogin(response.body));
        }).catch((err) => {
          console.log(err.response);
          dispatch(loginError(err.response));
        })
    );
  };
}


// Logs the user out
export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    tokenUtils.removeAuthToken();
    dispatch(receiveLogout());
  };
}
