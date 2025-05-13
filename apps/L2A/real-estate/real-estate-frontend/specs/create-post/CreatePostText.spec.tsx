import React from 'react';
import { CreatePostText } from '@/app/create-post/_components/CreatePostText';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('CreatePostText', () => {
  const defaultProps = {
    name: 'description',
    value: '',
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('should renders textarea with correct placeholder', () => {
    render(<CreatePostText {...defaultProps} />);
    const textarea = screen.getByTestId('text');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveAttribute('placeholder', 'Дэлгэрэнгүй тайлбар бичнэ үү');
  });

  it('should calls onChange when user types', () => {
    render(<CreatePostText {...defaultProps} />);
    const textarea = screen.getByTestId('text');

    fireEvent.change(textarea, { target: { value: 'Шинэ тайлбар' } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it('should calls onBlur when textarea loses focus', () => {
    render(<CreatePostText {...defaultProps} />);
    const textarea = screen.getByTestId('text');

    fireEvent.blur(textarea);
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  it('should displays error message when error is passed', () => {
    render(<CreatePostText {...defaultProps} error="Тайлбар шаардлагатай" />);
    expect(screen.getByText('Тайлбар шаардлагатай')).toBeInTheDocument();
  });
});
