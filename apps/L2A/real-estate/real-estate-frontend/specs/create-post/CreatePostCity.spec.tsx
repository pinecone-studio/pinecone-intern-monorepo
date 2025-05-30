import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostCity } from '@/app/create-post/_components/CreatePostCity';
import '@testing-library/jest-dom';


describe('CreatePostCity', () => {
  const defaultProps = {
    name: 'city',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: '',
  };

  it('renders label and input correctly', () => {
    render(<CreatePostCity {...defaultProps} />);
    expect(screen.getByLabelText(/Хот/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Хот заавал оруулна уу!/i)).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<CreatePostCity {...defaultProps} error="Field is required" />);
    expect(screen.getByText('Field is required')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    render(<CreatePostCity {...defaultProps} />);
    const input = screen.getByTestId('City');
    fireEvent.change(input, { target: { value: 'Ulaanbaatar' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    render(<CreatePostCity {...defaultProps} />);
    const input = screen.getByTestId('City');
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
  });
});
