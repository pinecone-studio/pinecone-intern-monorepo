import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionButton } from '../../src/app/admin/addLesson/_components/SectionButton';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: never) => (
    <button className={className} data-testid="mocked-button">
      {children}
    </button>
  ),
}));

describe('SectionButton', () => {
  it('renders correctly with proper styling', () => {
    render(<SectionButton />);

    const button = screen.getByTestId('mocked-button');
    expect(button).toBeInTheDocument();
  });
});
