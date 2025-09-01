import { fireEvent, render, waitFor, act } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import React from 'react';
import '@testing-library/jest-dom';
import { SignInDocument } from '@/generated';
import { useRouter } from 'next/navigation';
import { SignInComponent } from '@/components/auth/SignInComponent';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/app/context/AuthContext', () => ({
  useAuth: () => ({
    setUser: jest.fn(),
  }),
}));

const signInMock: MockedResponse = {
  request: {
    query: SignInDocument,
    variables: {
      input: {
        email: 'test@gmail.com',
        password: 'test123',
      },
    },
  },
  result: {
    data: {
      signIn: {
        token: '',
        user: {
          userId: 'test',
          email: 'test@gmail.com',
        },
        __typename: 'AuthPayload',
      },
    },
  },
};

describe('SignInComponents', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render', () => {
    render(
      <MockedProvider mocks={[signInMock]}>
        <SignInComponent />
      </MockedProvider>
    );
  });
  it('should navigate to home page if sign in is successful and save token to localStorage', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });
    const localStorageMock = {
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    const { getByTestId, findByTestId } = render(
      <MockedProvider mocks={[signInMock]} addTypename={false}>
        <SignInComponent />
      </MockedProvider>
    );

    const emailInput = await findByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const signInButton = getByTestId('sign-in-button');

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'test123' } });

    fireEvent.click(signInButton);

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith('token', '');
    });

    await waitFor(
      () => {
        expect(push).toHaveBeenCalledWith('/');
      },
      { timeout: 3000 }
    );
  });
  it('should show error message if sign in fails', async () => {
    const errorMock = {
      request: {
        query: SignInDocument,
        variables: {
          input: {
            email: 'wrong@gmail.com',
            password: 'wrongpassword',
          },
        },
      },
      error: new Error('An error occurred'),
    };

    const { getByTestId, findByText } = render(
      <MockedProvider mocks={[errorMock]} addTypename={false}>
        <SignInComponent />
      </MockedProvider>
    );

    fireEvent.change(getByTestId('email-input'), { target: { value: 'wrong@gmail.com' } });
    fireEvent.change(getByTestId('password-input'), { target: { value: 'wrongpassword' } });
    fireEvent.click(getByTestId('sign-in-button'));

    expect(await findByText('Имэйл эсвэл нууц үг буруу байна.')).toBeInTheDocument();
  });

  it('should navigate to reset-password page', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getByTestId } = render(
      <MockedProvider mocks={[signInMock]} addTypename={false}>
        <SignInComponent />
      </MockedProvider>
    );

    const resetPasswordButton = getByTestId('reset-password-button');
    fireEvent.click(resetPasswordButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/reset-password');
    });
  });

  it('should navigate to sign-up page', async () => {
    const push = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push });

    const { getByTestId } = render(
      <MockedProvider mocks={[signInMock]} addTypename={false}>
        <SignInComponent />
      </MockedProvider>
    );

    const signUpButton = getByTestId('sign-up-button');
    fireEvent.click(signUpButton);

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith('/sign-up');
    });
  });
});
