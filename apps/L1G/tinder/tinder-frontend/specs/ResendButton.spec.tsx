import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ApolloError } from '@apollo/client';
import { ResendButton } from '@/components/ResendButton';

describe('ResendButton', () => {
  const mockResend = jest.fn(() => Promise.resolve());

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays countdown when timeLeft > 0', () => {
    render(<ResendButton timeLeft={30} onResend={mockResend} resending={false} resendError={undefined} message={null} />);

    expect(screen.getByText(/Send again in 30s/i));
    expect(screen.queryByText(/Resend Code/i));
  });

  it('displays resend button when timeLeft <= 0 and allows clicking', async () => {
    render(<ResendButton timeLeft={0} onResend={mockResend} resending={false} resendError={undefined} message={null} />);

    const button = screen.getByRole('button', { name: /Resend Code/i });
    expect(button);

    fireEvent.click(button);
    expect(mockResend).toHaveBeenCalledTimes(1);
  });

  it('disables button and shows "Resending..." when resending', () => {
    render(<ResendButton timeLeft={0} onResend={mockResend} resending={true} resendError={undefined} message={null} />);

    const button = screen.getByRole('button', { name: /Resending/i });
    expect(button);
  });

  it('shows green message when message exists and no error', () => {
    render(<ResendButton timeLeft={0} onResend={mockResend} resending={false} resendError={undefined} message="OTP sent!" />);

    expect(screen.getByText('OTP sent!'));
  });

  it('shows red message when message exists and error is present', () => {
    const error = new ApolloError({ errorMessage: 'Something went wrong' });

    render(<ResendButton timeLeft={0} onResend={mockResend} resending={false} resendError={error} message="Failed to resend" />);

    expect(screen.getByText('Failed to resend'));
  });

  it('displays error message if resendError exists', () => {
    const error = new ApolloError({ errorMessage: 'Network error' });

    render(<ResendButton timeLeft={0} onResend={mockResend} resending={false} resendError={error} message={null} />);

    expect(screen.getByText('Network error'));
  });
});
