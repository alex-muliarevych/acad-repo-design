import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

const appReducer = combineReducers({
  routing
});

/**
 * Resets store state after user logs out
 * @param {Object} state - Redux store state object
 * @param {Object} action - Redux action
 * @param {string} action.type
 * @return {(Object|undefined)}
 */
export default (state, action) => {
  return appReducer(state, action);
};
