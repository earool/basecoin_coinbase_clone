import React, { useRef, useCallback } from 'react';

function useOnScreen(intersectionCallback, styleClass) {
  const observer = useRef();

  const ref = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();

      if (node) {
        observer.current = new IntersectionObserver(intersectionCallback);
        observer.current.observe(node);
      }
    },
    [intersectionCallback]
  );

  const targetElement = <div ref={ref} className={styleClass} />;

  return targetElement;
}

export default useOnScreen;
