import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordStepOne } from '@/app/forget-password/_components/PasswordStepOne';

describe('PasswordStepOne', () => {
  const mockSetStep = jest.fn();
  const mockSetEmail = jest.fn();

  beforeEach(() => {
    mockSetStep.mockClear();
    mockSetEmail.mockClear();
  });

  it('1. renders input and button', () => {
    render(<PasswordStepOne setStep={mockSetStep} setEmail={mockSetEmail} />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('2. shows error if email is empty', () => {
    render(<PasswordStepOne setStep={mockSetStep} setEmail={mockSetEmail} />);

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mockSetStep).not.toHaveBeenCalled();
    expect(mockSetEmail).not.toHaveBeenCalled();
  });

  it('3. submits with valid email', () => {
    render(<PasswordStepOne setStep={mockSetStep} setEmail={mockSetEmail} />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockSetEmail).toHaveBeenCalledWith('test@example.com');
    expect(mockSetStep).toHaveBeenCalledWith(2);
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });
});
