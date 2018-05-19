import * as actionTypes from '../actions/types';

const defaultState = {
  schema: {},
  boxes: [],
  buildingAreas: []
};

export default function schemaViewReducer(state = defaultState, { type, payload, error }) {
  switch (type) {
    case actionTypes.GET_SCHEMA_COMPLETED: return { ...state, schema: payload };
    case actionTypes.GET_BOXES_COMPLETED: return { ...state, boxes: payload };
    case actionTypes.GET_BUILDING_AREAS_COMPLETED: return { ...state, buildingAreas: payload };
    default: return state;
  }
}
