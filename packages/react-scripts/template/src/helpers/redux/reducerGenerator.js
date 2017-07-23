import { createSelector } from 'reselect';
import { createReducer, selectProperty } from './tools';

const STEPS = {
  LOADING: 0,
  RESOLVED: 1,
  REJECTED: 2,
};

const AsyncProperty = (isLoading, data, error) => ({
  isLoading: isLoading || false,
  data: data || null,
  error: error || null,
  isAsyncProperty: 'forsure',
});

const actionName = (reducerName, propName) => `SET_${reducerName}_${propName}`;
const asyncActionName = (reducerName, propName, step) => `SET_${reducerName}_${propName}_as_${step}`;

const defaultMiddleware = value => value;

const defaultAction = (reducerName, propName, middleware) => (...actionArgs) => ({
  type: actionName(reducerName, propName),
  value: middleware(...actionArgs),
});

const defaultAsyncActions = (reducerName, propName, middleware) => ({
  start: () => ({
    type: asyncActionName(reducerName, propName, STEPS.LOADING),
  }),
  resolve: (...args) => ({
    type: asyncActionName(reducerName, propName, STEPS.RESOLVED),
    value: middleware(...args),
  }),
  reject: (error) => ({
    type: asyncActionName(reducerName, propName, STEPS.REJECTED),
    error,
  }),
});

const defaultHandler = (reducerName, propName, middleware) => (state, { value }) => ({
  ...state,
  [propName]: middleware(value, state[propName]),
});

const defaultAsyncHandlers = (reducerName, propName, middleware) => ({
  start: (state) => ({
    ...state,
    [propName]: {
      isLoading: true,
    },
  }),
  resolve: (state, { value }) => ({
    ...state,
    [propName]: {
      isLoading: false,
      data: middleware(value),
      error: null,
    },
  }),
  reject: (state, { error }) => ({
    ...state,
    [propName]: {
      isLoading: false,
      data: null,
      error,
    },
  }),
});

const defaultSelector = (reducerName, propName, defaultValue = null, selectorMiddleware) => {
  const selector = selectProperty([reducerName, propName], defaultValue);

  if(selectorMiddleware) {
    return createSelector(selector, selectorMiddleware);
  } else {
    return selector;
  }
};

const defaultAsyncSelector = (reducerName, propName, defaultValue = null, selectorMiddleware) => {
  const selector = selectProperty([reducerName, propName], defaultValue);

  if(selectorMiddleware) {
    return createSelector(selector,
      asyncProp => ({
        isLoading: asyncProp.isLoading,
        data: selectorMiddleware(asyncProp.data),
        error: asyncProp.error,
      }));
  } else {
    return selector;
  }
};

const syncProp = (reducerName, propName, reducerElmts) => {
  const elms = reducerElmts || {};
  const defaultValue = elms.defaultValue || null;
  const initialValue = elms.async ?
    AsyncProperty(false, elms.initialValue) : (elms.initialValue || null);

  const actionMiddleware = elms.actionMiddleware || defaultMiddleware;
  const handlerMiddleware = elms.handlerMiddleware || defaultMiddleware;
  const selectorMiddleware = elms.selectorMiddleware || defaultMiddleware;

  return {
    reducerName,
    propName,
    defaultValue,
    initialValue,
    action:         defaultAction(reducerName, propName, actionMiddleware),
    handler:        defaultHandler(reducerName, propName, handlerMiddleware),
    selector:       defaultSelector(reducerName, propName, defaultValue, selectorMiddleware),
    asyncActions:   defaultAsyncActions(reducerName, propName, actionMiddleware),
    asyncHandlers:  defaultAsyncHandlers(reducerName, propName, handlerMiddleware),
    asyncSelector:  defaultAsyncSelector(reducerName, propName, defaultValue, selectorMiddleware),
  };
};

export const generateReducer = (reducerName, propElms) => {
  const propNames = Object.keys(propElms);

  const propObject = propNames.reduce((acc, propName) => ({
    ...acc,
    [propName]: syncProp(reducerName, propName, propElms[propName]),
  }), {});

  const utilities = propName => propObject[propName];

  const initialState =    propNames.reduce((acc, propName) => ({
    ...acc,
    [propName]: utilities(propName).initialValue,
  }), {});

  const actionsHandlers = propNames.reduce((acc, propName) => ({
    ...acc,
    [actionName(reducerName, propName)]:                      utilities(propName).handler,
    [asyncActionName(reducerName, propName, STEPS.LOADING)]:  utilities(propName).asyncHandlers.start,
    [asyncActionName(reducerName, propName, STEPS.RESOLVED)]: utilities(propName).asyncHandlers.resolve,
    [asyncActionName(reducerName, propName, STEPS.REJECTED)]: utilities(propName).asyncHandlers.reject,
  }), {});

  const reducer = createReducer(initialState, actionsHandlers);

  return {
    reducer,
    utilities,
  };
};
