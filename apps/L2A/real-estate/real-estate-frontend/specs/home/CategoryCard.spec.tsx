import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CategoryCard from '@/app/_components/CategoryCard';

describe('CategoryCard', () => {
  it('renders title and count correctly', () => {
    render(
      <CategoryCard
        title="Шинээр нэмэгдсэн"
        imageUrl="/shine.png"
      />
    );

    expect(screen.getByText('Шинээр нэмэгдсэн')).toBeInTheDocument();
  });

  it('renders the image correctly', () => {
    render(
      <CategoryCard
        title="Хотын төвтэй ойрхон"
        imageUrl="/listingcard.png"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
