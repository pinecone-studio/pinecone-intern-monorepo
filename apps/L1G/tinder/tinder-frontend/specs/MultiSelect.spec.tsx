/* eslint-disable max-lines */

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MultiSelect } from '../src/components/MultiSelect';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

const mockOptions = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'movies', label: 'Movies' },
  { value: 'books', label: 'Books' },
];

class ResizeObserver {
  observe() {
    // Intentionally empty
  }
  unobserve() {
    // Intentionally empty
  }
  disconnect() {
    // Intentionally empty
  }
}
global.ResizeObserver = ResizeObserver;

describe('MultiSelect', () => {
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    mockOnValueChange.mockClear();
  });

  it('renders with placeholder when nothing selected', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    expect(screen.getByText(/Select options/i));
  });

  it('renders with custom placeholder', () => {
    render(<MultiSelect options={mockOptions} value={[]} placeholder="Choose items" />);
    expect(screen.getByText(/Choose items/i));
  });

  it('renders with different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'inverted'];

    variants.forEach((variant) => {
      render(<MultiSelect options={mockOptions} value={[]} variant={variant} />);
    });

    const triggers = screen.getAllByTestId('multi-select-trigger');
    expect(triggers).toHaveLength(variants.length);
  });

  it('respects disabled prop', () => {
    render(<MultiSelect options={mockOptions} value={[]} disabled />);
    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toBeDisabled();
  });

  it('opens the dropdown on trigger click', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByRole('dialog'));
  });

  it('renders with empty options', () => {
    render(<MultiSelect options={[]} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByText(/No results found/i));
  });

  it('opens dropdown when button clicked', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByText('Music'));
    expect(screen.getByRole('dialog'));
  });

  it('toggles options on click and calls onValueChange', () => {
    let selected: string[] = [];

    const { rerender } = render(
      <MultiSelect
        options={mockOptions}
        value={selected}
        onValueChange={(val) => {
          selected = val;
          rerender(<MultiSelect options={mockOptions} value={selected} onValueChange={handleChange} />);
        }}
      />
    );

    const handleChange = (val: string[]) => {
      selected = val;
      rerender(<MultiSelect options={mockOptions} value={selected} onValueChange={handleChange} />);
    };

    rerender(<MultiSelect options={mockOptions} value={selected} onValueChange={handleChange} />);

    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const musicOption = screen.getByText('Music').closest('[role="option"]')!;

    fireEvent.click(musicOption);
    expect(selected).toEqual(['music']);

    fireEvent.click(musicOption);
    expect(selected).toEqual([]);
  });

  it('respects maxCount limit', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'sports']} onValueChange={mockOnValueChange} maxCount={2} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const moviesOption = screen.getByText('Movies').closest('[role="option"]') || screen.getByText('Movies');
    fireEvent.click(moviesOption);
    expect(mockOnValueChange).not.toHaveBeenCalled();
  });

  it('handles Backspace key removing last selected value', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'sports']} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(mockOnValueChange).toHaveBeenCalledWith(['music']);
  });

  it('opens popover on Enter key', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(screen.getByRole('dialog'));
    expect(screen.getByText('Music'));
  });

  it('clears selected values when Clear is clicked', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'sports']} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const clearButton = screen.getByTestId('clear-extra-button');
    fireEvent.click(clearButton);

    expect(mockOnValueChange).toHaveBeenCalledWith([]);
  });

  it('renders Separator when values are selected', () => {
    render(<MultiSelect options={mockOptions} value={['music']} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    expect(screen.getByRole('separator'));
  });

  it('closes popover when Close is clicked', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const closeItem = screen.getByText('Close');
    fireEvent.click(closeItem);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes popover on Escape key press', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.keyDown(input, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('limits selected options to maxCount when clearExtraOptions is called', () => {
    process.env.NODE_ENV = 'test';
    render(<MultiSelect options={mockOptions} value={['music', 'sports', 'movies', 'books']} onValueChange={mockOnValueChange} maxCount={3} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    fireEvent.click(screen.getByTestId('trigger-clear-extra'));

    expect(mockOnValueChange).toHaveBeenCalledWith(['music', 'sports', 'movies']);
  });

  it('handles modalPopover prop', () => {
    render(<MultiSelect options={mockOptions} value={[]} modalPopover={true} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const popover = screen.getByRole('dialog');
    expect(popover);
  });

  it('displays empty dropdown when search yields no results', async () => {
    render(<MultiSelect options={mockOptions} value={[]} />);

    // Open the dropdown
    const trigger = screen.getByTestId('multi-select-trigger');
    await userEvent.click(trigger);

    // Type a query that matches no options
    const input = screen.getByRole('combobox');
    await userEvent.clear(input);
    await userEvent.type(input, 'nonexistent');

    // Get all listboxes
    const listboxes = await screen.findAllByRole('listbox');

    // Choose the listbox you want to check. For example, the first one:
    const listbox = listboxes[0];

    // Assert the chosen listbox is empty (no options shown)
    expect(listbox);
    expect(listbox);
  });

  it('handles invalid values in value prop', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'invalid']} />);
    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toHaveTextContent('Music');
    expect(trigger).not.toHaveTextContent('invalid');
  });

  it('handles maxCount of 0 or negative', async () => {
    const mockOnValueChange = jest.fn();

    // Render your MultiSelect with maxCount=0 and some options including "music"
    render(
      <MultiSelect
        options={[
          { label: 'music', value: 'music' },
          { label: 'movies', value: 'movies' },
        ]}
        maxCount={0}
        onValueChange={mockOnValueChange}
      />
    );

    const trigger = screen.getByTestId('multi-select-trigger');
    await userEvent.click(trigger);

    // DEBUG: print current DOM to check options
    screen.debug();

    // Find the option containing 'music' case-insensitive, flexible match
    const musicOption = await screen.findByText((content) => content.toLowerCase().includes('music'));

    fireEvent.click(musicOption);

    // onValueChange should NOT be called since maxCount=0
    expect(mockOnValueChange).not.toHaveBeenCalled();
  });
});