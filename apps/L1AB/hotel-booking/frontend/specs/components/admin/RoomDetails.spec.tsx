import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RoomDetails } from '@/components/admin';
import { ReactNode } from 'react';
import { useAdmin } from '@/components/providers/AdminProvider';
import { GetAllBookingsDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ room: '11' })),
}));

jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

jest.mock('@/components/admin/assets', () => ({
  DetailsContainer: ({ children, name }: { children: ReactNode; name: string }) => <div data-testid={`container-${name}`}>{children}</div>,
  DetailsLeft: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DetailsRight: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DetailsCard: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

const mock = {
  request: {
    query: GetAllBookingsDocument,
  },
  result: {
    data: {
      getAllBookings: [
        {
          _id: '1',
          hotelId: '1',
          roomId: '1',
          userId: '1',
          checkIn: '2024-11-12',
          checkOut: '2024-11-14',
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};
describe('Admin Room Details', () => {
  const mockAdminProvider = {
    addHotelForm: {
      values: {
        name: '',
        phone: '',
        stars: 0,
        rating: 0,
        description: '',
        images: [],
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
    addRoomForm: {
      values: {
        name: '',
        description: '',
        roomNumber: '',
        roomType: '',
        price: 0,
      },
      handleChange: jest.fn(),
      handleBlur: jest.fn(),
      setFieldValue: jest.fn(),
      handleSubmit: jest.fn(),
      errors: {},
      touched: {},
    },
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
    roomLoading: false,
    showError: jest.fn((field, errors, touched) => touched[field] && errors[field]),
  };

  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });

  it('should render the admin room details', () => {
    render(
      <MockedProvider mocks={[mock]}>
        <RoomDetails />
      </MockedProvider>
    );
  });
});
