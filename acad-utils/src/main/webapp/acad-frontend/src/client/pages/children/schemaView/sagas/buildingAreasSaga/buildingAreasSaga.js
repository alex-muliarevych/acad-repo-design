import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Actions
import { GET_BUILDING_AREAS, SAVE_BUILDING_AREA } from '../../actions/types';
import {
  getBuildingAreasCompleted,
  getBuildingAreasFailed,
  saveBuildingAreaCompleted,
  saveBuildingAreaFailed
} from '../../actions';

// Selectors
import { getSchema, getBuildingArea } from '../../selectors';

// Helpers
import { clamp } from 'helpers/MathHelpers';

// Services
import ACADService from 'services/ACADService';

export default function* getBuildingAreasSaga() {
  yield takeEvery(GET_BUILDING_AREAS, getBuildingAreasHandler);
  yield takeLatest(SAVE_BUILDING_AREA, saveBuildingAreaHandler);
}

function* getBuildingAreasHandler({ payload }) {
  try {
    const response = yield call(ACADService.getBuildingAreas, payload);
    yield put(getBuildingAreasCompleted(response.data));
  } catch (error) {
    console.error(error);
    yield put(getBuildingAreasFailed(error));
  }
}

function* saveBuildingAreaHandler({ payload }) {
  let schema = yield select(getSchema);
  let item, attrs;

  if (!payload.id) {
    attrs = payload.currentTarget.attrs;
    
    item = yield select(getBuildingArea(attrs.id));
  }

  try {
    const updatedArea = attrs
      ? updateArea(item, attrs, schema)
      : {
        ...payload,
        posX: clamp(payload.posX, 0, schema.sizeX - payload.sizeX),
        posY: clamp(payload.posY, 0, schema.sizeY - payload.sizeY)
      };
    yield put(saveBuildingAreaCompleted(updatedArea));
    yield delay(300);
    yield call(ACADService.saveBuildingArea, updatedArea.schemaId, updatedArea);
  } catch (error) {
    console.error(error);
    yield put(saveBuildingAreaFailed(item));
  }
}

function updateArea(target, { x, y, width, height }, { sizeX, sizeY }) {
  return {
    ...target,
    posX: clamp(x, 0, sizeX - width),
    posY: clamp(y, 0, sizeY - height)
  };
}
