/**
 * @jest-environment jsdom
 */
'use client';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePickerAdmin } from '@/components/DatePickerAdmin';

describe('DatePickerAdmin', () => {
  const mockOnDateChange = jest.fn();
  const mockSelectedDate = new Date('2024-01-01');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(<DatePickerAdmin selectedDate={mockSelectedDate} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    expect(input).toBeInTheDocument();
  });

  it('opens calendar on input click', () => {
    render(<DatePickerAdmin selectedDate={mockSelectedDate} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    fireEvent.click(input);
    const calendar = screen.getByRole('dialog'); // react-datepicker uses role="dialog"
    expect(calendar).toBeInTheDocument();
  });

  it('selects a date', () => {
    render(<DatePickerAdmin selectedDate={mockSelectedDate} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    fireEvent.click(input);

    const today = new Date();
    const day = screen.getByText(today.getDate().toString());

    fireEvent.click(day);
    expect(mockOnDateChange).toHaveBeenCalled();
  });

  it('calls onDateChange when date is selected', () => {
    render(<DatePickerAdmin selectedDate={mockSelectedDate} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    fireEvent.click(input);

    const today = new Date();
    const day = screen.getByText(today.getDate().toString());

    fireEvent.click(day);
    expect(mockOnDateChange).toHaveBeenCalledWith(expect.any(Date));
  });
});
