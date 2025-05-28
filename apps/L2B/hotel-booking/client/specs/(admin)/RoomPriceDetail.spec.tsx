import { RoomPriceDetail } from '@/app/(admin)/hotels/[hotelid]/[roomId]/[bookingId]/_components/RoomPriceDetail';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Booking } from '@/generated';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img alt={props.alt || 'mock-image'} {...props} />;
  },
}));

describe('RoomPriceDetail', () => {
  const mockGuestInfo: Booking = {
    _id: 'booking-1',
    checkInDate: '2025-07-01',
    checkOutDate: '2025-07-02',
    guests: {
      adults: 1,
      children: 0,
    },
    status: 'booked',
    roomId: {
      _id: 'room-1',
      type: 'Economy Single Room',
      pricePerNight: 150000,
    },
    hotelId: {
      _id: 'hotel-1',
      name: 'Test Hotel',
      images: ['/hotel.png'],
    },
    totalPrice: 162000,
    userId: {
      _id: 'user-1',
      firstName: 'Shagai',
      lastName: 'Nyamdorj',
      email: 'n.shagai@pinecone.mn',
      emergencyPhone: '+976 99112233',
      isAdmin: false,
      password: '',
    },
    room: {
      id: 'room-1',
      name: 'Room #502',
      price: 150000,
    },
    createdAt: '2025-06-01T00:00:00Z',
  };

  it('renders room type and view button', () => {
    render(<RoomPriceDetail guestInfo={mockGuestInfo} nights={1} />);
    expect(screen.getByText('Economy Single Room')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'View' })).toBeInTheDocument();
  });

  it('renders price details correctly', () => {
    render(<RoomPriceDetail guestInfo={mockGuestInfo} nights={1} />);
    expect(screen.getByText('1 night')).toBeInTheDocument();
    expect(screen.getByText('150000₮ per night')).toBeInTheDocument();
    expect(screen.getAllByText('150000₮')[0]).toBeInTheDocument();
    expect(screen.getByText('Taxes')).toBeInTheDocument();
    expect(screen.getByText('0₮')).toBeInTheDocument();
    expect(screen.getByText('Total price')).toBeInTheDocument();
    expect(screen.getByText('162000₮')).toBeInTheDocument();
  });

  it('renders room image', () => {
    render(<RoomPriceDetail guestInfo={mockGuestInfo} nights={1} />);
    const image = screen.getByAltText('Room');
    expect(image).toBeInTheDocument();
  });

  it('renders placeholder image if no image exists', () => {
    const noImageGuestInfo = {
      ...mockGuestInfo,
      hotelId: {
        ...mockGuestInfo.hotelId,
        images: [],
      },
    };
    render(<RoomPriceDetail guestInfo={noImageGuestInfo} nights={1} />);
    const image = screen.getByAltText('Room');
    expect(image).toHaveAttribute('src', '/placeholder.svg');
  });
});
