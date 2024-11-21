import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import { SearchDatePicker } from '@/components/main/assets';

type CalendarType = {
  onSelect: (_date: { from: Date; to: Date }) => void;
  selected: { from: Date; to: Date } | undefined;
};

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected }: CalendarType) => (
    <div data-testid="calendar">
      <button onClick={() => onSelect({ from: new Date('2023-03-01'), to: new Date('2023-03-07') })}>Select Range</button>
      <p data-testid="selected-range">
        {selected?.from?.toISOString() || 'No start date'} - {selected?.to?.toISOString() || 'No end date'}
      </p>
    </div>
  ),
}));
jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: PropsWithChildren) => <div>{children}</div>,
  PopoverTrigger: ({ children }: PropsWithChildren) => <div>{children}</div>,
  PopoverContent: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

describe('SearchDatePicker Component', () => {
  const onChangeMock = jest.fn();
  it('should render the search date picker with valid dates', () => {
    render(<SearchDatePicker startDate={new Date()} endDate={new Date()} onChange={onChangeMock} />);
  });
  it('should render the search date picker with only a start date', () => {
    render(<SearchDatePicker startDate={new Date('2022-01-01')} endDate={undefined} onChange={onChangeMock} />);
  });
  it('should render the search date picker with no dates', () => {
    render(<SearchDatePicker startDate={undefined} endDate={undefined} onChange={onChangeMock} />);
  });

  it('updates when external props change', () => {
    const mockOnChange = jest.fn();
    const { rerender } = render(<SearchDatePicker startDate={new Date('2023-02-01')} endDate={new Date('2023-02-07')} onChange={mockOnChange} />);

    rerender(<SearchDatePicker startDate={new Date('2023-03-01')} endDate={new Date('2023-03-07')} onChange={mockOnChange} />);
  });
});
