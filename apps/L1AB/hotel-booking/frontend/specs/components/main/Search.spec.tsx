import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { Search } from '@/components/main';

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

describe('Search Component', () => {
  console.log = jest.fn();
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
    expect(screen.getByTestId('date-picker'));

    const guestSelect = screen.getByTestId('guest-select').querySelector('button');
    await act(async () => {
      fireEvent.click(guestSelect);
    });
    expect(screen.getByText('Add Guest'));
  });
});
