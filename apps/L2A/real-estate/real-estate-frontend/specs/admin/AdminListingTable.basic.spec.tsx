import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminListingTable from '@/app/admin/_components/AdminListingTable';
import { useGetPostsQuery } from '@/generated';
import { useRouter } from 'next/navigation';

jest.mock('@/generated', () => ({
  useGetPostsQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
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
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders when error is undefined', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [],
      },
    });
    render(<AdminListingTable />);
    expect(screen.getByText('Зарууд')).toBeInTheDocument();
  });

  it('shows error with message', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: { message: 'Test error' },
    });
    render(<AdminListingTable />);
    expect(screen.getByText(/Error loading posts/)).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });

  it('shows error without message', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: {},
    });
    render(<AdminListingTable />);
    expect(screen.getByText(/Error loading posts/)).toBeInTheDocument();
  });

  it('shows default tab selected', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getPosts: [] },
    });
    render(<AdminListingTable />);
    expect(screen.getByRole('button', { name: 'Хүлээгдэж буй' })).toHaveClass('bg-gray-100');
  });

  it('shows empty message when no posts', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: { getPosts: [] },
    });
    render(<AdminListingTable />);
    fireEvent.click(screen.getByText('Зөвшөөрсөн'));
    expect(await screen.findByText('Энэ төлөвт зар алга.')).toBeInTheDocument();
  });

  it('handles undefined data.getPosts safely', () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: undefined,
    });

    render(<AdminListingTable />);
    expect(screen.getByText('Зарууд')).toBeInTheDocument();
  });

  it('shows search input and pagination', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '1',
            title: 'Test',
            propertyOwnerId: 'Owner',
            number: 1234,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    });
    render(<AdminListingTable />);
    expect(await screen.findByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getByText('Page 1 of 10')).toBeInTheDocument();
    ['«', '‹', '›', '»'].forEach((char) => {
      expect(screen.getByText(char)).toBeInTheDocument();
    });
  });
});
