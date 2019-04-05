import { combineReducers } from 'redux';

import { root } from './root.reducer';
import { search } from './search.reducer';

const rootReducer = combineReducers({
  root,
  search
});

export default rootReducer;