import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetEventByIdDocument } from '@/generated';
import { EventDetails } from '@/components/maincomponents/EventDetails';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mocks: MockedResponse = {
  request: {
    query: GetEventByIdDocument,
    variables: { id: '1' },
  },
  result: {
    data: {
      getEventById: {
        _id: '1',
        name: 'Rock Concert',
        artistName: ['Band A', 'Band B'],
        description: 'An amazing rock concert.',
        eventDate: ['2024-11-25', '2024-11-26'],
        eventTime: ['18:00'],
        images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image2.jpg'],
        venues: [
          { name: 'Venue A', quantity: 100, price: 50 },
          { name: 'Venue B', quantity: 150, price: 70 },
          { name: 'Venue C', quantity: 150, price: 70 },
        ],
        discount: 10,
        createdAt: '2024-11-14T06:24:52.763Z',
        updatedAt: '2024-11-14T06:24:52.763Z',
      },
    },
  },
};
const mocks1: MockedResponse = {
  request: {
    query: GetEventByIdDocument,
    variables: { id: '1' },
  },
  result: {
    data: {
      getEventById: {
        _id: '1',
        name: 'Rock Concert',
        artistName: ['Band A', 'Band B'],
        description: 'An amazing rock concert.',
        eventDate: ['2024-11-25', '2024-11-26'],
        eventTime: ['18:00'],
        images: [],
        venues: [
          { name: 'Venue A', quantity: 100, price: 50 },
          { name: 'Venue B', quantity: 150, price: 70 },
          { name: 'Venue C', quantity: 150, price: 70 },
        ],
        discount: 10,
        createdAt: '2024-11-14T06:24:52.763Z',
        updatedAt: '2024-11-14T06:24:52.763Z',
      },
    },
  },
};
describe('EventDetails', () => {
  it('renders rows based on fetched data', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      const table = getByTestId('artist-0');
      expect(table);
    });
  });

  it('renders rows based on fetched data', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks1]} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      const table = getByTestId('artist-0');
      expect(table);
    });
  });
  it('handles "book ticket" button click correctly', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[mocks]} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      const Artist = getByTestId('artist-0');
      expect(Artist);
    });
    const button = getByTestId('book-ticket-btn');
    fireEvent.click(button);
  });
});