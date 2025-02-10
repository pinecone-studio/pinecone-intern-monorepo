import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PreviewSection from '@/components/addEstate/PreviewSection';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

const mockEmptyData = {
  title: '',
  address: '',
  size: '',
  totalRooms: '',
  restrooms: '',
  price: '',
  images: [],
};

const mockCompleteData = {
  title: 'Test Title',
  address: 'Test Address',
  size: '100',
  totalRooms: '3',
  restrooms: '2',
  price: '500000',
  images: ['/image1.jpg', '/image2.jpg'],
};

describe('PreviewSection', () => {
  describe('Data Display', () => {
    it('should handle missing data gracefully', () => {
      render(<PreviewSection key={'preview-section'} formData={mockEmptyData} />);

      const missingDataElements = screen.getAllByText('Мэдээлэл байхгүй');
      expect(missingDataElements).toHaveLength(2);

      expect(screen.getByText('0 м²')).toBeInTheDocument();
      expect(screen.getByText('0 өрөө')).toBeInTheDocument();
      expect(screen.getByText('0 а.ц.ө')).toBeInTheDocument();
      expect(screen.getByText('0₮', { exact: false })).toBeInTheDocument();
    });

    it('should render complete data correctly', () => {
      render(<PreviewSection key={'preview-section'} formData={mockCompleteData} />);

      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('100 м²')).toBeInTheDocument();
      expect(screen.getByText('3 өрөө')).toBeInTheDocument();
      expect(screen.getByText('2 а.ц.ө')).toBeInTheDocument();
      expect(screen.getByText('500000₮', { exact: false })).toBeInTheDocument();
    });
  });
  describe('Image Navigation', () => {
    it('should reset index when images array changes', () => {
      const initialData = {
        ...mockCompleteData,
        images: ['/test1.jpg', '/test2.jpg'],
      };

      const { rerender } = render(<PreviewSection formData={initialData} />);

      const newData = {
        ...mockCompleteData,
        images: ['/new1.jpg', '/new2.jpg', '/new3.jpg'],
      };

      rerender(<PreviewSection formData={newData} />);
      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    });
    describe('Image Index Reset', () => {
      it('should reset to index 0 when empty array becomes non-empty', () => {
        // Start with empty images
        const initialData = {
          ...mockCompleteData,
          images: [],
        };

        const { rerender } = render(<PreviewSection formData={initialData} />);

        // Add images to trigger useEffect
        const newData = {
          ...mockCompleteData,
          images: ['/image1.jpg', '/image2.jpg'],
        };

        rerender(<PreviewSection formData={newData} />);

        // Verify counter shows first image
        const counter = screen.getByTestId('image-counter');
        expect(counter).toHaveTextContent('1/2');
      });
    });
    it('should handle wraparound navigation', () => {
      const testData = {
        ...mockCompleteData,
        images: ['/test1.jpg', '/test2.jpg', '/test3.jpg'],
      };

      render(<PreviewSection formData={testData} />);

      // Test backward wrap
      fireEvent.click(screen.getByRole('button', { name: '<' }));
      expect(screen.getByTestId('image-counter')).toHaveTextContent('3/3');

      // Test forward wrap
      fireEvent.click(screen.getByRole('button', { name: '>' }));
      expect(screen.getByTestId('image-counter')).toHaveTextContent('1/3');
    });
  });
  describe('Image Carousel', () => {
    it('should handle multiple images with navigation', () => {
      render(<PreviewSection key={'preview-section'} formData={mockCompleteData} />);

      expect(screen.getByAltText('Uploaded 1')).toBeInTheDocument();
      expect(screen.getByText('1/2')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '<' })).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: '>' }));
      expect(screen.getByText('2/2')).toBeInTheDocument();
    });

    it('should handle empty images array', () => {
      render(<PreviewSection key={'preview-section'} formData={mockEmptyData} />);

      expect(screen.queryByRole('button', { name: '>' })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: '<' })).not.toBeInTheDocument();
      expect(screen.queryByAltText('Uploaded 1')).not.toBeInTheDocument();
    });
  });

  describe('Submit Button', () => {
    it('should render submit button', () => {
      render(<PreviewSection key={'preview-section'} formData={mockEmptyData} />);

      const submitButton = screen.getByText('Зар оруулах хүсэлт илгээх');
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });
});
