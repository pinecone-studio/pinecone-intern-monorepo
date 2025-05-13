import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostRoom } from '@/app/create-post/_components/CreatePostRoom';
import '@testing-library/jest-dom';

describe('CreatePostRoom', () => {
  const defaultProps = {
    name: 'room',
    value: 2,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders label and input correctly', () => {
    render(<CreatePostRoom {...defaultProps} />);

    expect(screen.getByLabelText('Өрөө')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Өрөөний тоо')).toBeInTheDocument();
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostRoom {...defaultProps} />);

    const input = screen.getByTestId('room');
    fireEvent.change(input, { target: { value: '3' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostRoom {...defaultProps} />);

    const input = screen.getByTestId('room');
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('should shows error message when error prop is provided', () => {
    render(<CreatePostRoom {...defaultProps} error="Алдаа гарлаа" />);

    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });
});
