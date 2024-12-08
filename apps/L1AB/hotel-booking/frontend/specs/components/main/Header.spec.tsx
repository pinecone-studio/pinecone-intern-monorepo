'use client';
import { Header } from '@/components/main';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Main Header', () => {
  it('should render the main Header', () => {
    render(<Header />);
  });
});
