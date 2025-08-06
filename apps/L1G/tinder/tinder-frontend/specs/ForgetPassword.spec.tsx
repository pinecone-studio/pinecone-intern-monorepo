import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForgetPassword } from '@/components/ForgetPassword';

describe('Forgetpassword Page', () => {
  it('renders the logo, text, input and button', () => {
    render(<ForgetPassword />);

    expect(screen.getByText('Forget password')).toBeInTheDocument();
    expect(screen.getByText('Enter your email account to reset password')).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email')).toBeInTheDocument();
    });
  });

  it('accepts valid input and submits the form', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    expect(emailInput).toHaveValue('test@example.com');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Please enter a valid email')).not.toBeInTheDocument();
    });
  });
});
