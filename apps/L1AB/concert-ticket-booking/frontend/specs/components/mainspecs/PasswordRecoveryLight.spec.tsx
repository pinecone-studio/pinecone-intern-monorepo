import { render, fireEvent, waitFor } from '@testing-library/react';
import PasswordRecovery from '@/components/maincomponents/PasswordRecovery';
import { MockedProvider } from '@apollo/client/testing';
import { PasswordRecoveryDocument } from '@/generated';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/providers/AuthProvider';
import { useTheme } from 'next-themes';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

jest.mock('@/components/providers/AuthProvider', () => ({
  useAuth: jest.fn(),
}));
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
  theme: 'dark',
}));
const passwordRecovery = {
  request: {
    query: PasswordRecoveryDocument,
    variables: {
      input: {
        password: '123456',
      },
    },
  },
  result: {
    data: {
      requestPasswordRecovery: {
        password: '123456',
      },
    },
  },
};

describe('PasswordRecovery-Page', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockImplementation(() => ({
      theme: 'light',
    }));
  });
  it('should render PasswordRecovery and handle password visibility and form submission', async () => {
    useSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === 'email') return 'test@example.com';
        if (key === 'token') return 'sampleToken123';
        return null;
      },
    });

    useAuth.mockReturnValue({
      passwordRecovery: jest.fn().mockResolvedValue({ password: '123456' }),
    });

    const { getByTestId } = render(
      <MockedProvider mocks={[passwordRecovery]}>
        <PasswordRecovery header="Нууц үг сэргээх:" passwordLabel="Нууц үг:" confirmPasswordLabel="Нууц үг давтах:" buttonText="Үргэлжлүүлэх" />
      </MockedProvider>
    );

    const passwordInput = getByTestId('password');
    const togglePasswordVisibilityButton = getByTestId('toggleVisibility');
    fireEvent.click(togglePasswordVisibilityButton);

    expect(passwordInput);

    fireEvent.click(togglePasswordVisibilityButton);
    expect(passwordInput);

    const confirmPasswordInput = getByTestId('confirmPassword');
    const toggleConfirmPasswordVisibilityButton = getByTestId('toggleVisibility1');
    fireEvent.click(toggleConfirmPasswordVisibilityButton);

    expect(confirmPasswordInput);

    fireEvent.click(toggleConfirmPasswordVisibilityButton);
    expect(confirmPasswordInput);

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '123456' } });

    fireEvent.click(getByTestId('recoveryButton'));

    await waitFor(() => {
      expect(useAuth().passwordRecovery).toHaveBeenCalledWith({
        email: 'test@example.com',
        accessToken: 'sampleToken123',
        password: '123456',
      });
    });
  });

  it('should show an error when passwords do not match', async () => {
    useSearchParams.mockReturnValue({
      get: (key: string) => {
        if (key === 'email') return 'test@example.com';
        if (key === 'token') return 'sampleToken123';
        return null;
      },
    });

    useAuth.mockReturnValue({
      passwordRecovery: jest.fn().mockResolvedValue({ password: '123456' }),
    });

    const { getByTestId } = render(
      <MockedProvider mocks={[passwordRecovery]}>
        <PasswordRecovery header="Нууц үг сэргээх:" passwordLabel="Нууц үг:" confirmPasswordLabel="Нууц үг давтах:" buttonText="Үргэлжлүүлэх" />
      </MockedProvider>
    );

    const passwordInput = getByTestId('password');
    const confirmPasswordInput = getByTestId('confirmPassword');

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '654321' } });

    fireEvent.click(getByTestId('recoveryButton'));
  });
});
