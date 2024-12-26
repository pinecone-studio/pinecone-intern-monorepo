import '@testing-library/jest-dom';
import { RoomDetailsUpcomingBookings } from '@/components/admin/assets/room-details';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllBookingsDocument } from '@/generated';
import { BookingMock } from './bookings-mock';

const emptyMock = {
  request: {
    query: GetAllBookingsDocument,
  },
  result: {
    data: {
      getAllBookings: [],
    },
  },
};

describe('RoomDetailsUpcomingBookings Component', () => {
  it('filters bookings by status when cycling through statuses', async () => {
    render(
      <MockedProvider mocks={[BookingMock]} addTypename={false}>
        <RoomDetailsUpcomingBookings />
      </MockedProvider>
    );

    const statusSortButton = screen.getByTestId('status-sort');

    fireEvent.click(statusSortButton);
    const confirmedBooking = await screen.findByText('test2@example.com');
    expect(confirmedBooking);

    fireEvent.click(statusSortButton);
    const pendingBooking = await screen.findByText('test@example.com');
    expect(pendingBooking);

    fireEvent.click(statusSortButton);
    const cancelBooking = await screen.findByText('test3@example.com');
    expect(cancelBooking);
  });

  it('sorts bookings by date when the date sorting arrow is clicked', async () => {
    render(
      <MockedProvider mocks={[BookingMock]} addTypename={false}>
        <RoomDetailsUpcomingBookings />
      </MockedProvider>
    );

    const dateSortButton = screen.getByTestId('date-sort');

    fireEvent.click(dateSortButton);
    await waitFor(() => expect(screen.findByText('test@example.com')));

    fireEvent.click(dateSortButton);
    await waitFor(() => expect(screen.findByText('test2@example.com')));
  });
  it('sorts bookings by date when the date sorting arrow is clicked 2', async () => {
    render(
      <MockedProvider mocks={[BookingMock]} addTypename={false}>
        <RoomDetailsUpcomingBookings />
      </MockedProvider>
    );

    const dateSortButton = screen.getByTestId('date-sort');

    fireEvent.click(dateSortButton);
    const ascendingBooking = await screen.findByText('test@example.com');
    expect(ascendingBooking);

    fireEvent.click(dateSortButton);
    const descendingBooking = await screen.findByText('test2@example.com');
    expect(descendingBooking);
  });
  it('shows empty state when there are no bookings', async () => {
    render(
      <MockedProvider mocks={[emptyMock]} addTypename={false}>
        <RoomDetailsUpcomingBookings />
      </MockedProvider>
    );

    const emptyStateMessage = await screen.findByText('Your future bookings will appear here once confirmed.');
    expect(emptyStateMessage);
  });
});
