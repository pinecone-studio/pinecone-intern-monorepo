import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // ✅ Fixes `.toBeInTheDocument()` issue
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
    render(<SearchFilter />);

    const expectedDate = {
      from: new Date(2025, 9, 19),
      to: new Date(2025, 9, 20),
    };

    expect(CalendarDate).toHaveBeenCalledWith(
      expect.objectContaining({
        date: expectedDate,
        handleDateChange: expect.any(Function),
      }),
      {}
    );
  });

  it('handleDateChange updates state correctly', () => {
    let capturedHandler: any;

    // Capture the handler so we can invoke it
    (CalendarDate as jest.Mock).mockImplementation(({ handleDateChange }) => {
      capturedHandler = handleDateChange;
      return <div data-testid="calendar-date" />;
    });

    render(<SearchFilter />);

    const newDate = {
      from: new Date(2025, 10, 31),
      to: new Date(2025, 11, 2),
    };

    // Use `act` to update state safely
    act(() => {
      capturedHandler(newDate);
    });

    // Validate the new props passed to CalendarDate
    expect(CalendarDate).toHaveBeenLastCalledWith(
      expect.objectContaining({
        date: newDate,
      }),
      {}
    );
  });
});
