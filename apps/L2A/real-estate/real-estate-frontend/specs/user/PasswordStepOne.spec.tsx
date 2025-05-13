import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { PasswordStepOne } from '@/app/forget-password/_components/PasswordStepOne';

describe('PasswordStepOne', () => {
  const mockSetStep = jest.fn();

  beforeEach(() => {
    mockSetStep.mockClear();
  });

  it('1.renders input and button', () => {
    render(<PasswordStepOne setStep={mockSetStep} />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('2.shows error if email is empty', () => {
    render(<PasswordStepOne setStep={mockSetStep} />);

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByText('Email is required')).toBeInTheDocument();
    expect(mockSetStep).toHaveBeenCalledWith(2);
  });

  it('3.submits with valid email', () => {
    render(<PasswordStepOne setStep={mockSetStep} />);

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    expect(mockSetStep).toHaveBeenCalledWith(2);
    expect(screen.queryByText('Email is required')).not.toBeInTheDocument();
  });
});
