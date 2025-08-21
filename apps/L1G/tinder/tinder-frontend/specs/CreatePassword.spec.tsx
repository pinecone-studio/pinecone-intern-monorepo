import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePassword } from '@/components/CreatePassword';

// Import useSignupMutation for mocking in the test
import { useSignupMutation } from '@/generated';

const mockSignup = jest.fn();
const mockOnSuccess = jest.fn();
const mockUpdateUserData = jest.fn();

// Mock the entire module including useSignupMutation hook
jest.mock('@/generated', () => ({
  useSignupMutation: jest.fn(() => [mockSignup, { loading: false, error: null }]),
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
    jest.mocked(useSignupMutation).mockReturnValueOnce([mockSignup, { loading: false, error: { message: 'Server error message' } }]);

    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Something went wrong./i)).toBeInTheDocument();
  });
  it('displays form-level error message', async () => {
    render(<CreatePassword onSuccess={mockOnSuccess} updateUserData={mockUpdateUserData} otpId="123" />);

    // Manually set a root error in the form
    // You might need to expose the form object or simulate this through a submission failure
    // For simplicity, trigger submission and simulate server error setting a root error
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'ValidPass123' } });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), { target: { value: 'ValidPass123' } });

    // Simulate a server error by mocking signup to fail with a root form error
    mockSignup.mockImplementationOnce(() => {
      throw new Error('Form-level error');
    });

    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    // Wait for the error message to appear
    expect(await screen.findByText(/Form-level error/i)).toBeInTheDocument();
  });
});
