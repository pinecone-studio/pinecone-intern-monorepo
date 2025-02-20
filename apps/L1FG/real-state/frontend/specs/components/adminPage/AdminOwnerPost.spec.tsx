import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { AdminOwnerPostDa } from '@/components/adminPage/AdminOwnerPostDa';
import '@testing-library/jest-dom';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('AdminOwnerPostDa', () => {
  const mockPush = jest.fn();
  const mockRouter = { push: mockPush };

  const mockPosts = [
    {
      _id: '1234567890',
      title: 'Test Property 1',
      status: 'PENDING',
      propertyOwnerId: { _id: 'owner1', name: 'John Doe', phone: '99887766' },
      propertyDetail: { images: ['image1.jpg'] },
    },
    {
      _id: '0987654321',
      title: 'Test Property 2',
      status: 'APPROVED',
      propertyOwnerId: { _id: 'owner2', name: 'Jane Smith', phone: '11223344' },
      propertyDetail: { images: ['image2.jpg'] },
    },
  ];

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<AdminOwnerPostDa posts={mockPosts} />);
    expect(container).toBeTruthy();
  });

  it('displays all posts initially', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    const postItems = screen.getAllByTestId('post-item');
    expect(postItems.length).toBe(mockPosts.length);
  });

  it('filters posts by phone number', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: '9988' } });
    expect(screen.getAllByTestId('post-item').length).toBe(1);
  });

  it('filters posts by status (PENDING)', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.click(screen.getByTestId('status-filter-pending'));
    expect(screen.getAllByTestId('post-item').length).toBe(1);
  });

  it('filters posts by status (APPROVED)', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.click(screen.getByTestId('status-filter-approved'));
  });

  it('filters posts by status (DECLINED)', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.click(screen.getByTestId('status-filter-decliened'));
  });

  it('shows no results when no posts match filters', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: 'nonexistent' } });
    expect(screen.queryByTestId('post-item')).toBeNull();
  });

  it('navigates to detail page when clicking on a post', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.click(screen.getAllByTestId('post-item')[0]);
    expect(mockPush).toHaveBeenCalledWith('/admin/real-estates/1234567890');
  });

  it('displays correct post information in table', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    expect(screen.getByText('John Doe')).toBeTruthy();
    expect(screen.getByText('99887766')).toBeTruthy();
    expect(screen.getByText('Test Property 1')).toBeTruthy();
  });

  it('applies both phone and status filters together', () => {
    render(<AdminOwnerPostDa posts={mockPosts} />);
    fireEvent.change(screen.getByTestId('search-input'), { target: { value: '9988' } });
    fireEvent.click(screen.getByTestId('status-filter-pending'));
    expect(screen.getAllByTestId('post-item').length).toBe(1);
  });

  it('handles empty posts array', () => {
    render(<AdminOwnerPostDa posts={[]} />);
    expect(screen.queryByTestId('post-item')).toBeNull();
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    const { container } = render(<AdminOwnerPostDa posts={mockPosts} />);
    expect(container).toBeTruthy();
  });
});
