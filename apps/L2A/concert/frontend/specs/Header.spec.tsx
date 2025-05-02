import Header from '@/app/_components/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import '@testing-library/jest-dom';
import { AuthProvider, useAuth } from '@/app/_components/context/AuthContext';
import { GetUserInfoDocument } from '@/generated';

const userMock = {
  request: {
    query: GetUserInfoDocument,
    variables: { jwt: 'mock-jwt-token' },
  },
  result: {
    data: {
      GetUserInfo: {
        id: '1',
        email: 'test@example.com',
        phone: null,
        isAdmin: false,
      },
    },
  },
};

describe('Header', () => {
  it('should render Header when not logged in', async () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MockedProvider>
    );

    expect(await screen.findByTestId('header')).toBeInTheDocument();
    expect(screen.getByText(/Бүртгүүлэх/i)).toBeInTheDocument();
    expect(screen.getByText(/Нэвтрэх/i)).toBeInTheDocument();
    expect(screen.getByText(/TICKET BOOKING/i)).toBeInTheDocument();
  });

  it('should show user email and logout when logged in', async () => {
    jest.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
      if (key === 'token') return 'mock-jwt-token';
      return null;
    });

    const clearSpy = jest.spyOn(Storage.prototype, 'clear');

    render(
      <MockedProvider mocks={[userMock]} addTypename={false}>
        <AuthProvider>
          <Header />
        </AuthProvider>
      </MockedProvider>
    );

    const emailElement = await screen.findByText('test@example.com');
    expect(emailElement).toBeInTheDocument();

    const logoutButton = screen.getByRole('button', { name: /Гарах/i });
    expect(logoutButton).toBeInTheDocument();

    fireEvent.click(logoutButton);
    expect(clearSpy).toHaveBeenCalled();

    clearSpy.mockRestore();
  });

  it('should throw error when useAuth is used outside AuthProvider', () => {
    const DummyComponent = () => {
      useAuth();
      return null;
    };

    expect(() => render(<DummyComponent />)).toThrowError('useAuth must be used within an AuthProvider');
  });
});
