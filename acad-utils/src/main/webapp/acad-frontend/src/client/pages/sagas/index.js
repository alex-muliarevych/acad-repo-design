import { all, fork } from 'redux-saga/effects';

import schemaViewSaga from '../children/schemaView/sagas';

export default function* rootPageSaga() {
  yield all([
    fork(schemaViewSaga)
  ]);
}
