import '@testing-library/jest-dom';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { HotelsTable } from '@/components/admin';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllHotelsDocument } from '@/generated';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mock = {
  request: {
    query: GetAllHotelsDocument,
  },
  result: {
    data: {
      getAllHotels: [
        {
          _id: '1',
          name: 'UB Hotel',
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
      ],
    },
  },
};

describe('Admin Hotels Table', () => {
  it('should render the admin hotels table', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <HotelsTable />
      </MockedProvider>
    );

    await waitFor(() => {
      const hotel = getByTestId('one-hotel');
      expect(hotel).toBeInTheDocument();
      fireEvent.click(hotel);
    });
  });
  it('does not render the "+ extra rooms" span when totalRooms <= 3', async () => {
    const modifiedMock = {
      ...mock,
      result: {
        data: {
          getAllHotels: [
            {
              _id: '1',
              name: 'UB Hotel',
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
                {
                  _id: '3',
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
                  _id: '4',
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
          ],
        },
      },
    };

    const { getByTestId } = render(
      <MockedProvider mocks={[modifiedMock]} addTypename={false}>
        <HotelsTable />
      </MockedProvider>
    );

    await waitFor(() => {
      const hotel = getByTestId('one-hotel');
      fireEvent.click(hotel);
    });
  });
});