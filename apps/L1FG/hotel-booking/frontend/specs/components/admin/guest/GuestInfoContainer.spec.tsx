import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GuestInfoContainer } from '@/components/admin/guest/GuestInfoContainer';

const mockRoomData = {
  roomNumber: 101,
};

const mockBookingData = {
  status: 'Booked',
  email: 'guest@example.com',
  phoneNumber: '+1234567890',
  guestRequest: 'Late check-in',
  startDate: '2025-02-20T14:00:00Z',
  endDate: '2025-02-22T11:00:00Z',
};

describe('GuestInfoContainer', () => {
  const handleEditBookingStatus = jest.fn(async () => {
    console.log('Edit booking status');
  });

  it('renders guest info correctly', () => {
    render(<GuestInfoContainer data={mockBookingData} roomData={mockRoomData} handleEditBookingStatus={handleEditBookingStatus} />);

    expect(screen.getByText('Guest Info'));
    expect(screen.getByText('First name'));
    expect(screen.getByText('Shagai'));
    expect(screen.getByText('Last name'));
    expect(screen.getByText('Nyamdorj'));
    expect(screen.getByText('Status'));
    expect(screen.getByText('Booked'));
    expect(screen.getByText('Guests'));
    expect(screen.getByText('1 adult, 0 children'));
    expect(screen.getByText('Check in'));
    expect(screen.getByText('Check out'));
    expect(screen.getByText('Email'));
    expect(screen.getByText('guest@example.com'));
    expect(screen.getByText('Phone number'));
    expect(screen.getByText('+1234567890'));
    expect(screen.getByText('Guest Request'));
    expect(screen.getByText('Late check-in'));
    expect(screen.getByText('Room Number'));
    expect(screen.getByText('Room #101'));
  });

  it('handles undefined data and displays fallback values', () => {
    render(<GuestInfoContainer data={undefined} roomData={undefined} handleEditBookingStatus={handleEditBookingStatus} />);

    expect(screen.getByText('Room #0'));
  });

  it('displays correct status badge color', () => {
    const { rerender } = render(<GuestInfoContainer data={{ ...mockBookingData, status: 'Completed' }} roomData={mockRoomData} handleEditBookingStatus={handleEditBookingStatus} />);

    const statusBadge = screen.getByText('Completed');
    expect(statusBadge).toHaveClass('bg-[#18BA51]');

    rerender(<GuestInfoContainer data={{ ...mockBookingData, status: 'Cancelled' }} roomData={mockRoomData} handleEditBookingStatus={handleEditBookingStatus} />);

    expect(screen.getByText('Cancelled')).toHaveClass('bg-[#F97316]');
  });
});
