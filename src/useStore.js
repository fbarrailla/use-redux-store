import { useContext } from 'react';
import StoreContext from './StoreContext';

export default function useStore() {
  const { state, dispatch, select } = useContext(StoreContext);
  return {
    state,
    dispatch,
    select,
  };
}
