/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // At first, the login status should be false,
  // however, right after initialization,
  // useAuth updates the status.
  loginStatus: true,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginStatus: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export default authSlice.reducer;

export const { setLoginStatus } = authSlice.actions;
