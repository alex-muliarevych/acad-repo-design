import * as actionTypes from '../actions/types';

const defaultState = {};

export default function schemaViewReducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.GET_SCHEMA_COMPLETED: return action.payload;
    default: return state;
  }
}
