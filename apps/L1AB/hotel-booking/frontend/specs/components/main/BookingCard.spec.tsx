import { BookingCard } from '@/components/main';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const sampleBooking = {
  _id: '1',
  status: 'booked',
  checkIn: 'Sunday, December 8, 8:00 AM',
  checkOut: 'Monday, December 9, 8:00 AM',
  traveller: '1',
  createdAt: '2024-11-14T06:24:52.763Z',
  updatedAt: '2024-11-14T06:24:52.763Z',

  roomId: [
    { image: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], description: 'single room', roomType: 'ONE' },
    { image: ['https://example.com/image2.jpg', 'https://example.com/image2.jpg'], description: 'double room', roomType: 'TWO' },
  ],
  hotelId: [{ _id: '2', name: 'Shangri La' }],
};

const sampleBooking1 = {
  _id: '1',
  status: 'booked',
  checkIn: 'Sunday, December 8, 8:00 AM',
  checkOut: 'Monday, December 9, 8:00 AM',
  traveller: '1',
  createdAt: '2024-11-14T06:24:52.763Z',
  updatedAt: '2024-11-14T06:24:52.763Z',

  roomId: [
    { image: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], description: 'single room', roomType: 'TWO' },
    { image: ['https://example.com/image2.jpg', 'https://example.com/image2.jpg'], description: 'double room', roomType: 'TWO' },
  ],
  hotelId: [{ _id: '2', name: 'Shangri La' }],
};
const missingRoomIdBooking = {
  ...sampleBooking,
  roomId: [{ image: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'], description: 'single room', roomType: 'TWO' }],
};
const noStatusBooking = {
  ...sampleBooking,
  status: '',
};

describe('Main BookingCard', () => {
  it('should render BookingCard with status', () => {
    render(<BookingCard {...sampleBooking} />);
    expect(screen);
  });
  it('should render BookingCard with status', () => {
    render(<BookingCard {...sampleBooking1} />);
    expect(screen);
  });
  it('should render BookingCard with missing roomId', () => {
    render(<BookingCard {...missingRoomIdBooking} />);
    expect(screen);
  });
  it('should render BookingCard without status', () => {
    render(<BookingCard {...noStatusBooking} />);
    expect(screen);
  });
});
