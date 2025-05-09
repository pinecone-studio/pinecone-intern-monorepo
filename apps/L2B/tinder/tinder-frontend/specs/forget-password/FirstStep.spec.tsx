import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FirstStep from '@/app/auth/forget-password/_components/FirstStep';

describe('FirstStep component', () => {
  it('should call setStep(2) when the button is clicked', () => {
    const setStepMock = jest.fn();
    const setEmailMock = jest.fn();

    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const button = screen.getByText(/next step/i);
    fireEvent.click(button);

    expect(setStepMock).toHaveBeenCalledWith(2);
  });

  it('should call setEmail when typing into the input field', () => {
    const setStepMock = jest.fn();
    const setEmailMock = jest.fn();

    render(<FirstStep setStep={setStepMock} setEmail={setEmailMock} />);

    const input = screen.getByPlaceholderText(/email/i);
    fireEvent.change(input, { target: { value: 'test@example.com' } });
  });
});
