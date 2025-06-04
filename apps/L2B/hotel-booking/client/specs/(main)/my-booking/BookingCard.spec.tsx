import '@testing-library/jest-dom'; // Энэ мөрийг нэмэх хэрэгтэй
import { render, screen } from '@testing-library/react';
import { Booking } from '@/generated';
import { BookingCard } from '@/app/(main)/my-booking/_components/BookingCard';
import { RoomInfo } from '@/app/(main)/my-booking/_components/RoomInfo';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => {
  // eslint-disable-next-line react/display-name
  return ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>;
});

// Mock RoomInfo component
jest.mock('@/app/(main)/my-booking/_components/RoomInfo', () => ({
  RoomInfo: jest.fn(() => <div>Mocked RoomInfo</div>),
}));

// Mock Button component
jest.mock('@/components/ui/button', () => ({
  Button: jest.fn(({ children, ...props }: any) => <button {...props}>{children}</button>),
}));

const mockFormatDateTime = (iso: string) => `Formatted: ${iso}`;
const mockFormatNights = (_checkIn: string, _checkOut: string) => 3;

const mockBookings: Booking[] = [
  {
    __typename: 'Booking',
    _id: 'booking1',
    checkInDate: '2023-10-01T12:00:00Z',
    checkOutDate: '2023-10-04T12:00:00Z',
    createdAt: '2023-09-01T12:00:00Z',
    guests: {},
    hotelId: { _id: 'hotel1', name: 'Grand Hotel' },
    roomId: {
      _id: 'room1',
      name: 'Deluxe Room',
      images: ['/deluxe-room.jpg'],
    },
    status: 'confirmed',
    totalPrice: 500,
    updatedAt: '2023-09-01T12:00:00Z',
    userId: {} as any,
  },
  {
    __typename: 'Booking',
    _id: 'booking2',
    checkInDate: '2023-11-01T12:00:00Z',
    checkOutDate: '2023-11-05T12:00:00Z',
    createdAt: '2023-10-01T12:00:00Z',
    guests: {},
    hotelId: { _id: 'hotel2', name: 'Beach Resort' },
    roomId: {
      _id: 'room2',
      name: 'Ocean View',
      images: ['/ocean-view.jpg'],
    },
    status: 'completed',
    totalPrice: 800,
    updatedAt: '2023-10-01T12:00:00Z',
    userId: {} as any,
  },
];

describe('BookingCard Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<BookingCard bookingsData={mockBookings} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);
  });

  it('renders correct number of booking cards', () => {
    render(<BookingCard bookingsData={mockBookings} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    // img element role="presentation" болохоор QueryBy хэрэглэх
    const images = screen.getAllByRole('presentation');
    expect(images).toHaveLength(mockBookings.length);
  });

  it('displays correct booking information', () => {
    render(<BookingCard bookingsData={[mockBookings[0]]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    expect(screen.getByText('Formatted: 2023-10-01T12:00:00Z')).toBeInTheDocument();
    expect(screen.getByText('72055771948934')).toBeInTheDocument();
    expect(screen.getByText('View Detail')).toBeInTheDocument();
  });
  it('renders RoomInfo component with correct props', () => {
    render(<BookingCard bookingsData={[mockBookings[0]]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    expect(RoomInfo).toHaveBeenCalledWith(
      {
        bookingData: mockBookings[0],
        formatNights: mockFormatNights,
      },
      {}
    );
  });

  it('uses fallback image when room images are not available', () => {
    const bookingWithoutImage = {
      ...mockBookings[0],
      roomId: {
        ...mockBookings[0].roomId,
        images: undefined,
      },
    };

    render(<BookingCard bookingsData={[bookingWithoutImage]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    // src атрибутаар шүүж хайх
    const image = screen.getByRole('presentation');
    expect(image).toHaveAttribute('src', '/placeholder.jpg');
  });

  it('renders correct link for view details button', () => {
    render(<BookingCard bookingsData={[mockBookings[0]]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    const link = screen.getByRole('link', { name: /View Detail/i });
    expect(link).toHaveAttribute('href', `/my-booking/${mockBookings[0]._id}`);
  });

  it('applies correct styling classes', () => {
    render(<BookingCard bookingsData={[mockBookings[0]]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    // booking-card testid байхгүй тул container-ийг class-ээр хайх
    const container = document.querySelector('.w-full.h-\\[222px\\].border.rounded-md');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('w-full');
    expect(container).toHaveClass('h-[222px]');
    expect(container).toHaveClass('border');
    expect(container).toHaveClass('rounded-md');
  });
});
