import { createStore, combineReducers } from 'redux';
import makeStoreProvider from './makeStoreProvider';
import useStore from './useStore';

export function initStore({
  reducers = {},
  actions = {},
  selectors = {},
  middlewares = [],
}) {
  const devTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(combineReducers(reducers), devTools);

  return {
    useStore,
    StoreProvider: makeStoreProvider(store, actions, selectors),
    store, // for development convenience
  };
}
