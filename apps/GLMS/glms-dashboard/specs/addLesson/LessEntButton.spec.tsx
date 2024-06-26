import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LessEntButton } from '../../src/app/addLesson/_components/LessEntButton';

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
  const mockHandleCreateMutation = jest.fn();
  const mockProps = {
    isFormValid: true,
    handleCreateMutation: mockHandleCreateMutation,
  };

  const renderComponent = (props = mockProps) => render(<LessEntButton {...props} />);

  it('renders without crashing', () => {
    renderComponent();
    expect(screen.getByTestId('continue button')).toBeInTheDocument();
  });

  it('calls handleCreateMutation on button click', () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleCreateMutation).toHaveBeenCalledTimes(1);
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

  it('renders the correct text and icon', () => {
    renderComponent();
    expect(screen.getByText('Үргэлжлүүлэх')).toBeInTheDocument();
    expect(screen.getByTestId('white-arrow')).toBeInTheDocument();
  });
});
