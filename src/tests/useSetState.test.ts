/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSetState } from '../../lib';
import { act, renderHook } from './utils/utils';

describe('useSetState', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useSetState({ name: 'John' }));

    expect(result.current[0]).toEqual({ name: 'John' });
  });

  it('should set new state', () => {
    const { result } = renderHook(() => useSetState({ name: 'John' }));

    act(() => {
      result.current[1]({ age: 20 } as any);
    });

    expect(result.current[0]).toEqual({ name: 'John', age: 20 });
  });

  it('should set new state using function', () => {
    const { result } = renderHook(() => useSetState({ name: 'John', age: 20 }));

    act(() => {
      result.current[1]((prevState) => ({ age: prevState.age + 5 }));
    });

    expect(result.current[0]).toEqual({ name: 'John', age: 25 });
  });

  it('should reset state to initial value', () => {
    const { result } = renderHook(() => useSetState({ name: 'John', age: 20 }));

    act(() => {
      result.current[1]({ name: 'Doe' });
    });

    act(() => {
      result.current[2].resetState();
    });

    expect(result.current[0]).toEqual({ name: 'John', age: 20 });
  });

  it('should clear state', () => {
    const { result } = renderHook(() => useSetState({ name: 'John', age: 20 }));

    act(() => {
      result.current[2].clearState();
    });

    expect(result.current[0]).toEqual({});
  });

  it('should throw an error when useSetState is called without a plain object', () => {
    vi.spyOn(console, 'error');

    try {
      renderHook(() => useSetState('hello' as any));
    } catch (error) {
      const e = error as Error;
      expect(e.message).toBe(
        'useSetState should be called with a plain object, otherwise use useState'
      );
    }
  });
});
