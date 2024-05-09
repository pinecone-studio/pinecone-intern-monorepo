'use client';

import { ArrowBackIcon } from '@/icons';
import "../_styles/editArticle.css";

export const ArrowBack = () => {
  return (
    <button data-testid="arrow-back-button-id" className="hoverRotate">
      <ArrowBackIcon />
      
    </button>
  );
};