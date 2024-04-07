/* eslint-disable @typescript-eslint/no-explicit-any */
import { DependencyList, useCallback, useRef } from "react";

type DebouncedFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => void;

const useDebounce = <T extends (...args: any) => any>(
  callback: T,
  delay: number,
  dependencies: DependencyList = []
): DebouncedFunction<T> => {
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debounceCallback = useCallback(
    (...args: Parameters<T>) => {
      if (timeOutRef.current) {
        clearTimeout(timeOutRef.current);
      }
      timeOutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [callback, delay, ...dependencies]
  );

  return debounceCallback;
};
export default useDebounce;
