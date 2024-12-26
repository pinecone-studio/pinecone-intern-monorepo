import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Search } from '@/components/main';
import { useMain } from '@/components/providers/MainProvider';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('@/components/main/assets', () => ({
  SearchDatePicker: ({ onChange }) => (
    <div data-testid="date-picker">
      <button onClick={() => onChange(new Date('2023-01-01'), new Date('2023-01-07'))}>Select Dates</button>
    </div>
  ),
  SearchSelectGuest: ({ value, onChange }) => (
    <div data-testid="guest-select">
      <button onClick={() => onChange(value + 1)}>Add Guest</button>
    </div>
  ),
  Container: ({ children }) => <div>{children}</div>,
}));

jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }) => <button {...props}>{children}</button>,
}));

jest.mock('@/components/providers/MainProvider', () => ({
  useMain: jest.fn(() => ({
    setDateRange: jest.fn(),
    setTraveler: jest.fn(),
  })),
}));

describe('Search Component', () => {
  const mockSetDateRange = jest.fn();
  const mockSetTraveler = jest.fn();

  beforeEach(() => {
    (useMain as jest.Mock).mockReturnValue({
      setDateRange: mockSetDateRange,
      setTraveler: mockSetTraveler,
    });
  });

  it('renders the form correctly', () => {
    render(<Search />);
    expect(screen.getByTestId('search')).toBeInTheDocument();
  });

  it('updates form state when fields change', async () => {
    render(<Search />);

    const datePicker = screen.getByTestId('date-picker').querySelector('button');
    await act(async () => {
      fireEvent.click(datePicker);
    });

    expect(mockSetDateRange).toHaveBeenCalledWith({
      checkIn: new Date('2023-01-01'),
      checkOut: new Date('2023-01-07'),
    });

    const guestSelect = screen.getByTestId('guest-select').querySelector('button');
    await act(async () => {
      fireEvent.click(guestSelect);
    });

    expect(mockSetTraveler).toHaveBeenCalledWith(2);
  });
});
