import { call, put, select, takeEvery } from 'redux-saga/effects';

// Actions
import { GET_BOXES, SAVE_BOX } from '../../actions/types';
import { getBoxesCompleted, getBoxesFailed, saveBoxCompleted, saveBoxFailed } from '../../actions';

// Selectors
import { getSchema, getBox } from '../../selectors';

// Helpers
import { clamp } from 'helpers/MathHelpers';

// Services
import ACADService from 'services/ACADService';

export default function* getBoxesSaga() {
  yield takeEvery(GET_BOXES, getBoxesHandler);
  yield takeEvery(SAVE_BOX, saveBoxHandler);
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

function* saveBoxHandler({ payload }) {
  const { currentTarget: { attrs } } = payload;

  const schema = yield select(getSchema);
  const item = yield select(getBox(attrs.id));

  try {
    const updatedBox = updateBox(item, attrs, schema);
    const response = yield call(ACADService.saveBox, item.schemaId, updatedBox);
    yield put(saveBoxCompleted(response.data));
  } catch (error) {
    console.error(error);
    yield put(saveBoxFailed(item));
  }
}

function updateBox(target, { x, y, width, height }, { sizeX, sizeY }) {
  return {
    ...target,
    posX: clamp(x, 0, sizeX - width),
    posY: clamp(y, 0, sizeY - height)
  };
}
