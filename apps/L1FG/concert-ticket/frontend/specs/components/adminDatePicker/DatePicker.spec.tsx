import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { DatePicker } from '../../../src/components/adminfeature/RangeDatePicker';
import { format } from 'date-fns';

describe('DatePicker', () => {
  const mockOnDatesSelect = jest.fn();

  beforeEach(() => {
    mockOnDatesSelect.mockClear();
  });

  test('renders with placeholder when no dates are selected', () => {
    render(<DatePicker onDatesSelect={mockOnDatesSelect} />);
    expect(screen.getByText('өдөр сонгох')).toBeInTheDocument();
  });

  test('displays selected dates correctly', () => {
    const selectedDates = [new Date('2024-05-20'), new Date('2024-05-21')];
    render(<DatePicker selectedDates={selectedDates} onDatesSelect={mockOnDatesSelect} />);

    const formattedDates = selectedDates.map((date) => format(date, 'yyyy.MM.dd')).join(', ');
    expect(screen.getByText(formattedDates)).toBeInTheDocument();
  });

  test('opens the calendar popover when the button is clicked', async () => {
    render(<DatePicker onDatesSelect={mockOnDatesSelect} />);

    const button = screen.getByRole('button');
    await userEvent.click(button);

    expect(screen.getByRole('grid')).toBeInTheDocument(); // Calendar grid should be visible
  });

  test('handles undefined selectedDates', () => {
    render(<DatePicker selectedDates={undefined} onDatesSelect={mockOnDatesSelect} />);
    expect(screen.getByText('өдөр сонгох')).toBeInTheDocument();
  });
});
