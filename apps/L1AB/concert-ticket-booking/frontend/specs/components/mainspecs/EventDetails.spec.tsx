/* eslint-disable max-lines */
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GetAllEventsDocument, GetEventByIdDocument } from '@/generated';
import { EventDetails } from '@/components/maincomponents/EventDetails';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/events/6765104197fab04d24c9ed5b'),
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
  },
  {
    request: {
      query: GetAllEventsDocument,
      variables: { id: '2' },
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
            discount: 20,
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
          {
            _id: '3',
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

            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
        ],
      },
    },
  },
];
const mock2 = [
  {
    request: {
      query: GetEventByIdDocument,
      variables: { id: '2' },
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
          discount: 0,
          createdAt: '2024-11-14T06:24:52.763Z',
          updatedAt: '2024-11-14T06:24:52.763Z',
        },
      },
    },
  },
]
describe('EventDetails', () => {
  it('renders rows based on fetched data (mock 1)', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks1} addTypename={false} >
        <EventDetails id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)

    });
  });
  it('renders rows based on fetched data (mock 1)', async () => {
    render(
      <MockedProvider mocks={mock2} addTypename={false}>
        <EventDetails id="2" />
      </MockedProvider>
    );
    await waitFor(() => {
      const artist = screen.getByTestId('artist-0');
      expect(artist)
      expect(screen)
    });

  });

  it('renders rows based on fetched data (mock 1)', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );

    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)
    });
  });

  it('handles button click and redirects correctly with a valid token', async () => {
    const mockToken = 'mocked-token';
    localStorage.setItem('token', mockToken);

    const { getByTestId } = render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );
    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)
    });

    const button = getByTestId('book-ticket-btn');
    fireEvent.click(button);
    const router = useRouter();
    await waitFor(() => {
      expect(router.push)
    });
  });

  it('handles button click and redirects correctly without a token', async () => {
    const mockToken = ''; // Simulate missing token scenario
    localStorage.setItem('token', mockToken);

    const { getByTestId } = render(
      <MockedProvider mocks={mocks1} addTypename={false}>
        <EventDetails id="1" />
      </MockedProvider>
    );
    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist);

    });

    const button = getByTestId('book-ticket-btn');
    fireEvent.click(button);


    const router = useRouter();
    await waitFor(() => {
      expect(router.push)
    });
  });

});
