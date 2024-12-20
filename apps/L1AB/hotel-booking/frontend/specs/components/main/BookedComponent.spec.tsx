import { BookedComponent } from '@/components/main/BookedComponent';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

const mockBookingData = {
  status: 'booked',
  checkIn: new Date('Sunday, December 1, 7:00 AM'),
  checkOut: new Date('Monday, December 2, 3:00 AM'),
  roomId: {
    hotelId: {
      name: 'Hotel Sample',
      phone: '+1-800-555-5555',
    },
  },
};
describe('Main BookedComponent', () => {
  it('should render the booked component when status is "booked"', () => {
    render(<BookedComponent data={mockBookingData} />);
    const statusElement = screen.getByText('booked');
    expect(statusElement);
    expect(screen);

    const cancelButton = screen.getByRole('button', { name: /cancel booking/i });
    const contractButton = screen.getByRole('button', { name: /contract property/i });
    expect(cancelButton);
    expect(contractButton);
  });
  it('should render the canceled component when status is "canceled"', () => {
    const canceledBookingData = { ...mockBookingData, status: 'canceled' };
    render(<BookedComponent data={canceledBookingData} />);

    const statusElement = screen.getByText('canceled');
    expect(statusElement).toBeInTheDocument();

    const cancelButton = screen.queryByRole('button', { name: /cancel booking/i });
    const contractButton = screen.queryByRole('button', { name: /contract property/i });
    expect(cancelButton);
    expect(contractButton);
  });
});
