import { useEffect, useRef } from 'react';

export const usePrevious = <T>(value: T, initialValue?: T) => {
  const ref = useRef<T | undefined>(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [ref, value]);

  return ref.current;
};
