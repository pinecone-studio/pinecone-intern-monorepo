import { GuestInfoCard } from '@/app/(admin)/hotels/[hotelid]/[roomId]/[bookingId]/_components/GuestInfoCard';
import { Booking, BookingStatus } from '@/generated';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Guest info card', () => {
  const mockGuestInfo: Booking = {
    status: BookingStatus.CheckedOut,
    checkInDate: '2025-05-25T00:00:00.000Z',
    checkOutDate: '2025-05-28T00:00:00.000Z',
    guests: {
      adults: 2,
      children: 1,
    },
    userId: {
      _id: 'user-1',
      firstName: 'Shagai',
      lastName: 'Nyamdorj',
      email: 'n.shagai@pinecone.mn',
      emergencyPhone: '+976 99112233',
      isAdmin: false,
      password: 'mockPassword',
    },
    roomId: {
      roomNumber: 502,
    },
    room: {
      id: 'room-1',
      name: 'Deluxe Room',
      price: 100000,
    },
    totalPrice: 100000,
    createdAt: '2025-05-01T12:00:00.000Z',
  };

  const commonMockGuestInfo: Booking = {
    status: BookingStatus.CheckedOut, // энэ мөрийг дараа нь override хийж байгаа
    checkInDate: '2025-05-25T00:00:00.000Z',
    checkOutDate: '2025-05-28T00:00:00.000Z',
    guests: {
      adults: 2,
      children: 1,
    },
    userId: {
      _id: 'user-1',
      firstName: 'Shagai',
      lastName: 'Nyamdorj',
      email: 'n.shagai@pinecone.mn',
      emergencyPhone: '+976 99112233',
      isAdmin: false,
      password: 'mockPassword',
    },
    roomId: {
      roomNumber: 502,
    },
    room: {
      id: 'room-1',
      name: 'Deluxe Room',
      price: 100000,
    },
    totalPrice: 100000,
    createdAt: '2025-05-01T12:00:00.000Z',
  };

  it('renders all guest info correctly', () => {
    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={jest.fn()} loading={false} />);

    expect(screen.getByText('Guest Info')).toBeInTheDocument();
    expect(screen.getByText('Shagai')).toBeInTheDocument();
    expect(screen.getByText('Nyamdorj')).toBeInTheDocument();
    expect(screen.getByText('2025-05-25')).toBeInTheDocument();
    expect(screen.getByText('2025-05-28')).toBeInTheDocument();
    expect(screen.getByText('n.shagai@pinecone.mn')).toBeInTheDocument();
    expect(screen.getByText('+976 99112233')).toBeInTheDocument();
    expect(screen.getByText('Room #502')).toBeInTheDocument();
  });

  it('renders correct status color for checked_out', () => {
    const mockInfo: Booking = { ...mockGuestInfo, status: BookingStatus.CheckedOut };
    render(<GuestInfoCard guestInfo={mockInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={jest.fn()} loading={false} />);
    const badge = screen.getByText('checked_out');
    expect(badge).toHaveClass('bg-[#18BA51]');
  });

  it('renders correct status color for cancelled', () => {
    const mockInfo: Booking = { ...mockGuestInfo, status: BookingStatus.Cancelled };
    render(<GuestInfoCard guestInfo={mockInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={jest.fn()} loading={false} />);
    const badge = screen.getByText('cancelled');
    expect(badge).toHaveClass('bg-[#F97316]');
  });

  it('opens and closes dialog correctly', async () => {
    const setOpenMock = jest.fn();
    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={setOpenMock} loading={false} />);

    const button = screen.getByRole('button', { name: /checkout/i });
    await userEvent.click(button);

    expect(setOpenMock).toHaveBeenCalledWith(true);
  });

  it('calls handleUpdateStatus with correct status on confirm', async () => {
    const mockHandler = jest.fn();
    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={mockHandler} open={true} setOpen={jest.fn()} loading={false} />);

    const confirmButton = screen.getByRole('button', { name: /confirm/i });
    await userEvent.click(confirmButton);

    expect(mockHandler).toHaveBeenCalledWith('checked_out');
  });

  it('calls handleUpdateStatus with "cancelled" when cancel button is clicked', async () => {
    const mockHandler = jest.fn();
    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={mockHandler} open={true} setOpen={jest.fn()} loading={false} />);

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    await userEvent.click(cancelButton);

    expect(mockHandler).toHaveBeenCalledWith('cancelled');
  });

  it('renders cancelled status with orange background', () => {
    const mockGuestInfo = {
      ...commonMockGuestInfo,
      status: 'cancelled',
    };

    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={jest.fn()} loading={false} />);

    expect(screen.getByText('cancelled')).toBeInTheDocument();
  });

  it('renders other status with blue background', () => {
    const mockGuestInfo = {
      ...commonMockGuestInfo,
      status: 'booked', // эсвэл 'checked_in'
    };

    render(<GuestInfoCard guestInfo={mockGuestInfo} checkInDate="2025-05-25" checkOutDate="2025-05-28" handleUpdateStatus={jest.fn()} open={false} setOpen={jest.fn()} loading={false} />);

    expect(screen.getByText('booked')).toBeInTheDocument();
  });
});
