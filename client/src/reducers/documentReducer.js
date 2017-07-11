import * as types from '../actions/actionTypes';

export default function documentReducer(state = [], action) {
  switch (action.type) {
    case types.LOAD_DOCUMENTS_SUCCESS:
      return action.documents;
    case types.LOAD_DOCUMENTS_FAILURE:
      return { error: action.error };
    case types.CREATE_DOCUMENT_SUCCESS:
      return state;
    case types.EDIT_DOCUMENT_REQUEST:
      return [action.document];
    case types.EDIT_DOCUMENT_SUCCESS:
      return [action.document];
    case types.PRIVATE_DOCUMENT_SUCCESS:
      return action.documents;
    case types.PRIVATE_DOCUMENT_ERROR:
      return { error: action.error };
    case types.DELETE_DOCUMENTS_SUCCESS:
      return state;
    case types.DELETE_DOCUMENTS_FAILURE:
      return { error: action.error };
    default:
      return state;
  }
}
