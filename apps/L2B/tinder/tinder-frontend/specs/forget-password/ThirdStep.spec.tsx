import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/forget-password/_components/ThirdStep';
beforeAll(() => {
  global.alert = jest.fn();
});

afterAll(() => {
  (global.alert as jest.Mock).mockReset();
});

describe('ThirdStep', () => {
  const email = 'test@example.com';

  it('renders the component with the correct title and instructions', () => {
    render(<ThirdStep email={email} />);
    expect(screen.getByText(`Set new password for ${email}`)).toBeInTheDocument();
    expect(screen.getByText(/Use a minimum of 10 characters/)).toBeInTheDocument();
  });

  it('displays an error message if the form is submitted with invalid data', async () => {
    render(<ThirdStep email={email} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'short' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/Password must be at least 10 characters/)).toBeInTheDocument();
    });
  });

  it('calls the onSubmit function when form is submitted with valid data', async () => {
    render(<ThirdStep email={email} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password');
    const submitButton = screen.getByRole('button', { name: /Continue/i });

    fireEvent.change(passwordInput, { target: { value: 'ValidPassword123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'ValidPassword123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Password successfully set!');
    });
  });
  it('shows error when passwords do not match', async () => {
    render(<ThirdStep email={email} />);
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPassword123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'Different123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();
    });
  });
});
