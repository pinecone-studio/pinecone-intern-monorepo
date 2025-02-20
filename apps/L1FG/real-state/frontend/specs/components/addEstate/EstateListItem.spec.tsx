import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import EstateListItem from '@/components/addEstate/assests/EstateListItem';
import { PostStats } from '@/generated';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} />;
  },
}));

describe('EstateListItem', () => {
  const mockPost = {
    _id: '1',
    title: 'Test Estate',
    description: 'Test Description',
    price: '500000',
    status: PostStats.Pending,
    propertyOwnerId: {
      _id: 'owner1',
    },
    propertyDetail: {
      images: ['/test-image.jpg'],
    },
  };

  const mockProps = {
    post: mockPost,
    index: 0,
    onEdit: jest.fn(),
    onDelete: jest.fn(),
    statusStyleMap: {
      PENDING: 'bg-blue-100 text-blue-800',
      APPROVED: 'bg-green-100 text-green-800',
      REJECTED: 'bg-red-100 text-red-800',
    },
    statusLabelMap: {
      PENDING: 'Хүлээгдэж буй',
      APPROVED: 'Зарагдаж байгаа',
      REJECTED: 'Буцаагдсан',
    },
    formatPrice: (price: string) => price,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render estate item with correct data', () => {
    render(<EstateListItem {...mockProps} />);

    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('Test Estate')).toBeInTheDocument();
    expect(screen.getByText('500000₮')).toBeInTheDocument();
    expect(screen.getByText('Хүлээгдэж буй')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', '/test-image.jpg');
  });

  it('should render with placeholder image when no images provided', () => {
    const noImagePost = {
      ...mockPost,
      propertyDetail: {
        images: [],
      },
    };
    render(<EstateListItem {...mockProps} post={noImagePost} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/placeholder.png');
  });

  it('should render with placeholder when first image is null', () => {
    const nullImagePost = {
      ...mockPost,
      propertyDetail: {
        images: [null as unknown as string],
      },
    };
    render(<EstateListItem {...mockProps} post={nullImagePost} />);
    expect(screen.getByRole('img')).toHaveAttribute('src', '/placeholder.png');
  });

  it('should handle all status types and fallbacks', () => {
    // Test PENDING status
    render(<EstateListItem {...mockProps} />);
    expect(screen.getByText('Хүлээгдэж буй')).toHaveClass('bg-blue-100', 'text-blue-800');

    // Test APPROVED status
    const approvedPost = { ...mockPost, status: PostStats.Approved };
    const { rerender } = render(<EstateListItem {...mockProps} post={approvedPost} />);
    expect(screen.getByText('Зарагдаж байгаа')).toHaveClass('bg-green-100', 'text-green-800');

    // Test REJECTED status
    const rejectedPost = { ...mockPost, status: PostStats.Rejected };
    rerender(<EstateListItem {...mockProps} post={rejectedPost} />);
    expect(screen.getByText('Буцаагдсан')).toHaveClass('bg-red-100', 'text-red-800');

    // Test unknown status fallback
    const unknownPost = { ...mockPost, status: 'UNKNOWN' as PostStats };
    rerender(<EstateListItem {...mockProps} post={unknownPost} />);
    expect(screen.getByText('Буцаагдсан')).toHaveClass('bg-red-100', 'text-red-800');
  });

  it('should call onEdit when edit button is clicked', () => {
    render(<EstateListItem {...mockProps} />);
    const editButton = screen.getByTestId('edit-button');
    fireEvent.click(editButton);
    expect(mockProps.onEdit).toHaveBeenCalledWith('1');
  });

  it('should call onDelete when delete button is clicked', () => {
    render(<EstateListItem {...mockProps} />);
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(mockProps.onDelete).toHaveBeenCalledWith('1');
  });
});
