import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import userSliceReducer from './userSlice';
import { apiSlice } from './apiSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
