import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_SCHEMA } from '../../actions/types';
import { getSchemaCompleted, getSchemaFailed } from '../../actions';

import SchemaService from 'services/SchemaService';

export default function* getSchemaSaga() {
  yield takeEvery(GET_SCHEMA, getSchemaHandler);
}

function* getSchemaHandler({ payload }) {
  try {
    const response = yield call(SchemaService.getSchema, payload);
    yield put(getSchemaCompleted(response.data));
  } catch (error) {
    console.error(error);
    yield put(getSchemaFailed(error));
  }
}
