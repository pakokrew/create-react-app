import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import reducers from './reducers';

const enhancer = () => compose(
  applyMiddleware(
    thunk,
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export default () => createStore(
  reducers,
  enhancer(),
);
