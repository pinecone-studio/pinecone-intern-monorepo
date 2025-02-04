import LogInForm from '@/app/(public)/login/_features/Login';
import { useAuth } from '@/components/providers/AuthProvider';
import { fireEvent, render, screen } from '@testing-library/react';
jest.mock('../../../src/components/providers/AuthProvider.tsx', () => ({
  useAuth: jest.fn(),
}));

describe('LogInPage', () => {
  it('Should render', () => {
    const mockSignin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ signin: mockSignin });
    render(<LogInForm />);
    expect(screen.getByTestId('login-password-input')).toBeDefined();
    expect(screen.getByTestId('login-email-input')).toBeDefined();
  });
  it('Should signin', () => {
    const mockSignin = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({ signin: mockSignin });
    render(<LogInForm />);
    fireEvent.change(screen.getByTestId('login-email-input'), {
      target: {
        value: 'hi',
      },
    });

    fireEvent.change(screen.getByTestId('login-password-input'), {
      target: {
        value: 'hi',
      },
    });
    fireEvent.submit(screen.getByTestId('login-submit-button'));
    expect(mockSignin).toHaveBeenCalledWith({
      email: 'hi',
      password: 'hi',
    });
  });
});
