import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookingProvider, useBooking } from '@/app/_components/context/BookingContext';

describe('BookingProvider Context', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('throws error if useBooking is used outside provider', () => {
    const Dummy = () => {
      useBooking();
      return null;
    };
    expect(() => render(<Dummy />)).toThrow('Context must with in the BookingProvider');
  });

  it('loads booking from localStorage on mount', () => {
    const mockBooking = {
      concertId: 'mock-2',
      concertName: 'Mock Concert 2',
      date: '2025-01-01',
      seatDataId: 'deez-2',
      tickets: [{ type: 'VIP тасалбар', count: 2, price: 300000 }],
      totalPrice: 600000,
    };
    localStorage.setItem('booking', JSON.stringify(mockBooking));

    const Dummy = () => {
      const { booking } = useBooking();
      return <div>{booking?.concertName}</div>;
    };

    render(
      <BookingProvider>
        <Dummy />
      </BookingProvider>
    );

    expect(screen.getByText('Mock Concert 2')).toBeInTheDocument();
  });

  it('can set and clear booking state + localStorage', () => {
    const Dummy = () => {
      const { booking, setBooking, clearBooking } = useBooking();

      return (
        <div>
          <button
            onClick={() =>
              setBooking({
                concertId: '1',
                concertName: 'To Be Cleared',
                date: '2025-01-01',
                seatDataId: 'seat-1',
                tickets: [],
                totalPrice: 0,
              })
            }
          >
            Save
          </button>
          <button onClick={clearBooking}>Clear</button>
          <div>{booking ? booking.concertName : 'No Booking'}</div>
        </div>
      );
    };

    render(
      <BookingProvider>
        <Dummy />
      </BookingProvider>
    );

    fireEvent.click(screen.getByText('Save'));
    expect(screen.getByText('To Be Cleared')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Clear'));
    expect(screen.getByText('No Booking')).toBeInTheDocument();
    expect(localStorage.getItem('booking')).toBeNull();
  });
});
