import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostApartFloor } from '@/app/create-post/_components/CreatePostApartFloor';
import '@testing-library/jest-dom';

describe('CreatePostApartFloor component', () => {
  const baseProps = {
    name: 'aptfloor',
    value: 20,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders input with correct props', () => {
    render(<CreatePostApartFloor {...baseProps} />);
    const input = screen.getByTestId('aptfloor') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('aptfloor');
    expect(input.value).toBe('20');
    expect(input.placeholder).toBe('Барилгын давхар оруулна уу');
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostApartFloor {...baseProps} />);
    const input = screen.getByTestId('aptfloor');
    fireEvent.change(input, { target: { value: '30' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostApartFloor {...baseProps} />);
    const input = screen.getByTestId('aptfloor');
    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message if error prop is provided', () => {
    render(<CreatePostApartFloor {...baseProps} error="Давхрын утга буруу байна" />);
    expect(screen.getByText('Давхрын утга буруу байна')).toBeInTheDocument();
  });
});
