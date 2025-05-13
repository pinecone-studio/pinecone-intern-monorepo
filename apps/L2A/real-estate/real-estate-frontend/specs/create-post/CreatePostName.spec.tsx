import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostName } from '@/app/create-post/_components/CreatePostName';
import '@testing-library/jest-dom';

describe('CreatePostName component', () => {
  const baseProps = {
    name: 'name',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostName {...baseProps} />);
    const input = screen.getByTestId('Name') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('name');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Нэр');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostName {...baseProps} />);
    const input = screen.getByTestId('Name');

    fireEvent.change(input, { target: { value: 'Жишээ нэр' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostName {...baseProps} />);
    const input = screen.getByTestId('Name');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostName {...baseProps} error="Нэр заавал шаардлагатай" />);
    expect(screen.getByText('Нэр заавал шаардлагатай')).toBeInTheDocument();
  });
});
