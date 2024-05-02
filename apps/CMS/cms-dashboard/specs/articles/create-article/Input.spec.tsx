import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input  from '../../../src/app/articles/_components/create-article/Input';

describe('Input', () => {
  it('renders the correct placeholder', () => {
    render(<Input placeholder="Placeholder"/>);
    const input = screen.getByPlaceholderText('Placeholder');
    expect(input).toBeDefined();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input placeholder="Placeholder" onChange={handleChange} />);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), { target: { value: 'title' } });
    expect(handleChange).toHaveBeenCalled();
  });
});
