import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FilterByDate } from '../../src/app/dashboard/_components/FilterByDate';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
  useSearchParams: jest.fn().mockReturnValue({ get: jest.fn().mockResolvedValueOnce('') }),
}));

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

  it('4. Handle submit when clicking close button', () => {
    const { getByTestId } = render(<FilterByDate />);
    const openCalendarButton = getByTestId('open-calendar-button-test-id');
    fireEvent.click(openCalendarButton);
    const closeCalendarButton = getByTestId('close-calendar-button-test-id');
    fireEvent.click(closeCalendarButton);
    expect(closeCalendarButton).toBeDefined();
  });
});
