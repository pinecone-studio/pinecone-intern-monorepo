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

describe('AdminListingTable - Filters & interaction', () => {
  const mockUseQuery = useGetPostsQuery as jest.Mock;
  const mockPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    jest.clearAllMocks();
  });

   it('filters and switches tabs correctly', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '1',
            title: 'Pending',
            propertyOwnerId: 'O1',
            number: 1,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
          },
          {
            _id: '2',
            title: 'Approved',
            propertyOwnerId: 'O2',
            number: 2,
            status: 'APPROVED',
            createdAt: '',
            updatedAt: '',
          },
          {
            _id: '3',
            title: 'Rejected',
            propertyOwnerId: 'O3',
            number: 3,
            status: 'DECLINED',
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    });

    render(<AdminListingTable />);

    fireEvent.click(screen.getByText('Зөвшөөрсөн'));
    expect(await screen.findByText('Approved')).toBeInTheDocument(); 

    fireEvent.click(screen.getByText('Татгалзсан'));
    expect(await screen.findByText('Rejected')).toBeInTheDocument(); 

    fireEvent.click(screen.getByText('Админ хассан'));
    expect(await screen.findByText('Энэ төлөвт зар алга.')).toBeInTheDocument(); 
  });

  it('navigates to detail page on row click', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '99',
            title: 'Clickable',
            propertyOwnerId: 'O99',
            number: 9999,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    });

    render(<AdminListingTable />);
    fireEvent.click(await screen.findByText('Clickable'));
    expect(mockPush).toHaveBeenCalledWith('/admin/details/99');
  });

  it('navigates to detail page on row click', async () => {
    mockUseQuery.mockReturnValue({
      loading: false,
      error: undefined,
      data: {
        getPosts: [
          {
            _id: '99',
            title: 'Clickable',
            propertyOwnerId: 'O99',
            number: 9999,
            status: 'PENDING',
            createdAt: '',
            updatedAt: '',
          },
        ],
      },
    });

    render(<AdminListingTable />);
    fireEvent.click(await screen.findByText('99'));
    expect(mockPush).toHaveBeenCalledWith('/admin/details/99');
  });
});
