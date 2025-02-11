import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Images } from '@/components/admin/add-hotel';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt || 'Hotel Image'} {...rest} />;
  },
}));

describe('Images Component', () => {
  const mockSetImages = jest.fn();
  const mockHandleEditHotelImages = jest.fn();

  const images = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg', 'https://example.com/image4.jpg', 'https://example.com/image5.jpg'];

  const defaultProps = {
    images,
    setImages: mockSetImages,
    handleEditHotelImages: mockHandleEditHotelImages,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders images when they are provided', () => {
    render(<Images {...defaultProps} />);

    // Check if the first image is rendered correctly
    const firstImage = screen.getByAltText('Hotel Image');
    expect(firstImage).toBeInTheDocument();
    expect(firstImage).toHaveAttribute('src', images[0]);

    // Check if the other images are rendered in the grid
    const gridImages = screen.getAllByAltText(/Hotel Image \d+/);
    expect(gridImages).toHaveLength(4);
    gridImages.forEach((img, index) => {
      expect(img).toHaveAttribute('src', images[index + 1]);
    });
  });

  test('renders "No Photos Uploaded" message when no images are provided', () => {
    render(<Images {...defaultProps} images={[]} />);

    // Check if the "No Photos Uploaded" message and icon are displayed
    expect(screen.getByText('No Photos Uploaded')).toBeInTheDocument();
    expect(screen.getByText('Add photos of your rooms, amenities, or property to showcase your hotel.')).toBeInTheDocument();

    // Check for SVG element
    const svgElement = document.querySelector('svg');
    expect(svgElement).toBeInTheDocument();
  });

  test('opens the ImagesDialog when the edit button is clicked', async () => {
    render(<Images {...defaultProps} />);

    // Mock the dialog implementation
    const editButton = screen.getByRole('button', { name: 'Edit' });
    editButton.onclick = mockHandleEditHotelImages;

    // Click the button
    editButton.click();

    // Check if the handleEditHotelImages function was called
    expect(mockHandleEditHotelImages).toHaveBeenCalledTimes(1);
  });
});
