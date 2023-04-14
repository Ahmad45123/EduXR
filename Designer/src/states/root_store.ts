import { configureStore } from '@reduxjs/toolkit';
import { experimentSlice } from './experiment_store';

export const store = configureStore({
  reducer: {
    experiment: experimentSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
