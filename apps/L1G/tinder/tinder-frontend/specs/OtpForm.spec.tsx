import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import '@testing-library/jest-dom';
import { FormSchema } from '@/components/ConfirmEmail';
import { OtpForm } from '@/components/OtpForm';

type TestProps = Partial<React.ComponentProps<typeof OtpForm>>;

const Wrapper = (props: TestProps = {}) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { otp: '' },
  });

  const defaultProps = {
    form,
    onSubmit: jest.fn(() => Promise.resolve()),
    handleResend: jest.fn(() => Promise.resolve()),
    timeLeft: 0,
    resending: false,
    resendError: undefined,
    message: null,
    verifying: false,
    verifyError: undefined,
  };

  return <OtpForm {...{ ...defaultProps, ...props }} />;
};

describe('OTPForm', () => {
  it('renders OTP input group', () => {
    render(<Wrapper />);
    expect(screen.getByTestId('otp-group')).toBeInTheDocument();
  });

  it('calls handleResend when resend button is clicked', async () => {
    const mockHandleResend = jest.fn(() => Promise.resolve());
    render(<Wrapper timeLeft={0} handleResend={mockHandleResend} />);
    const resendButton = screen.getByText(/resend/i);
    fireEvent.click(resendButton);
    await waitFor(() => expect(mockHandleResend).toHaveBeenCalled());
  });

  it('disables submit button when verifying', () => {
    render(<Wrapper verifying={true} />);
    const button = screen.getByRole('button', { name: /verifying/i });
    expect(button).toBeDisabled();
  });

  it('shows verify error if provided', () => {
    render(<Wrapper verifyError={{ message: 'Invalid OTP' } as any} />);
    expect(screen.getByText(/invalid otp/i)).toBeInTheDocument();
  });

  it('shows resend error if provided', () => {
    render(<Wrapper resendError={{ message: 'Failed to resend code' } as any} />);
    expect(screen.getByText(/failed to resend code/i)).toBeInTheDocument();
  });

  it('shows resend message if provided', () => {
    render(<Wrapper message="Code resent successfully" />);
    expect(screen.getByText(/code resent successfully/i)).toBeInTheDocument();
  });
});
