import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostFloor } from '@/app/create-post/_components/CreatePostFloor';
import '@testing-library/jest-dom';


describe('CreatePostFloor component', () => {
  const baseProps = {
    name: 'floor',
    value: 20,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders input with correct props', () => {
    render(<CreatePostFloor {...baseProps} />);
    const input = screen.getByTestId('floor') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('floor');
    expect(input.value).toBe('20');
    expect(input.placeholder).toBe('Давхар оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostFloor {...baseProps} />);
    const input = screen.getByTestId('floor');
    fireEvent.change(input, { target: { value: '30' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostFloor {...baseProps} />);
    const input = screen.getByTestId('floor');
    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostFloor {...baseProps} error="Давхрын утга буруу байна" />);
    expect(screen.getByText('Давхрын утга буруу байна')).toBeInTheDocument();
  });
});
