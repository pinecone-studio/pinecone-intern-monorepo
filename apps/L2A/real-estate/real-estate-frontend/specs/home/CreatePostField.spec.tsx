import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CreatePostField } from '@/app/create-post/_components/CreatePostField';
import '@testing-library/jest-dom';

describe('CreatePostField component', () => {
  const baseProps = {
    name: 'field',
    value: 20,
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  it('renders input with correct props', () => {
    render(<CreatePostField {...baseProps} />);
    const input = screen.getByTestId('field') as HTMLInputElement;

    expect(input).toBeInTheDocument();
    expect(input.name).toBe('field');
    expect(input.value).toBe('20');
    expect(input.placeholder).toBe('Талбай (м2)');
  });

  it('calls onChange when input value changes', () => {
    render(<CreatePostField {...baseProps} />);
    const input = screen.getByTestId('field');
    fireEvent.change(input, { target: { value: '30' } });

    expect(baseProps.onChange).toHaveBeenCalled();
  });

  it('calls onBlur when input loses focus', () => {
    render(<CreatePostField {...baseProps} />);
    const input = screen.getByTestId('field');
    fireEvent.blur(input);

    expect(baseProps.onBlur).toHaveBeenCalled();
  });

  it('displays error message if error prop is provided', () => {
    render(<CreatePostField {...baseProps} error="Талбайн утга буруу байна" />);
    expect(screen.getByText('Талбайн утга буруу байна')).toBeInTheDocument();
  });
});
