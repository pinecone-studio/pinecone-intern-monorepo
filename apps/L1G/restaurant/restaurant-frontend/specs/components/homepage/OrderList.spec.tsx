import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderList from '@/components/home/OrderList';

// Next.js Image-г жирийн <img> болгоно
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

// Next.js Image-г жирийн <img> болгоно
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { src, alt, ...rest } = props;
    return <img src={src} alt={alt} {...rest} />;
  },
}));

const baseProps = {
  id: 'food-1',
  image: '/img/buuz.jpg',
  foodName: 'Бууз',
  price: '4500',
  removeItem: jest.fn(),
};

describe('<OrderList />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('нэр, нэгж үнэ, тоо, зураг зөв render-лагдана', () => {
    render(<OrderList {...baseProps} count={3} />);

    // нэр
    expect(screen.getByText('Бууз')).toBeInTheDocument();

    expect(screen.getByText('Бууз')).toBeInTheDocument();

    // нэгж үнэ
    expect(screen.getByText(/Нэгж:\s*4500₮/)).toBeInTheDocument();

    expect(screen.getByText(/Нэгж:\s*4500₮/)).toBeInTheDocument();

    // тоо
    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('3')).toBeInTheDocument();

    // зураг (alt нь хоолны нэртэй тэнцүү)
    // зураг (alt нь хоолны нэртэй тэнцүү)
    const img = screen.getByAltText('Бууз') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('/img/buuz.jpg');
  });

  test("'+’ товч дарахад onAdd зөв аргументаар дуудагдана", () => {
    const handleAdd = jest.fn();
    render(<OrderList {...baseProps} count={2} onAdd={handleAdd} />);

    const plusBtn = screen.getByRole('button', { name: 'Нэмэх' });
    fireEvent.click(plusBtn);

    expect(handleAdd).toHaveBeenCalledTimes(1);
    expect(handleAdd).toHaveBeenCalledWith('food-1', '/img/buuz.jpg', 'Бууз', '4500');
  });

  test("'-’ товч идэвхтэй (count>1) үед onRemove зөв аргументаар дуудагдана", () => {
    const handleRemove = jest.fn();
    render(<OrderList {...baseProps} count={2} onRemove={handleRemove} />);

    const minusBtn = screen.getByRole('button', { name: 'Хасах' });
    expect(minusBtn).toBeEnabled();

    fireEvent.click(minusBtn);

    expect(handleRemove).toHaveBeenCalledTimes(1);
    expect(handleRemove).toHaveBeenCalledWith('food-1', '/img/buuz.jpg', 'Бууз', '4500');
  });

  test("count ≤ 1 үед '-' товч disable бөгөөд дархад onRemove дуудагдахгүй", () => {
    const handleRemove = jest.fn();
    render(<OrderList {...baseProps} count={1} onRemove={handleRemove} />);

    const minusBtn = screen.getByRole('button', { name: 'Хасах' });
    expect(minusBtn).toBeDisabled();

    fireEvent.click(minusBtn);
    expect(handleRemove).not.toHaveBeenCalled();
  });

  test('Устгах (Trash icon) дээр дарахад removeItem зөв id-тай дуудагдана', () => {
    const handleDelete = jest.fn();
    const { container } = render(<OrderList {...baseProps} count={1} removeItem={handleDelete} />);

    // Trash нь <button aria-label="Устгах"> доторх svg тул svg-ийг шууд дарж өгнө
    const trashIcon = container.querySelector('svg.lucide-trash') || container.querySelector('svg');
    expect(trashIcon).toBeTruthy();

    if (trashIcon) fireEvent.click(trashIcon);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith('food-1');
  test('Устгах (Trash icon) дээр дарахад removeItem зөв id-тай дуудагдана', () => {
    const handleDelete = jest.fn();
    const { container } = render(<OrderList {...baseProps} count={1} removeItem={handleDelete} />);

    // Trash нь <button aria-label="Устгах"> доторх svg тул svg-ийг шууд дарж өгнө
    const trashIcon = container.querySelector('svg.lucide-trash') || container.querySelector('svg');
    expect(trashIcon).toBeTruthy();

    if (trashIcon) fireEvent.click(trashIcon);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith('food-1');
  });
});
