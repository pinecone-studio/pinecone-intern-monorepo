import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryCarousel from '@/app/_components/CategoryCarousel';

jest.mock('swiper/react', () => {
  return {
    Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});
jest.mock('swiper/css', () => ({}));

describe('CategoryCarousel', () => {
  it('renders at least one category card', () => {
    render(<CategoryCarousel />);
    expect(screen.getByText('Шинээр нэмэгдсэн')).toBeInTheDocument();
  });
});
