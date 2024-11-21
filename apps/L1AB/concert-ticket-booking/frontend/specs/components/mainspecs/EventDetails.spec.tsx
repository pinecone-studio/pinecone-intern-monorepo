import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { EventDetails } from '@/components/maincomponents/EventDetails';
import { GetEventByIdDocument } from '@/generated';
import '@testing-library/jest-dom'; // For better matchers

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mocks = [
  {
    request: {
      query: GetEventByIdDocument,
      variables: { id: '1' },
    },
    result: {
      data: {
        getEventById: {
          _id: '1',
          name: 'Event 1',
          eventDate: ['2022-01-01'],
          eventTime: '20:30',
          artistName: ['Test Artist'],
          description: 'Event 1 Description',
          images: ['https://via.placeholder.com/150'],
          venues: [
            { _id: '1', name: 'Venue A', quantity: 20, price: 100 },
            { _id: '2', name: 'Venue B', quantity: 10, price: 200 },
          ],
          discount: 10,
        },
      },
    },
  },
];

const sampleEvent = {
  _id: '1',
  name: 'Sample Event',
  description: 'test event',
  eventDate: ['2024-12-25'],
  artistName: ['Artist Name', ' Artist Name'],
  images: ['https://via.placeholder.com/150'],
  venues: [
    { name: 'Venue1', price: 5000, quantity: 100 },
    { name: 'Venue2', price: 6000, quantity: 100 },
    { name: 'Venue3', price: 7000, quantity: 50 },
  ],
  discount: 20,
};

const sampleEvent1 = {
  _id: '1',
  name: 'Sample Event',
  description: 'test event',
  eventDate: ['2024-12-25', '2024-12-25'],
  artistName: ['Artist Name', ' Artist Name'],
  images: ['https://via.placeholder.com/150'],
  venues: [
    { name: 'Venue1', price: 5000, quantity: 100 },
    { name: 'Venue2', price: 6000, quantity: 100 },
    { name: 'Venue3', price: 7000, quantity: 50 },
  ],
  discount: 20,
};

describe('EventDetails Component', () => {
  it('renders the EventDetailsSkeleton when loading', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventDetails _id="1" />
      </MockedProvider>
    );

    expect(screen);
  });

  it('renders successfully with mock data', async () => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <EventDetails _id="1" />
      </MockedProvider>
    );
    const eventName = await screen.findByText(/Event 1/i);
    expect(eventName);
  });

  it('renders successfully with sampleEvent', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventDetails {...sampleEvent} />
      </MockedProvider>
    );

    expect(screen);
  });

  it('renders successfully with sampleEvent1', () => {
    render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventDetails {...sampleEvent1} />
      </MockedProvider>
    );

    expect(screen);
  });

  it('navigates to event details page when card is clicked', () => {
    const { getByTestId } = render(
      <MockedProvider mocks={[]} addTypename={false}>
        <EventDetails {...sampleEvent} />
      </MockedProvider>
    );
    const cardElement = getByTestId('BookTicketTo');
    fireEvent.click(cardElement);
  });
});
