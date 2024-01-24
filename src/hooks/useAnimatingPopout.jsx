/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useCallback, useEffect } from 'react';

// The hook doesn't work correctly, occasionally, when isShowed is set to true, isAnimating doesn't immediately follow suit,
// leading to a brief blink in the UI.

function useAnimatingPopout(animationDuration) {
  const [isShowed, setIsShowed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);
  const heightRef = useRef('');

  const togglePopout = () => {
    setIsShowed((prevs) => !prevs);
  };
  const changeHeightRef = useCallback(
    (value) => {
      heightRef.current = value;
    },
    [isShowed]
  );

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [isShowed]);

  const placeholder = <div />;

  return {
    isShowed,
    isAnimating,
    height: heightRef.current,
    changeHeightRef,
    togglePopout,
    placeholder,
  };
}

export default useAnimatingPopout;
