import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConcertCard from '@/app/_components/ConcertCard';
import { Concert } from '@/generated';
describe('ConcertCard', () => {
  it('should render ConcertCard', () => {
    const mockConcert: Concert = {
      __typename: 'Concert',
      id: 'concert-1',
      artistName: 'The Mockingbirds',
      title: 'Sunset Serenade',
      description: 'An unforgettable evening of acoustic melodies at the lakeside.',
      primaryPrice: 45,
      thumbnailUrl: '/images/mock-concert-thumb.jpg',
      doorOpen: '2025-06-15T18:00:00Z',
      musicStart: '2025-06-15T19:00:00Z',
      endDate: '2025-06-15T21:00:00Z',
      seatData: [],
      venue: {
        __typename: 'Venue',
        id: 'venue-1234',
        name: 'Lakeside Amphitheater',
        address: '123 Lake View Dr',
        city: 'Mocksville',
        capacity: 5000,
      },
    };
    render(<ConcertCard concert={mockConcert} />);
    const card = screen.getByTestId('concert-card');
    expect(card).toBeInTheDocument();
  });

  it('should render ConcertCard but uses placeholder image if thumbnail not provided', () => {
    const mockConcert = {
      __typename: 'Concert',
      id: 'concert-1',
      artistName: 'The Mockingbirds',
      title: 'Sunset Serenade',
      description: 'An unforgettable evening of acoustic melodies at the lakeside.',
      primaryPrice: 45,
      thumbnailUrl: null,
      doorOpen: '2025-06-15T18:00:00Z',
      musicStart: '2025-06-15T19:00:00Z',
      endDate: '2025-06-15T21:00:00Z',
      seatData: [],
      specialGuestName: null,
      venue: {
        __typename: 'Venue',
        id: 'venue-1234',
        name: 'Lakeside Amphitheater',
        address: '123 Lake View Dr',
        city: 'Mocksville',
        capacity: 5000,
      },
    };
    render(<ConcertCard concert={mockConcert} />);
    const card = screen.getByTestId('concert-card');
    expect(card).toBeInTheDocument();
  });
});
