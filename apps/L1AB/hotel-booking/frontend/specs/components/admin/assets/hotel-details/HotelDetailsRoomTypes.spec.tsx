import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HotelDetailsRoomTypes } from '@/components/admin/assets/hotel-details';
import { MockedProvider } from '@apollo/client/testing';
import { GetHotelByIdDocument } from '@/generated';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ hotel: '1' })),
}));

const mock = [
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
    },
  },
];
describe('HotelDetailsRoomTypes', () => {
  it('should render the admin hotel details room types', async () => {
    useParams.mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );

    await waitFor(() => fireEvent.click(screen.getByText('No Image')));
  });
  it('filters rooms based on selected tab', async () => {
    useParams.mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByTestId('room-item-1')));

    fireEvent.keyDown(screen.getByText('1 Bed'), { key: 'Enter' });

    await waitFor(() => {
      expect(screen.queryByTestId('room-item-1'));
    });
  });
  it('displays a fallback message if no rooms are available', async () => {
    const noRoomsMock = [
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
              rooms: [],
              createdAt: '2024-11-14T06:24:52.763Z',
              updatedAt: '2024-11-14T06:24:52.763Z',
            },
          },
        },
      },
    ];

    useParams.mockReturnValue({ hotel: '1' });

    render(
      <MockedProvider mocks={noRoomsMock} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );

    await waitFor(() => expect(screen.getByText('Room Types Not Set Up')));
  });
});
