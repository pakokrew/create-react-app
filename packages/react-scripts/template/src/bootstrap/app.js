import React from 'react';
import { Provider } from 'react-redux';

import Initializer from './initializer';
import generateStore from './generateStore';
import registerServiceWorker from './registerServiceWorker';

import Router from './router';

import '../styles/index.css';

const store = generateStore();

const App = () =>
  (
    <Provider store={store}>
      <Initializer>
        <Router />
      </Initializer>
    </Provider>
  );

registerServiceWorker();

export default App;
