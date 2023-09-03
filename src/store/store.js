import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import userSliceReducer from './userSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userSliceReducer,
  },
});
