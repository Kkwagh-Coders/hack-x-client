import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// TODO: Add reducers here
export const store = configureStore({
  reducer: {},
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;

// prettier-ignore
export const useAppSelector: TypedUseSelectorHook<
ReturnType<typeof store.getState>
> = useSelector;
