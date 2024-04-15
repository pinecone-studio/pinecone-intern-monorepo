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
