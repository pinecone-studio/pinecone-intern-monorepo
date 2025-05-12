import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThirdStep from '@/app/auth/forget-password/_components/ThirdStep';

describe('ThirdStep component', () => {
  const email = 'test@example.com';
  const setup = () => render(<ThirdStep email={email} />);

  it('renders inputs and button', () => {
    setup();

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });

  it('shows errors when fields are empty', () => {
    setup();

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByTestId('password-error')).toHaveTextContent('Password is required.');
    expect(screen.getByTestId('confirm-password-error')).toHaveTextContent('Confirm Password is required.');
  });

  test('shows password length error when password is less than 10 characters', () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByTestId('password-error')).toHaveTextContent('Password must be at least 10 characters long.');
  });

  it('shows error when passwords do not match', () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Different123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(screen.getByText(/Passwords do not match/i)).toBeInTheDocument();
  });

  it('shows success alert when passwords match', () => {
    window.alert = jest.fn();

    setup();

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'Password123' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm Password'), {
      target: { value: 'Password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    expect(window.alert).toHaveBeenCalledWith('Password successfully set!');
  });
});
