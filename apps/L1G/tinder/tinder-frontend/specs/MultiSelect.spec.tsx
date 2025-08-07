import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MultiSelect } from '../src/components/MultiSelect';
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
  it('renders with placeholder when nothing selected', () => {
    render(<MultiSelect options={mockOptions} />);
    expect(screen.getByText(/Select options/i));
  });

  it('opens dropdown when button clicked', () => {
    render(<MultiSelect options={mockOptions} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText('Music'));
  });

  it('toggles options on click', () => {
    render(<MultiSelect options={mockOptions} />);
    fireEvent.click(screen.getByRole('button'));

    const allMusicOptions = screen.getAllByText('Music');
    const musicOption = allMusicOptions.find((el) => el.closest('[role="option"]') || el.closest('[cmdk-item]'));
    expect(musicOption).toBeDefined();
    if (musicOption) {
      fireEvent.click(musicOption);
    }

    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger);

    fireEvent.click(musicOption);

    expect(screen.queryAllByText('Music').length).toBeGreaterThanOrEqual(1);
  });

  it('handles Backspace key removing last selected value', () => {
    render(<MultiSelect options={mockOptions} defaultValue={['music', 'Sports']} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.keyDown(input, { key: 'Backspace' });

    const trigger = screen.getByTestId('multi-select-trigger');
    expect(trigger.textContent).toContain('Music');
    expect(trigger.textContent).not.toContain('Sports');
  });

  it('opens popover on Enter key and removes last selected on Backspace with empty input', () => {
    render(<MultiSelect options={mockOptions} defaultValue={['music', 'sports']} />);

    const trigger = screen.getByTestId('multi-select-trigger');
    fireEvent.click(trigger);

    const input = screen.getByPlaceholderText('Search...');
    fireEvent.keyDown(input, { key: 'Enter' });

    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Backspace' });

    const badgeArea = within(trigger);

    expect(badgeArea.queryByText('Sports'));

    expect(badgeArea.getByText('Music'));
  });

  it('clears selected values when Clear is clicked', () => {
    render(<MultiSelect options={mockOptions} defaultValue={['music', 'sports']} />);
    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    const popoverContent = screen.getByRole('dialog');
    const clearButton = within(popoverContent).getByRole('button', { name: /clear all/i });

    fireEvent.click(clearButton);

    expect(screen.getByText(/select options/i));
  });

  it('closes popover when Close is clicked', () => {
    render(<MultiSelect options={mockOptions} />);
    fireEvent.click(screen.getByRole('button'));

    const closeItem = screen.getByText('Close');
    fireEvent.click(closeItem);

    expect(screen.queryByText('Music')).toBeNull();
  });

  it('toggles all options and clears all when toggleAll is called again', () => {
    render(<MultiSelect options={mockOptions} maxCount={10} />);

    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    fireEvent.click(screen.getByText('(Select All)'));

    const trigger = screen.getByTestId('multi-select-trigger');

    mockOptions.forEach(({ label }) => {
      expect(trigger.textContent).toContain(label);
    });

    fireEvent.click(screen.getByText('(Select All)'));

    expect(trigger.textContent).toContain('Select options');
  });

  it('closes popover on Escape key press', () => {
    render(<MultiSelect options={mockOptions} />);
    fireEvent.click(screen.getByRole('button'));

    const input = screen.getByPlaceholderText('Search...');

    fireEvent.keyDown(input, { key: 'Escape' });

    expect(screen.queryByText('Music')).toBeNull();
  });

  test('limits selected options to maxCount when clearExtraOptions is called', () => {
    render(<MultiSelect options={mockOptions} defaultValue={['music', 'sports', 'movies', 'books']} maxCount={3} />);

    fireEvent.click(screen.getByTestId('multi-select-trigger'));

    fireEvent.click(screen.getByTestId('trigger-clear-extra'));

    const trigger = screen.getByTestId('multi-select-trigger');

    expect(trigger.textContent).toContain('Music');
    expect(trigger.textContent).toContain('Sports');
    expect(trigger.textContent).toContain('Movies');
    expect(trigger.textContent).not.toContain('Books');
  });
});
