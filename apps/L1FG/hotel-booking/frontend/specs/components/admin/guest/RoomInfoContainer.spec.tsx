import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RoomInfoContainer } from '@/components/admin/guest/RoomInfoContainer';

const mockRoomData = {
  hotelId: 'hotel123',
  id: 'room123',
  name: 'Deluxe Room',
  price: 100000,
  tax: 10000,
  images: ['https://example.com/room.jpg'],
};

const mockBookingData = {
  startDate: '2025-02-20',
  endDate: '2025-02-22',
  cardName: 'John Doe',
  cardNumber: '1234-5678-9012-3456',
  country: 'USA',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  address: '123 Main St',
  city: 'New York',
  state: 'NY',
  zip: '10001',
  specialRequests: 'None',
  paymentStatus: 'Paid',
  bookingStatus: 'Confirmed',
};

describe('RoomInfoContainer', () => {
  it('renders room name, price details, and image', () => {
    render(<RoomInfoContainer roomData={mockRoomData} data={mockBookingData} />);

    expect(screen.getByText('Deluxe Room'));
    expect(screen.getByText('100,000₮ per night'));
    expect(screen.getByText('100,000₮')); // Price per night
    expect(screen.getByText('10,000₮')); // Taxes
    expect(screen.getByText('Total price'));
    expect(screen.getByText('110,000₮')); // Total price

    const image = screen.getByAltText('Room');
    expect(image);
  });

  it('handles undefined roomData and bookingData gracefully', () => {
    render(<RoomInfoContainer roomData={undefined} data={undefined} />);

    expect(screen.getByText('-/-'));
    expect(screen.getByText('0₮ per night'));
  });

  it('calculates nights as at least 1 even if dates are the same', () => {
    render(<RoomInfoContainer roomData={mockRoomData} data={{ ...mockBookingData, startDate: '2025-02-20', endDate: '2025-02-20' }} />);

    expect(screen.getByText('1 nights'));
  });

  it('renders fallback image if no images are provided', () => {
    render(<RoomInfoContainer roomData={{ ...mockRoomData, images: [] }} data={mockBookingData} />);

    const image = screen.getByAltText('Room');
    expect(image);
  });
});
