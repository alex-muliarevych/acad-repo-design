import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// Actions
import { GET_BOXES, SAVE_BOX } from '../../actions/types';
import { getBoxesCompleted, getBoxesFailed, saveBoxCompleted, saveBoxFailed } from '../../actions';

// Selectors
import { getSchema, getBox } from '../../selectors';

// Helpers
import { clamp } from 'helpers/MathHelpers';

// Services
import ACADService from 'services/ACADService';

export default function* boxesSaga() {
  yield takeEvery(GET_BOXES, getBoxesHandler);
  yield takeLatest(SAVE_BOX, saveBoxHandler);
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
  let schema = yield select(getSchema);
  let item, attrs;

  if (!payload.id) {
    attrs = payload.currentTarget.attrs;
    
    item = yield select(getBox(attrs.id));
  }

  try {
    const updatedBox = attrs
      ? updateBox(item, attrs, schema)
      : {
        ...payload,
        posX: clamp(payload.posX, 0, schema.sizeX - payload.sizeX),
        posY: clamp(payload.posY, 0, schema.sizeY - payload.sizeY)
      };
    yield put(saveBoxCompleted(updatedBox));
    yield delay(300);
    yield call(ACADService.saveBox, updatedBox.schemaId, updatedBox);
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
