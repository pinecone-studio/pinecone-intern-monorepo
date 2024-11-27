import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { ImagesCarousel } from '@/components/admin/assets';
import { ReactNode } from 'react';

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTrigger: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogContent: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogHeader: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogTitle: ({ children }: { children: ReactNode }) => <h2>{children}</h2>,
  DialogDescription: ({ children }: { children: ReactNode }) => <p>{children}</p>,
  DialogFooter: ({ children }: { children: ReactNode }) => <div>{children}</div>,
  DialogClose: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/carousel', () => ({
  Carousel: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel">{children}</div>,
  CarouselContent: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-content">{children}</div>,
  CarouselItem: ({ children }: { children: React.ReactNode }) => <div data-testid="carousel-item">{children}</div>,
  CarouselNext: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="carousel-next" onClick={onClick}>
      Next
    </button>
  ),
  CarouselPrevious: ({ onClick }: { onClick?: () => void }) => (
    <button data-testid="carousel-prev" onClick={onClick}>
      Prev
    </button>
  ),
}));

describe('Admin Images Carousel', () => {
  const mockImages = ['https://example.com/image1.jpg', 'https://example.com/image2.jpg', 'https://example.com/image3.jpg', 'https://example.com/image4.jpg', 'https://example.com/image5.jpg'];
  it('should render the admin images carousel with images', () => {
    render(<ImagesCarousel images={mockImages} />);
  });
  it('tests carousel navigation', () => {
    render(<ImagesCarousel images={mockImages} />);

    fireEvent.click(screen.getByText(`+ ${mockImages.length - 4}`));

    const nextButton = screen.getByTestId('carousel-next');
    fireEvent.click(nextButton);

    const prevButton = screen.getByTestId('carousel-prev');
    fireEvent.click(prevButton);
  });
});
