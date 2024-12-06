'use client';

import { CheckingQpay } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main CheckingQpay', () => {
  it('should render the main CheckingQpay', () => {
    render(<CheckingQpay />);
  });
});
