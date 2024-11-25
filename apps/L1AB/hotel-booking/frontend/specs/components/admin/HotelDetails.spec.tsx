import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { HotelDetails } from '@/components/admin';
import { useParams } from 'next/navigation';
import { GetHotelByIdDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import React, { ReactNode } from 'react';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ hotel: '1' })),
}));

jest.mock('@/components/admin/assets', () => ({
  DetailsContainer: ({ children, name }: { children: ReactNode; name: string }) => <div data-testid={`container-${name}`}>{children}</div>,
  DetailsLeft: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DetailsRight: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DetailsCard: ({ children }: { children: ReactNode }) => <div>{children}</div>,
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
describe('Admin Hotel Details', () => {
  it('handles no data gracefully', async () => {
    useParams.mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <HotelDetails />
      </MockedProvider>
    );
  });
});