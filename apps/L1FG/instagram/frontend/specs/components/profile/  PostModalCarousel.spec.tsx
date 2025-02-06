import { render } from '@testing-library/react';
import { UserPostType } from '@/generated';
import PostModalCarousel from '@/components/profile/profilePost/PostModalCarousel';

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

jest.mock('@/components/ui/carousel', () => ({
  __esModule: true,
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: () => <button data-testid="carousel-next">Next</button>,
  CarouselPrevious: () => <button data-testid="carousel-prev">Prev</button>,
}));

describe('PostModalCarousel', () => {
  it('renders images from post props', () => {
    const mockPost: UserPostType = {
      postImage: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
    };

    render(<PostModalCarousel post={mockPost} />);
  });

  it('renders carousel navigation buttons', () => {
    const mockPost: UserPostType = {
      postImage: ['https://example.com/image1.jpg'],
    };

    render(<PostModalCarousel post={mockPost} />);
  });
});
