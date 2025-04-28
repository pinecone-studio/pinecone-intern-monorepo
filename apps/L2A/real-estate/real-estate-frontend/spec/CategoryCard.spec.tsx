import { render, screen } from '@testing-library/react';
import CategoryCard from '../src/app/home/_components/CategoryCard';
import '@testing-library/jest-dom';

describe('CategoryCard', () => {
  it('renders title and count correctly', () => {
    render(
      <CategoryCard
        title="Шинээр нэмэгдсэн"
        count={1209}
        imageUrl="/listingcard.png"
      />
    );

    expect(screen.getByText('Шинээр нэмэгдсэн')).toBeInTheDocument();
    expect(screen.getByText('1,209')).toBeInTheDocument();
  });

  it('renders the image correctly', () => {
    render(
      <CategoryCard
        title="Хотын төвтэй ойрхон"
        count={850}
        imageUrl="/listingcard.png"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
