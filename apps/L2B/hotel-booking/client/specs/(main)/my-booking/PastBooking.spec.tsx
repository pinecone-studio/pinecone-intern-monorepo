import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Booking } from '@/generated';
import { PastBooking } from '@/app/(main)/my-booking/_components/PastBooking';

// Mock the BookingCard component
import * as BookingCardModule from '@/app/(main)/my-booking/_components/BookingCard';
jest.mock('@/app/(main)/my-booking/_components/BookingCard', () => ({
  BookingCard: jest.fn(() => <div>Mocked BookingCard</div>),
}));

// Mock the Lucide React History icon
jest.mock('lucide-react', () => ({
  History: jest.fn(() => <svg data-testid="history-icon" />),
}));

const mockFormatDateTime = (iso: string) => `Formatted: ${iso}`;
const mockFormatNights = (_checkIn: string, _checkOut: string) => 5;

const mockBookings: Booking[] = [
  {
    __typename: 'Booking',
    _id: 'booking1',
    checkInDate: '2023-01-01T12:00:00Z',
    checkOutDate: '2023-01-06T12:00:00Z',
    createdAt: '2022-12-01T12:00:00Z',
    guests: {},
    hotelId: { _id: 'hotel1', name: 'Grand Hotel' },
    roomId: { _id: 'room1', name: 'Deluxe Suite' },
    status: 'completed',
    totalPrice: 750,
    updatedAt: '2022-12-01T12:00:00Z',
    userId: {} as any,
  },
];

describe('PastBooking Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct heading', () => {
    render(<PastBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);
    expect(screen.getByText('Previous Booking')).toBeInTheDocument();
  });

  it('renders BookingCard when there are past bookings', () => {
    render(<PastBooking bookingsData={mockBookings} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    expect(BookingCardModule.BookingCard).toHaveBeenCalledWith(
      {
        formatDateTime: mockFormatDateTime,
        formatNights: mockFormatNights,
        bookingsData: mockBookings,
      },
      {}
    );
  });

  it('renders empty state when no past bookings exist', () => {
    render(<PastBooking bookingsData={[]} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);

    expect(screen.getByTestId('history-icon')).toBeInTheDocument();
    expect(screen.getByText('No previous bookings.')).toBeInTheDocument();
    expect(screen.getByText('Your past stays will appear here once completed.')).toBeInTheDocument();
    expect(screen.queryByText('Mocked BookingCard')).not.toBeInTheDocument();
  });

  it('passes correct props to BookingCard', () => {
    render(<PastBooking bookingsData={mockBookings} formatDateTime={mockFormatDateTime} formatNights={mockFormatNights} />);
    expect(BookingCardModule.BookingCard).toHaveBeenCalledWith(
      {
        formatDateTime: mockFormatDateTime,
        formatNights: mockFormatNights,
        bookingsData: mockBookings,
      },
      {}
    );
  });
});
