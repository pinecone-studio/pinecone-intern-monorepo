import { fireEvent, render, screen } from '@testing-library/react';
import SearchFilter from '@/app/(main)/_components/SeacrhFilter';
import '@testing-library/jest-dom';

jest.mock('@/app/(main)/_components/CalendarDate', () => ({
  __esModule: true,
  default: ({ handleDateChange }: { handleDateChange: unknown }) => (
    <div>
      <button data-testid="date-button" onClick={() => handleDateChange({ from: new Date(2025, 10, 1), to: new Date(2025, 10, 3) })}>
        Mock Calendar Click
      </button>
    </div>
  ),
}));

describe('SearchFilter Component', () => {
  it('renders the SearchFilter layout correctly', () => {
    render(<SearchFilter />);

    const dateButton = screen.getByTestId('date-button');

    fireEvent.click(dateButton);
  });
});
