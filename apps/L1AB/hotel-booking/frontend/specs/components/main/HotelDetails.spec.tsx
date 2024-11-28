import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/main';
import { useParams } from 'next/navigation';
import { MockedProvider } from '@apollo/client/testing';
import { GetHotelByIdDocument } from '@/generated';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ hotel: '1' })),
}));

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
    },
  },
];
describe('Main Hotel Details', () => {
  it('should render the main hotel details', () => {
    useParams.mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HotelDetails />
      </MockedProvider>
    );
  });
});
