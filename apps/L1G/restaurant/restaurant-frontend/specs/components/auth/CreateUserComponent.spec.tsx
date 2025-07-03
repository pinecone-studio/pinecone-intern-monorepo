
import { act, fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';
import { CreateUserDocument } from '@/generated';
import { CreateUserComponent } from '@/components/auth/sign-up/CreateUserComponent';
import { LoginButton } from '@/components/auth/sign-up/LoginButton';

const createUserMock: MockedResponse = {
  request: {
    query: CreateUserDocument,
    variables: {
      username: 'User1',
      email: 'user1@gmail.com',
      password: 'user1@123',
    },
  },
  result: {
    data: {
      user: {
        userId: '1',
        username: 'User1',
        email: 'user1@gmail.com',
      },
    },
  },
};

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CreateUserCard', () => {
  it('should successfully render', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
        <CreateUserComponent/>
      </MockedProvider>
    );

    const inputUsername = getByTestId('createUser-username-input');
    const inputEmail = getByTestId('createUser-email-input');
    const inputPassword = getByTestId('createUser-password-input');
    const inputConfirmPassword = getByTestId('createUser-confirmPassword-input');
    const buttonSubmit = getByTestId('createUser-submit-btn');

    expect(inputUsername).toBeInTheDocument();
        expect(inputEmail).toBeInTheDocument();
            expect(inputPassword).toBeInTheDocument();
                expect(inputConfirmPassword).toBeInTheDocument();
                    expect(buttonSubmit).toBeInTheDocument();
  });

  it('should successfully create new user when button is clicked and navigate to login page', async () => {

    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { getByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
        <CreateUserComponent/>
      </MockedProvider>
    );

    const inputUsername = getByTestId('createUser-username-input');
    const inputEmail = getByTestId('createUser-email-input');
    const inputPassword = getByTestId('createUser-password-input');
    const inputConfirmPassword = getByTestId('createUser-confirmPassword-input');
    const buttonSubmit = getByTestId('createUser-submit-btn');

    act(() => {
      fireEvent.change(inputUsername, { target: { value: 'User1' } });
      fireEvent.change(inputEmail, { target: { value: 'user1@gmail.com' } });
      fireEvent.change(inputPassword, { target: { value: 'user1@123' } });
      fireEvent.change(inputConfirmPassword, { target: { value: 'user1@123' } });
       fireEvent.click(buttonSubmit);
    });

     await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/sign-in'));

  });

  it('should navigate to the provided path when clicked', async () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { queryByTestId } = render(
      <MockedProvider mocks={[createUserMock]} addTypename={false}>
           <LoginButton/>
      </MockedProvider>
    );

    const loginBtn = queryByTestId('login-btn');

    expect(queryByTestId('login-btn')).toBeInTheDocument();

    act(() => {
      fireEvent.click(loginBtn as HTMLElement, { name: /sign-in/i });
    });
    await waitFor(() => expect(pushMock).toHaveBeenCalledWith('/sign-in'));
  });
});


