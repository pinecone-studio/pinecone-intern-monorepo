import { render, screen } from '@testing-library/react';
import CategoryCarousel from './../src/app/home/_components/CategoryCarousel';
import '@testing-library/jest-dom';


jest.mock('swiper/react', () => {
  return {
    Swiper: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
    SwiperSlide: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  };
});

jest.mock('swiper/css', () => ({}));

describe('CategoryCarousel', () => {
  it('renders section title', () => {
    render(<CategoryCarousel />);
    expect(screen.getByText('Explore by Category')).toBeInTheDocument();
  });

  it('renders at least one category card', () => {
    render(<CategoryCarousel />);
    expect(screen.getByText('Шинээр нэмэгдсэн')).toBeInTheDocument();
  });
});
