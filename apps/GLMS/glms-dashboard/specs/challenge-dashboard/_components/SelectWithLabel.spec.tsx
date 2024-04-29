import React from 'react';
import { render, screen } from '@testing-library/react';
import { SelectWithLabel } from '../../../src/app/challenge-dashboard/_components/SelectWithLabel';

describe('SelectWithLabel', () => {
  const label = 'Choose an option:';
  const options = ['Option 1', 'Option 2', 'Option 3'];
  const selectedOption = 'Option 1';

  const mockOnSelect = jest.fn();

  beforeEach(() => {
    render(<SelectWithLabel label={label} options={options} selectedOption={selectedOption} onSelect={mockOnSelect} />);
  });

  it('should renders the label with correct text', () => {
    const labelElement = screen.getByText(label);
    expect(labelElement).toBeDefined();
  });
});
