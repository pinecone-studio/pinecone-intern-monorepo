import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostGround } from '@/app/create-post/_components/CreatePostGround';
import '@testing-library/jest-dom';

describe('CreatePostGround component', () => {
  const baseProps = {
    name: 'ground',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostGround {...baseProps} />);
    const input = screen.getByTestId('ground') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('ground');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Шалны загвар оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostGround {...baseProps} />);
    const input = screen.getByTestId('ground');

    fireEvent.change(input, { target: { value: 'Жишээ шал' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostGround {...baseProps} />);
    const input = screen.getByTestId('ground');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it(' should displays error message if error prop is provided', () => {
    render(<CreatePostGround {...baseProps} error="Шалны загвар заавал шаардлагатай" />);
    expect(screen.getByText('Шалны загвар заавал шаардлагатай')).toBeInTheDocument();
  });
});
