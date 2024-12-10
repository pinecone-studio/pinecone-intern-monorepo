'use client';

import { Footer } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main Footer', () => {
  it('should render the main Header', () => {
    render(<Footer />);
  });
});
