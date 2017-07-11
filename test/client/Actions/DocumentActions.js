import expect from 'expect';
import * as documentActions from '../../../client/src/actions/documentActions';
import * as types from '../../../client/src/actions/actionTypes';
const documents = []
const error = 'error'

describe('Document Actions', () => {
  it('should create a load documents success action', () => {
    const expectedAction = {
      type: types.LOAD_DOCUMENTS_SUCCESS,
      documents
    }
    const action = documentActions.loadDocumentsSuccess(documents);
    expect(action).toEqual(expectedAction)
  });

  it('should create a load documents failure action', () => {
    const expectedAction = {
      type: types.LOAD_DOCUMENTS_FAILURE,
      error
    }
    const action = documentActions.loadDocumentsFailure(error);
    expect(action).toEqual(expectedAction)
  });

  it('should create a delete documents action', () => {
    const expectedAction = {
      type: types.DELETE_DOCUMENTS_SUCCESS,
    }
    const action = documentActions.deleteDocumentSuccess();
    expect(action).toEqual(expectedAction)
  });

  it('should create a delete documents failure action', () => {
    const expectedAction = {
      type: types.DELETE_DOCUMENTS_FAILURE,
      error
    }
    const action = documentActions.deleteDocumentFailure(error);
    expect(action).toEqual(expectedAction)
  });

  it('should create an edit documents request action', () => {
    const document = []
    const expectedAction = {
      type: types.EDIT_DOCUMENT_REQUEST,
      document
    }
    const action = documentActions.editDocumentsRequest(document);
    expect(action).toEqual(expectedAction)
  });

  it('should create an edit documents success action', () => {
    const document = []
    const expectedAction = {
      type: types.EDIT_DOCUMENT_SUCCESS,
      document
    }
    const action = documentActions.editDocumentsSuccess(document);
    expect(action).toEqual(expectedAction)
  });

  it('should create an create documents success action', () => {
    const document = []
    const expectedAction = {
      type: types.CREATE_DOCUMENT_SUCCESS,
      document
    }
    const action = documentActions.createDocumentSuccess(document);
    expect(action).toEqual(expectedAction)
  });

  it('should create a private documents success action', () => {
    const expectedAction = {
      type: types.PRIVATE_DOCUMENT_SUCCESS,
      documents
    }
    const action = documentActions.privateDocumentsSuccess(documents);
    expect(action).toEqual(expectedAction)
  });

  it('should create a private documents error action', () => {
    const expectedAction = {
      type: types.PRIVATE_DOCUMENT_ERROR,
      error
    }
    const action = documentActions.privateDocumentsError(error);
    expect(action).toEqual(expectedAction)
  });

});
