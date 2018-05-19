import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_BOXES } from '../../actions/types';
import { getBoxesCompleted, getBoxesFailed } from '../../actions';

import ACADService from 'services/ACADService';

export default function* getBoxesSaga() {
  yield takeEvery(GET_BOXES, getBoxesHandler);
}

function* getBoxesHandler({ payload }) {
  try {
    const response = yield call(ACADService.getBoxes, payload);
    yield put(getBoxesCompleted(response.data));
  } catch (error) {
    console.error(error);
    yield put(getBoxesFailed(error));
  }
}
