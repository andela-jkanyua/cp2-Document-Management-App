import * as types from '../actions/actionTypes';

export default function documentReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      return state;
    default:
      return state;
  }
}
