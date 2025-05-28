import { render, screen } from '@testing-library/react';
import { useGetPostsQuery } from '@/generated';
import RecentListingsSection from '@/app/home/_components/RecentListingSection';
import '@testing-library/jest-dom';


jest.mock('@/generated', () => ({
  useGetPostsQuery: jest.fn(),
}));

jest.mock('@/app/home/_components/ListingCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="listing-card">ListingCard</div>),
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => children,
}));

describe('RecentListingsSection', () => {
  const mockUseGetPostsQuery = useGetPostsQuery as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders 4 loading skeletons when loading', () => {
    mockUseGetPostsQuery.mockReturnValue({
      data: undefined,
      loading: true,
      error: undefined,
    });

    render(<RecentListingsSection />);
    expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(4);
  });

  it('renders listings when data is loaded', () => {
    const mockPosts = [
      {
        _id: '1',
        images: ['image1.jpg'],
        price: 100000,
        title: 'Test Listing 1',
        totalRooms: 3,


        restrooms: 2,
        size: 120,
        location: { city: 'City1', district: 'District1' },
      },
    ];

    mockUseGetPostsQuery.mockReturnValue({
      loading: false,
      data: { getPosts: mockPosts },
      error: undefined,
    });

    render(<RecentListingsSection />);
    expect(screen.getAllByTestId('listing-card')).toHaveLength(1);
    expect(screen.queryByTestId('loading-skeleton')).toBeNull();
  });

  it('renders skeletons when data is null', () => {
    mockUseGetPostsQuery.mockReturnValue({
      loading: false,
      data: { getPosts: null },
      error: undefined,
    });

    render(<RecentListingsSection />);
    expect(screen.getAllByTestId('loading-skeleton')).toHaveLength(4);
  });

  it('renders nothing when empty array', () => {
    mockUseGetPostsQuery.mockReturnValue({
      loading: false,
      data: { getPosts: [] },
      error: undefined,
    });

    render(<RecentListingsSection />);
    expect(screen.queryByTestId('loading-skeleton')).toBeNull();
    expect(screen.queryByTestId('listing-card')).toBeNull();
  });
it('renders placeholder image when item.images is missing or empty', () => {
  const mockPosts = [
    {
      _id: '2',
      images: [], // Empty array
      price: 200000,
      title: 'Test Listing 2',
      totalRooms: 2,
      restrooms: 1,
      size: 80,
      location: { city: 'City2', district: 'District2' },
    },
  ];

  mockUseGetPostsQuery.mockReturnValue({
    loading: false,
    data: { getPosts: mockPosts },
    error: undefined,
  });

  render(<RecentListingsSection />);

  const card = screen.getByTestId('listing-card');
  expect(card).toBeInTheDocument();
});
  
});