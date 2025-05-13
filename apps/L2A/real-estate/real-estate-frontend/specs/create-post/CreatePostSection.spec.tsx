import React from 'react';
import { CreatePostSection } from '@/app/create-post/_components/CreatePostSection';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostSection component', () => {
  const baseProps = {
    name: 'section',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostSection {...baseProps} />);
    const input = screen.getByTestId('section') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('section');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Хороо оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostSection {...baseProps} />);
    const input = screen.getByTestId('section');

    fireEvent.change(input, { target: { value: 'Жишээ хороо' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostSection {...baseProps} />);
    const input = screen.getByTestId('section');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostSection {...baseProps} error="Хороо заавал шаардлагатай" />);
    expect(screen.getByText('Хороо заавал шаардлагатай')).toBeInTheDocument();
  });
});
