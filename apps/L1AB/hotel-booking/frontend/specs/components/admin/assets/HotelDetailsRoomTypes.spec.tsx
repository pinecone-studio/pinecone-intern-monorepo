import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { HotelDetailsRoomTypes } from '@/components/admin/assets/hotel-details';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllRoomsDocument } from '@/generated';

jest.mock('@/components/ui/tabs', () => ({
  Tabs: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsList: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  TabsTrigger: ({ children }: { children: React.ReactNode; value: string }) => <button>{children}</button>,
}));

jest.mock('@/components/ui/table', () => ({
  Table: ({ children }: { children: React.ReactNode }) => <table>{children}</table>,
  TableHeader: ({ children }: { children: React.ReactNode }) => <thead>{children}</thead>,
  TableBody: ({ children }: { children: React.ReactNode }) => <tbody>{children}</tbody>,
  TableRow: ({ children }: { children: React.ReactNode }) => <tr>{children}</tr>,
  TableCell: ({ children }: { children: React.ReactNode }) => <td>{children}</td>,
  TableHead: ({ children }: { children: React.ReactNode }) => <th>{children}</th>,
}));

const mock = [
  {
    request: {
      query: GetAllRoomsDocument,
    },
    result: {
      data: {
        getAllRooms: [
          {
            _id: '1',
            name: 'Single room',
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
            name: 'Double room',
            roomNumber: '20',
            price: 2000,
            description: 'desc',
            photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
            roomType: 'TWO',
            createdAt: '2024-11-12T06:24:52.763Z',
            updatedAt: '2024-11-12T06:24:52.763Z',
          },
        ],
      },
      delay: 500,
    },
  },
];
describe('HotelDetailsRoomTypes', () => {
  it('displays empty state if no rooms are returned', async () => {
    const emptyMocks = [
      {
        request: {
          query: GetAllRoomsDocument,
        },
        result: {
          data: { getAllRooms: [] },
        },
      },
    ];

    render(
      <MockedProvider mocks={emptyMocks} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Loading rooms.../i));
    });
  });
  it('filters rooms based on selected tab', async () => {
    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );
  });
  it('should render the admin hotel details room types', async () => {
    render(
      <MockedProvider mocks={mock} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );
    await waitFor(() => screen.getByText('Single room'));

    const tabTrigger = screen.getByText('1 Bed');
    fireEvent.click(tabTrigger);

    await waitFor(() => {
      expect(screen.getByText('Single room'));
      expect(screen.getByText('Double room'));
    });
  });
  it('displays error state if query fails', async () => {
    const errorMocks = [
      {
        request: {
          query: GetAllRoomsDocument,
        },
        error: new Error('Query failed'),
      },
    ];

    render(
      <MockedProvider mocks={errorMocks} addTypename={false}>
        <HotelDetailsRoomTypes />
      </MockedProvider>
    );
    await waitFor(() => {
      expect(screen.getByText(/Failed to load rooms. Please try again later./i));
    });
  });
});
