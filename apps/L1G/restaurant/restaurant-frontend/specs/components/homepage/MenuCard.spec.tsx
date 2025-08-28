import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuCard, { Props } from '@/components/home/MenuCard';

jest.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

const base: Props = {
  id: 'f1',
  image: 'https://via.placeholder.com/150',
  foodName: 'Taco',
  price: '15.6',
  onRemove: jest.fn(), // default onRemove mock өгөөд явуулна
};

describe('MenuCard', () => {
  it('renders food name and price correctly', () => {
    render(<MenuCard {...mockFood} />);
    expect(screen.getByText('Taco')).toBeInTheDocument();
    expect(screen.getByText('15.6')).toBeInTheDocument();
  });

  it('card дээр дарахад onAdd зөв аргументаар дуудагдана', () => {
    const handleAdd = jest.fn();
    render(<MenuCard {...base} onAdd={handleAdd} />);

    const card = screen.getByText('Taco').closest('div')!;
    fireEvent.click(card);

    expect(handleAdd).toHaveBeenCalledWith('f1', 'https://via.placeholder.com/150', 'Taco', '15.6');
  });

  it('shows overlay count when count > 0', () => {
    render(<MenuCard {...mockFood} count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('calls onRemove when X button is clicked', () => {
    const handleRemove = jest.fn();
    render(<MenuCard {...mockFood} count={2} onRemove={handleRemove} />);

    const removeButton = screen.getByRole('img', { hidden: true }); // X icon нь svg тул role=img
    fireEvent.click(removeButton);

    expect(handleRemove).toHaveBeenCalledWith('f1');
  });
});
