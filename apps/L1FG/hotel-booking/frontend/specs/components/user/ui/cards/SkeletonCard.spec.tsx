import React from 'react';
import { render } from '@testing-library/react';
import { SkeletonCard } from '@/components/user/ui/cards';

describe('SkeletonCard Loading card should render', () => {
  it(' data lingth 0 ', async () => {
    render(<SkeletonCard />);
  });
});
