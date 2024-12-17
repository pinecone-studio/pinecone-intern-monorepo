import { ConfirmedBooking } from '@/components/main';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

jest.mock('@/generated', () => ({
  useGetBookingByIdQuery: jest.fn(),
}));

describe('ConfirmedBooking', () => {
  const mockData = [
    {
      _id: '1',
      createdAt: '2024-12-01T10:00:00Z',
      email: 'example@email.com',
      firstName: 'John',
      status: 'booked',
      checkIn: '2024-12-20',
      checkOut: '2024-12-22',
      traveller: 1,
      roomId: {
        photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        hotelId: [{ _id: '1', name: 'Shangri La' }],
        description: 'A nice room with a sea view.',
        roomType: 'One',
      },
    },
    {
      _id: '2',
      createdAt: '2024-12-02T10:00:00Z',
      email: 'example2@email.com',
      firstName: 'Jane',
      status: 'cancelled',
      checkIn: '2024-12-25',
      checkOut: '2024-12-28',
      traveller: 1,
      roomId: {
        photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        hotelId: [{ _id: '2', name: 'Flower' }],
        description: 'A cozy room with a mountain view.',
        roomType: 'One',
      },
    },
  ];

  it('should render confirmed bookings', () => {
    render(<ConfirmedBooking data={mockData} />);

    // Confirmed Booking section exists
    const confirmedBookingTitle = screen.getByText(/Confirmed Booking/i);
    expect(confirmedBookingTitle).toBeInTheDocument();

    // Booking card for confirmed booking
    const bookingCard = screen.getByTestId('confirmedData-0'); // 0-Index, first confirmed booking
    expect(bookingCard).toBeInTheDocument();

    // Check if booking details are displayed
    expect(screen.getByText(/booked/)).toBeInTheDocument();
    expect(screen.getByText('A nice room with a sea view.')).toBeInTheDocument();
  });

  it('should render StartBooking if no confirmed bookings are available', () => {
    // Test with no 'booked' status
    const noConfirmedData = [
      {
        _id: '3',
        createdAt: '2024-12-01T10:00:00Z',
        email: 'example@email.com',
        firstName: 'John',
        status: 'cancelled',
        checkIn: '2024-12-25',
        checkOut: '2024-12-28',
        traveller: 1,
        roomId: {
          photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          hotelId: { name: 'Hotel Bliss' },
          description: 'A cozy room with a mountain view.',
          roomType: 'One',
        },
      },
    ];

    render(<ConfirmedBooking data={noConfirmedData} />);

    // StartBooking component should be rendered
    const startBookingComponent = screen.getByText(/Start a new booking/i);
    expect(startBookingComponent).toBeInTheDocument();
  });

  it('should render no confirmed booking message when no booked data exists', () => {
    // Test with no confirmed booking (empty array)
    render(<ConfirmedBooking data={[]} />);
  });
});
