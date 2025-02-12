/* eslint-disable max-lines */
import '@testing-library/jest-dom';
import { Card } from '@/components/ticketCard/Card';
import { act, fireEvent, render, screen } from '@testing-library/react';

const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: { src: string; alt?: string }) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} src={props.src} alt={props.alt || ''} />;
  },
}));

describe('Card component', () => {
  const baseCard = {
    _id: 'test-id',
    concertName: 'Test Concert',
    concertPlan: 'Test Plan',
    artistName: ['Test Artist'],
    concertDay: '2025-01-31',
    concertTime: '20:00',
    concertPhoto: 'https://example.com/photo.jpg',
    vipTicket: { price: 100, quantity: 50 },
    regularTicket: { price: 50, quantity: 100 },
    standingAreaTicket: { price: 30, quantity: 200 },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders all basic concert information correctly', () => {
    render(<Card card={baseCard} />);

    expect(screen.getByTestId('card-concert-name')).toHaveTextContent('Test Concert');
    expect(screen.getByTestId('card-artist-name')).toHaveTextContent('Test Artist');
    expect(screen.getByTestId('card-format-date')).toHaveTextContent('2025-1-31');
    expect(screen.getByText('UG ARENA')).toBeInTheDocument();
  });

  it('handles array of artist names correctly', () => {
    const cardWithMultipleArtists = {
      ...baseCard,
      artistName: ['Artist 1', 'Artist 2', 'Artist 3'],
    };
    render(<Card card={cardWithMultipleArtists} />);

    expect(screen.getByTestId('card-artist-name')).toHaveTextContent('Artist 1, Artist 2, Artist 3');
  });

  it('handles string artist name correctly', () => {
    const cardWithStringArtist = {
      ...baseCard,
      artistName: 'Single Artist',
    };
    render(<Card card={cardWithStringArtist} />);

    expect(screen.getByTestId('card-artist-name')).toHaveTextContent('Single Artist');
  });

  it('displays correct pricing information with different price tiers', () => {
    render(<Card card={baseCard} />);

    expect(screen.getByTestId('card-regular-price')).toHaveTextContent('$50');
    expect(screen.getByTestId('card-discount')).toHaveTextContent('$30');
  });

  it('handles same prices for regular and standing tickets', () => {
    const cardWithSamePrices = {
      ...baseCard,
      regularTicket: { price: 50, quantity: 100 },
      standingAreaTicket: { price: 50, quantity: 200 },
    };
    render(<Card card={cardWithSamePrices} />);

    expect(screen.getByTestId('card-regular-price')).toHaveTextContent('$50');
    expect(screen.queryByTestId('card-discount')).not.toBeInTheDocument();
  });

  it('uses default image when concert photo is undefined', () => {
    const cardWithoutPhoto = {
      ...baseCard,
      concertPhoto: undefined,
    };
    render(<Card card={cardWithoutPhoto} />);

    const image = screen.getByTestId('card-image');
    expect(image.getAttribute('src')).toBe('/default-image.jpg');
  });

  it('uses default image when concert photo URL is invalid', () => {
    const cardWithInvalidPhoto = {
      ...baseCard,
      concertPhoto: 'invalid-url',
    };
    render(<Card card={cardWithInvalidPhoto} />);

    const image = screen.getByTestId('card-image');
    expect(image.getAttribute('src')).toBe('/default-image.jpg');
  });

  it('handles absolute URLs for concert photos', () => {
    render(<Card card={baseCard} />);

    const image = screen.getByTestId('card-image');
    expect(image.getAttribute('src')).toBe('https://example.com/photo.jpg');
  });

  it('handles relative URLs for concert photos', () => {
    const cardWithRelativePhoto = {
      ...baseCard,
      concertPhoto: '/images/concert.jpg',
    };
    render(<Card card={cardWithRelativePhoto} />);

    const image = screen.getByTestId('card-image');
    expect(image.getAttribute('src')).toBe('/images/concert.jpg');
  });

  it('uses fallback text for concert name in image alt', () => {
    const cardWithoutName = {
      ...baseCard,
      concertName: undefined,
    };
    render(<Card card={cardWithoutName} />);

    const image = screen.getByTestId('card-image');
    expect(image.getAttribute('alt')).toBe('Concert Image');
  });

  it('navigates to detail page on click', async () => {
    render(<Card card={baseCard} />);

    await act(async () => {
      fireEvent.click(screen.getByTestId('card-container'));
    });

    expect(mockPush).toHaveBeenCalledWith('/detail/test-id');
  });

  it('handles missing price information gracefully', () => {
    const cardWithoutPrices = {
      ...baseCard,
      regularTicket: undefined,
      standingAreaTicket: undefined,
    };
    render(<Card card={cardWithoutPrices} />);

    expect(screen.getByTestId('card-regular-price')).toHaveTextContent('N/A');
  });

  it('shows standing area price when regular ticket is missing', () => {
    const cardWithoutRegularTicket = {
      ...baseCard,
      regularTicket: undefined,
    };
    render(<Card card={cardWithoutRegularTicket} />);

    expect(screen.getByTestId('card-regular-price')).toHaveTextContent('$30');
  });
  it('handles undefined standing area ticket price', () => {
    const cardWithUndefinedStandingPrice = {
      ...baseCard,
      regularTicket: { price: 50, quantity: 100 },
      standingAreaTicket: { price: undefined, quantity: 200 },
    };
    render(<Card card={cardWithUndefinedStandingPrice} />);

    expect(screen.getByTestId('card-regular-price')).toHaveTextContent('$50');
    expect(screen.getByTestId('card-discount')).toHaveTextContent('N/A');
  });
});
