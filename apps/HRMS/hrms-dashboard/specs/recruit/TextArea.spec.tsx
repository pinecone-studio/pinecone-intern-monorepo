import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { TextArea } from '../../src/app/recruiting/_components';

describe('TextArea', () => {
  it('calls onChange handler when textarea value changes', () => {
    const handleChange = jest.fn();
    render(<TextArea label="Test Label" placeholder="Test Placeholder" name="test" onChange={handleChange} />);

    fireEvent.change(screen.getByPlaceholderText('Test Placeholder'), { target: { value: 'New value' } });

    expect(handleChange).toHaveBeenCalled();
  });

  it('displays error text when provided', () => {
    render(<TextArea label="Test Label" placeholder="Test Placeholder" name="test" errorText="Error message" />);

    const errorText = screen.getByText('Error message');
    expect(errorText).toBeDefined();
  });
  it('displays error text when provided as an array', () => {
    render(<TextArea label="Test Label" placeholder="Test Placeholder" name="test" errorText={['Error message 1', 'Error message 2']} />);

    const errorText = screen.getByText('Error message 1, Error message 2');
    expect(errorText).toBeDefined();
  });

  it('displays error text when provided as an object', () => {
    render(<TextArea label="Test Label" placeholder="Test Placeholder" name="test" errorText={{ message1: 'Error message 1', message2: 'Error message 2' }} />);

    const errorText = screen.getByText('Error message 1, Error message 2');
    expect(errorText).toBeDefined();
  });
});
