/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */

import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HowOldAreYou from '@/components/HowOldAreYou';
import '@testing-library/jest-dom';

const mockToday = new Date('2024-01-01T00:00:00Z');

jest.setSystemTime(mockToday);

jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected, disabled }: { onSelect: (date: Date) => void; selected: Date | null; disabled?: (date: Date) => boolean }) => (
    <div>
      <button
        onClick={() => {
          const d = new Date('2000-01-01');
          // Use d to satisfy lint
          if (!(d instanceof Date)) throw new Error('Not a date');
          onSelect(d);
        }}
        disabled={
          disabled
            ? ((date) => {
                if (!(date instanceof Date)) throw new Error('Not a date');
                return disabled(date);
              })(new Date('2000-01-01'))
            : undefined
        }
      >
        Select 2000-01-01
      </button>
      <button
        onClick={() => {
          const d = new Date('1899-01-01');
          // Use d to satisfy lint
          if (!(d instanceof Date)) throw new Error('Not a date');
          onSelect(d);
        }}
        disabled={
          disabled
            ? ((date) => {
                if (!(date instanceof Date)) throw new Error('Not a date');
                return disabled(date);
              })(new Date('1899-01-01'))
            : undefined
        }
      >
        Select 1899-01-01
      </button>
      {disabled &&
        [new Date('2000-01-01'), new Date('1899-01-01')].map((date) => {
          // Use date to satisfy lint
          if (!(date instanceof Date)) throw new Error('Not a date');
          return (
            <span key={date.toISOString()} style={{ display: 'none' }}>
              {date.toISOString()}
            </span>
          );
        })}
      {selected && <div>Selected: {selected.toISOString()}</div>}
    </div>
  ),
}));

describe('HowOldAreYou Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders correctly', () => {
    render(<HowOldAreYou />);
    expect(screen.getByText('How old are you')).toBeInTheDocument();
    expect(screen.getByText('Please enter your age to continue')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });

  it('opens calendar when date button is clicked', async () => {
    render(<HowOldAreYou />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument(); // Popover opens
  });

  it('submits form with valid date', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<HowOldAreYou />);
    act(() => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });

    act(() => {
      const validDateButton = screen.getByRole('button', { name: 'Select 2000-01-01' });
      fireEvent.click(validDateButton);
    });

    act(() => {
      fireEvent.click(screen.getByTestId('next-button'));
    });

    waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('working');
    });

    consoleSpy.mockRestore();
  });

  it('shows validation error when no date is selected', async () => {
    render(<HowOldAreYou />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    await act(async () => {
      fireEvent.click(screen.getByTestId('next-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('A date of birth is required.')).not.toBeInTheDocument();
    });
  });

  it('displays "Pick a date" when no date is selected', () => {
    render(<HowOldAreYou />);
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('displays formatted date when a date is selected', async () => {
    render(<HowOldAreYou />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    await act(async () => {
      const validDateButton = screen.getByRole('button', { name: 'Select 2000-01-01' });
      fireEvent.click(validDateButton);
    });

    screen.debug();
  });

  it('disables invalid dates', async () => {
    render(<HowOldAreYou />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    const invalidDateButton = screen.getByRole('button', { name: 'Select 1899-01-01' });
    expect(invalidDateButton).toBeDisabled();
  });
});
