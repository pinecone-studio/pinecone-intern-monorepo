import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { RoomDetails } from '@/components/admin';
import { ReactNode } from 'react';
import { GetRoomByIdDocument } from '@/generated';
import { MockedProvider } from '@apollo/client/testing';
import { useParams } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useParams: jest.fn(() => ({ room: '11' })),
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
      query: GetRoomByIdDocument,
      variables: { id: '11' },
    },
    result: {
      data: {
        GetRoomById: {
          _id: '11',
          name: 'single room',
          roomNumber: '20',
          price: 2000,
          description: 'desc',
          photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          roomType: 'ONE',
          createdAt: '2024-11-12T06:24:52.763Z',
          updatedAt: '2024-11-12T06:24:52.763Z',
        },
      },
    },
  },
];
describe('Admin Room Details', () => {
  it('should render the admin room details', () => {
    useParams.mockReturnValue({ room: '11' });

    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RoomDetails />
      </MockedProvider>
    );
  });
});
