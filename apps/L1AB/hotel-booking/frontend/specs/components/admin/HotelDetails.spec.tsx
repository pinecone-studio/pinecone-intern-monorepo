import '@testing-library/jest-dom';
import React from 'react';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/admin';
import { useAdmin } from '@/components/providers/AdminProvider';

// Mocking AdminProvider and other dependencies
jest.mock('@/components/providers/AdminProvider', () => ({
  useAdmin: jest.fn(),
}));

describe('HotelDetails Component', () => {
  const mockAdminProvider = {
    addHotelForm: {
      values: {
        name: '',
        phone: '',
        stars: 0,
        rating: 0,
        description: '',
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
    showError: jest.fn((field, errors, touched) => touched[field] && errors[field]),
  };

  beforeEach(() => {
    (useAdmin as jest.Mock).mockReturnValue(mockAdminProvider);
  });

  it('renders the container and sections', () => {
    render(<HotelDetails />);
  });
});
