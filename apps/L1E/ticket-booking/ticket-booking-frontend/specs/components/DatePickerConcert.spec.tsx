/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from '@testing-library/react';
import DatePickerConcert from '@/components/DatePickerConcert';

// Mock react-datepicker to avoid complex UI interactions in unit tests
jest.mock('react-datepicker', () => ({
  __esModule: true,
  default: ({ placeholderText, className, onChange }: { placeholderText: string; className: string; onChange: (_date: Date) => void }) => (
    <input
      data-testid="date-input"
      type="text"
      placeholder={placeholderText}
      className={className}
      onChange={() => onChange(new Date('2024-01-01'))} // <-- you don't use 'date' param here
    />
  ),
}));

describe('DatePickerConcert', () => {
  it('renders input with placeholder', () => {
    render(<DatePickerConcert />);
    const input = screen.getByPlaceholderText('Өдөр сонгох');
    if (!input) throw new Error('Input not rendered');
  });

  it('sets basic input attributes', () => {
    render(<DatePickerConcert />);
    const input = screen.getByTestId('date-input') as HTMLInputElement | null;
    if (!input) throw new Error('Date input not found');
    if (input.getAttribute('type') !== 'text') throw new Error('type attribute mismatch');
    if (input.getAttribute('placeholder') !== 'Өдөр сонгох') throw new Error('placeholder attribute mismatch');
  });

  it('renders without crashing', () => {
    // Simply render; if it throws, the test fails
    render(<DatePickerConcert />);
  });

  it('shows selected date text after change', () => {
    render(<DatePickerConcert />);
    const input = screen.getByTestId('date-input');
    fireEvent.change(input, { target: { value: '2024/01/01' } });
    const label = screen.getByText(/Сонгосон огноо:/);
    if (!label) throw new Error('Selected date label missing');
  });
});
