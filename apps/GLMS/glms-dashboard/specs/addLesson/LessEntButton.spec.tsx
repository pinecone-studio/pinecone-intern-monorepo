// LessEntButton.test.tsx
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessEntButton } from '../../src/app/addLesson/_components/LessEntButton';
// Mock the Button and WhiteArrow components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, disabled }: never) => (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  ),
}));

jest.mock('@/app/icons', () => ({
  WhiteArrow: () => <svg data-testid="white-arrow" />,
}));

describe('LessEntButton', () => {
  const mockProps = {
    isFormValid: true,
    inputData: {
      topic: 'Test Topic',
      title: 'Test Title',
      details: 'Test Details',
    },
    imageUrl: 'test-image-url',
  };

  const renderComponent = (props = mockProps) => render(<LessEntButton {...props} />);

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('continue button')).toBeInTheDocument();
  });

  it('calls handler on button click with correct data', () => {
    console.log = jest.fn();
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(console.log).toHaveBeenCalledWith('data', mockProps.inputData, mockProps.imageUrl);
  });

  it('applies correct styles based on isFormValid', () => {
    const { rerender } = renderComponent({ ...mockProps, isFormValid: true });
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-[#121316]');
    expect(button).not.toBeDisabled();

    rerender(<LessEntButton {...mockProps} isFormValid={false} />);
    expect(button).toHaveClass('bg-gray-900');
    expect(button).toBeDisabled();
  });

  it('disables button when isFormValid is false', () => {
    renderComponent({ ...mockProps, isFormValid: false });
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
