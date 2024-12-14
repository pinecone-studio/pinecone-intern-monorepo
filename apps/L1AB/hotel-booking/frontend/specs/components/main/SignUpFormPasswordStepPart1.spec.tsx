import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignUpFormPasswordStep from '@/components/main/SignUpFormPasswordStep';

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

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const defaultProps = {
    email: 'test@example.com',
    signUpMutation: mockSignUpMutation,
    signUpLoading: false,
    signUpError: undefined,
  };

  // Step 1: Rendering and Structure Tests
  it('renders the form and all expected elements', () => {
    render(<SignUpFormPasswordStep {...defaultProps} />);

    // Check for headings and instructions
    expect(screen.getByText('Create Password')).toBeInTheDocument();
    expect(screen.getByText('Use a minimum of 10 characters, including uppercase letters, lowercase letters, and numbers')).toBeInTheDocument();

    // Check for inputs
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();

    // Check for submit button
    expect(screen.getByTestId('sign-up-button')).toBeInTheDocument();
    expect(screen.getByTestId('sign-up-button')).toHaveTextContent('Continue');

    // Ensure error placeholders are not visible initially
    expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('signup-error')).not.toBeInTheDocument();
  });

  it('disables the submit button when signUpLoading is true', () => {
    render(<SignUpFormPasswordStep {...defaultProps} signUpLoading={true} />);
    const button = screen.getByTestId('sign-up-button');
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent('Continue...');
  });

  it('renders the sign-up error message when signUpError is provided', () => {
    const errorMessage = 'Something went wrong!';
    render(<SignUpFormPasswordStep {...defaultProps} signUpError={{ message: errorMessage }} />);

    // Ensure error message is displayed
    expect(screen.getByTestId('signup-error')).toBeInTheDocument();
    expect(screen.getByTestId('signup-error')).toHaveTextContent(errorMessage);
  });

  // Step 2: Validation Logic Tests
  it('displays an error when the password is less than 10 characters', async () => {
    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter invalid passwords
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for error message
    expect(await screen.findByTestId('password-error')).toHaveTextContent('Password must be at least 10 characters');
  });

  it('displays an error when passwords do not match', async () => {
    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter mismatched passwords
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'DifferentPass' },
    });

    // Submit the form
    fireEvent.click(submitButton);

    // Check for error message
    expect(await screen.findByTestId('confirm-password-error')).toHaveTextContent("Passwords don't match");
  });

  it('does not display errors when the input is valid', async () => {
    render(<SignUpFormPasswordStep {...defaultProps} />);

    const passwordInput = screen.getByTestId('password-input');
    const confirmPasswordInput = screen.getByTestId('confirm-password-input');
    const submitButton = screen.getByTestId('sign-up-button');

    // Enter valid passwords
    fireEvent.change(passwordInput, { target: { value: 'StrongPass123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'StrongPass123' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check that no error messages are displayed
    expect(screen.queryByTestId('password-error')).not.toBeInTheDocument();
    expect(screen.queryByTestId('confirm-password-error')).not.toBeInTheDocument();
  });
});
