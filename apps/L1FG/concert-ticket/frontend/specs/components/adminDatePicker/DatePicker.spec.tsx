import * as React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { format } from 'date-fns';

import { DatePicker } from '@/components/adminfeature/RangeDatePicker';

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, fromDate }: { onSelect: (_date?: Date) => void; fromDate: Date }) => {
    const testDate = new Date('2024-02-15T00:00:00.000Z');
    const yesterday = new Date('2024-01-31T00:00:00.000Z');
    return (
      <div role="DialogTest">
        <button data-testid="date-15" onClick={() => onSelect(testDate)}>
          15
        </button>
        <button data-testid="yesterday" disabled={yesterday < fromDate} onClick={() => onSelect(yesterday)}>
          {yesterday.getDate()}
        </button>
        <button data-testid="clear-button" onClick={() => onSelect(undefined)}>
          Clear
        </button>
      </div>
    );
  },
}));

describe('DatePicker', () => {
  const mockOnDatesSelect = jest.fn();
  const today = new Date();

  beforeEach(() => {
    mockOnDatesSelect.mockClear();
    jest.useFakeTimers().setSystemTime(today);
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders initial state correctly with no date', () => {
    render(<DatePicker selectedDates={[]} onDatesSelect={mockOnDatesSelect} />);
    expect(screen.getByRole('button')).toHaveTextContent('Өдөр Сонгох');
    expect(screen.getByRole('button')).toHaveClass('text-muted-foreground');
  });

  it('renders initial date from selectedDates prop', () => {
    const date = new Date(2023, 9, 15);
    render(<DatePicker selectedDates={[date]} onDatesSelect={mockOnDatesSelect} />);
    expect(screen.getByRole('button')).toHaveTextContent(format(date, 'PPP'));
    expect(screen.getByRole('button')).not.toHaveClass('text-muted-foreground');
  });

  it('opens calendar popover on button click', () => {
    render(<DatePicker selectedDates={[]} onDatesSelect={mockOnDatesSelect} />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByTestId('clearButton')).toBeInTheDocument();
  });

  it('selects date and updates UI', () => {
    render(<DatePicker selectedDates={[]} onDatesSelect={mockOnDatesSelect} />);

    fireEvent.click(screen.getByTestId('clearButton'));

    fireEvent.click(screen.getByTestId('date-15'));

    const expectedDate = new Date('2024-02-15T00:00:00.000Z');
    expect(mockOnDatesSelect).toHaveBeenCalledWith([expectedDate]);
    expect(screen.getByTestId('clearButton')).toHaveTextContent(format(expectedDate, 'PPP'));
  });

  it('clears date when selected again', () => {
    const date = new Date(2023, 9, 15);
    render(<DatePicker selectedDates={[date]} onDatesSelect={mockOnDatesSelect} />);

    fireEvent.click(screen.getByTestId('clearButton'));
    fireEvent.click(screen.getByText('Clear'));

    expect(mockOnDatesSelect).toHaveBeenCalledWith([]);
    expect(screen.getByTestId('clearButton')).toHaveTextContent('Өдөр Сонгох');
  });

  it('disables past dates', () => {
    render(<DatePicker selectedDates={[]} onDatesSelect={mockOnDatesSelect} />);

    fireEvent.click(screen.getByTestId('clearButton'));

    const pastDateButton = screen.getByTestId('yesterday');
    expect(pastDateButton).toBeDisabled();
  });

  it('maintains internal state when props update', () => {
    const initialDate = new Date('2024-02-15T00:00:00.000Z');
    const { rerender } = render(<DatePicker selectedDates={[initialDate]} onDatesSelect={mockOnDatesSelect} />);

    const newDate = new Date('2024-02-16T00:00:00.000Z');
    rerender(<DatePicker selectedDates={[newDate]} onDatesSelect={mockOnDatesSelect} />);

    expect(screen.getByRole('button')).toHaveTextContent(format(initialDate, 'PPP'));
  });

  it('maintains internal state when props update', () => {
    const initialDate = new Date(2023, 9, 15);
    const { rerender } = render(<DatePicker selectedDates={[initialDate]} onDatesSelect={mockOnDatesSelect} />);

    const newDate = new Date(2023, 9, 16);
    rerender(<DatePicker selectedDates={[newDate]} onDatesSelect={mockOnDatesSelect} />);

    expect(screen.getByRole('button')).toHaveTextContent(format(initialDate, 'PPP'));
  });
});
