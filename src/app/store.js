import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { todoSlice } from '../features/TodoSlice'
import { todoApi } from '../services/todoApi';

export const store = configureStore({
  reducer : {
    todo : todoSlice.reducer,
    [todoApi.reducerPath]: todoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

