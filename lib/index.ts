import merge from 'lodash.merge';
import { useCallback, useState } from 'react';
import { type DeepPartial } from 'utility-types';

import { isPlainObject } from './util';

export const useSetState = <T extends Record<string, unknown>>(
  value: T | (() => T)
) => {
  const [state, _setState] = useState<T>(value);

  if (!isPlainObject(state)) {
    throw new Error(
      'useSetState should be called with a plain object, otherwise use useState'
    );
  }

  const resetState = useCallback(() => {
    const original = value;
    _setState(original);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearState = useCallback(() => {
    _setState({} as T);
  }, []);

  const setState = useCallback(
    (updatedState: DeepPartial<T> | ((currentState: T) => DeepPartial<T>)) => {
      _setState((current) => {
        if (updatedState instanceof Function) {
          const result = updatedState(current);
          return merge<Record<string, unknown>, T, DeepPartial<T>>(
            {},
            current,
            result
          );
        }

        return merge({}, current, updatedState);
      });
    },
    []
  );

  return [state, setState, { resetState, clearState }] as const;
};
