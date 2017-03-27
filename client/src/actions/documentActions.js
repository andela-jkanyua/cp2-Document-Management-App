import * as types from './actionTypes';
import request from 'superagent';
import * as tokenUtils from '../utils/tokenUtility';

export function loadDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENTS_SUCCESS, documents };
}
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}

export function loadDocuments() {
  return dispatch => (
      request
        .get('api/documents/')
        .then((response) => {
          dispatch(loadDocumentsSuccess(response.body));
        }).catch((error) => {
          throw (error);
        })
    );
}
export function createDocument(document) {
  return dispatch => (
      request
        .post('api/documents/')
        .set('x-access-token', tokenUtils.getAuthToken)
        .send(document)
        .then((response) => {
          dispatch(createDocumentSuccess(response.body));
        }).catch((error) => {
          throw (error);
        })
    );
}
