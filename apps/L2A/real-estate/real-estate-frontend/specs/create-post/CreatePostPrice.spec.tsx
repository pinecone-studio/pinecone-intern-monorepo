import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostPrice } from '@/app/create-post/_components/CreatePostPrice';
import '@testing-library/jest-dom';

describe('CreatePostPrice component', () => {
  const baseProps = {
    name: 'price',
    value: 1000000,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostPrice {...baseProps} />);
    const input = screen.getByTestId('price') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('price');
    expect(input.value).toBe('1000000');
    expect(input.placeholder).toBe('Үнэ (₮)');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostPrice {...baseProps} />);
    const input = screen.getByTestId('price');
    fireEvent.change(input, { target: { value: '2000000' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostPrice {...baseProps} />);
    const input = screen.getByTestId('price');
    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostPrice {...baseProps} error="Үнэ оруулах шаардлагатай" />);
    expect(screen.getByText('Үнэ оруулах шаардлагатай')).toBeInTheDocument();
  });
});
