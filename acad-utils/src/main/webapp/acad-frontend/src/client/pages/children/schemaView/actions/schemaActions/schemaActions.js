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
