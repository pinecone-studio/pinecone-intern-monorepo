'use client';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname, useRouter } from 'next/navigation';
import AdminHeader from '@/app/admin/_components/AdminHeader';
import { AuthProvider } from '@/app/_components/context/AuthContext';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AdminHeader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: jest.fn(),
      replace: jest.fn(),
    });
    localStorageMock.getItem.mockImplementation((key) => (key === 'user' ? null : undefined));
  });

  it('renders and highlights Тасалбар when pathname is /admin/concerts', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/concerts');

    render(
      <MockedProvider>
        <AuthProvider>
          <AdminHeader />
        </AuthProvider>
      </MockedProvider>
    );

    const ticketLink = screen.getByTestId('ticket-button-admin');
    const cancelLink = screen.getByTestId('cancel-request-admin');

    expect(ticketLink).toHaveClass('border-b');
    expect(cancelLink).not.toHaveClass('border-b');
  });

  it('renders and highlights Цуцлах хүсэлт when pathname is /admin/cancel-request', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/cancel-request');

    render(
      <MockedProvider>
        <AuthProvider>
          <AdminHeader />
        </AuthProvider>
      </MockedProvider>
    );

    const ticketLink = screen.getByTestId('ticket-button-admin');
    const cancelLink = screen.getByTestId('cancel-request-admin');

    expect(ticketLink).not.toHaveClass('border-b');
    expect(cancelLink).toHaveClass('border-b');
  });

  it('renders default header content', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/concerts');

    render(
      <MockedProvider>
        <AuthProvider>
          <AdminHeader />
        </AuthProvider>
      </MockedProvider>
    );

    expect(screen.getByText('TICKET BOOKING')).toBeInTheDocument();
    expect(screen.getByText('Концертууд')).toBeInTheDocument();
    expect(screen.getByText('Цуцлах хүсэлт')).toBeInTheDocument();
  });
});
