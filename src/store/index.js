import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import companiesReducer from './slices/companiesSlice';
import jobsReducer from './slices/jobsSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    reducer: {
      auth: authReducer,
      companies: companiesReducer,
      jobs: jobsReducer,
      user: userReducer,
    },
  });

export default store;