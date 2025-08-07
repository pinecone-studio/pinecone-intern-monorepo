import { render, screen, fireEvent } from '@testing-library/react';
import MenuCard, { CardProps } from '@/components/home/MenuCard';

const mockFood: CardProps = {
  image: 'https://via.placeholder.com/150',
  foodName: 'Taco',
  price: '15.6',
};

describe('MenuCard', () => {
  it('renders food name and price correctly', () => {
    render(<MenuCard {...mockFood} />);
    expect(screen.getByText('Taco'));
    expect(screen.getByText('15.6k'));
  });

  it('increments count and shows overlay when clicked', () => {
    render(<MenuCard {...mockFood} />);

    const card = screen.getByText('Taco').closest('div'); // parent clickable div
    expect(card);

    fireEvent.click(card!);

    // дарагдсаны дараа count 1 болж харагдана
    expect(screen.getByText('1'));
  });

  it('increments count on multiple clicks', () => {
    render(<MenuCard {...mockFood} />);
    const card = screen.getByText('Taco').closest('div')!;

    fireEvent.click(card);
    fireEvent.click(card);
    fireEvent.click(card);

    expect(screen.getByText('3')); // 3 удаа дарсан
  });
});
