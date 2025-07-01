import { FilterGuestsAdmin, matchesSearchTerm } from '@/app/(admin)/guests/_components/FilterGuestsAdmin';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

describe('FilterGuestsAdmin', () => {
  const mockBookings = [
    {
      __typename: 'Booking',
      _id: '1',
      status: 'booked',
      hotelId: { _id: 'h1', name: 'Grand Hotel' },
      roomId: { _id: '', name: '' },
      guests: { adults: 2, children: 0 },
      checkInDate: '',
      checkOutDate: '',
      createdAt: '',
      updatedAt: '',
      totalPrice: 200,
      userId: { _id: '', firstName: 'John', lastName: 'Doe' },
    },
    {
      __typename: 'Booking',
      _id: '2',
      status: 'cancelled',
      hotelId: { _id: 'h2', name: 'Ocean View' },
      roomId: { _id: '', name: '' },
      guests: { adults: 1, children: 0 },
      checkInDate: '',
      checkOutDate: '',
      createdAt: '',
      updatedAt: '',
      totalPrice: 150,
      userId: { _id: '', firstName: 'Jane', lastName: 'Smith' },
    },
  ];

  it('returns false if hotelId.name is undefined', () => {
    const booking = { hotelId: { name: undefined } } as Booking;
    expect(matchesSearchTerm(booking, '')).toBe(false);
  });

  it('renders and filters by search input', async () => {
    const onFilterChange = jest.fn();
    render(<FilterGuestsAdmin bookings={mockBookings} onFilterChange={onFilterChange} />);

    const input = screen.getByTestId('search-input');
    fireEvent.change(input, { target: { value: 'Grand' } });
  });

  it('filters by status', async () => {
    const onFilterChange = jest.fn();
    render(<FilterGuestsAdmin bookings={mockBookings} onFilterChange={onFilterChange} />);

    const user = userEvent.setup();

    // Click the dropdown button
    const dropdownButton = screen.getByTestId('status-filter');
    await user.click(dropdownButton);

    // Click the "Cancelled" option (rendered somewhere after dropdown opens)
    const cancelledOption = await screen.findByText(/Cancelled/i);
    await user.click(cancelledOption);

    await waitFor(() => {
      const filtered = onFilterChange.mock.calls.at(-1)?.[0];
      expect(filtered).toHaveLength(1);
      expect(filtered[0].status).toBe('cancelled');
    });
  });

  it('shows all bookings when status is "all"', async () => {
    const onFilterChange = jest.fn();
    render(<FilterGuestsAdmin bookings={mockBookings} onFilterChange={onFilterChange} />);

    const select = screen.getByTestId('status-filter');
    fireEvent.change(select, { target: { value: 'all' } });

    await waitFor(() => {
      const filtered = onFilterChange.mock.calls.at(-1)?.[0];
      expect(filtered).toHaveLength(mockBookings.length);
    });
  });
});
