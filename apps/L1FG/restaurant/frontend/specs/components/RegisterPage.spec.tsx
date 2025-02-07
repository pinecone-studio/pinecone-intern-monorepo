import { act, render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RegisterPage from '@/components/RegisterPage';
import { useRouter } from 'next/navigation';
import { CREATE_USER } from '@/components/RegisterPage';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('RegisterPage', () => {
  const mockPush = jest.fn();
  (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

  const mocks = [
    {
      request: {
        query: CREATE_USER,
        variables: {
          input: {
            userName: 'testuser',
            email: 'test@example.com',
            password: 'password123',
            rePassword: 'password123',
          },
        },
      },
      result: {
        data: {
          createUser: {
            email: 'test@example.com',
            userName: 'testuser',
          },
        },
      },
    },
  ];

  it('should navigate to /login on successful register', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('userName'), { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
      fireEvent.change(getByTestId('rePassword'), { target: { value: 'password123' } });

      fireEvent.click(getByTestId('Бүртгүүлэх'));
    });

    await waitFor(() => expect(mockPush).toHaveBeenCalledWith('/login'));
  });

  it('should display error messages for empty fields', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.click(getByTestId('Бүртгүүлэх'));
    });

    expect(getByText('Бүх талбарыг бөглөнө үү.'));
  });

  it('should display error if passwords do not match', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('userName'), { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
      fireEvent.change(getByTestId('rePassword'), { target: { value: 'password321' } });

      fireEvent.click(getByTestId('Бүртгүүлэх'));
    });

    expect(getByText('Нууц үг таарахгүй байна.'));
  });

  it('should display error for invalid email format', async () => {
    const { getByTestId, getByText } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    await act(async () => {
      fireEvent.change(getByTestId('userName'), { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('email'), { target: { value: 'invalid-email' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
      fireEvent.change(getByTestId('rePassword'), { target: { value: 'password123' } });

      fireEvent.click(getByTestId('Бүртгүүлэх'));
    });
    expect(getByText('Зөв имэйл хаяг оруулна уу.'));
  });

  it('should display an error if the mutation fails', async () => {
    const errorMocks = [
      {
        request: {
          query: CREATE_USER,
          variables: {
            input: {
              email: 'test@example.com',
              userName: 'testuser',
              password: 'password123',
            },
          },
        },
        error: new Error('Бүртгэл амжилтгүй боллоо.'),
      },
    ];

    const { getByTestId, getByText } = render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );
    await act(async () => {
      fireEvent.change(getByTestId('userName'), { target: { value: 'testuser' } });
      fireEvent.change(getByTestId('email'), { target: { value: 'test@example.com' } });
      fireEvent.change(getByTestId('password'), { target: { value: 'password123' } });
      fireEvent.change(getByTestId('rePassword'), { target: { value: 'password123' } });

      fireEvent.click(getByTestId('Бүртгүүлэх'));
    });

    await waitFor(() => expect(getByText('Бүртгэл амжилтгүй боллоо.')));
  });
});
