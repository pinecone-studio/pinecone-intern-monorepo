import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';

import Confirmsignup from '@/components/signup/Confirmsignup';

describe('Confirm Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should render the confirm email step initially', () => {
    render(<Confirmsignup />);
    expect(screen.getByText('Confirm email')).toBeInTheDocument();
    expect(screen.getByText(/To continue, enter the secure code/)).toBeInTheDocument();
    expect(screen.getByText('Send again')).toBeInTheDocument();
  });

  it('should display the timer and update it', () => {
    render(<Confirmsignup />);
    expect(screen.getByText('(30)')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('(25)')).toBeInTheDocument();
  });

  it('should change to new password step when OTP is fully entered', async () => {
    render(<Confirmsignup />);

    const otpInputs = screen.getAllByRole('textbox');
    expect(otpInputs).toHaveLength(4);

    fireEvent.change(otpInputs[0], { target: { value: '1' } });
    fireEvent.change(otpInputs[1], { target: { value: '2' } });
    fireEvent.change(otpInputs[2], { target: { value: '3' } });
    fireEvent.change(otpInputs[3], { target: { value: '4' } });

    expect(screen.queryByText('Confirm email')).not.toBeInTheDocument();
  });

  it('should stop the timer at 0', () => {
    render(<Confirmsignup />);

    act(() => {
      jest.advanceTimersByTime(30000);
    });

    expect(screen.getByText('(00)')).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(screen.getByText('(00)')).toBeInTheDocument();
  });
});
