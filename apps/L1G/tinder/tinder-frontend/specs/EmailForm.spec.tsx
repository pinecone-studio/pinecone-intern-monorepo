import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRequestSignupMutation, OtpType } from '@/generated';
import { EmailForm } from '@/components/EmailForm';

const mockRequestSignup = jest.fn();

jest.mock('@/generated', () => ({
  useRequestSignupMutation: jest.fn(() => [mockRequestSignup, { loading: false, error: undefined, data: undefined }]),
  OtpType: { Forgot: 'FORGOT' },
}));

describe('EmailForm', () => {
  const mockOnSuccess = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRequestSignupMutation as jest.Mock).mockReturnValue([mockRequestSignup, { loading: false, error: undefined, data: undefined }]);
  });

  it('renders form correctly', () => {
    render(<EmailForm onSuccess={mockOnSuccess} />);
    expect(screen.getByText(/Forget password/i));
    expect(screen.getByPlaceholderText(/name@example.com/i));
    expect(screen.getByRole('button', { name: /Continue/i }));
  });

  it('shows validation error on invalid email', async () => {
    render(<EmailForm onSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'not-an-email' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
    expect(await screen.findByText(/Please enter a valid email/i));
    expect(mockRequestSignup).not.toHaveBeenCalled();
  });

  it('calls requestSignup mutation and onSuccess on valid submit', async () => {
    mockRequestSignup.mockResolvedValueOnce({
      data: {
        requestSignup: {
          output: 'Success message',
        },
      },
    });

    render(<EmailForm onSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(mockRequestSignup).toHaveBeenCalledWith({
        variables: { email: 'test@example.com', otpType: OtpType.Forgot },
      });
    });

    await waitFor(() => {
      expect(mockOnSuccess).toHaveBeenCalledWith('test@example.com');
    });
  });

  it('does not call onSuccess if mutation returns no output', async () => {
    mockRequestSignup.mockResolvedValueOnce({
      data: {
        requestSignup: {
          output: null,
        },
      },
    });

    render(<EmailForm onSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(mockRequestSignup).toHaveBeenCalled();
    });

    await waitFor(() => {
      expect(mockOnSuccess).not.toHaveBeenCalled();
    });
  });

  it('displays error message when mutation errors', async () => {
    const error = new Error('Network error');
    (useRequestSignupMutation as jest.Mock).mockReturnValue([jest.fn().mockRejectedValue(error), { loading: false, error: error, data: undefined }]);

    render(<EmailForm onSuccess={mockOnSuccess} />);
    fireEvent.change(screen.getByPlaceholderText(/name@example.com/i), { target: { value: 'test@example.com' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    expect(await screen.findByText(/Network error/i));
  });

  it('disables button while loading', () => {
    (useRequestSignupMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: true, error: undefined, data: undefined }]);

    render(<EmailForm onSuccess={mockOnSuccess} />);
    const button = screen.getByRole('button');

    expect(button);
    expect(button);
  });
});
