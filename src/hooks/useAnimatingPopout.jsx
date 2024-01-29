/* eslint-disable react/function-component-definition */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  forwardRef,
  useMemo,
} from 'react';

function useAnimatingPopout(animationDuration) {
  const [isShowed, setIsShowed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  const heightRef = useRef('');
  const defaultViewRef = useRef('');
  const popoutViewRef = useRef('');

  const togglePopout = () => {
    setIsShowed((prevs) => !prevs);
  };

  useLayoutEffect(() => {
    if (isShowed) {
      heightRef.current = popoutViewRef.current.offsetHeight;
    } else {
      heightRef.current = defaultViewRef.current.offsetHeight;
    }

    setIsAnimating(true);

    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, animationDuration);

    return () => clearTimeout(timer);
  }, [isShowed]);

  const ContentWrapper = useMemo(() => {
    const ContentWrapperComponent = ({ children }) => {
      return (
        <div
          style={{ height: heightRef.current }}
          className={`sm:main-container-no-tb min-w-[300px] relative transition-[height] duration-${animationDuration} ease-linear bg-white rounded-lg`}
        >
          {children}
        </div>
      );
    };
    return ContentWrapperComponent;
  }, []);

  const DefaultViewWrapper = useMemo(() => {
    const DefaultViewWrapperComponent = ({ children }) => {
      return (
        <div className="w-full pb-1" ref={defaultViewRef}>
          {children}
        </div>
      );
    };
    return DefaultViewWrapperComponent;
  }, []);

  const PopoutViewWrapper = useMemo(() => {
    const PopoutViewWrapperComponent = ({ children }) => {
      return (
        <div
          className="absolute top-0 left-0 w-full pt-5 px-5 pb-7"
          ref={popoutViewRef}
        >
          {children}
        </div>
      );
    };
    return PopoutViewWrapperComponent;
  }, []);

  const placeholder = <div />;

  return {
    isShowed,
    isAnimating,
    togglePopout,
    ContentWrapper,
    DefaultViewWrapper,
    PopoutViewWrapper,
    placeholder,
  };
}

export default useAnimatingPopout;
