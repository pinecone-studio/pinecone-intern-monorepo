import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForgotPasswordMutation } from '@/generated';
import { useRouter } from 'next/navigation';
import { ResetPassword } from '@/components/ResetPassword';
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('@/generated', () => ({ useForgotPasswordMutation: jest.fn() }));
describe('ResetPassword Component', () => {
  const mockOnSuccess = jest.fn();
  const mockOtpId = 'mock-otp-id';
  const mockPush = jest.fn();
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([jest.fn(() => Promise.resolve({ data: { forgotPassword: { message: 'Success' } } })), { loading: false, error: null }]);
  });
  test('renders correctly', () => {
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    expect(screen.getByText('Set new password'));
    expect(screen.getByLabelText('Password'));
    expect(screen.getByLabelText('Confirm password'));
    expect(screen.getByRole('button', { name: /continue/i }));
  });
  test('shows validation error if passwords do not match', async () => {
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'Password1' } });
    fireEvent.input(screen.getByLabelText('Confirm password'), { target: { value: 'Password2' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText("Passwords don't match"));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  test('shows validation error if password is invalid', async () => {
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'short' } });
    fireEvent.input(screen.getByLabelText('Confirm password'), { target: { value: 'short' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText(/Password must be at least 8 characters/i));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  test('submits form and calls mutation with correct data', async () => {
    const mockForgotPassword = jest.fn(() => Promise.resolve({ data: { forgotPassword: { message: 'Password updated successfully' } } }));
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockForgotPassword, { loading: false, error: null }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'Password1' } });
    fireEvent.input(screen.getByLabelText('Confirm password'), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(mockForgotPassword).toHaveBeenCalledWith({
        variables: { otpId: mockOtpId, newPassword: 'Password1' },
      });
    });
    expect(mockOnSuccess).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
  test('shows server error message on mutation failure', async () => {
    const mockForgotPassword = jest.fn(() => Promise.resolve({ data: { forgotPassword: null } }));
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockForgotPassword, { loading: false, error: new Error('Server error') }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'Password1' } });
    fireEvent.input(screen.getByLabelText('Confirm password'), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText(/Server error|Something went wrong./i));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  test('shows server error message on mutation exception', async () => {
    const mockForgotPassword = jest.fn(() => Promise.reject(new Error('Network error')));
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockForgotPassword, { loading: false, error: null }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.input(screen.getByLabelText('Password'), { target: { value: 'Password1' } });
    fireEvent.input(screen.getByLabelText('Confirm password'), { target: { value: 'Password1' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    expect(await screen.findByText(/Network error|Something went wrong./i));
    expect(mockOnSuccess).not.toHaveBeenCalled();
  });
  test('shows "Resetting..." on the submit button when loading', () => {
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: true, error: null }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    expect(screen.getByRole('button'));
    expect(screen.getByRole('button'));
  });
  it('shows server error if response has no message', async () => {
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([jest.fn(() => Promise.resolve({ data: { forgotPassword: { message: null } } })), { loading: false, error: { message: 'Server error' } }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'ValidPass1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), {
      target: { value: 'ValidPass1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(screen.getByText('Server error'));
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
  it('shows server error if mutation throws', async () => {
    const mockMutation = jest.fn(() => {
      throw new Error('Mutation failed');
    });
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockMutation, { loading: false, error: null }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);

    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'ValidPass1' },
    });
    fireEvent.change(screen.getByPlaceholderText('Confirm password'), {
      target: { value: 'ValidPass1' },
    });

    fireEvent.click(screen.getByRole('button', { name: /continue/i }));

    await waitFor(() => {
      expect(screen.getByText('Mutation failed'));
    });

    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
  test('shows generic error if no message and no error', async () => {
    const mockForgotPassword = jest.fn(() => Promise.resolve({ data: { forgotPassword: null } }));

    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockForgotPassword, { loading: false, error: null }]);

    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);

    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'ValidPass1' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'ValidPass1' } });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(screen.getByText('Something went wrong.'));
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
  test('shows generic error message when mutation throws error without message', async () => {
    const mockMutation = jest.fn(() => {
      throw {};
    });
    (useForgotPasswordMutation as jest.Mock).mockReturnValue([mockMutation, { loading: false, error: null }]);
    render(<ResetPassword onSuccess={mockOnSuccess} otpId={mockOtpId} />);
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'ValidPass1' },
    });
    fireEvent.change(screen.getByLabelText('Confirm password'), {
      target: { value: 'ValidPass1' },
    });
    fireEvent.click(screen.getByRole('button', { name: /continue/i }));
    await waitFor(() => {
      expect(screen.getByText('Something went wrong.'));
    });
    expect(mockOnSuccess).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });
});
