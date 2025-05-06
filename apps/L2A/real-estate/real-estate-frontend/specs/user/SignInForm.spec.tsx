import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import Cookies from 'js-cookie';
import SignInForm, { LOGIN_USER } from '@/app/signin/_components/SignInForm';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';
import { GraphQLError } from 'graphql';

jest.mock('js-cookie');
const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockSuccess = {
  request: {
    query: LOGIN_USER,
    variables: { email: 'test@example.com', password: 'password123' },
  },
  result: {
    data: {
      loginUser: { token: 'mocked-token' },
    },
  },
};

const mockError = {
  request: {
    query: LOGIN_USER,
    variables: { email: 'wrong@example.com', password: 'wrongpass' },
  },
  error: new GraphQLError('Login failed'),
};

describe('SignInForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form inputs and button', () => {
    render(
      <MockedProvider mocks={[]}>
        <SignInForm />
      </MockedProvider>
    );
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toHaveTextContent(/Continue/i);
  });

  it('successfully logs in and sets cookie, navigates', async () => {
    render(
      <MockedProvider mocks={[mockSuccess]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('token', 'mocked-token', expect.any(Object));
      expect(mockPush).toHaveBeenCalledWith('/');
    });
  });

  it('shows error message when login fails', async () => {
    render(
      <MockedProvider mocks={[mockError]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    const errorText = await screen.findByText('Login failed');
    expect(errorText).toBeInTheDocument();
  });

  it('disables button and shows loading state', async () => {
    render(
      <MockedProvider mocks={[mockSuccess]} addTypename={false}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByTestId('submit-button'));

    expect(screen.getByTestId('submit-button')).toBeDisabled();
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Logging in...');
  });
});
