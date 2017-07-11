import * as types from '../actions/actionTypes';
import * as tokenUtils from '../utils/tokenUtility';

export default function userReducer(state = {
  isFetching: false
}, action) {
  switch (action.type) {
    case types.GET_USERS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
      });
    case types.GET_USERS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        user: action.user
      });
    case types.GET_USER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.error
      });
    default:
      return state;
  }
}
