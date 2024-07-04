import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CourseEntButton } from '../../src/app/addCourse/_components/CourseEntButton';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, className, disabled }: never) => (
    <button onClick={onClick} className={className} disabled={disabled}>
      {children}
    </button>
  ),
}));

describe('CourseEntButton', () => {
  const mockHandleCreateMutation = jest.fn();
  const mockProps = {
    isFormValid: true,
    handleCreateMutation: mockHandleCreateMutation,
  };

  const renderComponent = (props = mockProps) => render(<CourseEntButton {...props} />);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls handleCreateMutation and router.push on button click', async () => {
    renderComponent();
    fireEvent.click(screen.getByRole('button'));
    expect(mockHandleCreateMutation).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('applies correct styles based on isFormValid', () => {
    const { rerender } = renderComponent({ ...mockProps, isFormValid: true });
    const button = screen.getByRole('button');
    expect(button).not.toBeDisabled();

    rerender(<CourseEntButton {...mockProps} isFormValid={false} />);
    expect(button).toBeDisabled();
  });

  it('disables button when isFormValid is false', () => {
    renderComponent({ ...mockProps, isFormValid: false });
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('handles error during mutation or navigation', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    const mockError = new Error('Test error');
    mockHandleCreateMutation.mockImplementation(() => {
      throw mockError;
    });

    renderComponent();
    fireEvent.click(screen.getByRole('button'));

    expect(mockHandleCreateMutation).toHaveBeenCalledTimes(1);
    expect(mockPush).not.toHaveBeenCalled();
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error during mutation or navigation:', mockError);

    consoleErrorSpy.mockRestore();
  });
});
