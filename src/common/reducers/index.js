import { combineReducers } from 'redux';
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'

import layout from './layout';
import { reposByUser } from './about';

const rootReducer = combineReducers({
  layout : layout,
  repos : reposByUser,
  routing: routerReducer
});

export default rootReducer;