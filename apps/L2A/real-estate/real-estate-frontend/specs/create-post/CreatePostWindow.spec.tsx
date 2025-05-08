import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostWindow } from '@/app/create-post/_components/CreatePostWindow';
import '@testing-library/jest-dom';


describe('CreatePostWindow', () => {
  const defaultProps = {
    name: 'window',
    value: 2,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders label and input correctly', () => {
    render(<CreatePostWindow {...defaultProps} />);

    expect(screen.getByLabelText('Цонхны тоо')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Цонхны тоо оруулна уу')).toBeInTheDocument();
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostWindow {...defaultProps} />);

    const input = screen.getByTestId('window');
    fireEvent.change(input, { target: { value: '3' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostWindow {...defaultProps} />);

    const input = screen.getByTestId('window');
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('should shows error message when error prop is provided', () => {
    render(<CreatePostWindow {...defaultProps} error="Алдаа гарлаа" />);

    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });
});
