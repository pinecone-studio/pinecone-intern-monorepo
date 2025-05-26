import React from 'react';
import { CreatePostDistrict } from '@/app/create-post/_components/CreatePostDistrict';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostDistrict component', () => {
  const baseProps = {
    name: 'district',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostDistrict {...baseProps} />);
    const input = screen.getByTestId('district') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('district');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Дүүрэг заавал оруулна уу!');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostDistrict {...baseProps} />);
    const input = screen.getByTestId('district');

    fireEvent.change(input, { target: { value: 'Жишээ дүүрэг' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostDistrict {...baseProps} />);
    const input = screen.getByTestId('district');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostDistrict {...baseProps} error="Дүүрэг заавал шаардлагатай" />);
    expect(screen.getByText('Дүүрэг заавал шаардлагатай')).toBeInTheDocument();
  });
});
