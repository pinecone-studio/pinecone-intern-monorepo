import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';
import DateRangePicker from '@/app/(main)/_components/CalendarDate';

describe('DateRangePicker', () => {
  const mockHandleDateChange = jest.fn();
  it('1. renders with default date range', () => {
    const mockDate = {
      from: new Date(2025, 9, 19),
      to: new Date(2025, 9, 20),
    };
    render(<DateRangePicker date={mockDate} handleDateChange={mockHandleDateChange} />);
    expect(screen.getByText(/October 19 - October 20/)).toBeInTheDocument();
  });
  it('2. renders with default date range', () => {
    const mockDate = {
      from: new Date(2025, 9, 19),
      to: undefined,
    };
    render(<DateRangePicker date={mockDate} handleDateChange={mockHandleDateChange} />);
    expect(screen.getByText(/October 19/)).toBeInTheDocument();
  });

  it('4. renders with default date range', () => {
    render(<DateRangePicker date={undefined} handleDateChange={mockHandleDateChange} />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('5 .opens the calendar popover on button click', () => {
    const mockDate = {
      from: new Date(2025, 9, 19),
      to: new Date(2025, 9, 20),
    };
    render(<DateRangePicker date={mockDate} handleDateChange={mockHandleDateChange} />);
    const button = screen.getByRole('button', { name: /October 19 - October 20/ });
    fireEvent.click(button);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
