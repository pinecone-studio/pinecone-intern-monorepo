import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostYear } from '@/app/create-post/_components/CreatePostYear';
import '@testing-library/jest-dom';


describe('CreatePostYear', () => {
  const defaultProps = {
    name: 'year',
    value: 2,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders label and input correctly', () => {
    render(<CreatePostYear {...defaultProps} />);

    expect(screen.getByLabelText('Ашиглалтанд орсон он')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Он бичнэ үү')).toBeInTheDocument();
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostYear {...defaultProps} />);

    const input = screen.getByTestId('year');
    fireEvent.change(input, { target: { value: '3' } });

    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when input loses focus', () => {
    render(<CreatePostYear {...defaultProps} />);

    const input = screen.getByTestId('year');
    fireEvent.blur(input);

    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('should shows error message when error prop is provided', () => {
    render(<CreatePostYear {...defaultProps} error="Алдаа гарлаа" />);

    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });
});
