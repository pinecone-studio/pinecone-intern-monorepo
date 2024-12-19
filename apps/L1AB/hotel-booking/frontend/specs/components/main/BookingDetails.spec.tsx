import { BookingDetails } from '@/components/main/BookingDetails';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

const mockBookingData = {
  status: 'booked',
  checkIn: new Date('2024-12-01T15:00:00Z'),
  checkOut: new Date('2024-12-02T11:00:00Z'),
  roomId: {
    hotelId: {
      name: 'Hotel Sample',
      phone: '+1-800-555-5555',
    },
  },
};

describe('Main BookingDetails', () => {
  it('should render the main booking Details', () => {
    render(<BookingDetails data={mockBookingData} />);
  });
});
