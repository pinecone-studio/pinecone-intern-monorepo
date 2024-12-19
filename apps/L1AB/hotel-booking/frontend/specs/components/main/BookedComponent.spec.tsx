import { BookedComponent } from '@/components/main/BookedComponent';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

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

describe('Main BookedComponent', () => {
  it('should render the booked component when status is "booked"', () => {
    render(<BookedComponent data={mockBookingData} />);

    const statusElement = screen.getByText('booked');
    expect(statusElement);

    const checkInTime = screen.getByText('Sunday, December 1, 7:00 AM');
    expect(checkInTime);

    const checkOutTime = screen.getByText('Monday, December 2, 3:00 AM');
    expect(checkOutTime);

    const cancelButton = screen.getByRole('button', { name: /cancel booking/i });
    const contractButton = screen.getByRole('button', { name: /contract property/i });
    expect(cancelButton);
    expect(contractButton);
  });

  it('should render the canceled component when status is "canceled"', () => {
    const canceledBookingData = { ...mockBookingData, status: 'canceled' };
    render(<BookedComponent data={canceledBookingData} />);

    const statusElement = screen.getByText('canceled');
    expect(statusElement);

    const cancelButton = screen.queryByRole('button', { name: /cancel booking/i });
    const contractButton = screen.queryByRole('button', { name: /contract property/i });
    expect(cancelButton);
    expect(contractButton);
  });
});
