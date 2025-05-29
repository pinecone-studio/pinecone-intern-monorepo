import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RelatedListings from '@/app/detailed/_components/RelatedListings';

jest.mock('@/app/_components/ListingCard', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => <div>{title}</div>,
}));

describe('RelatedListings', () => {
  const mockPosts = [
    {
      _id: '1',
      title: 'Зар 1',
      price: 100000,
      totalRooms: 2,
      restrooms: 1,
      size: 55,
      images: ['img1.jpg'],
      location: { city: 'УБ', district: 'Баянзүрх' },
    },
    {
      _id: '2',
      title: 'Зар 2',
      price: 200000,
      totalRooms: 3,
      restrooms: 2,
      size: 75,
      images: [],
      location: { city: 'УБ', district: 'Хан-Уул' },
    },
  ];

  it('renders the section heading', () => {
    render(<RelatedListings posts={mockPosts} />);
    expect(screen.getByText('Төстэй зарууд')).toBeInTheDocument();
  });

  it('renders a grid of ListingCards from posts', () => {
    render(<RelatedListings posts={mockPosts} />);
    expect(screen.getByText('Зар 1')).toBeInTheDocument();
    expect(screen.getByText('Зар 2')).toBeInTheDocument();
  });

  it('renders empty grid without error if posts is undefined', () => {
    render(<RelatedListings posts={undefined} />);
    expect(screen.getByTestId('listing-Grid').children.length).toBe(0);
  });
});
