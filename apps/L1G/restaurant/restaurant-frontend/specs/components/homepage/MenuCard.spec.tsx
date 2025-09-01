import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import MenuCard, { Props } from '@/components/home/MenuCard';

jest.mock('next/image', () => ({
  __esModule: true,
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
  onRemove: jest.fn(),
};

describe('<MenuCard />', () => {
  it('хоолны нэр, үнэ зөв render-лагдана', () => {
    render(<MenuCard {...base} />);

    expect(screen.getByText('Taco')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
  });

  it('card дээр дарахад onAdd зөв аргументаар дуудагдана', () => {
    const handleAdd = jest.fn();
    render(<MenuCard {...base} onAdd={handleAdd} />);

    const img = screen.getByAltText('hool');
    fireEvent.click(img);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith('f1', 'https://via.placeholder.com/150', 'Taco', '15.6');
  });

  it('count > 0 үед overlay дээр тоо харагдана', () => {
    render(<MenuCard {...base} count={3} />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('X icon дээр дарахад onRemove зөв id-тай дуудагдана', () => {
    const handleRemove = jest.fn();
    const { container } = render(<MenuCard {...base} count={2} onRemove={handleRemove} />);

    const xIcon = container.querySelector('svg.lucide-x') || container.querySelector('svg');
    expect(xIcon).toBeTruthy();

    if (xIcon) fireEvent.click(xIcon);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('f1');
  });

  it('formats price >= 1000 with "k" (line 16)', () => {
    const bigPrice: Props = {
      ...base,
      id: 'f2',
      price: '12500',
    };
    render(<MenuCard {...bigPrice} />);

    expect(screen.getByText('12.5k')).toBeInTheDocument();

    const exactThousand: Props = { ...base, id: 'f3', price: '1000' };
    render(<MenuCard {...exactThousand} />);

    expect(screen.getByText('1k')).toBeInTheDocument();
  });
});
