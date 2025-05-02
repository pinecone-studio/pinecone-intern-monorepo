import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ExploreCard from '@/app/home/_components/ExploreCard';

describe('ExploreCard', () => {
  it('renders title and count correctly', () => {
    render(
      <ExploreCard
        title="Орон сууц"
        imageUrl="/listingcard.png"
      />
    );

    expect(screen.getByText('Орон сууц')).toBeInTheDocument();
  });

  it('renders image correctly', () => {
    render(
      <ExploreCard
        title="Байшин"
        imageUrl="/listingcard.png"
      />
    );

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src');
  });
});
