import { all, fork } from 'redux-saga/effects';

import pages from '../../pages/sagas';

export default function* root() {
  yield all([
    fork(pages)
  ]);
}
