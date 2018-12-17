import { render, fireEvent } from 'react-testing-library';
import renderCounterApp from './renderCounterApp';

const waitForRerender = () => new Promise(r => setTimeout(r));

test('library integration test', async () => {
  const actions = [];
  const middleware = store => next => action => {
    actions.push(action);
    return next(action);
  };
  const { getByText, getByTestId } = render(renderCounterApp(middleware));
  const incrementButton = getByText('+');
  const decrementButton = getByText('-');
  const set10Button = getByText('Set 10');
  const counterValue = getByTestId('counter');
  const title = getByTestId('title');

  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(incrementButton);
  fireEvent.click(decrementButton);

  await waitForRerender();

  expect(counterValue).toHaveTextContent('2');
  expect(title).toHaveTextContent('Counter (2000)');

  fireEvent.click(set10Button);

  await waitForRerender();

  expect(counterValue).toHaveTextContent('10');

  expect(actions).toEqual([
    { type: 'INCREMENT' },
    { type: 'INCREMENT' },
    { type: 'INCREMENT' },
    { type: 'DECREMENT' },
    { type: 'SET_COUNTER', payload: 10 },
  ]);
});
