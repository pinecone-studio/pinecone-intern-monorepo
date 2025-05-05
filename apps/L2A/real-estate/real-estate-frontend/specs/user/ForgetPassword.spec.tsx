import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ForgetPassword from '../../src/app/forget-password/_components/ForgetPassword';
import '@testing-library/jest-dom';

describe('ForgetPassword', () => {
  test('renders email input and submit button', () => {
    render(<ForgetPassword />);
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  test('shows error if email is empty on submit', () => {
    render(<ForgetPassword />);
    fireEvent.click(screen.getByTestId('submit-button'));
    expect(screen.getByText('Email is required')).toBeInTheDocument();
  });

  test('shows success message on valid email submit', () => {
    render(<ForgetPassword />);
    const emailInput = screen.getByTestId('email-input');
    const submitButton = screen.getByTestId('submit-button');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(submitButton);

    expect(screen.getByText('A reset link has been sent to your email.')).toBeInTheDocument();
  });
});
