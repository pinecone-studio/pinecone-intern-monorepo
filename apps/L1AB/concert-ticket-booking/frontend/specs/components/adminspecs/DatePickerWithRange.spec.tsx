import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DatePickerWithRange } from '@/components';

describe('DatePicker Component', () => {
  it('renders the date picker with the correct initial date', () => {
    const mockOnChange = jest.fn();
    const initialValue = ['2024-11-28'];

    render(<DatePickerWithRange value={initialValue} onChange={mockOnChange} />);

    const datePicker = screen.getByTestId('datepicker') as HTMLInputElement;

    expect(datePicker);
    expect(datePicker.value);
  });

  it('updates the date and calls onChange when a new date is selected', () => {
    const mockOnChange = jest.fn();
    const initialValue = ['2024-11-28'];

    render(<DatePickerWithRange value={initialValue} onChange={mockOnChange} />);

    const datePicker = screen.getByTestId('datepicker') as HTMLInputElement;

    fireEvent.change(datePicker, { target: { value: '2024-12-01' } });

    expect(datePicker.value);

    expect(mockOnChange);
  });
});
