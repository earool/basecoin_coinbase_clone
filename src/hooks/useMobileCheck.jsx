import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setIsMobile } from '../store/deviceWidthSlice';
import useOnScreen from './useOnScreen';

function useMobileCheck() {
  const dispatch = useDispatch();
  const intersectionCallback = useCallback(
    (entries) => {
      const { isIntersecting } = entries[0];
      dispatch(setIsMobile(isIntersecting));
    },
    [dispatch]
  );

  const ref = useOnScreen(intersectionCallback);
  return <div ref={ref} className="sm:hidden w-0 absolute top-1/2 left-1/2" />;
}

export default useMobileCheck;
