import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SecondStep from '@/app/auth/sign-up/_components/SecondStep';

jest.useFakeTimers();

describe('SecondStep', () => {
  const setStep = jest.fn();

  beforeEach(() => {
    render(<SecondStep setStep={setStep} />);
  });

  it('renders 4 OTP inputs', () => {
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(4);
  });

  it('allows only numeric input and only one digit', () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: 'a' } });
    expect(inputs[0]).toHaveValue('');

    fireEvent.change(inputs[0], { target: { value: '12' } });
    expect(inputs[0]).toHaveValue('');

    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[0]).toHaveValue('1');
  });
  it('does not move focus on Backspace at first input', () => {
    const otpInputs = screen.getAllByRole('textbox');
    otpInputs[0].focus();
    fireEvent.keyDown(otpInputs[0], { key: 'Backspace', code: 'Backspace' });

    expect(otpInputs[0]).toHaveFocus();
  });

  it('focuses next input when digit entered', () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    expect(inputs[1]).toHaveFocus();
  });

  it('does not shift focus if last input filled', () => {
    const inputs = screen.getAllByRole('textbox');
    inputs[3].focus();
    fireEvent.change(inputs[3], { target: { value: '4' } });
    expect(inputs[3]).toHaveFocus();
  });

  it('moves focus back on Backspace if current is empty', () => {
    const inputs = screen.getAllByRole('textbox');
    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: 'Backspace', code: 'Backspace' });
    expect(inputs[0]).toHaveFocus();
  });

  it('validates correct OTP and calls setStep', async () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(setStep).toHaveBeenCalledWith(3);
    });
  });

  it('shows error and resets on incorrect OTP', async () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '5' } }); // incorrect code

    await waitFor(() => {
      expect(screen.getByText('Invalid code. Please try again.')).toBeInTheDocument();
    });

    inputs.forEach((input) => {
      expect(input).toHaveValue('');
    });
  });

  it('enables resend button after timer ends', () => {
    act(() => {
      jest.advanceTimersByTime(15000);
    });

    expect(screen.getByText('Send again')).toBeEnabled();
  });

  it('resets timer and state when resend is clicked', () => {
    const logSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    act(() => {
      jest.advanceTimersByTime(15000);
    });

    const resendBtn = screen.getByText('Send again');
    fireEvent.click(resendBtn);

    expect(logSpy).toHaveBeenCalledWith('Code resent!');
    expect(screen.getByText('Send again (15)')).toBeInTheDocument();

    logSpy.mockRestore();
  });

  it('displays loading spinner during validation', async () => {
    const inputs = screen.getAllByRole('textbox');
    fireEvent.change(inputs[0], { target: { value: '1' } });
    fireEvent.change(inputs[1], { target: { value: '2' } });
    fireEvent.change(inputs[2], { target: { value: '3' } });
    fireEvent.change(inputs[3], { target: { value: '4' } });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
