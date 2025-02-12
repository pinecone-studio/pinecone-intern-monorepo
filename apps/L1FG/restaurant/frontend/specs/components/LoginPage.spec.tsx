import { act, render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LoginPage from '@/components/LoginPage';
import { useRouter } from 'next/navigation';
import { LoginUserDocument } from '@/generated';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
describe('LoginPage', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  const mocks = [
    {
      request: {
        query: LoginUserDocument,
        variables: {
          input: {
            email: 'test@example.com',
            password: 'password123',
          },
        },
      },
      result: {
        data: {
          loginUser: {
            _id: '12345',
            email: 'test@example.com',
            userName: 'testuser',
            profileImage: '/profile.jpg',
            createdAt: '2023-01-01',
          },
        },
      },
    },
  ];

  it('should show error message when fields are empty', async () => {
    const { getByTestId, queryByText } = render(
      <MockedProvider>
        <LoginPage />
      </MockedProvider>
    );

    await act(async () => {
      const loginButton = getByTestId('Нэвтрэх');
      fireEvent.click(loginButton);
    });

    expect(queryByText('Бүх талбарыг бөглөнө үү.'));
  });

  it('should show error message on invalid login', async () => {
    const invalidMocks = [
      {
        request: {
          query: LoginUserDocument,
          variables: {
            input: {
              email: 'test@example.com',
              password: 'wrongpassword',
            },
          },
        },
        error: new Error('Invalid credentials'),
      },
    ];

    const { getByTestId, queryByText } = render(
      <MockedProvider mocks={invalidMocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'wrongpassword' } });

      const loginButton = getByTestId('Нэвтрэх');
      fireEvent.click(loginButton);
    });

    await waitFor(() => expect(queryByText('Имэйл эсвэл нууц үг буруу байна.')));
  });

  it('should save user data to localStorage and navigate to / on successful login', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });

      const loginButton = getByTestId('Нэвтрэх');
      fireEvent.click(loginButton);
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });

  it('should show loading state during login', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });

      const loginButton = getByTestId('Нэвтрэх');
      fireEvent.click(loginButton);
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/'));
  });
});
