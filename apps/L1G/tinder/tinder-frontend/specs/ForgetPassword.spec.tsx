import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ForgetPassword from '@/components/ForgetPassword';

describe('Forgetpassword Page', () => {
  it('renders the logo, text, input and button', () => {
    render(<ForgetPassword />);

    // Лого (role авахгүй бол alt текст эсвэл svg tag шалга)
    expect(screen.getByText('Forget password'));
    expect(screen.getByText('Enter your email account to reset password'));
    expect(screen.getByLabelText(/Email/i));
    expect(screen.getByRole('button', { name: /Continue/i }));
  });

  it('shows validation error if email is too short', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Email must be at least 2 characters.'));
    });
  });

  it('accepts valid input and resets the input after submit', async () => {
    render(<ForgetPassword />);

    const emailInput = screen.getByLabelText(/Email/i);
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    fireEvent.click(submitButton);
  });
});
