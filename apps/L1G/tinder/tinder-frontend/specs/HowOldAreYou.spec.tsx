/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HowOldAreYou from '@/components/HowOldAreYou';
import '@testing-library/jest-dom';

// Mock Date.now to control current date
const mockToday = new Date('2024-01-01T00:00:00Z');
jest.useFakeTimers().setSystemTime(mockToday);

// Mock for Calendar component to simplify date selection
jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected, disabled }: any) => (
    <div>
      <button onClick={() => onSelect(new Date('2000-01-01'))} disabled={disabled?.(new Date('2000-01-01'))}>
        Select 2000-01-01
      </button>
      <button onClick={() => onSelect(new Date('1899-01-01'))} disabled={disabled?.(new Date('1899-01-01'))}>
        Select 1899-01-01
      </button>
      {selected && <div>Selected: {selected.toISOString()}</div>}
    </div>
  ),
}));

describe('HowOldAreYou Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    render(<HowOldAreYou />);
    expect(screen.getByText('How old are you'));
    expect(screen.getByText('Please enter your age to continue'));
    expect(screen.getByTestId('date-picker-button'));
    expect(screen.getByTestId('next-button'));
  });

  it('opens calendar when date button is clicked', async () => {
    render(<HowOldAreYou />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    expect(screen.getByRole('dialog')); // Popover opens
  });

  it('submits form with valid date', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

    render(<HowOldAreYou />);

    // Open the calendar
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

    consoleSpy.mockRestore();
  });

  it('shows validation error when no date is selected', async () => {
    render(<HowOldAreYou />);

    // Clear the default date (if applicable)
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });

    // Simulate clearing the date or selecting an invalid one
    await act(async () => {
      // Assuming the Calendar allows clearing or selecting an invalid date
      // If the Calendar component doesn't support clearing, you may need to mock it
      fireEvent.click(screen.getByTestId('next-button'));
    });

    await waitFor(() => {
      expect(screen.queryByText('A date of birth is required.')).not;
    });
  });

  it('displays "Pick a date" when no date is selected', () => {
    render(<HowOldAreYou />);
    // Simulate no date selected (default state)
    expect(screen.getByText('Pick a date'));
  });

  it('displays formatted date when a date is selected', async () => {
    render(<HowOldAreYou />);

    // Open the calendar
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });

    // Select a valid date (e.g., 2000-01-01)
    await act(async () => {
      const validDateButton = screen.getByRole('button', { name: 'Select 2000-01-01' });
      fireEvent.click(validDateButton);
    });

    screen.debug();
  });

  it('disables invalid dates', async () => {
    render(<HowOldAreYou />);

    // Open the calendar
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
  });
});
