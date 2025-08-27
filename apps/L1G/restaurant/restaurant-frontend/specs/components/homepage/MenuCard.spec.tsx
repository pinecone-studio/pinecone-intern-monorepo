import { render, screen, fireEvent } from '@testing-library/react';
import MenuCard, { Props } from '@/components/home/MenuCard';

// Next.js Image-г жирийн <img> болгоно
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

const mockFood: Props = {
  id: 'f1',
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

  it('calls onAdd when clicked', () => {
    const handleAdd = jest.fn();
    render(<MenuCard {...mockFood} onAdd={handleAdd} />);

    const card = screen.getByText('Taco').closest('div')!;
    fireEvent.click(card);

    expect(handleAdd);
  });

  it('shows overlay count when count > 0', () => {
    render(<MenuCard {...mockFood} count={3} />);
    expect(screen.getByText('3'));
  });
});
