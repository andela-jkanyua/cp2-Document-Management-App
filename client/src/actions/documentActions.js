import * as types from './actionTypes';
import request from 'superagent';

export function loadDocumentsSuccess(documents){
  return {type: types.LOAD_DOCUMENTS_SUCCESS, documents};
}
export function createDocumentSuccess(document){
  return {type: types.CREATE_DOCUMENT_SUCCESS, document};
}

export function loadDocuments() {
  return (dispatch) => {
    return (
      request
        .get('documents/')
        .then(response => {
          dispatch(loadDocumentsSuccess(response.body));
        }).catch(error => { throw(error);
        })
    );
  };
}
export function createDocument(document) {
  return (dispatch) => {
    return (
      request
        .post('documents/')
        .set('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo4LCJlbWFpbCI6ImpAZ21haWwuY29tIiwicm9sZUlkIjoxfSwiaWF0IjoxNDkwMDA0NTgwLCJleHAiOjE0OTAwOTA5ODB9.FFTpYoTUgF8MkL50MRh3AOm9XChhTsTtEwg_oVcVXig')
        .send(document)
        .then(response => {
          dispatch(createDocumentSuccess(response.body));
        }).catch(error => { throw(error);
        })
    );
  };
}
