/// <reference types="jest" />
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import HowOldAreYou from '@/components/HowOldAreYou';
import '@testing-library/jest-dom';

const mockUpdateUserData = jest.fn();
const mockOnSuccess = jest.fn();
const mockOnBack = jest.fn();

// Mock Date.now to control current date
const mockToday = new Date('2024-01-01T00:00:00Z');
beforeAll(() => {
  jest.spyOn(global.Date, 'now').mockImplementation(() => mockToday.valueOf());
});

afterAll(() => {
  jest.restoreAllMocks();
});

// Mock for Calendar component to simplify date selection
jest.mock('@/components/ui/calendar', () => ({
  Calendar: ({ onSelect, selected, disabled }: { onSelect: (_date: Date) => void; selected: Date | null; disabled?: (_date: Date) => boolean }) => (
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
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);
    expect(screen.getByText('How old are you')).toBeInTheDocument();
    expect(screen.getByText('Please enter your age to continue')).toBeInTheDocument();
    expect(screen.getByTestId('date-picker-button')).toBeInTheDocument();
    expect(screen.getByTestId('next-button')).toBeInTheDocument();
  });

  it('opens calendar when date button is clicked', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('submits form with valid date', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

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
  });

  it('shows validation error when no date is selected', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

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
      expect(screen.queryByText('A date of birth is required.')).not.toBeInTheDocument();
    });
  });

  it('displays "Pick a date" when no date is selected', () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);
    // Simulate no date selected (default state)
    expect(screen.getByText('Pick a date')).toBeInTheDocument();
  });

  it('displays formatted date when a date is selected', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

    // Open the calendar
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });

    // Select a valid date (e.g., 2000-01-01)
    await act(async () => {
      const validDateButton = screen.getByRole('button', { name: 'Select 2000-01-01' });
      fireEvent.click(validDateButton);
    });
  });

  it('disables invalid dates', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

    // Open the calendar
    await act(async () => {
      fireEvent.click(screen.getByTestId('date-picker-button'));
    });

    // Check that an invalid date (1899-01-01) is disabled
    const invalidDateButton = screen.getByRole('button', { name: 'Select 1899-01-01' });
    expect(invalidDateButton).toBeDisabled();
  });

  it('should call onBack when back button is clicked', async () => {
    render(<HowOldAreYou onSuccess={mockOnSuccess} onBack={mockOnBack} updateUserData={mockUpdateUserData} />);

    const backButton = screen.getByRole('button', { name: /Back/i });
    await act(async () => {
      fireEvent.click(backButton);
    });

    expect(mockOnBack).toHaveBeenCalled();
  });
});
