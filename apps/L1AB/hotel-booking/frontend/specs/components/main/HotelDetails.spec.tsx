import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { HotelDetails } from '@/components/main';
import { useParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
import { GetHotelByIdDocument } from '@/generated';

// Mocking useParams to simulate the URL parameter
jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ hotel: '1' })),
}));

// Mock response for Apollo Client
const mocks = [
  {
    request: {
      query: GetHotelByIdDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
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
              photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
              roomType: 'ONE',
              createdAt: '2024-11-12T06:24:52.763Z',
              updatedAt: '2024-11-12T06:24:52.763Z',
            },
            {
              _id: '2',
              name: 'double room',
              roomNumber: '20',
              price: 2500,
              description: 'desc',
              photos: [],
              roomType: 'TWO',
              createdAt: '2024-11-12T06:24:52.763Z',
              updatedAt: '2024-11-12T06:24:52.763Z',
            },
          ],
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      },
    },
    delay: 500, 
  },
];

describe('Main Hotel Details', () => {
  it('should render the loading state and hotel details correctly', async () => {
    (useParams as jest.Mock).mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <HotelDetails />
      </MockedProvider>
    );

    expect(screen.getByTestId('loading-text'))

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HotelDetails />
      </MockedProvider>
    );

    await waitFor(() => screen.getByTestId('choose-room-title'));

    expect(screen.queryByTestId('loading-text'))

    expect(screen.getByTestId('choose-room-title'))

    expect(screen.getByTestId('room-filter-display'))

    fireEvent.click(screen.getByTestId('button-0')); // Assuming you have a specific test ID for this
    expect(screen.getByTestId('room-filter-display'))
    expect(screen.queryByTestId('room-1'))
    expect(screen.queryByTestId('room-2'))

    fireEvent.click(screen.getByTestId('button-1')); // Assuming a test ID for this

    expect(screen.getByTestId('room-filter-display'))
    expect(screen.queryByTestId('room-1'))
    expect(screen.queryByTestId('room-2'))
  });
});
