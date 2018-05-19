import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

import pages from '../../pages/reducers';

export default combineReducers({
  pages,
  routing
});
