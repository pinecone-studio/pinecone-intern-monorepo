import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MockedProvider } from '@apollo/client/testing';
import { useRouter } from 'next/navigation';
import DeleteSection from '@/components/addEstate/DeleteSection';
import { DeletePostDocument } from '@/generated';
import { toast } from 'react-toastify';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe('DeleteSection', () => {
  const mockRouter = { push: jest.fn() };
  const mockPostId = 'test-post-id';

  const renderDeleteSection = (mocks = []) => {
    render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <DeleteSection postId={mockPostId} />
      </MockedProvider>
    );
  };

  const getMockByResult = (result) => [
    {
      request: {
        query: DeletePostDocument,
        variables: { id: mockPostId },
      },
      ...result,
    },
  ];

  const successMocks = getMockByResult({
    result: { data: { deletePost: true } },
  });

  const failureMocks = getMockByResult({
    result: { data: { deletePost: false } },
  });

  const errorMocks = getMockByResult({
    error: new Error('An error occurred'),
  });

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders delete button initially', () => {
    renderDeleteSection();
    expect(screen.getByRole('button', { name: /устгах/i })).toHaveAttribute('data-cy', 'delete-post');
  });

  it('shows modal when delete button is clicked', () => {
    renderDeleteSection();
    fireEvent.click(screen.getByRole('button', { name: /устгах/i }));

    expect(screen.getByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /үгүй/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /тийм/i })).toBeInTheDocument();
  });

  it('closes modal when cancel button is clicked', () => {
    renderDeleteSection();
    fireEvent.click(screen.getByRole('button', { name: /устгах/i }));
    fireEvent.click(screen.getByRole('button', { name: /үгүй/i }));

    expect(screen.queryByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).not.toBeInTheDocument();
  });

  it('handles successful deletion', async () => {
    renderDeleteSection(successMocks);
    fireEvent.click(screen.getByRole('button', { name: /устгах/i }));
    fireEvent.click(screen.getByRole('button', { name: /тийм/i }));

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith('Зар амжилттай устгагдлаа');
      expect(mockRouter.push).toHaveBeenCalledWith('/my-estates');
      expect(screen.queryByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).not.toBeInTheDocument();
    });
  });

  it('handles failed deletion', async () => {
    renderDeleteSection(failureMocks);
    fireEvent.click(screen.getByRole('button', { name: /устгах/i }));
    fireEvent.click(screen.getByRole('button', { name: /тийм/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Зар устгахад алдаа гарлаа');
      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(screen.queryByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).not.toBeInTheDocument();
    });
  });

  it('handles mutation error', async () => {
    renderDeleteSection(errorMocks);
    fireEvent.click(screen.getByRole('button', { name: /устгах/i }));
    fireEvent.click(screen.getByRole('button', { name: /тийм/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Зар устгахад алдаа гарлаа');
      expect(mockRouter.push).not.toHaveBeenCalled();
      expect(screen.queryByText('Та энэ зарыг устгахдаа итгэлтэй байна уу?')).not.toBeInTheDocument();
    });
  });
});
