import FilterByUsingCalendar from '../../../cms-dashboard/src/app/dashboard/_components/FilterByDate';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';

jest.mock('react-date-range', () => ({
  DateRangePicker: jest.fn().mockImplementation(() => <div data-testid="mocked-date-range-picker" />),
}));

describe('verifying date range picker', () => {
  it('renders DateRangePicker when calendar button is clicked', () => {
    const { getByTestId } = render(<FilterByUsingCalendar />);

    const calendarButton = getByTestId('calendar-test-id');
    fireEvent.click(calendarButton);

    const dateRangePicker = getByTestId('mocked-date-range-picker');
    expect(dateRangePicker).toBeDefined();
  });
});

describe('checking updates are set correctly', () => {
  it('handleChange updates date state correctly', () => {    
    const initialDate = {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-15'), 
      key: 'selection',
    };    
    const { getByTestId } = render(<FilterByUsingCalendar />);
    
    const calendarButton = getByTestId('calendar-test-id');
    fireEvent.click(calendarButton);

    const dateRangePicker = getByTestId('date-range-picker');
    
    const mockRange = {
      selection: {
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-04-15'),
        key: 'selection',
      },
    };    
    fireEvent.change(dateRangePicker, { value: mockRange });

    const startDateElement = getByTestId('start-date');
    const endDateElement = getByTestId('end-date');
    
    expect(startDateElement.textContent).toBe('01.04.2024');
    expect(endDateElement.textContent).toBe('15.04.2024');
  });
});
