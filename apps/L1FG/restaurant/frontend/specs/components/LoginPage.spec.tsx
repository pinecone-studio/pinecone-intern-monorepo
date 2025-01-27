import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LoginPage, { LOGIN_USER } from '@/components/LoginPage';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('LoginPage', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  const mocks = [
    {
      request: {
        query: LOGIN_USER,
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

  it('should show error message when fields are empty', () => {
    const { getByTestId, queryByText } = render(
      <MockedProvider>
        <LoginPage />
      </MockedProvider>
    );

    const loginButton = getByTestId('Нэвтрэх');
    fireEvent.click(loginButton);

    expect(queryByText('Бүх талбарыг бөглөнө үү.'));
  });

  it('should show error message on invalid login', async () => {
    const invalidMocks = [
      {
        request: {
          query: LOGIN_USER,
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

    fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'wrongpassword' } });

    const loginButton = getByTestId('Нэвтрэх');
    fireEvent.click(loginButton);

    await waitFor(() => expect(queryByText('Имэйл эсвэл нууц үг буруу байна.')));
  });

  it('should save user data to localStorage and navigate to /order/1 on successful login', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });

    const loginButton = getByTestId('Нэвтрэх');
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/order/1'));
  });

  it('should show loading state during login', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });

    const loginButton = getByTestId('Нэвтрэх');
    fireEvent.click(loginButton);

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/order/1'));
  });
});
