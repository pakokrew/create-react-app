import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { reducerName as REDUCER, reducer } from '../business/reducer';

const reducers = combineReducers({
  [REDUCER]: reducer,
  form: formReducer,
});

export default reducers;
