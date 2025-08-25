import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';
import { CreateUserDocument } from '@/generated';
import { CreateUserCard } from '@/components/auth/sign-up/CreateUserCard';
import { LoginButton } from '@/components/auth/sign-up/LoginButton';

const createUserMock: MockedResponse = {
  request: {
    query: CreateUserDocument,
    variables: {
      input: {
        username: 'User1',
        email: 'user1@gmail.com',
        password: 'user1@123',
      },
    },
  },
  result: {
    data: {
      createUser: {
        userId: '1',
        username: 'User1',
        email: 'user1@gmail.com',
      },
      __typename: 'UserRegister',
    },
  },
};

const createUserErrorMock: MockedResponse = {
  request: {
    query: CreateUserDocument,
    variables: {
      username: 'User1',
      email: 'user1@gmail.com',
      password: 'user1@123',
    },
  },
  error: new Error('Имэйл хаяг бүртгэлтэй байна.'),
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateUserComponent', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should successfully render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
        <CreateUserCard />
      </MockedProvider>
    );

    const usernameInput = getByTestId('createUser-username-input');
    const emailInput = getByTestId('createUser-email-input');
    const passwordInput = getByTestId('createUser-password-input');
    const confirmPasswordInput = getByTestId('createUser-confirmPassword-input');
    const submitButton = getByTestId('createUser-submit-btn');

    expect(usernameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should successfully create new user when button is clicked and should navigate to login page', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    const { getByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
        <CreateUserCard />
      </MockedProvider>
    );
    const usernameInput = getByTestId('createUser-username-input');
    const emailInput = getByTestId('createUser-email-input');
    const passwordInput = getByTestId('createUser-password-input');
    const confirmPasswordInput = getByTestId('createUser-confirmPassword-input');
    const submitButton = getByTestId('createUser-submit-btn');

    fireEvent.change(usernameInput, { target: { value: 'User1' } });
    fireEvent.change(emailInput, { target: { value: 'user1@gmail.com' } });
    fireEvent.change(passwordInput, { target: { value: 'user1@123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'user1@123' } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith('/sign-in');
    });
  });

  it('should throw error when user registration is failed', async () => {
    const { getByTestId, findByText } = render(
      <MockedProvider mocks={[createUserErrorMock]} addTypename={false}>
        <CreateUserCard />
      </MockedProvider>
    );

    fireEvent.change(getByTestId('createUser-username-input'), { target: { value: 'User1' } });
    fireEvent.change(getByTestId('createUser-email-input'), { target: { value: 'user1@gmail.com' } });
    fireEvent.change(getByTestId('createUser-password-input'), { target: { value: 'user1@123' } });
    fireEvent.change(getByTestId('createUser-confirmPassword-input'), { target: { value: 'user1@123' } });
    fireEvent.click(getByTestId('createUser-submit-btn'));

    expect(await findByText('Имэйл хаяг бүртгэлтэй байна.')).toBeInTheDocument();
  });
});

describe('Login Button', () => {
  it('should navigate to login page when clicked', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { queryByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
        <LoginButton />
      </MockedProvider>
    );

    const loginBtn = queryByTestId('login-btn');

    expect(loginBtn).toBeInTheDocument();

    fireEvent.click(loginBtn as HTMLElement);

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/sign-in'));
  });
});
