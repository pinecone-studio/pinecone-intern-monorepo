import { EventCard } from '@/components';
import { render, screen, fireEvent } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

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
const noDiscountEvent = {
  ...sampleEvent,
  discount: 0,
};

const missingVenueEvent = {
  ...sampleEvent,
  venues: [{ name: 'Venue 1', price: 5000, quantity: 100 }],
};

describe('EventCard', () => {
  it('renders event card with discount', () => {
    render(<EventCard {...sampleEvent} />);

    expect(screen);
  });
  it('renders event card with discount', () => {
    render(<EventCard {...sampleEvent1} />);

    expect(screen);
  });
  it('renders event card without discount', () => {
    render(<EventCard {...noDiscountEvent} />);

    expect(screen);
  });

  it('renders event card with missing venue', () => {
    render(<EventCard {...missingVenueEvent} />);

    expect(screen);
  });

  it('navigates to event details page when card is clicked', () => {
    const { getByTestId } = render(<EventCard {...sampleEvent} />);
    const cardElement = getByTestId('EventCardClickId');
    fireEvent.click(cardElement);
  });

  it('renders the correct event date and location', () => {
    render(<EventCard {...sampleEvent} />);

    expect(screen);
  });
});
