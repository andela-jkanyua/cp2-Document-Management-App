import request from 'superagent';
import * as constants from './actionTypes';
import * as tokenUtils from '../utils/tokenUtility';

/**
 * Request user.
 * @param {object} creds Log in credentials.
 * @returns {object} creds and action type
 */
export function requestUser() {
  return {
    type: constants.GET_USERS_REQUEST,
    isFetching: true,
  };
}

/**
 * Receive users.
 * @param {object} user  user details object.
 * @returns {object} user and action type object
 */
export function receiveUser(user) {
  return {
    type: constants.GET_USERS_SUCCESS,
    isFetching: false,
    user
  };
}

/**
 * Receive GET USER Error.
 * @param {object} message  Error object.
 * @returns {object} Error and action type object
 */
export function receiveUserFailure(error) {
  return {
    type: constants.GET_USER_FAILURE,
    isFetching: false,
    error

  };
}

/**
 * @override
 */
export function getUser(id) {
  return (dispatch) => {
    dispatch(requestUser());
    return (
      request
        .get(`api/users/${id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .then((response) => {
          dispatch(receiveUser(response.body));
        }).catch((err) => {
          dispatch(receiveUserFailure(err.response));
        })
    );
  };
}
/**
 * @override
 */
export function editUser(user) {
  return (dispatch) => {
    dispatch(requestUser());
    return (
      request
        .put(`api/users/${user.id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .send(user)
        .then((response) => {
          dispatch(receiveUser(response.body));
        }).catch((err) => {
          dispatch(receiveUserFailure(err.response));
        })
    );
  };
}
