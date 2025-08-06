import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ForgetPassword } from '@/components/ForgetPassword';

describe('Forgetpassword Page', () => {
  it('renders the logo, text, input and button', () => {
    render(<ForgetPassword />);

    expect(screen.getByText('Forget password')).toBeInTheDocument();
    expect(screen.getByText('Enter your email account to reset password'));
    expect(screen.getByLabelText(/Email/i));
    expect(screen.getByRole('button', { name: /Continue/i }));
  });

  it('shows validation error for invalid email', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address.')).toBeInTheDocument();
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
      expect(screen.queryByText('Please enter a valid email address.')).not.toBeInTheDocument();
    });
  });
});
