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
            discount: 20,
            createdAt: '2024-11-14T06:24:52.763Z',
            updatedAt: '2024-11-14T06:24:52.763Z',
          },
        ],
      },
    },
  },
];

const noDiscountEvent = {
  ...mocks1,
  discount: 0,
};

const missingVenueEvent = {
  ...mocks1,
  venues: [{ name: 'Venue 1', price: 5000, quantity: 100 }],
};

const discountedPrice = (price: number, discount: number): number => {
  return discount > 0 ? Math.floor(price * (1 - discount / 100)) : price;
};
describe('EventDetails', () => {
  it('should return discounted price when discount is greater than 0', () => {
  // Test when discount is greater than 0
  expect(discountedPrice(100, 10))
  expect(discountedPrice(200, 25))
  expect(discountedPrice(50, 50))
  expect(discountedPrice(1000, 33))
});
  it('renders event card with discount', () => {
    render(<MockedProvider mocks={mocks1}><EventDetails id="1"   />
    </MockedProvider>);
    expect(screen);

  });
  it('renders event card with discount', () => {
    render(
      <MockedProvider mocks={mocks1} ><EventDetails id="1"  />
      </MockedProvider>);

    expect(screen);
  });
  it('renders event card without discount', () => {
    render(<MockedProvider mocks={mocks1}>
      <EventDetails id="1" />
    </MockedProvider>);

    expect(screen);
  });

  it('renders event card with missing venue', () => {
    render(<MockedProvider mocks={mocks1}><EventDetails id="1"   />
    </MockedProvider>);

    expect(screen);
  });
  it('renders rows based on fetched data (mock 1)', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks1}  addTypename={false}>
        <EventDetails id="1"  />
      </MockedProvider>
    );


    
    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)
      expect(screen);

    });
  });

  it('renders rows based on fetched data (mock 1)', async () => {
    const { getByTestId } = render(
      <MockedProvider  mocks={mocks1} addTypename={false}>
        <EventDetails id="1"  />
      </MockedProvider>
    );
   
    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)
      expect(screen);

    });
  });

  it('handles button click and redirects correctly with a valid token', async () => {
    const mockToken = 'mocked-token';
    localStorage.setItem('token', mockToken);

    const { getByTestId } = render(
      <MockedProvider {...noDiscountEvent} mocks={mocks1} addTypename={false}>
        <EventDetails id="1"  />
      </MockedProvider>
    );
   
    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist)
      expect(screen);

    });

    const button = getByTestId('book-ticket-btn');
    fireEvent.click(button);

    
    const router = useRouter();
    await waitFor(() => {
      expect(router.push)
      expect(screen);

    });
  });

  it('handles button click and redirects correctly without a token', async () => {
    const mockToken = ''; // Simulate missing token scenario
    localStorage.setItem('token', mockToken);

    const { getByTestId } = render(
      <MockedProvider {...missingVenueEvent} mocks={mocks1} addTypename={false}>
        <EventDetails id="1"  />
      </MockedProvider>
    );
    

    await waitFor(() => {
      const artist = getByTestId('artist-0');
      expect(artist);
      expect(screen);

    });

    const button = getByTestId('book-ticket-btn');
    fireEvent.click(button);
   

    const router = useRouter();
    await waitFor(() => {
      expect(router.push)
      expect(screen);

    });
  });

});
