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
export function loadDocumentsFailure(error) {
  return { type: types.LOAD_DOCUMENTS_FAILURE, error };
}

/**
 * @override
 */
export function deleteDocumentSuccess() {
  return { type: types.DELETE_DOCUMENTS_SUCCESS };
}

/**
 * @override
 */
export function deleteDocumentFailure(error) {
  return { type: types.DELETE_DOCUMENTS_FAILURE, error };
}

/**
 * @override
 */
export function editDocumentsRequest(document) {
  return { type: types.EDIT_DOCUMENT_REQUEST, document };
}

/**
 * @override
 */
export function editDocumentsSuccess(document) {
  return { type: types.EDIT_DOCUMENT_SUCCESS, document };
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
export function privateDocumentsSuccess(documents) {
  return { type: types.PRIVATE_DOCUMENT_SUCCESS, documents };
}

export function privateDocumentsError(error) {
  return { type: types.PRIVATE_DOCUMENT_ERROR, error };
}

/**
 * @override
 */
export function loadDocuments(searchTerm) {
  if (searchTerm) {
    searchTerm = encodeURIComponent(searchTerm);
    return dispatch => (
        request
          .get(`api/search/documents/?q=${searchTerm}`)
          .set('x-access-token', tokenUtils.getAuthToken())
          .then((response) => {
            console.log(response);
            dispatch(loadDocumentsSuccess(response.body));
          }).catch((error) => {
            dispatch(loadDocumentsFailure(error.response.body));
          })
      );
  }
  return dispatch => (
      request
        .get('api/documents/')
        .then((response) => {
          dispatch(loadDocumentsSuccess(response.body));
        }).catch((error) => {
          dispatch(loadDocumentsFailure(error.response.body));
        })
    );
}
/**
 * @override
 */
export function createDocument(document) {
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
/**
 * @override
 */
export function editDocument(document) {
  return dispatch => (
      request
        .put(`api/documents/${document.id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .send(document)
        .then((response) => {
          dispatch(editDocumentsSuccess(response.body));
        })
        .catch((error) => {
          throw (error);
        })
    );
}

export function loadPrivateDocuments(id) {
  return dispatch => (
      request
        .get(`/api/users/${id}/documents`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .then((response) => {
          dispatch(privateDocumentsSuccess(response.body));
        })
        .catch((error) => {
          dispatch(privateDocumentsError(error.response.body));
        })
    );
}
/**
 * @override
 */
export function deleteDocument(id) {
  return dispatch => (
      request
        .delete(`api/documents/${id}`)
        .set('x-access-token', tokenUtils.getAuthToken())
        .then((response) => {
          console.log(response);
          dispatch(deleteDocumentSuccess());
        })
        .catch((error) => {
          dispatch(deleteDocumentFailure(error));
        })
    );
}
