/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  doc,
  setDoc,
  onSnapshot,
  arrayUnion,
  arrayRemove,
  updateDoc,
} from 'firebase/firestore';

import { db, auth } from '../firebase';

const initialState = {
  userId: null,
  email: null,
  username: null,
  watchlist: null,
  userAssets: null,
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
      userAssets: { assetsIds: [], transactions: [], balance: 0, assets: [] },
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
      return { ...state, ...action.payload };
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

let unsub = null;

export function startUserDataListener(userId) {
  return (dispatch) => {
    unsub = onSnapshot(
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

export function unsubUserData() {
  if (unsub) {
    unsub();
    unsub = null;
  }
}

export function toggleCoinInWatchlist(coinId) {
  return async (_, getState) => {
    const state = getState();
    const { watchlist, userId } = state.user;

    const isCoinInWatchlist = watchlist.includes(coinId);
    const userDataRef = doc(db, 'users', userId);

    if (isCoinInWatchlist) {
      await updateDoc(userDataRef, {
        watchlist: arrayRemove(coinId),
      });
    } else {
      await updateDoc(userDataRef, {
        watchlist: arrayUnion(coinId),
      });
    }
  };
}
