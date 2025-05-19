import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminListingTable, { Listing } from '@/app/admin/_components/AdminListingTable';
import { MockedProvider, MockedResponse } from '@apollo/client/testing';
import { GetPostsDocument, GetPostsQuery } from '@/generated';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

const mockListings: Listing[] = [
  {
    id: '0001',
    name: 'Зар #1',
    owner: 'Н.Мөнхтунгалаг',
    phone: '99112233',
    image: '/listingcard.png',
    status: 'Хүлээгдэж буй',
  },
  {
    id: '0002',
    name: 'Зар #2',
    owner: 'Эзэмшигч 2',
    phone: '99114455',
    image: '/listingcard.png',
    status: 'Зөвшөөрсөн',
  },
];

const mocks: MockedResponse<GetPostsQuery>[] = [
  {
    request: {
      query: GetPostsDocument,
    },
    result: {
      data: {
        getPosts: [],
      },
    },
  },
];

const loadingMock: MockedResponse<GetPostsQuery>[] = [
  {
    request: {
      query: GetPostsDocument,
    },
  },
];

const errorMock: MockedResponse<GetPostsQuery>[] = [
  {
    request: {
      query: GetPostsDocument,
    },
    result: {
      data: {
        getPosts: [],
      },
    },
    error: new Error('Mocked error'),
  },
];

const renderWithApollo = (ui: React.ReactNode, customMocks = mocks) =>
  render(
    <MockedProvider mocks={customMocks} addTypename={false}>
      {ui}
    </MockedProvider>
  );

describe('AdminListingTable - Full Coverage', () => {
  it('renders all tab buttons', async () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />);
    expect(await screen.findByText('Хүлээгдэж буй')).toBeInTheDocument();
    expect(screen.getByText('Зөвшөөрсөн')).toBeInTheDocument();
    expect(screen.getByText('Татгалзсан')).toBeInTheDocument();
    expect(screen.getByText('Админ хассан')).toBeInTheDocument();
  });

  it('filters listings by selected tab', async () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />);
    fireEvent.click(await screen.findByText('Зөвшөөрсөн'));
    await waitFor(() => {
      expect(screen.getByText('0002')).toBeInTheDocument();
      expect(screen.queryByText('0001')).not.toBeInTheDocument();
    });
  });

  it('shows empty state when no listings match the tab', async () => {
    renderWithApollo(<AdminListingTable listings={[]} />);
    fireEvent.click(await screen.findByText('Админ хассан'));
    expect(await screen.findByText('Энэ төлөвт зар алга.')).toBeInTheDocument();
  });

  it('navigates to detail page when a row is clicked', async () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />);
    fireEvent.click(await screen.findByText('0001'));
    expect(mockPush).toHaveBeenCalledWith('/admin/details/0001');
  });

  it('renders search input and pagination buttons', async () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />);
    expect(await screen.findByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    expect(screen.getByText('«')).toBeInTheDocument();
    expect(screen.getByText('‹')).toBeInTheDocument();
    expect(screen.getByText('›')).toBeInTheDocument();
    expect(screen.getByText('»')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />, loadingMock);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('shows error state', async () => {
    renderWithApollo(<AdminListingTable listings={mockListings} />, errorMock);
    expect(await screen.findByText(/Error loading posts/)).toBeInTheDocument();
  });
});
