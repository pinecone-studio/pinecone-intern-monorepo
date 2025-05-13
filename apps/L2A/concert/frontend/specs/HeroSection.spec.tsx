import HeroSection from '@/app/_components/HeroSection';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Concert } from '@/generated';

describe('HeroSection', () => {
  it('should render HeroSection component', () => {
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
    render(<HeroSection concert={mockConcert} />);
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
  });

  it('should render HeroSection component', () => {
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
    render(<HeroSection concert={mockConcert} />);
    const heroSection = screen.getByTestId('hero-section');
    expect(heroSection).toBeInTheDocument();
  });
});
