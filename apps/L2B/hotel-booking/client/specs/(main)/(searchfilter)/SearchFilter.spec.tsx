import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilter from '@/app/(main)/_components/SeacrhFilter';
import CalendarDate from '@/app/(main)/_components/CalendarDate';

jest.mock('@/app/(main)/_components/CalendarDate', () => jest.fn(() => <div data-testid="calendar-button" />));
jest.mock('@/app/(main)/_features/Guest', () => jest.fn(() => <div data-testid="guest-options" />));

describe('SearchFilter', () => {
  it('renders SearchFilter UI elements', () => {
    render(<SearchFilter />);

    expect(screen.getByText('Dates')).toBeInTheDocument();
    expect(screen.getByText('Guest')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-button')).toBeInTheDocument();
    expect(screen.getByTestId('guest-options')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('passes date and handler to CalendarDate', () => {
    const fixedDate = new Date('2025-05-26T00:00:00.000Z');

    jest.useFakeTimers().setSystemTime(fixedDate);

    render(<SearchFilter />);

    const expectedDate = {
      from: fixedDate,
      to: fixedDate,
    };

    expect(CalendarDate).toHaveBeenCalledWith(
      expect.objectContaining({
        date: expectedDate,
        handleDateChange: expect.any(Function),
      }),
      {}
    );

    jest.useRealTimers();
  });

  it('handleDateChange updates state correctly', () => {
    let capturedHandler: any;

    (CalendarDate as jest.Mock).mockImplementation(({ handleDateChange }) => {
      capturedHandler = handleDateChange;
      return <div data-testid="calendar-date" />;
    });

    render(<SearchFilter />);

    const newDate = {
      from: new Date(2025, 10, 31),
      to: new Date(2025, 11, 2),
    };

    act(() => {
      capturedHandler(newDate);
    });

    expect(CalendarDate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: newDate,
      }),
      {}
    );
  });
});
