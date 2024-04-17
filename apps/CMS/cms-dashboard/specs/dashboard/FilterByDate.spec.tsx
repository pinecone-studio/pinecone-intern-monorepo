import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FilterByDate } from '../../src/app/dashboard/_components/FilterByDate';

describe('FilterByDate', () => {
  it('1. Should render FilterByDate component', () => {
    const { container } = render(<FilterByDate />);
    expect(container).toBeDefined();
  });
  it('2. Open DateRangePicker component when (open calendar) button clicked', async () => {
    const { getByTestId, container } = render(<FilterByDate />);
    const openCalendarButton = getByTestId('open-calendar-button-test-id');
    fireEvent.click(openCalendarButton);
    expect(container.getElementsByClassName('rdrDateRangePickerWrapper')).toBeDefined();
  });
  it('3. Handle onChange function when date changed', async () => {
    const { getByTestId, container } = render(<FilterByDate />);
    const openCalendarButton = getByTestId('open-calendar-button-test-id');
    fireEvent.click(openCalendarButton);
    expect(container.getElementsByClassName('rdrDateRangePickerWrapper')).toBeDefined();

    const todayButton = container.getElementsByClassName('rdrStaticRange')[0];
    fireEvent.click(todayButton);
  });
});
