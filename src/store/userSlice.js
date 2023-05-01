/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { doc, setDoc, getDoc } from 'firebase/firestore';

import { db } from '../firebase';

const initialState = {
  userId: null,
  email: null,
  username: null,
  balance: 0,
  watchlist: null,
  transactions: null,
};

export const createUserDocument = createAsyncThunk(
  'user/createUserDocument',
  async ({ enteredNameValue: username, email, uid }) => {
    const userData = {
      email,
      userId: uid,
      username,
      balance: 0,
      watchlist: [],
      transactions: [],
    };

    await setDoc(doc(db, 'users', uid), userData);

    return userData;
  }
);

export const getUserDocument = createAsyncThunk(
  'user/getUserDocument',
  async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUserData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserDocument.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(getUserDocument.fulfilled, (state, action) => {
        return action.payload;
      });
  },
});

export const { resetUserData } = userSlice.actions;

export default userSlice.reducer;
