import { generateASyncReducer } from '../helpers/redux/asyncProp';

export const reducerName = 'reducer_async';

export const elms = {
  "alice": null, // All to defaults
  "bob": { // customized prop
    actionMiddleware: v => v * 2,
    handlerMiddleware: (newValue, oldValue) => (newValue + oldValue),
    selectorMiddleware: v => v * 100,
    initialValue: 10,
    defaultValue: 0,
  }
};

export const syncReducer = generateASyncReducer(reducerName, elms);

export const utilities = syncReducer.utilities;
export const reducer = syncReducer.reducer;

export const selAlice = utilities('alice').selector;
export const setAlice = utilities('alice').action;

export const selBob = utilities('bob').selector;
export const setBob = utilities('bob').action;
