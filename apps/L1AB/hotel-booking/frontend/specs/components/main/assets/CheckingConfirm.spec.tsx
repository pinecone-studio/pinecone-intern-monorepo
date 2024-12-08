'use client';

import { CheckingConfirm } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main CheckingConfirm', () => {
  it('should render the main CheckingConfirm', () => {
    render(<CheckingConfirm />);
  });
});
