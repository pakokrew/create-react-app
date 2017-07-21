import { createSelector } from 'reselect';
import { createReducer, selectProperty } from './tools';

const actionName = (reducerName, propName) => `SET_${reducerName}_${propName}`;

const defaultMiddleware = value => value;

const defaultAction = (reducerName, propName, middleware) => (value) => ({
  type: actionName(reducerName, propName),
  value: middleware(value),
});

const defaultHandler = (reducerName, propName, middleware) => (state, { value }) => ({
  ...state,
  [propName]: middleware(value, state[propName]),
});

const defaultSelector = (reducerName, propName, defaultValue = null, selectorMiddleware) => {
  const selector = selectProperty([reducerName, propName], defaultValue);

  if(selectorMiddleware) {
    return createSelector(selector, selectorMiddleware);
  } else {
    return selector;
  }
};

const syncProp = (reducerName, propName, reducerElmts) => {
  const elms = reducerElmts || {};
  const defaultValue = elms.defaultValue || null;
  const initialValue = elms.initialValue || null;

  const actionMiddleware = elms.actionMiddleware || defaultMiddleware;
  const handlerMiddleware = elms.handlerMiddleware || defaultMiddleware;
  const selectorMiddleware = elms.selectorMiddleware || defaultMiddleware;

  return {
    reducerName,
    propName,
    defaultValue,
    initialValue,
    action:       elms.action   || defaultAction(reducerName, propName, actionMiddleware),
    handler:      elms.reducer  || defaultHandler(reducerName, propName, handlerMiddleware),
    selector:     elms.selector || defaultSelector(reducerName, propName, defaultValue, selectorMiddleware),
  };
};

export const generateSyncReducer = (reducerName, propElms) => {
  const propNames = Object.keys(propElms);

  const syncPropObject = propNames.reduce((acc, propName) => ({
    ...acc,
    [propName]: syncProp(reducerName, propName, propElms[propName]),
  }), {});

  const utilities = propName => syncPropObject[propName];

  const initialState =    propNames.reduce((acc, propName) => ({
    ...acc,
    [propName]:                          utilities(propName).initialValue,
  }), {});

  const actionsHandlers = propNames.reduce((acc, propName) => ({
    ...acc,
    [actionName(reducerName, propName)]: utilities(propName).handler,
  }), {});

  const reducer = createReducer(initialState, actionsHandlers);

  return {
    reducer,
    utilities,
  };
};
