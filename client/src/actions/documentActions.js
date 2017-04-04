import request from 'superagent';
import * as types from './actionTypes';
import * as tokenUtils from '../utils/tokenUtility';

/**
 * @override
 */
export function loadDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENTS_SUCCESS, documents };
}

/**
 * @override
 */
export function createDocumentSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}

/**
 * @override
 */
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
/**
 * @override
 */
export function createDocument(document) {
  console.log(tokenUtils.getAuthToken())
  return dispatch => (
      request
        .post('api/documents/')
        .set('x-access-token', tokenUtils.getAuthToken())
        .send(document)
        .then((response) => {
          dispatch(createDocumentSuccess(response.body));
        })
        .catch((error) => {
          throw (error);
        })
    );
}
