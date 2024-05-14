'use client';

import { ArrowBackIcon } from '@/icons';
import '../_styles/editArticle.css';
import { useRouter } from 'next/navigation';

export const ArrowBack = () => {
  const router = useRouter();

  return (
    <button
      data-testid="arrow-back-button-id"
      className="hoverRotate"
      onClick={() => {
        router.push('/dashboard');
      }}
    >
      <ArrowBackIcon />
    </button>
  );
};
