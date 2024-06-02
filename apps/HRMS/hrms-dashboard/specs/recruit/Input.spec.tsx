import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Input } from '../../src/app/recruiting/_components';

describe('Input', () => {
  it('renders the correct label', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeDefined();
  });

  it('renders the correct placeholder', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    expect(input).toBeDefined();
  });

  it('calls onChange handler when input value changes', () => {
    const handleChange = jest.fn();
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error text when provided', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" errorText="Error message" />);

    const errorText = screen.getByText('Error message');
    expect(errorText).toBeDefined();
  });
  it('displays error text when provided as an array', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" errorText={['Error message 1', 'Error message 2']} />);

    const errorText = screen.getByText('Error message 1, Error message 2');
    expect(errorText).toBeDefined();
  });

  it('displays error text when provided as an object', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" name="test" errorText={{ message1: 'Error message 1', message2: 'Error message 2' }} />);

    const errorText = screen.getByText('Error message 1, Error message 2');
    expect(errorText).toBeDefined();
  });
});
