import { createStore as createReduxStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import { createLogger } from "redux-logger";

import rootReducer from "./reducers/appReducer/appReducer";
import rootSaga from "./sagas/appSaga/appSaga";

import { isWindow } from 'helpers/windowHelpers';

const isDevelopment = process.env.NODE_ENV === "development";

function createStore(preloadedState = {}) {
  const sagaMiddleware = createSagaMiddleware();

  const middlewares = [sagaMiddleware];
  let composeEnhancers = compose;

  if (isWindow()) {
    const logger = createLogger({
      duration: true,
      timestamp: true,
      level: "info",
      collapsed: true
    });

    middlewares.push(logger);

    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  }

  const store = createReduxStore(
    rootReducer,
    preloadedState,
    composeEnhancers(
      applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(rootSaga);
  
  return store;
}

const preloadedState = (isWindow() && window.PRV && window.PRV.preloadedState) || {};
export default createStore(preloadedState);
