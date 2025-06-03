import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Booking } from '@/generated';
import { RoomInfo } from '@/app/(main)/my-booking/_components/RoomInfo';
jest.mock('@/components/ui/badge', () => ({
  Badge: jest.fn(({ children, className }: { children: React.ReactNode; className?: string }) => <span className={className}>{children}</span>),
}));
const mockFormatNights = (_checkIn: string, _checkOut: string) => 3;
const mockBookingData: Booking = {
  __typename: 'Booking',
  _id: 'booking1',
  checkInDate: '2023-10-01T12:00:00Z',
  checkOutDate: '2023-10-04T12:00:00Z',
  createdAt: '2023-09-01T12:00:00Z',
  guests: {
    adults: 2,
    children: 1,
  },
  hotelId: {
    _id: 'hotel1',
    name: 'Grand Hotel',
  },
  roomId: {
    _id: 'room1',
    name: 'Deluxe Room',
    information: ['Free WiFi', 'Breakfast included', 'Sea view'],
  },
  status: 'confirmed',
  totalPrice: 500,
  updatedAt: '2023-09-01T12:00:00Z',
  userId: {} as any,
};
describe('RoomInfo Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('renders basic hotel and room information', () => {
    render(<RoomInfo bookingData={mockBookingData} formatNights={mockFormatNights} />);
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument();
    expect(screen.getByText('confirmed')).toBeInTheDocument();
    const informationItems = screen.getAllByText(/Free WiFi|Breakfast included|Sea view/);
    expect(informationItems).toHaveLength(3);
    expect(informationItems[0]).toHaveTextContent('Free WiFi');
    expect(informationItems[1]).toHaveTextContent('Breakfast included');
    expect(informationItems[2]).toHaveTextContent('Sea view');
  });
  it('renders correct badge class for cancelled status', () => {
    const cancelledBooking = {
      ...mockBookingData,
      status: 'cancelled',
    };
    render(<RoomInfo bookingData={cancelledBooking} formatNights={mockFormatNights} />);
    const badge = screen.getByText('cancelled');
    expect(badge).toHaveClass('bg-[#E11D48]');
    expect(badge).not.toHaveClass('bg-[#18BA51]');
  });
  it('renders correct badge class for confirmed status', () => {
    render(<RoomInfo bookingData={mockBookingData} formatNights={mockFormatNights} />);
    const badge = screen.getByText('confirmed');
    expect(badge).toHaveClass('bg-[#18BA51]');
    expect(badge).not.toHaveClass('bg-[#E11D48]');
  });
  it('handles plural adults count correctly (line 25)', () => {
    const bookingWithMultipleAdults = {
      ...mockBookingData,
      guests: {
        adults: 3,
        children: 0,
      },
    };
    render(<RoomInfo bookingData={bookingWithMultipleAdults} formatNights={mockFormatNights} />);
    expect(screen.getByText('3 adults')).toBeInTheDocument();
  });
  it('handles single adult count correctly (line 25)', () => {
    const bookingWithSingleAdult = {
      ...mockBookingData,
      guests: {
        adults: 1,
        children: 0,
      },
    };
    render(<RoomInfo bookingData={bookingWithSingleAdult} formatNights={mockFormatNights} />);
    expect(screen.getByText('1 adult')).toBeInTheDocument();
    expect(screen.queryByText('1 adults')).not.toBeInTheDocument();
  });
  it('handles plural children count correctly', () => {
    const bookingWithMultipleChildren = {
      ...mockBookingData,
      guests: {
        adults: 2,
        children: 3,
      },
    };
    render(<RoomInfo bookingData={bookingWithMultipleChildren} formatNights={mockFormatNights} />);
    expect(screen.getByText(/3 children/)).toBeInTheDocument();
  });
  it('handles single child count correctly', () => {
    const bookingWithSingleChild = {
      ...mockBookingData,
      guests: {
        adults: 2,
        children: 1,
      },
    };
    render(<RoomInfo bookingData={bookingWithSingleChild} formatNights={mockFormatNights} />);
    expect(screen.getByText(/1 child/)).toBeInTheDocument();
    expect(screen.queryByText(/1 children/)).not.toBeInTheDocument();
  });
  it('does not render children text when no children', () => {
    const bookingWithoutChildren = {
      ...mockBookingData,
      guests: {
        adults: 2,
        children: 0,
      },
    };
    render(<RoomInfo bookingData={bookingWithoutChildren} formatNights={mockFormatNights} />);
    expect(screen.getByText('2 adults')).toBeInTheDocument();
    expect(screen.queryByText(/child/)).not.toBeInTheDocument();
  });
  it('renders room information with proper comma separation', () => {
    const bookingWithRoomInfo = {
      ...mockBookingData,
      roomId: {
        _id: 'room1',
        name: 'Deluxe Room',
        information: ['WiFi', 'Breakfast', 'View'],
      },
    };
    render(<RoomInfo bookingData={bookingWithRoomInfo} formatNights={mockFormatNights} />);
    const infoSpans = screen.getAllByText(/WiFi|Breakfast|View/);
    expect(infoSpans).toHaveLength(3);
    expect(infoSpans[0]).toHaveTextContent('WiFi');
    expect(infoSpans[1]).toHaveTextContent('Breakfast');
    expect(infoSpans[2]).toHaveTextContent('View');
    const container = infoSpans[0].closest('p');
    expect(container).toContainElement(infoSpans[0]);
    expect(container).toContainElement(infoSpans[1]);
    expect(container).toContainElement(infoSpans[2]);
    expect(container).toHaveTextContent('WiFi, Breakfast, View');
  });
  it('handles empty room information array', () => {
    const bookingWithEmptyRoomInfo = {
      ...mockBookingData,
      roomId: {
        _id: 'room1',
        name: 'Deluxe Room',
        information: [],
      },
    };
    render(<RoomInfo bookingData={bookingWithEmptyRoomInfo} formatNights={mockFormatNights} />);
    expect(screen.getByText('Grand Hotel')).toBeInTheDocument();
  });
  it('displays correct nights count from formatNights function', () => {
    const customFormatNights = jest.fn().mockReturnValue(5);
    render(<RoomInfo bookingData={mockBookingData} formatNights={customFormatNights} />);
    expect(customFormatNights).toHaveBeenCalledWith(mockBookingData.checkInDate, mockBookingData.checkOutDate);
    expect(screen.getByText('5 night')).toBeInTheDocument();
  });
});
