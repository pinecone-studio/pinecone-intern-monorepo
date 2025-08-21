import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MultiSelect, multiSelectVariants } from '../src/components/MultiSelect';
import '@testing-library/jest-dom';

const mockOptions = [
  { value: 'music', label: 'Music' },
  { value: 'sports', label: 'Sports' },
  { value: 'movies', label: 'Movies' },
  { value: 'books', label: 'Books' },
];

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserver;

describe('MultiSelect', () => {
  // Helper to mock onValueChange
  const mockOnValueChange = jest.fn();

  beforeEach(() => {
    mockOnValueChange.mockClear();
  });

  it('renders with placeholder when nothing selected', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    expect(screen.getByText(/Select options/i)).toBeInTheDocument();
  });

  it('renders with custom placeholder', () => {
    render(<MultiSelect options={mockOptions} value={[]} placeholder="Choose items" />);
    expect(screen.getByText(/Choose items/i)).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'inverted'];
    variants.forEach((variant) => {
      render(<MultiSelect options={mockOptions} value={[]} variant={variant} />);
      const trigger = screen.getByTestId('multi-select-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });

  it('renders with different variants', () => {
    const variants = ['default', 'secondary', 'destructive', 'inverted'];
    variants.forEach((variant) => {
      render(<MultiSelect options={mockOptions} value={[]} variant={variant} />);
      const trigger = screen.getByTestId('multi-select-trigger');
      expect(trigger).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    render(<MultiSelect options={mockOptions} value={[]} className="custom-class" />);
    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toHaveClass('custom-class');
  });

  it('respects disabled prop', () => {
    render(<MultiSelect options={mockOptions} value={[]} disabled />);
    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toBeDisabled();
  });

  it('handles custom onClick prop', () => {
    const onClick = jest.fn();
    render(<MultiSelect options={mockOptions} value={[]} onClick={onClick} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(onClick).toHaveBeenCalled();
  });

  it('renders with empty options', () => {
    render(<MultiSelect options={[]} value={[]} />);
    expect(screen.getByText(/Select options/i)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('opens dropdown when button clicked', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));
    expect(screen.getByText('Music')).toBeInTheDocument();
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('toggles options on click and calls onValueChange', () => {
    render(<MultiSelect options={mockOptions} value={[]} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const musicOption = screen.getByText('Music').closest('[role="option"]') || screen.getByText('Music');
    fireEvent.click(musicOption);

    expect(mockOnValueChange).toHaveBeenCalledWith(['music']);

    fireEvent.click(musicOption);
    expect(mockOnValueChange).toHaveBeenCalledWith([]);
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

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Music')).toBeInTheDocument();
  });

  it('clears selected values when Clear is clicked', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'sports']} onValueChange={mockOnValueChange} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const clearButton = screen.getByRole('button', { name: /clear all/i });
    fireEvent.click(clearButton);

    expect(mockOnValueChange).toHaveBeenCalledWith([]);
    expect(screen.getByText(/Select options/i)).toBeInTheDocument();
  });

  it('renders Separator when values are selected', () => {
    render(<MultiSelect options={mockOptions} value={['music']} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    expect(screen.getByRole('separator')).toBeInTheDocument();
  });

  it('closes popover when Close is clicked', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const closeItem = screen.getByText('Close');
    fireEvent.click(closeItem);

    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('toggles all options and clears all when toggleAll is called again', () => {
    render(<MultiSelect options={mockOptions} value={[]} onValueChange={mockOnValueChange} maxCount={10} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    fireEvent.click(screen.getByText('(Select All)'));

    expect(mockOnValueChange).toHaveBeenCalledWith(['music', 'sports', 'movies', 'books']);

    fireEvent.click(screen.getByText('(Select All)'));

    expect(mockOnValueChange).toHaveBeenCalledWith([]);
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
    expect(popover).toBeInTheDocument();
  });

  it('displays CommandEmpty when search yields no results', () => {
    render(<MultiSelect options={mockOptions} value={[]} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.change(input, { target: { value: 'nonexistent' } });

    expect(screen.getByText(/No results found/i)).toBeInTheDocument();
  });

  it('handles invalid values in value prop', () => {
    render(<MultiSelect options={mockOptions} value={['music', 'invalid']} />);
    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger).toHaveTextContent('Music');
    expect(trigger).not.toHaveTextContent('invalid');
  });

  it('handles maxCount of 0 or negative', () => {
    render(<MultiSelect options={mockOptions} value={[]} onValueChange={mockOnValueChange} maxCount={0} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const musicOption = screen.getByText('Music').closest('[role="option"]') || screen.getByText('Music');
    fireEvent.click(musicOption);

    expect(mockOnValueChange).not.toHaveBeenCalled();
  });
});
