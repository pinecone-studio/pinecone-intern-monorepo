import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { useConcertsQuery } from '@/generated';
import RecommendConcert from '@/app/event/[id]/_components/RecommendConcert';

jest.mock('@/generated', () => ({
  useConcertsQuery: jest.fn(),
}));

jest.mock('@/app/_components/LoadingText', () => ({
  __esModule: true,
  default: () => <div data-testid="loading-text">Loading...</div>,
}));

jest.mock('@/app/_components/ConcertCard', () => ({
  __esModule: true,
  default: ({ concert }: { concert: { id: string } }) => <div data-testid="concert-card">{concert.id}</div>,
}));

describe('RecommendConcert', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders loading state', () => {
    (useConcertsQuery as jest.Mock).mockReturnValue({ data: undefined, loading: true });
    render(<RecommendConcert />);
    expect(screen.getByTestId('loading-text')).toBeInTheDocument();
  });

  it('renders list of concerts when data is available', () => {
    const concerts = Array.from({ length: 8 }, (_, i) => ({ id: `concert-${i}`, name: `Concert ${i}` }));
    (useConcertsQuery as jest.Mock).mockReturnValue({ data: { concerts }, loading: false });

    render(<RecommendConcert />);

    expect(screen.getByText('Холбоотой эвент болон тоглолтууд')).toBeInTheDocument();

    const cards = screen.getAllByTestId('concert-card');
    expect(cards).toHaveLength(6);
    expect(cards[0]).toHaveTextContent('concert-0');
    expect(cards[5]).toHaveTextContent('concert-5');
  });

  it('renders empty state when no concerts', () => {
    (useConcertsQuery as jest.Mock).mockReturnValue({ data: { concerts: [] }, loading: false });
    render(<RecommendConcert />);
    expect(screen.getByText('Концерт алга')).toBeInTheDocument();
  });

  it('renders error state when data.concerts is undefined', () => {
    (useConcertsQuery as jest.Mock).mockReturnValue({ data: {}, loading: false });
    render(<RecommendConcert />);
    expect(screen.getByText('Алдаа')).toBeInTheDocument();
  });

  it('has the dashboard test id on the root container', () => {
    (useConcertsQuery as jest.Mock).mockReturnValue({ data: { concerts: [] }, loading: false });
    const { container } = render(<RecommendConcert />);
    expect(container.querySelector('[data-testid="dashboard"]')).toBeInTheDocument();
  });
});
