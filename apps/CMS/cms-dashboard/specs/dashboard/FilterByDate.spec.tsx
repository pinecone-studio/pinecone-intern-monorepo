import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FilterByUsingCalendar from '@/../../apps/CMS/cms-dashboard/src/app/dashboard/_components/FilterByDate';
describe('checking filter by date', () => {
  it('should render calendar button and date range', () => {
    const result = render(<FilterByUsingCalendar />);
    expect(result).toBeDefined();
  });
});

describe('FilterByUsingCalendar component', () => {
  it('toggle isOpen state when displayCalendar is called', () => {
    const { getByTestId } = render(<FilterByUsingCalendar />);
    const button = getByTestId('calendar-test-id');
    const test = fireEvent.click(button);
    expect(test).toBeTruthy();
  });
  it('checking for displaying calendar when clicking on button', () => {
    const { getByTestId } = render(<FilterByUsingCalendar />);
    fireEvent.click(getByTestId('calendar-test-id'));
    expect(getByTestId('date-range-picker')).toBeDefined();
  });
});
