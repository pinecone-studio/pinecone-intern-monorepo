import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { SectionSaveButt } from '../../src/app/addLesson/_components/SectionSaveButt';

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, className }: never) => (
    <button disabled={disabled} className={className} data-testid="mocked-button">
      {children}
    </button>
  ),
}));

it('renders correctly when disabled', () => {
  render(<SectionSaveButt disabled={true} />);

  const button = screen.getByTestId('mocked-button');
  expect(button).toBeInTheDocument();
  expect(button).toBeDisabled();
});

it('renders the correct text', () => {
  render(<SectionSaveButt disabled={false} />);

  const buttonText = screen.getByText('Хадгалах');
  expect(buttonText).toBeInTheDocument();
});
