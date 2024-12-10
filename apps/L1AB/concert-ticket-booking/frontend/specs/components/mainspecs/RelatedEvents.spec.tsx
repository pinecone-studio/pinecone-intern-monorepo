import { MockedProvider } from '@apollo/client/testing';
import { render, screen, waitFor } from '@testing-library/react';
import { RelatedEvents } from '@/components/maincomponents/RelatedEvents';
import { GetAllEventsDocument, GetEventByIdDocument } from '@/generated';
import { mocks } from './mock';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mocks1 = [
  {
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
          eventDate: [],
          eventTime: ['18:00'],
          images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image2.jpg'],
          venues: [
            { name: 'Venue A', quantity: 100, price: 50 },
            { name: 'Venue B', quantity: 150, price: 70 },
            { name: 'Venue C', quantity: 150, price: 70 },
          ],
          status: 'Regular',
          discount: 10,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      },
    },
  },
  {
    request: {
      query: GetAllEventsDocument,
    },
    result: {
      data: {
        getAllEvents: [
          {
            _id: '2',
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
            status: 'Regular',
            discount: 20,
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
        ],
      },
    },
  },
];

describe('RelatedEvents', () => {
  it('renders related events based on target date', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <RelatedEvents id="1" />
      </MockedProvider>
    );
    await waitFor(() => {
      const table = getByTestId('RelatedEvents-0');
      expect(table);
    });
  });
  it('renders related events based on target date', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <RelatedEvents id="1" />
      </MockedProvider>
    );
    await waitFor(() => {
      const table = getByTestId('RelatedEvents-0');
      expect(table);
    });
  });

  it('renders "No related events found" if no matching events', async () => {
    const noEventMock = [
      {
        request: {
          query: GetEventByIdDocument,
          variables: { id: '1' },
        },
        result: {
          data: {
            getEventById: {
              _id: '1',
              name: 'Rock Concert',
              eventDate: ['2024-11-25'],
              eventTime: ['18:00'],
              artistName: ['Band A'],
              description: 'An amazing rock concert.',
              images: ['https://example.com/image1.jpg'],
              venues: [{ name: 'Venue A', quantity: 100, price: 50 }],
              discount: 10,
              status: 'Regular',
            },
          },
        },
      },
      {
        request: {
          query: GetAllEventsDocument,
        },
        result: {
          data: { getAllEvents: [] },
        },
      },
    ];

    render(
      <MockedProvider mocks={noEventMock} addTypename={false}>
        <RelatedEvents id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/No related events found/i));
    });
  });
});
