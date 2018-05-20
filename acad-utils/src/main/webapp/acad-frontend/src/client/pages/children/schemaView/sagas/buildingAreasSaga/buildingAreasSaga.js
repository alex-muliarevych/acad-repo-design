import { call, put, select, takeEvery } from 'redux-saga/effects';

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
  yield takeEvery(SAVE_BUILDING_AREA, saveBuildingAreaHandler);
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
  const { currentTarget: { attrs } } = payload;

  const schema = yield select(getSchema);
  const item = yield select(getBuildingArea(attrs.id));

  try {
    const updatedArea = updateArea(item, attrs, schema);
    const response = yield call(ACADService.saveBuildingArea, item.schemaId, updatedArea);
    yield put(saveBuildingAreaCompleted(response.data));
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
