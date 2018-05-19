import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_SCHEMA } from '../../actions/types';
import {
  getSchemaCompleted,
  getSchemaFailed,
  getBoxes,
  getBuildingAreas
} from '../../actions';

import ACADService from 'services/ACADService';

export default function* getSchemaSaga() {
  yield takeEvery(GET_SCHEMA, getSchemaHandler);
}

function* getSchemaHandler({ payload }) {
  try {
    const response = yield call(ACADService.getSchema, payload);
    yield put(getSchemaCompleted(response.data));
    yield put(getBoxes(payload));
    yield put(getBuildingAreas(payload));
  } catch (error) {
    console.error(error);
    yield put(getSchemaFailed(error));
  }
}
