import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SeatSelection from '@/app/booking/[id]/_components/SeatSelection';
import '@testing-library/jest-dom';
import { BookingProvider } from '@/app/_components/context/BookingContext';
import { AuthContext, AuthProvider } from '@/app/_components/context/AuthContext';
import { MockedProvider } from '@apollo/client/testing';
import { baseEvent } from './utils/mock-concert-info';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/booking',
  useSearchParams: () => new URLSearchParams({ foo: 'bar' }),
}));

describe('SeatSelection Component', () => {
  const userId = 'test-user';

  beforeEach(() => {
    window.alert = jest.fn();
    localStorage.clear();
    localStorage.setItem('user', JSON.stringify({ id: userId }));
  });

  it('renders fallback message if no seatData available', () => {
    render(
      <MockedProvider>
        <AuthProvider>
          <BookingProvider>
            <SeatSelection event={{ seatData: [] } as any} />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );
    expect(screen.getByText('Тасалбар дууссан!')).toBeInTheDocument();
  });

  it('renders ticket types properly', () => {
    render(
      <MockedProvider>
        <AuthProvider>
          <BookingProvider>
            <SeatSelection event={baseEvent} />
          </BookingProvider>
        </AuthProvider>
      </MockedProvider>
    );
    expect(screen.getByText('Арын тасалбар (100)')).toBeInTheDocument();
    expect(screen.getByText('Энгийн тасалбар (150)')).toBeInTheDocument();
    expect(screen.getByText('VIP тасалбар (50)')).toBeInTheDocument();
  });

  it('shows alert when saveBooking is triggered and no user is present', () => {
    window.alert = jest.fn();
    const mockAuthContext = {
      JWT: '',
      setJWT: jest.fn(),
      user: null,
      logout: jest.fn(),
    };

    render(
      <MockedProvider>
        <AuthContext.Provider value={mockAuthContext}>
          <BookingProvider>
            <SeatSelection event={baseEvent} />
          </BookingProvider>
        </AuthContext.Provider>
      </MockedProvider>
    );

    const purchaseButton = screen.getByTestId('purchase-button');

    purchaseButton.removeAttribute('disabled');
    fireEvent.click(purchaseButton);
  });

  it('shows alert when saveBooking is triggered and no user is', () => {
    window.alert = jest.fn();
    const mockAuthContext = {
      JWT: '',
      setJWT: jest.fn(),
      user: { id: 'mockId123' },
      logout: jest.fn(),
    };

    render(
      <MockedProvider>
        <AuthContext.Provider value={mockAuthContext}>
          <BookingProvider>
            <SeatSelection event={baseEvent} />
          </BookingProvider>
        </AuthContext.Provider>
      </MockedProvider>
    );

    const purchaseButton = screen.getByTestId('purchase-button');

    fireEvent.click(purchaseButton);
  });

  it('shows alert when saveBooking is triggered and no user is present', () => {
    const mockAuthContext = {
      JWT: '',
      setJWT: jest.fn(),
      user: { id: 'mockId123' },
      logout: jest.fn(),
    };
    render(
      <MockedProvider>
        <AuthContext.Provider value={mockAuthContext}>
          <BookingProvider>
            <SeatSelection event={baseEvent} />
          </BookingProvider>
        </AuthContext.Provider>
      </MockedProvider>
    );
    const plusButton = screen.getByTestId('plus-button-1');
    const plusButton2 = screen.getByTestId('plus-button-2');
    const minusbutton = screen.getByTestId('minus-button-2');

    fireEvent.click(plusButton);
    fireEvent.click(plusButton2);
    fireEvent.click(minusbutton);
    const purchaseButton = screen.getByTestId('purchase-button');
    fireEvent.click(purchaseButton);
    expect(window.alert).toHaveBeenCalledWith('Booking saved successfully!');
  });
});
