/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

import { db, auth } from '../firebase';

const initialState = {
  userId: null,
  email: null,
  username: null,
  balance: 0,
  watchlist: null,
  transactions: null,
};

export const createUser = createAsyncThunk(
  'user/createUser',
  async ({ enteredEmail, enteredPassword, enteredName }) => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      enteredEmail,
      enteredPassword
    );

    const { email, uid } = userCredentials.user;

    const userData = {
      email,
      userId: uid,
      username: enteredName,
      balance: 0,
      watchlist: [],
      transactions: [],
    };

    await setDoc(doc(db, 'users', uid), userData);

    return userData;
  }
);

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async ({ enteredEmail, enteredPassword }) => {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      enteredEmail,
      enteredPassword
    );

    const { email, uid } = userCredentials.user;
    return { userId: uid, email };
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUserDataFulfilled: (state, action) => {
      return action.payload;
    },
    getUserDataRejected: (state, action) => {
      console.log(action.payload);
    },
    resetUserData: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.fulfilled, (state, action) => {
        return action.payload;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
});

export const { getUserDataFulfilled, getUserDataRejected, resetUserData } =
  userSlice.actions;

export default userSlice.reducer;

export function startUserDataListener(userId) {
  return (dispatch) => {
    // eslint-disable-next-line no-unused-vars
    const unsub = onSnapshot(
      doc(db, 'users', userId),
      (snapshot) => {
        dispatch(getUserDataFulfilled(snapshot.data()));
      },
      (error) => {
        dispatch(getUserDataRejected(error.toString()));
      }
    );
  };
}
