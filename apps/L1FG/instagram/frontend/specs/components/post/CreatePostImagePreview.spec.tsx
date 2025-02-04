import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ImagePreview from '@/components/post/lastCreatePost/ImagePreview';
import { JSX, ClassAttributes, ImgHTMLAttributes } from 'react';

/* eslint-disable */
jest.mock('next/image', () => (props: JSX.IntrinsicAttributes & ClassAttributes<HTMLImageElement> & ImgHTMLAttributes<HTMLImageElement>) => {
  return <img {...props} alt={props.alt} />;
});

describe('ImagePreview Component', () => {
  const mockImages = ['http://test-image-url.com/image.jpg'];

  const renderComponent = (images: string[], loadingPost: boolean) => {
    render(<ImagePreview images={images} loadingPost={loadingPost} />);
  };

  it('should render the image container', () => {
    renderComponent(mockImages, false);

    expect(screen.getByTestId('image-container'));
  });

  it('should display the selected image', () => {
    renderComponent(mockImages, false);

    const selectedImage = screen.getByTestId('selected-image');
    expect(selectedImage).toBeInTheDocument();
    expect(selectedImage).toHaveAttribute('src', mockImages[0]);
    expect(selectedImage).toHaveAttribute('alt', 'Selected image');
  });

  it('should display the loading overlay when loadingPost is true', () => {
    renderComponent(mockImages, true);

    expect(screen.getByTestId('loading-overlay')).toBeInTheDocument();
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('should not display the loading overlay when loadingPost is false', () => {
    renderComponent(mockImages, false);

    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loader')).not.toBeInTheDocument();
  });

  it('should handle an empty images array gracefully', () => {
    renderComponent([], false);

    expect(screen.queryByTestId('selected-image')).not;
  });
});
