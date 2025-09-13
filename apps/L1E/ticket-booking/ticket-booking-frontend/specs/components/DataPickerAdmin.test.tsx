/**
 * @jest-environment jsdom
 */
'use client';

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePickerAdmin } from '@/components/DatePickerAdmin';

// Mock react-datepicker to control its onChange behavior
jest.mock('react-datepicker', () => {
  return function MockDatePicker({ onChange, selected, placeholderText, dateFormat, ...props }: {
    onChange: (date: Date | null) => void;
    selected: Date | null;
    placeholderText: string;
    dateFormat: string;
    [key: string]: unknown;
  }) {
    // Filter out react-datepicker specific props that shouldn't be passed to DOM
    const { 
      placeholderText: _placeholderText,
      dateFormat: _dateFormat,
      ...domProps 
    } = props;
    
    return (
      <div>
        <input 
          {...domProps}
          placeholder={placeholderText}
          value={selected ? selected.toISOString().split('T')[0] : ''}
          onChange={(e) => {
            // Simulate DatePicker behavior
            const value = e.target.value;
            if (value) {
              onChange(new Date(value));
            } else {
              onChange(null);
            }
          }}
        />
        <button 
          onClick={() => onChange(null)} 
          data-testid="clear-date-button"
        >
          Clear
        </button>
      </div>
    );
  };
});

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

  it('calls onDateChange when date is selected', () => {
    render(<DatePickerAdmin selectedDate={null} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    
    // Simulate selecting a date
    fireEvent.change(input, { target: { value: '2024-12-25' } });
    
    expect(mockOnDateChange).toHaveBeenCalledWith(expect.any(Date));
  });

  it('does not call onDateChange when null date is provided', () => {
    render(<DatePickerAdmin selectedDate={mockSelectedDate} onDateChange={mockOnDateChange} />);
    
    // Click the clear button to trigger onChange with null
    const clearButton = screen.getByTestId('clear-date-button');
    fireEvent.click(clearButton);
    
    // Since _date is null, onDateChange should not be called
    expect(mockOnDateChange).not.toHaveBeenCalled();
  });

  it('handles empty input value', () => {
    render(<DatePickerAdmin selectedDate={null} onDateChange={mockOnDateChange} />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    
    // Simulate clearing the input (empty string triggers onChange with null)
    fireEvent.change(input, { target: { value: '' } });
    
    // Since _date is null, onDateChange should not be called
    expect(mockOnDateChange).not.toHaveBeenCalled();
  });
});
