import { combineReducers } from 'redux';
import { reducer as data } from './data/data';
import { reducer as state } from './state/state';
import { reducer as user } from './user/user';
import NameSpace from './name-space';

const rootReducer = combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.STATE]: state,
  [NameSpace.USER]: user,
});

type RootReducer = ReturnType<typeof rootReducer>;

export { rootReducer, RootReducer };
