import Header from '@/app/_components/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { AuthProvider, useAuth } from '@/app/_components/context/AuthContext';
import { GetUserInfoDocument } from '@/generated';
import React from 'react';
import '@testing-library/jest-dom';

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

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/auth/signin',
  useSearchParams: () => new URLSearchParams({ foo: 'bar' }),
}));

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
    expect(window.location.pathname).toBe('/');
  });

  it('should throw error when useAuth is used outside AuthProvider', () => {
    const DummyComponent = () => {
      useAuth();
      return null;
    };

    expect(() => render(<DummyComponent />)).toThrowError('useAuth must be used within an AuthProvider');
  });
});
