import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostWindows } from '@/app/create-post/_components/CreatePostWindows';
import '@testing-library/jest-dom';

describe('CreatePostWindows', () => {
  const defaultProps = {
    name: 'windows',
    value: 2,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders label and input correctly', () => {
    render(<CreatePostWindows {...defaultProps} />);

    expect(screen.getByLabelText('Цонхны тоо')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Цонхны тоо оруулна уу')).toBeInTheDocument();
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostWindows {...defaultProps} />);

    const input = screen.getByTestId('windows');
    fireEvent.change(input, { target: { value: '3' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostWindows {...defaultProps} />);

    const input = screen.getByTestId('windows');
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('should shows error message when error prop is provided', () => {
    render(<CreatePostWindows {...defaultProps} error="Алдаа гарлаа" />);

    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });
});
