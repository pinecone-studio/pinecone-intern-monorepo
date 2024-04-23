import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../src/app/recruiting/_components';
import '@testing-library/jest-dom';

describe('Input', () => {
  it('renders without crashing', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    expect(inputElement).toBeInTheDocument();
  });

  it('displays the correct label and placeholder', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    expect(inputElement.placeholder).toBe('Test Placeholder');
  });
  it('handles changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Test Label" placeholder="Test Placeholder" onChange={handleChange} />);
    const inputElement = screen.getByPlaceholderText('Test Placeholder') as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: 'New Value' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays error text when provided', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" errorText="Error Text" />);
    const errorTextElement = screen.getByText('Error Text');
    expect(errorTextElement).toBeInTheDocument();
  });
});
