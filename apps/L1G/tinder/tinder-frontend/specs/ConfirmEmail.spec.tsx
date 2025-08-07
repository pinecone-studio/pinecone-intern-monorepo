import { ConfirmEmail } from '@/components/ConfirmEmail';
import { fireEvent, render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';

beforeEach(() => {
  jest.useFakeTimers();
  jest.spyOn(console, 'log').mockImplementation(() => {});
});

afterEach(() => {
  jest.runOnlyPendingTimers();
  jest.useRealTimers();
  jest.restoreAllMocks();
});

describe('ConfirmEmail', () => {
  it('should render correctly', () => {
    render(<ConfirmEmail />);

    expect(screen.getByText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText(/To continue, enter the secure code we sent/i)).toBeInTheDocument();
    expect(screen.getByText(/Send again in/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Confirm/i })).toBeInTheDocument();
  });

  it('should handle OTP input', async () => {
    render(<ConfirmEmail />);

    const otpInput = screen.getByRole('textbox'); // only one input

    await act(async () => {
      fireEvent.change(otpInput, { target: { value: '1234' } });
    });

    expect(otpInput).toHaveValue('1234');
  });

  it('should submit OTP form', async () => {
    render(<ConfirmEmail />);

    const otpInput = screen.getByRole('textbox');
    const confirmBtn = screen.getByRole('button', { name: /Confirm/i });

    await act(async () => {
      fireEvent.change(otpInput, { target: { value: '1234' } });
    });

    await act(async () => {
      fireEvent.click(confirmBtn);
    });

    expect(console.log).toHaveBeenCalledWith('otp working');
  });

  it('should reset timer on resend', async () => {
    render(<ConfirmEmail />);
    act(() => {
      jest.advanceTimersByTime(60000);
    });

    const resendButton = screen.getByText('Resend Code');
    await act(() => {
      fireEvent.click(resendButton);
    });

    expect(screen.getByText(/Send again in 60s/i)).toBeInTheDocument();
  });

  it('should countdown timer', () => {
    render(<ConfirmEmail />);
    expect(screen.getByText(/Send again in 60s/i)).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(10000);
    });

    expect(screen.getByText(/Send again in 50s/i)).toBeInTheDocument();
  });
});
