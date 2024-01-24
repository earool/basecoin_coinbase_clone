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
  userAssets: { assetsIds: null, transactions: null, cash: null, assets: null },
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
      watchlist: [],
      userAssets: { assetsIds: [], transactions: [], assets: {}, cash: 0 },
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

export function makeTransaction(type, value, amount, coinId, coinIdA = null) {
  return async (_, getState) => {
    const state = getState();
    const { userId } = state.user;
    const userDataRef = doc(db, 'users', userId);

    const { assets, assetsIds, cash } = state.user.userAssets;
    let updatedAssetsIds;
    const updatedCoin = `userAssets.assets.${coinId}`;

    switch (type) {
      case 'Buy':
        updatedAssetsIds = !assets[coinId] ? [...assetsIds, coinId] : assetsIds;

        await updateDoc(userDataRef, {
          'userAssets.assetsIds': updatedAssetsIds,
          [updatedCoin]: (assets[coinId] || 0) + amount,
          'userAssets.cash': cash - value,
        });
        break;

      case 'Sell':
        updatedAssetsIds =
          assets[coinId] === amount
            ? assetsIds.filter(({ uuid }) => uuid !== coinId)
            : assetsIds;

        await updateDoc(userDataRef, {
          'userAssets.assetsIds': updatedAssetsIds,
          [updatedCoin]: assets[coinId] - amount,
          'userAssets.cash': cash + value,
        });
        break;

      case 'Convert':
        updatedAssetsIds =
          assets[coinId] === value
            ? assetsIds.filter(({ uuid }) => uuid !== coinId)
            : assetsIds;
        updatedAssetsIds = !assets[coinIdA]
          ? [...assetsIds, coinIdA]
          : assetsIds;

        await updateDoc(userDataRef, {
          'userAssets.assetsIds': updatedAssetsIds,
          [updatedCoin]: assets[coinId] - value,
          [`userAssets.assets.${coinIdA}`]: (assets[coinIdA] || 0) - amount,
        });
        break;
      default:
        console.log('something went wrong!');
    }
  };
}
