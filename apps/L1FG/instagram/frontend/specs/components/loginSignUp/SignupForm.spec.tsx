import { useAuth } from '@/components/providers/AuthProvider';
import SignUpForm from '@/components/sign-up/SignUpForm';
import { fireEvent, render, screen } from '@testing-library/react';
jest.mock('../../../src/components/providers/AuthProvider.tsx', () => ({
  useAuth: jest.fn(),
}));
describe('asd', () => {
  it('should form elements be rendered', () => {
    const mockSignup = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
    render(<SignUpForm />);
    const formElement = screen.getByTestId('signup-form');
    const emailInput = screen.getByTestId('signup-email-input');
    const passwordInput = screen.getByTestId('signup-password-input');
    const fullNameInput = screen.getByTestId('signup-fullName-input');
    const userNameInput = screen.getByTestId('signup-userName-input');
    expect(formElement).toBeDefined();
    expect(emailInput).toBeDefined();
    expect(passwordInput).toBeDefined();
    expect(fullNameInput).toBeDefined();
    expect(userNameInput).toBeDefined();
  });
  it('Should sign up', () => {
    const mockSignup = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      signup: mockSignup,
    });
    render(<SignUpForm />);
    fireEvent.change(screen.getByTestId('signup-email-input'), {
      target: {
        value: '1@gmail.com',
      },
    });

    fireEvent.change(screen.getByTestId('signup-password-input'), {
      target: {
        value: '1234',
      },
    });

    fireEvent.change(screen.getByTestId('signup-fullName-input'), {
      target: {
        value: 'john',
      },
    });
    fireEvent.change(screen.getByTestId('signup-userName-input'), {
      target: {
        value: 'john',
      },
    });
    fireEvent.submit(screen.getByTestId('sign-up-button'));
    expect(mockSignup).toHaveBeenCalledWith({
      email: '1@gmail.com',
      password: '1234',
      fullName: 'john',
      userName: 'john',
    });
  });
});
