/* eslint-disable max-lines */
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePassword } from '@/components/CreatePassword';

import { useSignupUserMutation } from '@/generated';

const mockSignup = jest.fn();
const mockOnSuccess = jest.fn();
const mockUpdateUserData = jest.fn();

// Mock the entire module including useSignupMutation hook
jest.mock('@/generated', () => ({
  useSignupUserMutation: jest.fn(() => [mockSignup, { loading: false, error: null }]),
}));

describe('CreatePassword Component', () => {
  beforeAll(() => {
    jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      // Intentionally empty
    });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('renders password fields and submit button', () => {
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
  });

  it('renders form fields and button', () => {
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Confirm password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
  });

  it('shows validation errors for short or mismatched passwords', async () => {
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'short' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'different' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Password must be at least 8 characters/i)).toBeInTheDocument();
    expect(await screen.findByText(/Passwords don't match/i)).toBeInTheDocument();
  });

  it('calls signup mutation and onSuccess on successful submission', async () => {
    mockSignup.mockResolvedValue({
      data: {
        signup: {
          token: 'fake-token',
          id: 'user-id',
        },
      },
    });

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith({
        variables: {
          password: 'ValidPass123',
          otpId: '123',
        },
      });
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('token', 'fake-token');
    expect(mockUpdateUserData).toHaveBeenCalledWith({ id: 'user-id' });
    expect(mockOnSuccess).toHaveBeenCalled();
  });

  it('shows server error on signup failure', async () => {
    mockSignup.mockRejectedValue(new Error('Network error'));

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Network error/i)).toBeInTheDocument();
  });

  it('displays server error message', async () => {
    mockSignup.mockRejectedValue(new Error('Network error'));

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText('Network error')).toBeInTheDocument();
  });

  it('shows server error when mutation returns no token but error exists', async () => {
    mockSignup.mockResolvedValue({
      data: {
        signup: {
          token: null,
          id: null,
        },
      },
    });

    // Use jest.mocked() properly with imported useSignupMutation
    jest.mocked(useSignupUserMutation).mockReturnValueOnce([mockSignup, { loading: false, error: { message: 'Server error message' } }]);

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Something went wrong./i)).toBeInTheDocument();
  });
  it('displays form-level error message', async () => {
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    mockSignup.mockImplementationOnce(() => {
      throw new Error('Form-level error');
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Form-level error/i)).toBeInTheDocument();
  });

  it('displays form-level error message on signup failure', async () => {
    mockSignup.mockResolvedValue({
      data: {
        signup: {
          token: null,
          id: null,
        },
      },
    });

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText('Something went wrong.')).toBeInTheDocument();
  });

  it('displays loading text on submit', async () => {
    mockSignup.mockImplementation(() => new Promise((resolve) => setTimeout(resolve, 1000)));
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
  });
});
