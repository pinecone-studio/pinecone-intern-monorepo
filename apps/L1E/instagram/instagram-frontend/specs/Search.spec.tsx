import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchResults from '@/components/search/Search';
import { useGetOthersProfileLazyQuery } from '@/generated';

// Correct mock paths using alias
jest.mock('@/components/search/SearchNoResult', () => {
  const Mock = () => <div data-testid="no-result">No Result</div>;
  Mock.displayName = 'MockSearchNoResult';
  return Mock;
});
jest.mock('@/components/search/SearchResponse', () => {
  const Mock = ({ loading, error }: any) => (
    <div data-testid="search-response">{loading ? 'Loading...' : error ? 'Error' : 'Loaded'}</div>
  );
  Mock.displayName = 'MockSearchResponse';
  return Mock;
});

// Mock the GraphQL hook
jest.mock('@/generated', () => ({
  useGetOthersProfileLazyQuery: jest.fn(),
}));

const mockGetProfiles = jest.fn();

describe('SearchResults', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useGetOthersProfileLazyQuery as jest.Mock).mockReturnValue([
      mockGetProfiles,
      { data: undefined, loading: false, error: undefined },
    ]);
  });

  it('renders search input and headings', () => {
    render(<SearchResults />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
    expect(screen.getByText('Search')).toBeInTheDocument();
    expect(screen.getByText('Recent')).toBeInTheDocument();
    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  it('calls getProfiles when input changes', async () => {
    render(<SearchResults />);
    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'john' } });
    await waitFor(() => {
      expect(mockGetProfiles).toHaveBeenCalledWith({ variables: { userName: 'john' } });
    });
  });

  it('shows search results when data is present', () => {
    (useGetOthersProfileLazyQuery as jest.Mock).mockReturnValue([
      mockGetProfiles,
      {
        data: {
          getProfiles: [
            {
              userName: 'john',
              profileImage: 'john.jpg',
              bio: 'Hello',
            },
          ],
        },
        loading: false,
        error: undefined,
      },
    ]);
    render(<SearchResults />);
    expect(screen.getByText('john')).toBeInTheDocument();
    expect(screen.getByText('Hello')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/john.jpg');
  });

  it('shows no result when no profiles found', () => {
    (useGetOthersProfileLazyQuery as jest.Mock).mockReturnValue([
      mockGetProfiles,
      { data: { getProfiles: [] }, loading: false, error: undefined },
    ]);
    render(<SearchResults />);
    expect(screen.getByTestId('no-result')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    (useGetOthersProfileLazyQuery as jest.Mock).mockReturnValue([
      mockGetProfiles,
      { data: undefined, loading: true, error: undefined },
    ]);
    render(<SearchResults />);
    expect(screen.getByTestId('search-response')).toHaveTextContent('Loading...');
  });

  it('shows error state', () => {
    (useGetOthersProfileLazyQuery as jest.Mock).mockReturnValue([
      mockGetProfiles,
      { data: undefined, loading: false, error: { message: 'Error' } },
    ]);
    render(<SearchResults />);
    expect(screen.getByTestId('search-response')).toHaveTextContent('Error');
  });
});