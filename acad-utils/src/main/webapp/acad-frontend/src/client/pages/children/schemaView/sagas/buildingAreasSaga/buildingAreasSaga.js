import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_BUILDING_AREAS } from '../../actions/types';
import { getBuildingAreasCompleted, getBuildingAreasFailed } from '../../actions';

import ACADService from 'services/ACADService';

export default function* getBuildingAreasSaga() {
  yield takeEvery(GET_BUILDING_AREAS, getBuildingAreasHandler);
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
