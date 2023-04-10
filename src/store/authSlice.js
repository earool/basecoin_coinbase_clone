/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

// export const createUser(
//   'auth/createUser',
//   async () => {

//   }
// )

const initialState = {
  loginStatus: false,
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
