import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostDoor } from '@/app/create-post/_components/CreatePostDoor';
import '@testing-library/jest-dom';


describe('CreatePostDoor component', () => {
  const baseProps = {
    name: 'door',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders input with correct props', () => {
    render(<CreatePostDoor {...baseProps} />);
    const input = screen.getByTestId('door') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('door');
    expect(input.value).toBe('');
    expect(input.placeholder).toBe('Хаалганы загвар аа оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostDoor {...baseProps} />);
    const input = screen.getByTestId('door');

    fireEvent.change(input, { target: { value: 'Жишээ хаалга' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostDoor {...baseProps} />);
    const input = screen.getByTestId('door');

    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it(' should displays error message if error prop is provided', () => {
    render(<CreatePostDoor {...baseProps} error="Хаалганы загвар заавал шаардлагатай" />);
    expect(screen.getByText('Хаалганы загвар заавал шаардлагатай')).toBeInTheDocument();
  });
});
