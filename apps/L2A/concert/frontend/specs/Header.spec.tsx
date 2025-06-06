import Header from '@/app/_components/Header';
import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { AuthProvider, useAuth } from '@/app/_components/context/AuthContext';
import { GetUserInfoDocument } from '@/generated';
import React from 'react';
import '@testing-library/jest-dom';
import { BookingProvider } from '@/app/_components/context/BookingContext';

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
          <BookingProvider>
            <Header />
          </BookingProvider>
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
          <BookingProvider>
            <Header />
          </BookingProvider>
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

  it('should render search input field', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthProvider>
          <BookingProvider>
            <Header />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );

    const searchInput = screen.getByPlaceholderText('Хайлт');
    expect(searchInput).toBeInTheDocument();
  });

  it('should render shopping cart icon', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthProvider>
          <BookingProvider>
            <Header />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );

    const cartIcon = screen.getByLabelText('Shopping Cart');
    expect(cartIcon).toBeInTheDocument();
  });

  it('should type and click enter', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthProvider>
          <BookingProvider>
            <Header />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );
    const searchInput = screen.getByPlaceholderText('Хайлт');
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(searchInput).toHaveValue('test search');
  });
  it('should type and click anybutton', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <AuthProvider>
          <BookingProvider>
            <Header />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );
    const searchInput = screen.getByPlaceholderText('Хайлт');
    fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.change(searchInput, { target: { value: 'test search' } });
    fireEvent.keyDown(searchInput, { key: 'a', code: 'KeyA', charCode: 65 });
    expect(searchInput).toHaveValue('test search');
  });
});
