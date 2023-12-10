/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isMobile: false,
};

const deviceWidthSlice = createSlice({
  name: 'deviceWidth',
  initialState,
  reducers: {
    setIsMobile: (state, action) => {
      state.isMobile = action.payload;
    },
  },
});

export default deviceWidthSlice.reducer;

export const { setIsMobile } = deviceWidthSlice.actions;
