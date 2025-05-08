import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostRestroom } from '@/app/create-post/_components/CreatePostRestroom';
import '@testing-library/jest-dom';

describe('CreatePostRestroom', () => {
  const mockProps = {
    name: 'restroom',
    value: 1,
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: '',
  };

  it('should renders label and input correctly', () => {
    render(<CreatePostRestroom {...mockProps} />);

    expect(screen.getByLabelText(/ариун цэврийн өрөө/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Өрөөний тоо')).toBeInTheDocument();
    expect(screen.getByTestId('restroom')).toHaveValue(1);
  });

  it('should calls onChange when input value changes', () => {
    render(<CreatePostRestroom {...mockProps} />);
    const input = screen.getByTestId('restroom');

    fireEvent.change(input, { target: { value: '2' } });
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('should calls onBlur when input is blurred', () => {
    render(<CreatePostRestroom {...mockProps} />);
    const input = screen.getByTestId('restroom');

    fireEvent.blur(input);
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
  });

  it('should displays error message when error is provided', () => {
    render(<CreatePostRestroom {...mockProps} error="Заавал бөглөнө үү" />);
    expect(screen.getByText('Заавал бөглөнө үү')).toBeInTheDocument();
  });
});
