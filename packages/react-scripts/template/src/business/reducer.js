import { generateReducer } from '../helpers/redux/reducerGenerator';

export const reducerName = 'reducer';

export const elms = {
  "alice": null, // All to defaults
  "bob": { // customized prop
    actionMiddleware: v => v * 2,
    handlerMiddleware: (newValue, oldValue) => (newValue + oldValue),
    selectorMiddleware: v => v * 100,
    initialValue: 10,
    defaultValue: 0,
  },
  "charles": {
    async: true,
  },
  "didier": {
    async: true,
    actionMiddleware: v => v * 2,
    handlerMiddleware: (newValue, oldValue) => (newValue + oldValue),
    selectorMiddleware: v => v * 100,
    initialValue: 10,
    defaultValue: 0,
  },
};

export const syncReducer = generateReducer(reducerName, elms);

export const utilities = syncReducer.utilities;
export const reducer = syncReducer.reducer;

export const selAlice = utilities('alice').selector;
export const setAlice = utilities('alice').action;

export const selBob = utilities('bob').selector;
export const setBob = utilities('bob').action;

export const selCharles = utilities('charles').asyncSelector;
export const setCharlesStart = utilities('charles').asyncActions.start;
export const setCharlesResolve = utilities('charles').asyncActions.resolve;

export const selDidier = utilities('didier').asyncSelector;
export const setDidierStart = utilities('didier').asyncActions.start;
export const setDidierReject = utilities('didier').asyncActions.reject;
