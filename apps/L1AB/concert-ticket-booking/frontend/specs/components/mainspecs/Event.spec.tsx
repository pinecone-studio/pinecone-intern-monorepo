import { render, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { Event } from '@/components';
import { GetAllEventsDocument } from '@/generated';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mock = {
  request: {
    query: GetAllEventsDocument,
  },
  result: {
    data: {
      getAllEvents: [
        {
          _id: '1',
          name: 'Event 1',
          eventDate: '2022-01-01',
          eventTime: '20-30',
          artistName: 'test',
          description: 'Event 1 Description',
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          venues: [
            { name: 'test', quantity: 20, price: 20 },
            { name: 'test', quantity: 20, price: 20 },
            { name: 'test', quantity: 20, price: 20 },
          ],
          discount: 20,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      ],
    },
  },
};

describe('Event Component', () => {
  it('renders events successfully', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Event />
      </MockedProvider>
    );

    await waitFor(() => {
      const eventCards = getByTestId('eventhaha');
      expect(eventCards);
    });
  });
});
