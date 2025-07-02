import useCounter from '@/app/(main)/_components/UseCounter';
import { renderHook, act } from '@testing-library/react';

describe('useCounter', () => {
  it('initializes with default value of 1', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.count).toBe(1);
  });

  it('initializes with custom initial value', () => {
    const { result } = renderHook(() => useCounter(5));
    expect(result.current.count).toBe(5);
  });

  it('increments the counter', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).toBe(2);
  });

  it('decrements the counter but not below min', () => {
    const { result } = renderHook(() => useCounter(2, 1));
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
    act(() => {
      result.current.decrement();
    });
    expect(result.current.count).toBe(1);
  });

  it('respects custom min value', () => {
    const { result } = renderHook(() => useCounter(5, 3));
    act(() => {
      result.current.decrement();
      result.current.decrement();
      result.current.decrement();
    });
    expect(result.current.count).toBe(3);
  });
});
