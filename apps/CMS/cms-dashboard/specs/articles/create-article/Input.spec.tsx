import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input  from '../../../src/app/articles/_components/create-article/Input';

describe('Create Article Input component', () => {
  it('1. Should render the correct props', () => {
    const mockFunction = jest.fn();
    render(<Input value='test' type='primary' name='test' error='test' helpertext='test' onChange={mockFunction} onBlur={mockFunction}  placeholder="Placeholder"/>);
    const input = screen.getByPlaceholderText('Placeholder');
    expect(input).toBeDefined();
  });

  it('2. calls onChange handler when input value changes', () => {
    const mockFunction = jest.fn();
    render(<Input value='test' type='primary' name='test' error='test' helpertext='test' onChange={mockFunction} onBlur={mockFunction}  placeholder="Placeholder"/>);
    fireEvent.change(screen.getByPlaceholderText('Placeholder'), { target: { value: 'title' } });
    expect(mockFunction).toHaveBeenCalled();
  });
});
