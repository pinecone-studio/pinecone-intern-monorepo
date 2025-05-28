import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SeatSelection from '@/app/booking/[id]/_components/SeatSelection';
import '@testing-library/jest-dom';
import { BookingProvider } from '@/app/_components/context/BookingContext';
import { Concert } from '@/generated';

describe('SeatSelection Component', () => {
  beforeEach(() => {
    window.alert = jest.fn();
    localStorage.clear();
  });

  const baseEvent: Concert = {
    id: 'mock-2',
    artistName: 'Жавхлан',
    description: 'Mock description',
    doorOpen: '18:30',
    musicStart: '19:00',
    primaryPrice: 10000,
    specialGuestName: null,
    endDate: '2025-06-18',
    thumbnailUrl: '',
    title: 'Mock Concert 2',
    featured: false,
    venue: {
      id: 'venue-1',
      name: 'UB Palace',
      address: 'UB street',
      city: 'Ulaanbaatar',
      capacity: 1000,
      __typename: 'Venue',
    },
    seatData: [
      {
        date: '2025-01-01',
        id: 'seat-1',
        seats: {
          Backseat: { availableTickets: 100, price: 100000, __typename: 'SeatInfo' },
          VIP: { availableTickets: 50, price: 300000, __typename: 'SeatInfo' },
          Standard: { availableTickets: 150, price: 200000, __typename: 'SeatInfo' },
        },
        __typename: 'SeatData',
      },
    ],
    __typename: 'Concert',
  };

  it('renders fallback message if no seatData available', () => {
    render(
      <BookingProvider>
        <SeatSelection event={{ seatData: [] } as any} />
      </BookingProvider>
    );
    expect(screen.getByText('Тасалбар дууссан!')).toBeInTheDocument();
  });

  it('allows increment and decrement of tickets', () => {
    render(
      <BookingProvider>
        <SeatSelection event={baseEvent} />
      </BookingProvider>
    );
    const plusButtons = screen.getAllByText('+');
    const minusButtons = screen.getAllByText('-');

    fireEvent.click(plusButtons[0]);
    expect(screen.getAllByText('1')).toHaveLength(1);

    fireEvent.click(minusButtons[0]);
    expect(screen.getAllByText('0')).toHaveLength(3);
  });

  it('saves booking on button click', () => {
    render(
      <BookingProvider>
        <SeatSelection event={baseEvent} />
      </BookingProvider>
    );
    const plusButtons = screen.getAllByText('+');
    const purchaseButton = screen.getByRole('button', { name: /Тасалбар авах/ });

    fireEvent.click(plusButtons[0]);
    fireEvent.click(purchaseButton);

    expect(window.alert).toHaveBeenCalledWith('Booking saved successfully!');
  });

  it('ignores seat types without price or with invalid ticket count', () => {
    const eventWithInvalidSeats = {
      ...baseEvent,
      seatData: [
        {
          ...baseEvent.seatData[0],
          seats: {
            Backseat: { availableTickets: -1, price: 100000, __typename: 'SeatInfo' },
            Standard: { availableTickets: 100, price: undefined as any, __typename: 'SeatInfo' },
            VIP: { availableTickets: 10, price: 300000, __typename: 'SeatInfo' },
          },
        },
      ],
    };

    render(
      <BookingProvider>
        <SeatSelection event={eventWithInvalidSeats} />
      </BookingProvider>
    );

    expect(screen.queryByText('Арын тасалбар')).not.toBeInTheDocument();
    expect(screen.queryByText('Энгийн тасалбар')).not.toBeInTheDocument();
    expect(screen.getByText('VIP тасалбар (10)')).toBeInTheDocument();
  });

  it('renders fallback when no ticket options are valid', () => {
    const eventWithNoSeats = {
      ...baseEvent,
      seatData: [{ ...baseEvent.seatData[0], seats: {} }],
    };

    render(
      <BookingProvider>
        <SeatSelection event={eventWithNoSeats} />
      </BookingProvider>
    );

    expect(screen.getByTestId('no-options')).toHaveTextContent('Энд тасалбарын сонголт байхгүй байна');
  });
});
