import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Booking } from '@/generated';
import { UserType } from '@/utils/type';
import { UpcomingBooking } from '@/app/(main)/my-booking/_components/UpcomingBooking';

// Mock компонентүүд
jest.mock('next/image', () => ({
  __esModule: true,
  default: () => <img src="/Frame.svg" alt="mock image" />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => <a href={href}>{children}</a>,
}));

const mockBookingCard = jest.fn(() => <div>Mocked BookingCard</div>);
jest.mock('@/app/(main)/my-booking/_components/BookingCard', () => ({
  BookingCard: (props: any) => mockBookingCard(props),
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, className }: { children: React.ReactNode; className?: string }) => <button className={className}>{children}</button>,
}));

// Test data
const mockFormatDateTime = (iso: string) => `Formatted: ${iso}`;
const mockFormatNights = (_checkIn: string, _checkOut: string) => 3;

const mockUser: UserType = {
  _id: 'user1',
  birth: new Date('1990-01-01'),
  email: 'user@example.com',
  firstName: 'John',
  id: 'user1',
  isAdmin: false,
  lastName: 'Doe',
  phone: '123-456-7890',
  relation: 'self',
  emergencyPhone: '098-765-4321',
};

const mockBookings: Booking[] = [
  {
    __typename: 'Booking',
    _id: 'booking1',
    checkInDate: '2023-10-01T12:00:00Z',
    checkOutDate: '2023-10-05T12:00:00Z',
    createdAt: '2023-09-01T12:00:00Z',
    guests: {},
    hotelId: { _id: 'hotel1', name: 'Hotel California' },
    roomId: { _id: 'room1', name: 'Deluxe Room' },
    status: 'confirmed',
    totalPrice: 500,
    updatedAt: '2023-09-01T12:00:00Z',
    userId: mockUser,
  } as unknown as Booking,
];

describe('UpcomingBooking Component', () => {
  beforeEach(() => {
    mockBookingCard.mockClear();
  });

  it('should render booking list with correct props when bookings exist', () => {
    render(<UpcomingBooking bookingsData={mockBookings} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={mockUser} />);

    // Header шалгах
    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();

    // BookingCard-ийн мокод мэссэж харагдаж байгааг шалгах
    expect(screen.getByText('Mocked BookingCard')).toBeInTheDocument();

    // BookingCard props шалгах
    expect(mockBookingCard).toHaveBeenCalledTimes(1);
    expect(mockBookingCard).toHaveBeenCalledWith({
      formatDateTime: mockFormatDateTime,
      formatNights: mockFormatNights,
      bookingsData: mockBookings,
    });
  });

  it('should render booking list when bookingsData is truthy but empty array', () => {
    render(<UpcomingBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={mockUser} />);

    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();
    expect(screen.getByText(/John, you have no upcoming trips/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Exploring/i })).toBeInTheDocument();
    expect(screen.getByAltText('mock image')).toBeInTheDocument();
  });

  it('should handle null bookingsData and render empty state', () => {
    render(<UpcomingBooking bookingsData={null as any} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={mockUser} />);

    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();
    expect(screen.getByText(/John, you have no upcoming trips/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Exploring/i })).toBeInTheDocument();
    expect(screen.getByAltText('mock image')).toBeInTheDocument();
  });

  it('should handle undefined bookingsData and render empty state', () => {
    render(<UpcomingBooking bookingsData={undefined as any} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={mockUser} />);

    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();
    expect(screen.getByText(/John, you have no upcoming trips/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Start Exploring/i })).toBeInTheDocument();
    expect(screen.getByAltText('mock image')).toBeInTheDocument();
  });

  it('should render empty state without user name when user is null', () => {
    render(<UpcomingBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={null} />);

    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();
    expect(screen.getByText(/you have no upcoming trips/i)).toBeInTheDocument();
    expect(screen.queryByText(/John,/i)).not.toBeInTheDocument();
    expect(screen.getByAltText('mock image')).toBeInTheDocument();
  });

  it('should render empty state when user firstName is undefined', () => {
    const userWithoutFirstName = { ...mockUser, firstName: undefined as any };

    render(<UpcomingBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={userWithoutFirstName} />);

    expect(screen.getByText('Confirmed Booking')).toBeInTheDocument();
    expect(screen.getByText(/you have no upcoming trips/i)).toBeInTheDocument();
    // firstName байхгүй тохиолдолд firstName харагдахгүй байх ёстой
    expect(screen.queryByText(/undefined,/i)).not.toBeInTheDocument();
  });

  it('should render Start Exploring button with correct styling', () => {
    render(<UpcomingBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} user={mockUser} />);

    const button = screen.getByRole('button', { name: /Start Exploring/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-[#2563EB]', 'hover:bg-[#2564ebdc]');
  });
});
