import * as constants from './actionTypes';
import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtility';

export function loginSuccess(user) {
  return {
    type: constants.LOGIN_SUCCESS,
    user
  };
}


export function loginUser(credentials) {
  return dispatch => {
    dispatch(loginRequest(credentials));
    return (
      request
        .post('login/')
        .send(credentials)
        .then((response) => {
          tokenUtils.setAuthToken(response.body.token);
          dispatch(loginSuccess(response.body));
        }).catch((err) => {
          err => {throw(err);
        })
    );
  };
}
