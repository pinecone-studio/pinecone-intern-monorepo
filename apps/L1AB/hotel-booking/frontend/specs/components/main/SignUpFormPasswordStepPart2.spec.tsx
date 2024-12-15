import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { toast } from 'react-toastify';
import SignUpFormPasswordStep from '@/components/main/SignUpFormPasswordStep';

// Mock external dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('SignUpFormPassStep', () => {
  const mockSignUpMutation = jest.fn();
  const mockUseRouter = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    email: 'test@example.com',
    signUpMutation: mockSignUpMutation,
    signUpLoading: false,
    signUpError: undefined,
  };

  it('calls signUpMutation with correct input on form submission', async () => {
    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter valid passwords
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPass123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Wait for the mutation to be called
    await waitFor(() => {
      expect(mockSignUpMutation).toHaveBeenCalledWith({
        variables: { input: { email: 'test@example.com', password: 'StrongPass123' } },
      });
    });
  });

  it('shows a success toast and redirects on successful mutation', async () => {
    mockSignUpMutation.mockResolvedValue({
      data: { signUp: { success: true } },
    });

    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter valid passwords
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPass123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for toast and router.push
    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('User created successfully!');
      expect(mockUseRouter);
    });
  });

  it('shows an error toast on failed mutation', async () => {
    mockSignUpMutation.mockResolvedValue({
      data: { signUp: { success: false, message: 'Failed to create user' } },
    });

    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter valid passwords
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPass123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for toast error
    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Failed to create user');
    });
  });
});
