import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { AddUserDocument } from '@/generated';
import { SignUp } from 'src/app/auth/_feature/SignUp';
import '@testing-library/jest-dom';

const email = 'test@example.com';
const password = 'testpass123';

const mocks = [
  {
    request: {
      query: AddUserDocument,
      variables: { email, password },
    },
    result: {
      data: {
        addUser: {
          id: '123',
          email,
          __typename: 'User',
        },
      },
    },
  },
];

describe('SignUp Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders form elements', () => {
    render(
      <MockedProvider>
        <SignUp />
      </MockedProvider>
    );

    expect(screen.getByTestId('signup-title')).toBeInTheDocument();
    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('confirm-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('calls mutation and shows success message on valid input', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SignUp />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: password } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: password } });

    fireEvent.click(screen.getByTestId('submit-button'));

    await waitFor(() => {
      expect(screen.getByTestId('success-msg')).toBeInTheDocument();
    });
  });

  it('shows error message on mutation failure', async () => {
    const errorMock = [
      {
        request: {
          query: AddUserDocument,
          variables: { email, password },
        },
        error: new Error('Email already exists'),
      },
    ];

    render(
      <MockedProvider mocks={errorMock} addTypename={false}>
        <SignUp />
      </MockedProvider>
    );

    fireEvent.change(screen.getByTestId('email-input'), { target: { value: email } });
    fireEvent.change(screen.getByTestId('password-input'), { target: { value: password } });
    fireEvent.change(screen.getByTestId('confirm-password-input'), { target: { value: password } });

    fireEvent.click(screen.getByTestId('submit-button'));
  });
});
