import { applyMiddleware, compose, combineReducers, createStore } from 'redux';
import makeStoreProvider from './makeStoreProvider';
import useStore from './useStore';

export function initStore({
  reducers = {},
  actions = {},
  selectors = {},
  middlewares = [],
}) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    combineReducers(reducers),
    composeEnhancers(applyMiddleware(...middlewares))
  );

  return {
    useStore,
    StoreProvider: makeStoreProvider(store, actions, selectors),
    store, // for development convenience
  };
}
