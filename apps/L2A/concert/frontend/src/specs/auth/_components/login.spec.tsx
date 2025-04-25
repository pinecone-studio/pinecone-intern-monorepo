import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { LoginUserDocument } from '@/generated';
import '@testing-library/jest-dom';
import { Login } from 'src/app/auth/_feature/Login';

const email = 'test@example.com';
const password = 'password123';

const mocks = [
  {
    request: {
      query: LoginUserDocument,
      variables: { email, password },
    },
    result: {
      data: {
        loginUser: {
          JWT: 'mocked-token',
        },
      },
    },
  },
];

describe('Login Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders form elements', () => {
    render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );

    expect(screen.getByTestId('signin-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('shows validation error for invalid inputs', async () => {
    render(
      <MockedProvider>
        <Login />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: 'invalid' },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: '123' },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByText(/Имэйл хаяг буруу байна/i)).toBeInTheDocument();
    });
  });

  it('submits valid form and saves token', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <Login />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), {
      target: { value: email },
    });
    fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: password },
    });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('mocked-token');
      expect(screen.getByText('Амжилттай нэвтэрлээ!')).toBeInTheDocument();
    });
  });
});
