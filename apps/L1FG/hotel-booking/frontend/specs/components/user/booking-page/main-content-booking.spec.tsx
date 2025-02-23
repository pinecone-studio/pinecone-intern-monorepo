import { MainContentBooking } from '@/components/user/booking-page';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useQuery } from '@apollo/client';
import { useGetHotelInBookingQuery } from '@/generated';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));
jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetHotelInBookingQuery: jest.fn(),
}));

(useGetHotelInBookingQuery as jest.Mock).mockReturnValue({
  data: { hotelName: 'Test Hotel' }, // mock өгөгдөл
  loading: false,
  error: null,
});

jest.mock('@apollo/client', () => ({
  ...jest.requireActual('@apollo/client'),
  useQuery: jest.fn(),
}));

jest.mock('@/generated', () => ({
  ...jest.requireActual('@/generated'),
  useGetHotelInBookingQuery: jest.fn(),
}));

(useQuery as jest.Mock).mockReturnValue({
  data: {
    filtredBookedData: [
      {
        id: '1',
        name: 'Booking 1',
        cardName: 'Card 1',
        cardNumber: '1234',
        country: 'Country 1',
        email: 'email1@example.com',
        phone: '1234567890',
        address: 'Address 1',
        city: 'City 1',
        state: 'State 1',
        zip: '12345',
        checkIn: '2023-01-01',
        checkOut: '2023-01-02',
        guests: 2,
        rooms: 1,
        endDate: '2023-01-03',
        expirationDate: '2023-01-04',
        hotelId: 'hotel1',
        phoneNumber: '1234567890',
        roomId: 'room1',
        startDate: '2023-01-01',
        status: 'confirmed',
        securityCode: 123,
        userId: 'user1',
      },
    ],
  },
  loading: false,
  error: null,
});

const filtredBookedData = [
  {
    id: '1',
    name: 'Booking 1',
    cardName: 'Card 1',
    cardNumber: '1234',
    country: 'Country 1',
    email: 'email1@example.com',
    phone: '1234567890',
    address: 'Address 1',
    city: 'City 1',
    state: 'State 1',
    zip: '12345',
    checkIn: '2023-01-01',
    checkOut: '2023-01-02',
    guests: 2,
    rooms: 1,
    endDate: '2023-01-03',
    expirationDate: '2023-01-04',
    hotelId: 'hotel1',
    phoneNumber: '1234567890',
    roomId: 'room1',
    startDate: '2023-01-01',
    status: 'confirmed',
    securityCode: 123,
    userId: 'user1',
  },
];
const filtredDataCC = [
  {
    id: '2',
    name: 'Previous Booking 1',
    cardName: 'Card 2',
    cardNumber: '5678',
    country: 'Country 2',
    email: 'email2@example.com',
    phone: '0987654321',
    address: 'Address 2',
    city: 'City 2',
    state: 'State 2',
    zip: '67890',
    checkIn: '2022-01-01',
    checkOut: '2022-01-02',
    guests: 2,
    rooms: 1,
    endDate: '2022-01-03',
    expirationDate: '2022-01-04',
    hotelId: 'hotel2',
    phoneNumber: '0987654321',
    roomId: 'room2',
    startDate: '2022-01-01',
    status: 'completed',
    securityCode: 456,
    userId: 'user2',
  },
];

describe('MainContentBooking page component', () => {
  it('should render Booked successfully', async () => {
    render(<MainContentBooking filtredBookedData={filtredBookedData} filtredDataCC={filtredDataCC} />);
  });
  it('should render NoBooking when filtredBookedData is empty', async () => {
    render(<MainContentBooking filtredBookedData={[]} filtredDataCC={[]} />);
    expect(screen.getByText('Comfirmed Booking'));
  });

  it('should render Booked successfully', async () => {
    // mock өгөгдөл
    (useGetHotelInBookingQuery as jest.Mock).mockReturnValue({
      data: { hotelName: 'Test Hotel' },
      loading: false,
      error: null,
    });

    render(<MainContentBooking filtredBookedData={filtredBookedData} filtredDataCC={filtredDataCC} />);
  });
});
