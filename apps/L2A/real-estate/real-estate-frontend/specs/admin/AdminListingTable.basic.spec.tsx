import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminListingTable from '@/app/admin/_components/AdminListingTable';
import { useGetPostsQuery } from '@/generated';
import { useRouter } from 'next/navigation';

jest.mock('@/generated', () => ({ useGetPostsQuery: jest.fn() }));
jest.mock('next/navigation', () => ({ useRouter: jest.fn() }));
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || 'mock-image'} />;
  },
}));
describe('AdminListingTable - Basic rendering', () => {
  const mockUseQuery = useGetPostsQuery as jest.Mock;
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: jest.fn() });
    jest.clearAllMocks();
  });

  it('shows loading state', () => {
    mockUseQuery.mockReturnValue({ loading: true });
    render(<AdminListingTable />);
    expect(screen.getByText('Уншиж байна...')).toBeInTheDocument();
  });

  it('renders when error is undefined', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: undefined, data: { getPosts: [] } });
    render(<AdminListingTable />);
    expect(screen.getByText('Зарууд')).toBeInTheDocument();
  });

  it('shows error with message', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: { message: 'Test error' } });
    render(<AdminListingTable />);
    expect(screen.getByText(/Error loading posts/)).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('shows error without message', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: {} });
    render(<AdminListingTable />);
    expect(screen.getByText(/Error loading posts/)).toBeInTheDocument();
  });

  it('shows default tab selected', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: undefined, data: { getPosts: [] } });
    render(<AdminListingTable />);
    expect(screen.getByRole('button', { name: 'Хүлээгдэж буй' })).toHaveClass('bg-gray-100');
  });

  it('shows empty message when no posts', async () => {
    mockUseQuery.mockReturnValue({ loading: false, error: undefined, data: { getPosts: [] } });
    render(<AdminListingTable />);
    fireEvent.click(screen.getByText('Зөвшөөрсөн'));
    expect(await screen.findByText('Энэ төлөвт зар алга.')).toBeInTheDocument();
  });

  it('handles undefined data.getPosts safely', () => {
    mockUseQuery.mockReturnValue({ loading: false, error: undefined, data: undefined });
    render(<AdminListingTable />);
    expect(screen.getByText('Зарууд')).toBeInTheDocument();
  });

  it('renders image from listing.images if provided', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '1',
            title: 'Test listing',
            propertyOwnerId: 'owner-id',
            number: 9999,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
            images: ['/custom-image.jpg'],
          },
        ],
      },
    });
    render(<AdminListingTable />);
    const img = screen.getByAltText('thumb') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/custom-image.jpg');
  });

  it('renders fallback image when listing.images is undefined', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '2',
            title: 'Fallback listing',
            propertyOwnerId: 'owner2',
            number: 8888,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
            images: [],
          },
        ],
      },
    });
    render(<AdminListingTable />);
    const img = screen.getByAltText('thumb') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toMatch(/placeholder\.png/);
  });

  it('navigates to detail page when row is clicked', () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '123',
            title: 'Test listing',
            propertyOwnerId: 'owner-id',
            number: 9999,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
            images: ['/img.jpg'],
          },
        ],
      },
    });
    render(<AdminListingTable />);
    const row = screen.getByText('Test listing').closest('tr');
    expect(row).toBeInTheDocument();
    fireEvent.click(row!);
    expect(mockPush).toHaveBeenCalledWith('/admin/details/123');
  });
});
