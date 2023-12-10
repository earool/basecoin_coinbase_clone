import { configureStore } from '@reduxjs/toolkit';

import authReducer from './authSlice';
import userSliceReducer from './userSlice';
import deviceWidthSlice from './deviceWidthSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userSliceReducer,
    deviceWidth: deviceWidthSlice,
  },
});
