import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { NoPreviousBooking, PreviousBooking } from '@/components/main';

jest.mock('@/generated', () => ({
  useGetBookingByIdQuery: jest.fn(),
}));

describe('PreviousBooking', () => {
  const mockData = [
    {
      _id: '1',
      createdAt: '2024-12-01T10:00:00Z',
      email: 'example@email.com',
      firstName: 'Anna',
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
      firstName: 'Jack',
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

  it('should render previous bookings', () => {
    render(<PreviousBooking data={mockData} />);

    // Previous Booking section exists
    const previousBookingTitle = screen.getByText(/Booking Completed/i);
    expect(previousBookingTitle).toBeInTheDocument();

    // Booking card for Completed booking
    const bookingCard = screen.getByTestId('previousData-0'); // 0-Index, first Completed booking
    expect(bookingCard).toBeInTheDocument();

    // Check if booking details are displayed
    expect(screen.getByText(/cancelled/)).toBeInTheDocument();
  });

  it('should render NoPreviousBooking if no previous bookings are available', () => {
    // Test with no previous 'booked' status
    const noPreviousData = [
      {
        _id: '3',
        createdAt: '2024-12-01T10:00:00Z',
        email: 'example@email.com',
        firstName: 'John',
        status: '',
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

    render(<NoPreviousBooking data={noPreviousData} />);

    // NoPrevious component should be rendered
    const NoPreviousComponent = screen.getByText(/No Previous Bookings/i);
    expect(NoPreviousComponent).toBeInTheDocument();
  });

  it('should render no confirmed booking message when no booked data exists', () => {
    // Test with no previous booking (empty array)
    render(<PreviousBooking data={[]} />);
  });
});
