import * as actionTypes from './editActionTypes';

export function selectItem(type, id) {
  return {
    type: actionTypes.SELECT_ITEM,
    payload: {
      type,
      id
    }
  };
}
