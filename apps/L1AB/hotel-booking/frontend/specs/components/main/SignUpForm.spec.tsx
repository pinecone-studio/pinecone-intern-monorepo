import { render, fireEvent, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SignUpForm from '@/components/main/SignUpForm';

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock('@/components/main/SignUpFormEmailStep', () => ({
  __esModule: true,
  default: ({ nextHandler }: { nextHandler: () => void }) => {
    return (
      <button onClick={nextHandler} data-testid="step1-btn">
        Next from Step1
      </button>
    );
  },
}));

jest.mock('@/components/main/SignUpFormOtpStep', () => ({
  __esModule: true,
  default: ({ nextHandler }: { nextHandler: () => void }) => {
    return (
      <button onClick={nextHandler} data-testid="step2-btn">
        Next from Step2
      </button>
    );
  },
}));

jest.mock('@/components/main/SignUpFormPasswordStep', () => ({
  __esModule: true,
  default: () => {
    return null;
  },
}));

describe('SignUpForm - Step 2: Password Step', () => {
  it('transitions through steps correctly', () => {
    render(
      <MockedProvider>
        <SignUpForm />
      </MockedProvider>
    );

    const step1Button = screen.getByTestId('step1-btn');
    expect(step1Button);

    fireEvent.click(step1Button);

    const step2Button = screen.getByTestId('step2-btn');
    expect(step2Button);

    fireEvent.click(step2Button);
  });
});
