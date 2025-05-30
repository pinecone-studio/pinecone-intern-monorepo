import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostTitle } from '@/app/create-post/_components/CreatePostTitle';
import '@testing-library/jest-dom';

describe('CreatePostTitle', () => {
  const mockProps = {
    title: 'user-name',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
    error: '',
  };

  it('renders input and label correctly', () => {
    render(<CreatePostTitle {...mockProps} />);
    expect(screen.getByLabelText(/Нэр/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Нэр/i)).toBeInTheDocument();
    expect(screen.getByTestId('Name')).toBeInTheDocument();
  });

  it('displays an error message if error is provided', () => {
    render(<CreatePostTitle {...mockProps} error="Required field" />);
    expect(screen.getByText('Required field')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    render(<CreatePostTitle {...mockProps} />);
    const input = screen.getByTestId('Name');
    fireEvent.change(input, { target: { value: 'John' } });
    expect(mockProps.onChange).toHaveBeenCalledTimes(1);
  });

  it('calls onBlur when input loses focus', () => {
    render(<CreatePostTitle {...mockProps} />);
    const input = screen.getByTestId('Name');
    fireEvent.blur(input);
    expect(mockProps.onBlur).toHaveBeenCalledTimes(1);
  });

  it('uses the "title" prop as the input id and title attribute', () => {
    render(<CreatePostTitle {...mockProps} />);
    const input = screen.getByTestId('Name');
    expect(input).toHaveAttribute('id', mockProps.title);
    expect(input).toHaveAttribute('title', mockProps.title);
  });
});
