import * as actionTypes from './schemaActionTypes';

export function getSchema(id) {
  return {
    type: actionTypes.GET_SCHEMA,
    payload: id
  };
}

export function getSchemaCompleted(data) {
  return {
    type: actionTypes.GET_SCHEMA_COMPLETED,
    payload: data
  };
}

export function getSchemaFailed(error) {
  return {
    type: actionTypes.GET_SCHEMA_FAILED,
    error
  };
}

export function saveSchema(id) {
  return {
    type: actionTypes.SAVE_SCHEMA,
    payload: id
  };
}

export function saveSchemaCompleted(data) {
  return {
    type: actionTypes.SAVE_SCHEMA_COMPLETED,
    payload: data
  };
}

export function saveSchemaFailed(error) {
  return {
    type: actionTypes.SAVE_SCHEMA_FAILED,
    error
  };
}
