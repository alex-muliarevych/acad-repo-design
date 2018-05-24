import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { GET_SCHEMA, SAVE_SCHEMA } from '../../actions/types';
import {
  getSchemaCompleted,
  getSchemaFailed,
  getBoxes,
  getBuildingAreas,
  saveSchemaCompleted,
  saveBoxFailed,
  saveSchemaFailed
} from '../../actions';

import ACADService from 'services/ACADService';

export default function* schemaSaga() {
  yield takeEvery(GET_SCHEMA, getSchemaHandler);
  yield takeLatest(SAVE_SCHEMA, saveSchemaHandler);
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

function* saveSchemaHandler({ payload }) {
  try {
    yield put(saveSchemaCompleted(payload));
    yield delay(300);
    yield call(ACADService.saveSchema, payload.id, payload);
  } catch (error) {
    console.error(error);
    yield put(saveSchemaFailed(error));
  }
}
