import { configureStore } from '@reduxjs/toolkit'
import todoReducer, { todoSlice } from '../features/TodoSlice'

export const store = configureStore({
  reducer : {
    todo : todoSlice.reducer
  },
});

