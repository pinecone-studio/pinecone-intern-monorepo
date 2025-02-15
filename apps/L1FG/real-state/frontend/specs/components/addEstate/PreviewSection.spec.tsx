import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreviewSection from '@/components/addEstate/PreviewSection';
import { mockCompleteData, mockEmptyData } from '../utils/preview-section.mock';
import type { ImageProps } from 'next/image';

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt }: ImageProps) {
    return `<img src="${src}" alt="${alt}" />`;
  },
}));

describe('PreviewSection', () => {
  describe('Basic Features', () => {
    it('should handle missing data gracefully', () => {
      render(<PreviewSection formData={mockEmptyData} />);
      const missingDataElements = screen.getAllByText('Мэдээлэл байхгүй');
      expect(missingDataElements).toHaveLength(2);
      expect(screen.getByText('0 м²')).toBeInTheDocument();
      expect(screen.getByText('0 өрөө')).toBeInTheDocument();
      expect(screen.getByText('0 а.ц.ө')).toBeInTheDocument();
      expect(screen.getByText('0₮', { exact: false })).toBeInTheDocument();
    });

    it('should render complete data correctly', () => {
      render(<PreviewSection formData={mockCompleteData} />);
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test Description')).toBeInTheDocument();
      expect(screen.getByText('100 м²')).toBeInTheDocument();
      expect(screen.getByText('3 өрөө')).toBeInTheDocument();
      expect(screen.getByText('2 а.ц.ө')).toBeInTheDocument();
      expect(screen.getByText('500000₮', { exact: false })).toBeInTheDocument();
    });
  });

  describe('Button Behavior', () => {
    const mockOnSubmit = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should render update button in edit mode', () => {
      render(<PreviewSection formData={mockCompleteData} onSubmit={mockOnSubmit} isEdit={true} />);
      const updateButton = screen.getByRole('button', { name: 'Зар шинэчлэх' });
      expect(updateButton).toBeInTheDocument();
      expect(updateButton).toHaveAttribute('data-cy', 'update-post');
      fireEvent.click(updateButton);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });

    it('should render submit button in create mode', () => {
      render(<PreviewSection formData={mockCompleteData} onSubmit={mockOnSubmit} isEdit={false} />);
      const submitButton = screen.getByRole('button', { name: 'Зар оруулах хүсэлт илгээх' });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('data-cy', 'submit-post');
      fireEvent.click(submitButton);
      expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('Image Index Management', () => {
    it('should reset index if current index is too large on initial render', () => {
      render(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
          }}
          initialIndex={5}
        />
      );

      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    });

    it('should handle next and previous image navigation', () => {
      render(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
          }}
        />
      );

      const nextButton = screen.getByRole('button', { name: '>' });
      fireEvent.click(nextButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('2/3');

      fireEvent.click(nextButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

      fireEvent.click(nextButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');

      const prevButton = screen.getByRole('button', { name: '<' });
      fireEvent.click(prevButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

      fireEvent.click(prevButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('2/3');

      fireEvent.click(prevButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    });

    it('should reset index if current index is out of bounds after images change', () => {
      const { rerender } = render(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
          }}
        />
      );

      const nextButton = screen.getByRole('button', { name: '>' });
      fireEvent.click(nextButton);
      fireEvent.click(nextButton);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

      rerender(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: [],
          }}
        />
      );

      expect(screen.queryByTestId('image-counter')).not.toBeInTheDocument();
    });

    it('should reset index to 0 if current index is -1 and images are present', () => {
      const { rerender } = render(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
          }}
        />
      );

      rerender(
        <PreviewSection
          formData={{
            ...mockCompleteData,
            images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
          }}
          initialIndex={-1}
        />
      );

      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    });
  });
});