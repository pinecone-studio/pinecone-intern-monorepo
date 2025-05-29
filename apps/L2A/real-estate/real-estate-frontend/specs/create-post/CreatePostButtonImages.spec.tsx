import { CreatePostButtonImages } from '@/app/create-post/_components/_button/CreatePostButtonImages';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostButtonImages component', () => {
  it('renders placeholder when images is an empty array', () => {
    render(<CreatePostButtonImages images={[]} />);
    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders placeholder when images is undefined (triggers ?? fallback)', () => {
    render(<CreatePostButtonImages />);
    const placeholder = screen.getByTestId('placeholder');
    expect(placeholder).toBeInTheDocument();
  });

  it('renders image and counter when images are provided', () => {
    const images = ['https://example.com/image1.jpg'];
    render(<CreatePostButtonImages images={images} />);

    const img = screen.getByAltText('preview');
    expect(img).toHaveAttribute('src', images[0]);

    const counter = screen.getByText('1/1');
    expect(counter).toBeInTheDocument();
  });

  it('renders correct counter for multiple images', () => {
    const images = ['a.jpg', 'b.jpg', 'c.jpg'];
    render(<CreatePostButtonImages images={images} />);
    const counter = screen.getByText('1/3');
    expect(counter).toBeInTheDocument();
  });
});







