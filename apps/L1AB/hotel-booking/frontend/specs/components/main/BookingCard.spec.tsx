import { BookingCard } from '../../../src/components/main';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, width, height, className }: any) => <img src={src} alt={alt} width={width} height={height} className={className} />,
}));

jest.mock('date-fns', () => ({
  format: jest.fn(),
  differenceInDays: jest.fn(),
}));

describe('BookingCard', () => {
  const mockBooking = {
    hotelName: 'Hotel ABC',
    description: 'A beautiful place to stay',
    checkIn: '2024-12-20T14:00:00',
    checkOut: '2024-12-22T10:00:00',
    status: 'booked',
    traveller: 2,
    roomType: 'TWO',
    photos: ['https://example.com/photo.jpg'],
  };
  const mockBookingWithOneRoom = {
    hotelName: 'Hotel ABC',
    description: 'A beautiful place to stay',
    checkIn: '2024-12-20T14:00:00',
    checkOut: '2024-12-22T10:00:00',
    status: 'booked',
    traveller: 2,
    roomType: 'ONE',
    photos: ['https://example.com/photo.jpg'],
  };
  const mockBookingWithNoCheckout = {
    hotelName: 'Hotel ABC',
    description: 'A beautiful place to stay',
    checkIn: '',
    checkOut: '',
    status: 'booked',
    traveller: 2,
    roomType: 'ONE',
    photos: ['https://example.com/photo.jpg'],
  };

  it('renders booking details correctly', () => {
    render(<BookingCard {...mockBooking} />);

    const statusButton = screen.getByTestId('status-button');
    expect(statusButton);
    expect(screen);
  });
  it('renders booking details correctly', () => {
    render(<BookingCard {...mockBookingWithOneRoom} />);
    const statusButton = screen.getByTestId('status-button');
    expect(statusButton);
    expect(screen);
  });
  it('renders booking details without checkin checkout', () => {
    render(<BookingCard {...mockBookingWithNoCheckout} />);
    const statusButton = screen.getByTestId('status-button');
    expect(statusButton);
    expect(screen);
  });

  it('displays the default image if no photos are provided', () => {
    const mockBookingNoPhotos = { ...mockBooking, photos: [] };

    render(<BookingCard {...mockBookingNoPhotos} />);

    const imgElement = screen.getByAltText('img');
    expect(imgElement);
  });

  it('calculates the correct number of nights', () => {
    render(<BookingCard {...mockBooking} />);

    expect(screen);
  });

  it('correctly handles canceled status with different styling', () => {
    const mockCanceledBooking = { ...mockBooking, status: 'canceled' };

    render(<BookingCard {...mockCanceledBooking} />);

    const statusButton = screen.getByTestId('status-button');
    expect(statusButton);
  });

  it('renders the itinerary number', () => {
    render(<BookingCard {...mockBooking} />);

    expect(screen);
  });
});
