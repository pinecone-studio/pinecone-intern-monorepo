import { RoomDetailsUpcomingBookings } from '@/components/admin/assets/room-details';
import { render, screen, fireEvent } from '@testing-library/react';

const mockBookings = [
  { _id: 1, guestName: 'John Doe', status: 'Confirmed', date: '2024-12-15' },
  { _id: 2, guestName: 'Jane Smith', status: 'Pending', date: '2024-12-20' },
  { _id: 3, guestName: 'Emily White', status: 'Confirmed', date: '2024-12-25' },
  { _id: 4, guestName: 'Michael Brown', status: 'Cancelled', date: '2025-01-05' },
];
describe('DetailsUpcomingBookings Component', () => {
  it('filters bookings by status when the status filter arrows are clicked', async () => {
    render(<RoomDetailsUpcomingBookings mockBookings={mockBookings} />);

    const button1 = screen.getByTestId('arrow-up-status');
    fireEvent.click(button1);
    const button2 = screen.getByTestId('arrow-down-status');
    fireEvent.click(button2);
  });

  it('sorts bookings by date when the date sorting arrows are clicked', async () => {
    render(<RoomDetailsUpcomingBookings mockBookings={mockBookings} />);

    const button3 = screen.getByTestId('arrow-up-date');
    fireEvent.click(button3);

    const button4 = screen.getByTestId('arrow-down-date');
    fireEvent.click(button4);
  });
  it('should display a "No upcoming bookings available" message when there are no bookings', async () => {
    render(<RoomDetailsUpcomingBookings mockBookings={[]} />);
  });
});
