import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import SignInForm, { LOGIN_USER } from '@/app/signin/_components/SignInForm';
import '@testing-library/jest-dom';

const localStorageMock = {
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('js-cookie', () => ({
  set: jest.fn(),
}));

const mockSuccess = {
  request: {
    query: LOGIN_USER,
    variables: { email: 'test@example.com', password: 'password123' },
  },
  result: {
    data: {
      loginUser: {
        token: 'mocked-token',
      },
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

  it('renders form fields', () => {
    render(
      <MockedProvider mocks={[]}>
        <SignInForm />
      </MockedProvider>
    );

    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Continue' })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    render(
      <MockedProvider mocks={[mockSuccess]}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    await waitFor(() => {
      expect(localStorageMock.setItem).toHaveBeenCalledWith('token', 'mocked-token');
    });
  });

  it('shows error message on failed login', async () => {
    render(
      <MockedProvider mocks={[mockError]}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(await screen.findByText('Login failed')).toBeInTheDocument();
  });

  it('shows loading state during submission', async () => {
    render(
      <MockedProvider mocks={[mockSuccess]}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Continue' }));

    expect(await screen.findByText('Logging in...')).toBeInTheDocument();
  });
});