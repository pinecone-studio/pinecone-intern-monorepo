import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreviewSection from '@/components/addEstate/PreviewSection';
import { mockCompleteData } from '../utils/preview-section.mock';
import type { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt }: ImageProps) {
    return `<img src="${src}" alt="${alt}" />`;
  },
}));

describe('PreviewSection', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockReset();
  });

  it('should handle null values in preview content', () => {
    const nullData = {
      ...mockCompleteData,
      title: null,
      description: null,
      price: null,
      size: null,
      totalRooms: null,
      restrooms: null,
    };

    render(<PreviewSection formData={nullData} onSubmit={mockOnSubmit} />);

    expect(screen.getByText('0₮')).toBeInTheDocument();
    expect(screen.getByText('0 м²')).toBeInTheDocument();
    expect(screen.getByText('0 өрөө')).toBeInTheDocument();
    expect(screen.getByTestId('restrooms-count')).toHaveTextContent('0 а.ц.ө');
    expect(screen.getAllByText('Мэдээлэл байхгүй')).toHaveLength(2);
  });

  it('should handle edit mode states and transitions', async () => {
    let resolveSubmit: () => void;
    const pendingSubmit = new Promise<void>((resolve) => {
      resolveSubmit = resolve;
    });
    mockOnSubmit.mockImplementationOnce(() => pendingSubmit);

    render(<PreviewSection formData={mockCompleteData} onSubmit={mockOnSubmit} isEdit={true} />);

    const updateButton = screen.getByRole('button', {
      name: 'Зар шинэчлэх',
    });

    expect(updateButton).toHaveAttribute('data-cy', 'update-post');

    fireEvent.click(updateButton);
    expect(screen.getByTestId('submit-button')).toHaveTextContent('Шинэчилж байна...');

    resolveSubmit();

    await waitFor(() => {
      expect(screen.getByTestId('submit-button')).toHaveTextContent('Зар шинэчлэх');
    });
  });

  it('should handle all image navigation scenarios', () => {
    render(
      <PreviewSection
        formData={{
          ...mockCompleteData,
          images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
        }}
        initialIndex={2}
        onSubmit={mockOnSubmit}
      />
    );

    const prevButton = screen.getByRole('button', { name: '<' });
    const nextButton = screen.getByRole('button', { name: '>' });

    expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

    fireEvent.click(nextButton);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');

    fireEvent.click(prevButton);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

    fireEvent.click(nextButton);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    fireEvent.click(nextButton);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('2/3');
    fireEvent.click(prevButton);
    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
  });

  it('should reset currentImageIndex when images array changes', () => {
    const { rerender } = render(
      <PreviewSection
        formData={{
          ...mockCompleteData,
          images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
        }}
        initialIndex={2}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

    rerender(
      <PreviewSection
        formData={{
          ...mockCompleteData,
          images: ['/test1.jpg'],
        }}
        initialIndex={2}
        onSubmit={mockOnSubmit}
      />
    );

    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/1');
  });

  it('should handle error and recovery in submission', async () => {
    const error = new Error('Submit failed');
    mockOnSubmit.mockRejectedValueOnce(error).mockResolvedValueOnce(undefined);

    render(<PreviewSection formData={mockCompleteData} onSubmit={mockOnSubmit} />);

    const submitButton = screen.getByRole('button', {
      name: /зар оруулах хүсэлт илгээх/i,
    });

    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();

    await waitFor(() => {
      expect(submitButton).toBeEnabled();
    });

    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledTimes(2);
    });
  });

  it('should render preview content correctly', () => {
    render(<PreviewSection formData={mockCompleteData} onSubmit={mockOnSubmit} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText(/500000₮/)).toBeInTheDocument();
    expect(screen.getByText('100 м²')).toBeInTheDocument();
    expect(screen.getByText('3 өрөө')).toBeInTheDocument();
    expect(screen.getByText('2 а.ц.ө')).toBeInTheDocument();
    expect(screen.getByTestId('image-counter')).toHaveTextContent('1/2');
  });
});
