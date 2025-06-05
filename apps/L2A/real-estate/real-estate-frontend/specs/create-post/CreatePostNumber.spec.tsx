import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CreatePostNumber } from '@/app/create-post/_components/CreatePostNumber';

describe('CreatePostNumber', () => {
  const defaultProps = {
    name: 'phone',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: undefined,
  };

  it('renders input with correct label', () => {
    render(<CreatePostNumber {...defaultProps} />);
    expect(screen.getByLabelText('Утасны дугаар')).toBeInTheDocument();
  });

  it('renders input with provided value', () => {
    render(<CreatePostNumber {...defaultProps} value="88112233" />);
    expect(screen.getByDisplayValue('88112233')).toBeInTheDocument();
  });

  it('calls onChange when input changes', () => {
    render(<CreatePostNumber {...defaultProps} />);
    const input = screen.getByTestId('floor');
    fireEvent.change(input, { target: { value: '1234' } });
    expect(defaultProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    render(<CreatePostNumber {...defaultProps} />);
    const input = screen.getByTestId('floor');
    fireEvent.blur(input);
    expect(defaultProps.onBlur).toHaveBeenCalledTimes(1);
  });

  it('shows error message when error is provided', () => {
    render(<CreatePostNumber {...defaultProps} error="Алдаа гарлаа" />);
    expect(screen.getByText('Алдаа гарлаа')).toBeInTheDocument();
  });

  it('shows invisible placeholder when no error is provided', () => {
    render(<CreatePostNumber {...defaultProps} />);
    expect(screen.getByText('placeholder')).toHaveClass('invisible');
  });
});
