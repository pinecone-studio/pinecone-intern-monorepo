import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostBalcony } from '@/app/create-post/_components/CreatePostBalcony';
import '@testing-library/jest-dom';


describe('CreatePostBalcony component', () => {
  const baseProps = {
    name: 'balcony',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostBalcony {...baseProps} />);
    const input = screen.getByTestId('balcony') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('balcony');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Тагтны тоо оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostBalcony {...baseProps} />);
    const input = screen.getByTestId('balcony');

    fireEvent.change(input, { target: { value: 'Тагтны тоо' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostBalcony {...baseProps} />);
    const input = screen.getByTestId('balcony');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostBalcony {...baseProps} error="Тагтны тоо шаардлагатай" />);
    expect(screen.getByText('Тагтны тоо шаардлагатай')).toBeInTheDocument();
  });
});
