use-redux-store
===============

## Motivations

Simplify React-Redux boilerplate providing a simple hook that gives you access to the current global state tree, action creators and selectors.

## Usage

store.js
```javascript
import { initStore } from 'use-redux-store';
import * as actions from './actions';
import * as reducers from './reducers';
import * as selectors from './selectors';

const store = initStore({
  reducers,
  actions, // action creators
  selectors,
});

export const useStore = store.useStore;
export const StoreProvider = store.StoreProvider;
```

index.js
```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App'; // your root component
import { StoreProvider } from './state/store';

ReactDOM.render(
  <StoreProvider>
    <App />
  </StoreProvider>,
  document.getElementById('root')
);
```

AnyComponent.js
```javascript
import { useStore } from './store.js';

const AnyComponent = props => {
  const { state, dispatch, select } = useStore();
  return (
    <>
      <h1>{state.title}</h1>
      <button onClick={() => dispatch.someAction()}>
        Do something!
      </button>
      <p>{select.someSelector()}</p>
    </>
  )
}
```

## Examples

- [To-Do list](https://github.com/fbarrailla/todolist-hooks)

## Todo

- [ ] Improve documentation
- [ ] Add unit tests
- [ ] TypeScript support