import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchFilter from '@/app/(main)/_components/SeacrhFilter';
import CalendarDate from '@/app/(main)/_components/CalendarDate';
import { useRouter } from 'next/navigation';

const MockGuestComponent = ({ onGuestChange }: { onGuestChange: (_adults: number, _children: number, _infants: number) => void }) => {
  React.useEffect(() => {
    onGuestChange(3, 2, 2);
  }, [onGuestChange]);
  return <div data-testid="guest-options" />;
};

jest.mock('@/app/(main)/_components/CalendarDate', () => jest.fn(() => <div data-testid="calendar-button" />));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

beforeEach(() => {
  jest.resetModules();
  jest.doMock('@/app/(main)/_features/Guest', () => ({
    __esModule: true,
    default: MockGuestComponent,
  }));
});

describe('SearchFilter', () => {
  const push = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push });
    push.mockReset();
  });
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
  it('calls handleGuestChange and handleSearch with correct params', () => {
    render(<SearchFilter />);

    fireEvent.click(screen.getByTestId('guest-options-trigger'));

    fireEvent.click(screen.getByTestId('increment-kids'));
    fireEvent.click(screen.getByTestId('increment-adults'));

    fireEvent.click(screen.getByTestId('increment-kids'));
    fireEvent.click(screen.getByTestId('increment-adults'));

    fireEvent.click(screen.getByTestId('guest-options-done'));

    fireEvent.click(screen.getByRole('button', { name: /search/i }));

    const calledUrl = push.mock.calls[0][0];

    expect(calledUrl).toMatch('/search-result?from=2025-06-09&to=2025-06-09&adults=3&children=2');
    expect(calledUrl).toMatch(/children=2/);
  });
  it('should return early if date.from or date.to is undefined', () => {
    (CalendarDate as jest.Mock).mockImplementation(({ handleDateChange }) => {
      React.useEffect(() => {
        handleDateChange(undefined);
      }, [handleDateChange]);
      return <div data-testid="calendar-date" />;
    });

    render(<SearchFilter />);

    const searchButton = screen.getByTestId('search-button');
    fireEvent.click(searchButton);

    expect(push).not.toHaveBeenCalled();
  });
});
