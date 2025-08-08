import { MultiStepForm1 } from '@/components/MultiStepForm1';
import { MultiStepForm2 } from '@/components/MultiStepForm2';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

describe('MultiStepForm', () => {
  it('should render the correct step for first half', () => {
    render(<MultiStepForm1 step="createAccount" setStep={jest.fn()} />);
    expect(screen.getByText('Create an account')).toBeInTheDocument();

    render(<MultiStepForm1 step="confirmEmail" setStep={jest.fn()} />);
    expect(screen.getByText(/confirm email/i)).toBeInTheDocument();

    render(<MultiStepForm1 step="createPass" setStep={jest.fn()} />);
    expect(screen.getByText(/create password/i)).toBeInTheDocument();

    render(<MultiStepForm1 step="genderSelect" setStep={jest.fn()} />);
    expect(screen.getByText('Who are you interested in?')).toBeInTheDocument();
  });

  it('should render the correct step for second half', () => {
    const mockRouter = { push: jest.fn() };

    render(<MultiStepForm2 step="ageSelect" setStep={jest.fn()} router={mockRouter} />);
    expect(screen.getByText(/How old are you/i)).toBeInTheDocument();

    render(<MultiStepForm2 step="details" setStep={jest.fn()} router={mockRouter} />);
    expect(screen.getByText(/your details/i)).toBeInTheDocument();

    render(<MultiStepForm2 step="uploadImages" setStep={jest.fn()} router={mockRouter} />);
    expect(screen.getByText(/upload your image/i)).toBeInTheDocument(); // Adjust based on actual text

    render(<MultiStepForm2 step="allSet" setStep={jest.fn()} router={mockRouter} />);
    expect(screen.getByText(/you're all set/i)).toBeInTheDocument();
  });
});
