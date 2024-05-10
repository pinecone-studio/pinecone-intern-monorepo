import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../../../src/app/articles/_components/create-article/Input';

describe('Create Article Input component', () => {
  it('1. Should render the correct props', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<Input value="test" type="primary" name="test" error="test" helpertext="test" onChange={mockFunction} onBlur={mockFunction} placeholder="Placeholder" />);
    const input = screen.getByPlaceholderText('Placeholder');
    const helperText = getByTestId('helperText');
    expect(input).toBeDefined();
    expect(helperText.textContent).toMatch('');
  });

  it('2. calls onChange handler when input value changes', () => {
    const mockFunction = jest.fn();
    const { getByTestId } = render(<Input value="test" type="primary" name="test" error="test" helpertext="test" onChange={mockFunction} onBlur={mockFunction} placeholder="Placeholder" />);
    const input = getByTestId('title');
    fireEvent.change(input, { target: { value: 'content' } });
    expect(mockFunction).toHaveBeenCalled();
  });
});
