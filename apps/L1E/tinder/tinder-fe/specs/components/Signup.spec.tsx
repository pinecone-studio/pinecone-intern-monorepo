import Signup from '@/components/signup/Signup';
import { render, screen, fireEvent } from '@testing-library/react';

// Mock the Addpassword component
jest.mock('@/components/signup/Addpassword', () => {
  return jest.fn(() => <div data-testid="addpassword-mock">Addpassword Mock</div>);
});

describe('Signup Component', () => {
  it('renders signup step by default', () => {
    render(<Signup />);

    expect(screen.getByText('Create an account'));
    expect(screen.getByLabelText('Email'));
    expect(screen.getByTestId('continue-btn'));
  });

  it('displays error message for invalid email', () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText('Email');
    const continueButton = screen.getByTestId('continue-btn');

    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.click(continueButton);

    expect(screen.getByText('Please enter a valid email address.'));
  });

  it('transitions to confirm step with valid email', () => {
    render(<Signup />);

    const emailInput = screen.getByLabelText('Email');
    const continueButton = screen.getByTestId('continue-btn');

    fireEvent.change(emailInput, { target: { value: 'valid@example.com' } });
    fireEvent.click(continueButton);

    expect(screen.getByTestId('addpassword-mock'));
  });

  it('renders the login link', () => {
    render(<Signup />);

    const loginLink = screen.getByTestId('link');
    expect(loginLink);
    expect(loginLink);
    expect(screen.getByText('Log in'));
  });
});
