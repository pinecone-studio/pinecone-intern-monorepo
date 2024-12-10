import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HotelDetailsRoomTypes } from '@/components/admin/assets/hotel-details';
import { useAdmin } from '@/components/providers/AdminProvider';

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('HotelDetailsRoomTypes', () => {
  const mockAdminProvider = {
    hotelData: {
      getHotelById: {
        _id: '1',
        name: 'Hotel',
        description: '5 stars Hotel',
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        address: 'Sun Road 1-st District',
        phone: '11111111',
        city: 'ub',
        rating: 8,
        stars: 3,
        rooms: [
          {
            _id: '1',
            name: 'single room',
            roomNumber: '20',
            price: 2000,
            description: 'desc',
            photos: [],
            roomType: 'ONE',
            createdAt: '2024-11-12T06:24:52.763Z',
            updatedAt: '2024-11-12T06:24:52.763Z',
          },
          {
            _id: '2',
            name: 'double room',
            roomNumber: '20',
            price: 2000,
            description: 'desc',
            photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            roomType: 'TWO',
            createdAt: '2024-11-12T06:24:52.763Z',
            updatedAt: '2024-11-12T06:24:52.763Z',
          },
        ],
        createdAt: '2024-11-14T06:24:52.763Z',
        updatedAt: '2024-11-14T06:24:52.763Z',
      },
    },
    hotelLoading: false,
  };
  it('should render the admin hotel details room types', async () => {
    (useAdmin as jest.Mock).mockReturnValue({ ...mockAdminProvider, hotelLoading: true });

    render(<HotelDetailsRoomTypes />);
  });

  it('filters rooms based on selected tab', async () => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);

    render(<HotelDetailsRoomTypes />);

    await waitFor(() => expect(screen.getByTestId('room-item-1')));

    fireEvent.keyDown(screen.getByText('1 Bed'), { key: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByTestId('room-item-1'));
    });
  });
  it('displays a fallback message if no rooms are available', async () => {
    mockAdminProvider.hotelData = {
      getHotelById: {
        _id: '1',
        name: 'Hotel',
        description: '5 stars Hotel',
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
        address: 'Sun Road 1-st District',
        phone: '11111111',
        city: 'ub',
        rating: 8,
        stars: 3,
        rooms: [],
        createdAt: '2024-11-14T06:24:52.763Z',
        updatedAt: '2024-11-14T06:24:52.763Z',
      },
    };
    console.log(mockAdminProvider);
    render(<HotelDetailsRoomTypes />);

    await waitFor(() => expect(screen.getByText('Room Types Not Set Up')));
  });
});
