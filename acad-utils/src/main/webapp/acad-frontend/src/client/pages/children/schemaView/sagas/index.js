import { all, fork } from 'redux-saga/effects';

import schemaSaga from './schemaSaga/schemaSaga';
import boxesSaga from './boxesSaga/boxesSaga';
import buildingAreasSaga from './buildingAreasSaga/buildingAreasSaga';

export default function* schemaViewSaga() {
  yield all([
    fork(schemaSaga),
    fork(boxesSaga),
    fork(buildingAreasSaga)
  ]);
}
