import React, { useState, useEffect } from 'react';
import StoreContext from './StoreContext';

export default function makeStoreProvider(store, actions, selectors) {
  // bind action creators
  const bindedActions = {};
  for (const [name, action] of Object.entries(actions)) {
    bindedActions[name] = (...args) => store.dispatch(action(...args));
  }

  // bind selectors
  const bindedSelectors = {};
  for (const [name, selector] of Object.entries(selectors)) {
    bindedSelectors[name] = () => selector(store.getState());
  }

  return function StoreProvider({ children }) {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
      if (store.getState() !== state) {
        setState(store.getState());
      }
      store.subscribe(() => setState(store.getState()));
    }, []);

    if (!state) {
      return null;
    }
    return (
      <StoreContext.Provider
        value={{ state, dispatch: bindedActions, select: bindedSelectors }}
      >
        {children}
      </StoreContext.Provider>
    );
  };
}
