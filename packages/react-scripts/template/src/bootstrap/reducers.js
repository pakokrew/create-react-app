import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { ASYNC_STATE_KEY, asyncReducer } from '../helpers/redux/asyncActions';

import { reducerName as REDUCER_SYNC, reducer as reducerSync } from '../business/reducerSync';
import { reducerName as REDUCER_ASYNC, reducer as reducerAsync } from '../business/reducerAsync';

const dether = combineReducers({
  [ASYNC_STATE_KEY]: asyncReducer,
  [REDUCER_SYNC]: reducerSync,
  [REDUCER_ASYNC]: reducerAsync,
  form: formReducer,
});

export default dether;
