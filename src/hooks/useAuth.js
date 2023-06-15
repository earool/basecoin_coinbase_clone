import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';

import { auth } from '../firebase';
import { setLoginStatus } from '../store/authSlice';
import {
  startUserDataListener,
  unsubUserData,
  resetUserData,
} from '../store/userSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(setLoginStatus(true));
        dispatch(startUserDataListener(user.uid));
      } else {
        dispatch(setLoginStatus(false));
        unsubUserData();
        resetUserData();
      }
    });

    return unsubAuth;
  }, [dispatch]);
  return null;
};

export default useAuth;
