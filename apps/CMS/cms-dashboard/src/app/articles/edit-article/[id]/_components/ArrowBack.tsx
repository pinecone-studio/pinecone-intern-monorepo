'use client';
import { ArrowBackIcon } from '@/icons';

export const ArrowBack = () => {
  return (
    <button data-testid="arrow-back-button-id" className="hoverRotate">
      <ArrowBackIcon />
    </button>
  );
};
