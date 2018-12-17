import React, { Fragment } from 'react';
import { initStore } from '../src/index.js';

export default middleware => {
  const { useStore, StoreProvider } = initStore({
    reducers: {
      counter(state = 0, action = {}) {
        switch (action.type) {
          case 'INCREMENT':
            return state + 1;
          case 'DECREMENT':
            return state - 1;
          case 'SET_COUNTER':
            return action.payload;
          default:
            return state;
        }
      },
    },
    actions: {
      increment: () => ({ type: 'INCREMENT' }),
      decrement: () => ({ type: 'DECREMENT' }),
      setCounter: n => ({ type: 'SET_COUNTER', payload: n }),
    },
    selectors: {
      counterX1000: state => state.counter * 1000,
    },
    middlewares: [middleware],
  });

  const Counter = () => {
    const { state, dispatch, select } = useStore();

    return (
      <Fragment>
        <h1 data-testid="title">Counter ({select.counterX1000()})</h1>
        <button onClick={() => dispatch.increment()}>+</button>
        <p data-testid="counter">{state.counter}</p>
        <button onClick={() => dispatch.decrement()}>-</button>
        <button onClick={() => dispatch.setCounter(10)}>Set 10</button>
        <br />
      </Fragment>
    );
  };

  return (
    <StoreProvider>
      <Counter />
    </StoreProvider>
  );
};
