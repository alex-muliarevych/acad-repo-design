import { all, fork } from 'redux-saga/effects';

import getSchemaSaga from './getSchemaSaga/getSchemaSaga';

export default function* schemaSaga() {
  yield all([
    fork(getSchemaSaga)
  ]);
}
