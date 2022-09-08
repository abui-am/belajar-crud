import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './feature/usersSlice';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});
