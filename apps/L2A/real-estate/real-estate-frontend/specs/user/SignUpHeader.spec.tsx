import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SignupHeader from '@/app/signup/_components/SigUpHeader';

describe('SignUpHeader', () => {
  it('renders default StepOne header', () => {
    render(<SignupHeader step={1} email="test@example.com" />);
    expect(screen.getByText('Home Vault')).toBeInTheDocument();
    expect(screen.getByText('Enter your email below to create your account')).toBeInTheDocument();
  });

  it('renders StepTwo header with email', () => {
    render(<SignupHeader step={2} email="test@example.com" />);
    expect(screen.getByText(/To continue, enter the secure code/)).toBeInTheDocument();
    expect(screen.getByText(/test@example.com/)).toBeInTheDocument();
  });

  it('renders StepThree header with instructions', () => {
    render(<SignupHeader step={3} email="test@example.com" />);
    expect(screen.getByText('Create password')).toBeInTheDocument();
    expect(
      screen.getByText(/Use a minimum of 10 characters/)
    ).toBeInTheDocument();
  });
});
