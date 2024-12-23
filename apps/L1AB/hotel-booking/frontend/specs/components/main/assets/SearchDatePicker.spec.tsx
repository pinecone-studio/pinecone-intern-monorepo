import '@testing-library/jest-dom';
import React, { PropsWithChildren } from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { SearchDatePicker } from '@/components/main/assets';

type CalendarType = {
  onSelect: (_date: { from: Date; to: Date }) => void;
  selected: { from: Date; to: Date } | undefined;
};

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected, defaultMonth, disabled }: CalendarType & { disabled: () => boolean }) => {
    const handleClick = (date: Date) => {
      if (!disabled(date)) {
        onSelect({ from: date, to: new Date(date.getTime() + 6 * 24 * 60 * 60 * 1000) }); // Simulate a week-long range
      }
    };

    return (
      <div data-testid="calendar">
        <button onClick={() => handleClick(new Date('2023-03-01'))} data-testid="select-range-button" disabled={disabled(new Date('2023-03-01'))}>
          Select Range
        </button>
        <p data-testid="selected-range">
          {selected?.from?.toISOString() || 'No start date'} - {selected?.to?.toISOString() || 'No end date'}
        </p>
        <p data-testid="default-month">Default Month: {defaultMonth?.toISOString() || 'No default month'}</p>
      </div>
    );
  },
}));

jest.mock('@/components/ui/popover', () => ({
  Popover: ({ children }: PropsWithChildren) => <div>{children}</div>,
  PopoverTrigger: ({ children }: PropsWithChildren) => <div>{children}</div>,
  PopoverContent: ({ children }: PropsWithChildren) => <div>{children}</div>,
}));

describe('SearchDatePicker Component', () => {
  const onChangeMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders with valid start and end dates', () => {
    render(<SearchDatePicker startDate={new Date('2023-02-01')} endDate={new Date('2023-02-07')} onChange={onChangeMock} />);
    expect(screen.getByTestId('date-picker')).toBeInTheDocument();
    expect(screen.getByText('February 01 - February 07')).toBeInTheDocument();
  });

  it('renders with only a start date', () => {
    render(<SearchDatePicker startDate={new Date('2022-01-01')} endDate={undefined} onChange={onChangeMock} />);
    expect(screen.getByText('January 01')).toBeInTheDocument();
  });

  it('renders with no dates selected', () => {
    render(<SearchDatePicker startDate={undefined} endDate={undefined} onChange={onChangeMock} />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('updates when external props change', () => {
    const { rerender } = render(<SearchDatePicker startDate={new Date('2023-02-01')} endDate={new Date('2023-02-07')} onChange={onChangeMock} />);
    expect(screen.getByText('February 01 - February 07')).toBeInTheDocument();

    rerender(<SearchDatePicker startDate={new Date('2023-03-01')} endDate={new Date('2023-03-07')} onChange={onChangeMock} />);
    expect(screen.getByText('March 01 - March 07')).toBeInTheDocument();
  });

  it('disables past dates', () => {
    render(<SearchDatePicker startDate={undefined} endDate={undefined} onChange={onChangeMock} />);

    const pastDateButton = screen.getByTestId('select-range-button');
    expect(pastDateButton).toBeDisabled();
    fireEvent.click(pastDateButton);
    expect(onChangeMock).not.toHaveBeenCalled();
  });
});
