import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestTable } from '@/app/(admin)/guests/_components/GuestsTable';
import { Booking } from '@/generated';

const originalLocation = window.location;

beforeAll(() => {
  delete (window as any).location;
  (window as any).location = { href: '' };
});

afterAll(() => {
  window.location = originalLocation;
});

const createBooking = (status: string): Booking =>
  ({
    _id: 'booking-id',
    userId: { firstName: 'Alice', lastName: 'Smith' },
    hotelId: { _id: 'hotel123', name: 'Sunrise Hotel' },
    roomId: { _id: 'room456', name: 'Sea View' },
    guests: { adults: 2 },
    checkInDate: new Date('2024-05-01').toISOString(),
    checkOutDate: new Date('2024-05-05').toISOString(),
    status,
  } as Booking);

describe('GuestTable', () => {
  it('navigates correctly on row click (line 24)', () => {
    const booking = createBooking('checked_in');
    render(<GuestTable bookings={[booking]} />);
    fireEvent.click(screen.getByTestId('guests-row-0'));
    expect(window.location.href).toBe('/hotels/hotel123/room456/booking-id');
  });

  it('renders all 3 status styles (line 79)', () => {
    const statuses = ['checked_in', 'cancelled', 'confirmed'];
    render(<GuestTable bookings={statuses.map((status) => createBooking(status))} />);

    const bgCheckedIn = screen.getByTestId('guests-status-0');
    const bgCancelled = screen.getByTestId('guests-status-1');
    const bgDefault = screen.getByTestId('guests-status-2');

    expect(bgCheckedIn).toHaveClass('bg-[#18BA51]');
    expect(bgCancelled).toHaveClass('bg-red-500');
    expect(bgDefault).toHaveClass('bg-[#2563EB]');
  });
});
