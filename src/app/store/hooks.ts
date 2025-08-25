import { useMemo } from 'react';
import { type ActionCreatorsMapObject, bindActionCreators } from 'redux';
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { type AppDispatch, type RootState } from './index';

type PrefixedActions<T extends ActionCreatorsMapObject> = {
  [K in keyof T as `dispatch${Capitalize<string & K>}`]: (...args: Parameters<T[K]>) => ReturnType<T[K]>;
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export function useActions<T extends ActionCreatorsMapObject>(actions: T): PrefixedActions<T> {
  const dispatch = useAppDispatch();
  const boundActions = useMemo(() => bindActionCreators(actions, dispatch), [dispatch, actions]);
  const prefixed = {} as PrefixedActions<T>;

  for (const key in boundActions) {
    if (Object.prototype.hasOwnProperty.call(boundActions, key)) {
      const newKey = `dispatch${key.charAt(0).toUpperCase()}${key.slice(1)}` as keyof PrefixedActions<T>;
      prefixed[newKey] = boundActions[key] as unknown as PrefixedActions<T>[typeof newKey];
    }
  }
  return prefixed;
}
