import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultiSelect } from '../src/components/MultiSelect';

const mockOptions = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
];

describe('MultiSelect', () => {
  it('renders with placeholder', () => {
    render(<MultiSelect options={mockOptions} />);
    expect(screen.getByText(/Select options/i));
  });

  it('opens dropdown when clicked', () => {
    render(<MultiSelect options={mockOptions} />);
    const trigger = screen.getByRole('button');
    fireEvent.click(trigger);
    expect(screen.getByText('Music'));
  });
});
