import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstStep from '@/app/auth/forget-password/_components/FirstStep';
import '@testing-library/jest-dom';
describe('FirstStep component', () => {
  let setStepMock: jest.Mock;
  let setEmailMock: jest.Mock;

  beforeEach(() => {
    setStepMock = jest.fn();
    setEmailMock = jest.fn();
  });
  it('should call setStep(2) when the button is clicked', () => {
    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });

    const button = screen.getByTestId('forget-password-firstStep-button');
    fireEvent.click(button);

    expect(setStepMock).toHaveBeenCalledWith(2);
  });
  it('should call setEmail when typing into the input field', () => {
    const setStepMock = jest.fn();
    const setEmailMock = jest.fn();

    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
    const nextButton = screen.getByTestId('forget-password-firstStep-button');
    fireEvent.click(nextButton);
  });
  it('should show error when email is empty', () => {
    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const button = screen.getByTestId('forget-password-firstStep-button');
    fireEvent.click(button);

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
    expect(setStepMock).not.toHaveBeenCalled();
  });
  it('should show error for invalid email', () => {
    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const input = screen.getByPlaceholderText(/email/i);
    const button = screen.getByTestId('forget-password-firstStep-button');

    fireEvent.change(input, { target: { value: 'invalid-email' } });
    fireEvent.click(button);

    expect(screen.getByText(/please enter a valid email address/i)).toBeInTheDocument();
    expect(setStepMock).not.toHaveBeenCalled();
  });
});
