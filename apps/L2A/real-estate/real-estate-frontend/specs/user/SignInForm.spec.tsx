import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { GraphQLError } from 'graphql';
import { MockedProvider } from '@apollo/client/testing';
import Cookies from 'js-cookie';
import SignInForm, { LOGIN_USER } from '@/app/signin/_components/SignInForm';
import '@testing-library/jest-dom';
import { jest } from '@jest/globals';




jest.mock('js-cookie');
jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: jest.fn() }),
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
        user: { id: '1', email: 'test@example.com' },
      },
    },
  },
};

const mockError = {
  request: {
    query: LOGIN_USER,
    variables: { email: 'wrong@example.com', password: 'wrongpass' },
  },
  error: new GraphQLError('Login failed'), // Proper error object
};

beforeEach(() => {
  jest.clearAllMocks();
});


describe('SignInForm', () => {
  it('renders form fields', () => {
    render(
      <MockedProvider mocks={[]}>
        <SignInForm />
      </MockedProvider>
    );

    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Continue/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    render(
      <MockedProvider mocks={[mockSuccess]}>
        <SignInForm />
      </MockedProvider>
    );

    fireEvent.change(screen.getByLabelText(/Email/i), { 
      target: { value: 'test@example.com' } 
    });
    fireEvent.change(screen.getByLabelText(/Password/i), { 
      target: { value: 'password123' } 
    });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));

    await waitFor(() => {
      expect(Cookies.set).toHaveBeenCalledWith('token', 'mocked-token', expect.anything());
    });
  });

  it('shows "Login failed" for any error', async () => {
    render(
      <MockedProvider mocks={[mockError]}>
        <SignInForm />
      </MockedProvider>
    );
  
    // Combined input changes
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByRole('button', { name: /Continue/i }));
  
    expect(await screen.findByText('Login failed')).toBeInTheDocument();
  });
});