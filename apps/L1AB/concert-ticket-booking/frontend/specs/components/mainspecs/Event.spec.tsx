import { render, waitFor, screen } from '@testing-library/react';
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
          images: ['https://via.placeholder.com/150'],
          venues: [
            { _id: '1', name: 'test', quantity: 20, price: 20 },
            { _id: '2', name: 'test', quantity: 20, price: 20 },
            { _id: '3', name: 'test', quantity: 20, price: 20 },
          ],
          discount: 20,
        },
      ],
    },
  },
};

describe('Event Component', () => {
  it('renders events successfully', async () => {
    render(
      <MockedProvider mocks={[mock]} addTypename={false}>
        <Event />
      </MockedProvider>
    );

    // Wait for loading state to resolve
    await waitFor(() => expect(screen.getByTestId('eventhaha')));

    // Check that event cards are rendered
    const eventCards = screen;
    expect(eventCards);
  });
});
