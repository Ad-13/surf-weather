import { configureStore } from '@reduxjs/toolkit';

import errorMiddleware from '@middlewares/errorMiddleware';

import rootReducer from './rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(errorMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
