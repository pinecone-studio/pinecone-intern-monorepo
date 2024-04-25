import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { FilterByDate } from '../../src/app/dashboard/_components/FilterByDate';
import { RangeKeyDict } from 'react-date-range';

type mockDateRangePickerType = {
  startDatePlaceholder: string;
  endDatePlaceholder: string;
  ranges: Range[] | undefined;
  onChange: (_rangesByKey: RangeKeyDict) => void;
};

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter() {
    return {
      push: () => jest.fn(),
    };
  },
  useSearchParams() {
    return {};
  },
}));
jest.mock('react-date-range', () => {
  const MockDateRangePicker = (props: mockDateRangePickerType) => {
    return <div data-testid="mock-date-range-picker-test-id"  onClick={() => props.onChange({ selection: { startDate: undefined, endDate: undefined } })}></div>;
  };

  return {
    DateRangePicker: MockDateRangePicker,
  };
});
describe('FilterByDate', () => {
  it('1. Should render FilterByDate component', () => {
    const { container } = render(<FilterByDate />);
    expect(container).toBeDefined();
  });

  it('5. null check', async () => {
    const { getByTestId } = render(<FilterByDate />);
    const openCalendarButton = getByTestId('open-calendar-button-test-id');
    fireEvent.click(openCalendarButton);

    const mockedButton = getByTestId('mock-date-range-picker-test-id');
    fireEvent.click(mockedButton);
  });
});
