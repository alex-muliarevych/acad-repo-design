import * as actionTypes from '../actions/types';

const defaultState = {
  schema: {},
  boxes: [],
  buildingAreas: [],
  selectedItem: {
    type: null,
    id: null
  }
};

export default function schemaViewReducer(state = defaultState, { type, payload, error }) {
  switch (type) {
    case actionTypes.SAVE_SCHEMA_COMPLETED: return { ...state, schema: payload };
    case actionTypes.SAVE_BOX_COMPLETED: return { 
      ...state, boxes: updateListEntry(state.boxes, payload)
    };
    case actionTypes.SAVE_BUILDING_AREA_COMPLETED: return {
      ...state, buildingAreas: updateListEntry(state.buildingAreas, payload)
    };

    case actionTypes.SAVE_SCHEMA_FAILED:
      return { ...state, schema: { ...state.schema } };
    case actionTypes.SAVE_BUILDING_AREA_FAILED:
      return { ...state, buildingAreas: [...state.buildingAreas] };
    case actionTypes.SAVE_BOX_FAILED:
      return { ...state, boxes: [...state.boxes] };

    case actionTypes.GET_SCHEMA_COMPLETED: return { ...state, schema: payload };
    case actionTypes.GET_BOXES_COMPLETED: return { ...state, boxes: payload };
    case actionTypes.GET_BUILDING_AREAS_COMPLETED: return { ...state, buildingAreas: payload };

    case actionTypes.SELECT_ITEM: return { ...state, selectedItem: payload };
      
    default:
      return state;
  }
}

function updateListEntry(list, entry) {
  return [...list.filter(item => item.id !== entry.id), entry];
}
