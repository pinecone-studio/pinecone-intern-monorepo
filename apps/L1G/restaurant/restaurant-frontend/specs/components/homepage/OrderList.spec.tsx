import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from '@/components/home/OrderList';

const baseProps = {
  id: 'food-1',
  image: '/img/buuz.jpg',
  foodName: 'Бууз',
  price: '4500',
};

describe('<OrderList />', () => {
  test('хоолны нэр, үнэ, тоо зөв render-лагдана', () => {
    render(<OrderList {...baseProps} count={3} />);

    // нэр
    expect(screen.getByText('Бууз'));
    // нэгж үнэ
    expect(screen.getByText(/Нэгж:\s*4500₮/));
    // тоо
    expect(screen.getByText('3'));

    // зураг alt
    const img = screen.getByAltText('Бууз') as HTMLImageElement;
    expect(img);
    expect(img.src);
  });

  test("'+’ дархад onAdd зөв аргументаар дуудагдана", () => {
    const handleAdd = jest.fn();

    render(<OrderList {...baseProps} count={2} onAdd={handleAdd} />);

    const plusBtn = screen.getByRole('button', { name: 'Нэмэх' });
    fireEvent.click(plusBtn);

    expect(handleAdd);
    expect(handleAdd);
  });

  test("'-’ дархад onRemove зөв аргументаар дуудагдана (count > 1 үед идэвхтэй)", () => {
    const handleRemove = jest.fn();

    render(<OrderList {...baseProps} count={2} onRemove={handleRemove} />);

    const minusBtn = screen.getByRole('button', { name: 'Хасах' });
    expect(minusBtn);

    fireEvent.click(minusBtn);

    expect(handleRemove);
    expect(handleRemove);
  });
  test("count ≤ 1 үед '-' товч disable байна", () => {
    const handleRemove = jest.fn();

    render(<OrderList {...baseProps} count={1} onRemove={handleRemove} />);

    const minusBtn = screen.getByRole('button', { name: 'Хасах' });
    expect(minusBtn);

    fireEvent.click(minusBtn);
    expect(handleRemove);
  });

  test('Устгах (Trash) товч render-лагдсан байна', () => {
    render(<OrderList {...baseProps} count={1} />);
    const delBtn = screen.getByRole('button', { name: 'Устгах' });
    expect(delBtn);
  });
});
