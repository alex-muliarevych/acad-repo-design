import * as actionTypes from './boxesActionTypes';

export function getBoxes(id) {
  return {
    type: actionTypes.GET_BOXES,
    payload: id
  };
}

export function getBoxesCompleted(data) {
  return {
    type: actionTypes.GET_BOXES_COMPLETED,
    payload: data
  };
}

export function getBoxesFailed(error) {
  return {
    type: actionTypes.GET_BOXES_FAILED,
    error
  };
}
