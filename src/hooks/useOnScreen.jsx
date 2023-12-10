import { useRef, useCallback } from 'react';

function useOnScreen(intersectionCallback) {
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

  return ref;
}

export default useOnScreen;
