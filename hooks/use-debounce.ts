import { useCallback, useEffect, useRef } from 'react';

export function useDebounce<T extends unknown[]>(callback: (...args: T) => unknown, timeout: number = 1000) {
  const timeoutIDRef = useRef(0);
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(timeout);

  const debouncedFunc = useCallback(
    (...args: T) => {
      clearTimeout(timeoutIDRef.current);

      timeoutIDRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, timeoutRef.current);
    },
    [],
  );

  useEffect(() => {
    callbackRef.current = callback;
    timeoutRef.current = timeout;
  });

  useEffect(() => {
    return () => clearTimeout(timeoutIDRef.current);
  }, []);

  return debouncedFunc;
}
