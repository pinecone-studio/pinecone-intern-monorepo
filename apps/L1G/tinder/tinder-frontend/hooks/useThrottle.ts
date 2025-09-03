'use client';
import { useRef, useCallback } from 'react';

export const useThrottle = (delay: number) => {
  const lastRun = useRef<number>(0);
  const processingRef = useRef(false);

  const throttledFunction = useCallback(
    async (callback: () => Promise<void> | void) => {
      if (processingRef.current) return;

      const now = Date.now();
      if (now - lastRun.current < delay) return;

      lastRun.current = now;
      processingRef.current = true;

      try {
        await callback();
      } finally {
        processingRef.current = false;
      }
    },
    [delay]
  );

  return throttledFunction;
};
