// HotelDataTable.test.tsx
import { render, screen } from '@testing-library/react';

import { Booking } from '@/generated'; // Booking интерфэйсийг зөв ашиглах

import { RoomDataTable } from '@/components/admin/add-room';

// Fake data
// HotelDataTable.test.tsx

// Fake data
const mockData: Array<Booking> = [
  {
    id: '1',
    cardName: 'John Doe',
    email: 'john.doe@example.com',
    startDate: '2025-03-01T00:00:00Z',
    endDate: '2025-03-05T00:00:00Z',
    cardNumber: '',
    country: '',
    expirationDate: undefined,
    hotelId: '',
    phoneNumber: '',
    roomId: '',
    securityCode: 0,
    status: '',
    userId: '',
  },
  {
    id: '2',
    cardName: 'Jane Doe',
    email: 'jane.doe@example.com',
    startDate: '2025-03-10T00:00:00Z',
    endDate: '2025-03-12T00:00:00Z',
    cardNumber: '',
    country: '',
    expirationDate: undefined,
    hotelId: '',
    phoneNumber: '',
    roomId: '',
    securityCode: 0,
    status: '',
    userId: '',
  },
];

describe('HotelDataTable Component', () => {
  it('should render the hotel data table with correct details', () => {
    render(<RoomDataTable data={mockData} />);

    // ID-н мэдээлэл шалгах
    expect(screen.getByText('0001'));
    expect(screen.getByText('John Doe'));
    expect(screen.getByText((content) => content.includes('Mar 1') && content.includes('Mar 5')));
  });

  it('should render "No Upcoming Bookings" if there is no data', () => {
    render(<RoomDataTable data={[]} />);

    // Мэдээлэл байхгүй бол үүнийг шалгах
    expect(screen.getByText('No Upcoming Bookings'));
  });

  it('should render multiple bookings correctly', () => {
    render(<RoomDataTable data={mockData} />);

    // Check for second booking details
    expect(screen.getByText('0002'));
    expect(screen.getByText('Jane Doe'));
    expect(screen.getByText((content) => content.includes('Mar 10') && content.includes('Mar 12')));
  });
});
