import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

import isEqual from 'lodash/isEqual';

const useDeepCompareMemoize = (value: DependencyList) => {
  const ref = useRef<DependencyList>();

  if (!isEqual(value, ref.current)) {
    ref.current = value;
  }

  return ref.current;
};

export const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
) =>
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(callback, useDeepCompareMemoize(dependencies));
