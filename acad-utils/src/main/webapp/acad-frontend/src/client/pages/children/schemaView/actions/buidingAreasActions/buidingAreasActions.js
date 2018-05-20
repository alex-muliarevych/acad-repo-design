import * as actionTypes from './buidingAreasActionTypes';

export function getBuildingAreas(id) {
  return {
    type: actionTypes.GET_BUILDING_AREAS,
    payload: id
  };
}

export function getBuildingAreasCompleted(data) {
  return {
    type: actionTypes.GET_BUILDING_AREAS_COMPLETED,
    payload: data
  };
}

export function getBuildingAreasFailed(error) {
  return {
    type: actionTypes.GET_BUILDING_AREAS_FAILED,
    error
  };
}

export function saveBuildingArea(id) {
  return {
    type: actionTypes.SAVE_BUILDING_AREA,
    payload: id
  };
}

export function saveBuildingAreaCompleted(data) {
  return {
    type: actionTypes.SAVE_BUILDING_AREA_COMPLETED,
    payload: data
  };
}

export function saveBuildingAreaFailed(error) {
  return {
    type: actionTypes.SAVE_BUILDING_AREA_FAILED,
    error
  };
}
