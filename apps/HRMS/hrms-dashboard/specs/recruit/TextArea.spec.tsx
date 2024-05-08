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
});
