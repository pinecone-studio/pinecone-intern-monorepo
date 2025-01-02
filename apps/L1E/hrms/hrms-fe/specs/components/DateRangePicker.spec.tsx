import { DateRangePicker } from '@/components/DateRangePicker';
import { fireEvent, render } from '@testing-library/react';
import { DateRange } from 'react-day-picker';
describe('DateRangePicker', () => {
  it('renders the component with no date', async () => {
    const setDate = jest.fn(); // Mock the setDate function
    const date: DateRange = {
      from: new Date('2024-12-25'), // A date range with start date
      to: undefined, // A date range with end date
    };
    const { getByTestId } = render(<DateRangePicker setDate={setDate} date={date} />);
    const btn = getByTestId('calendar-btn');
    fireEvent.click(btn);
    const calendar = getByTestId('calendar');
    const startCalendar = calendar.querySelector('table');
    const selectedDate = startCalendar?.querySelector('button[aria-selected="true"]') as Element;
    fireEvent.click(selectedDate);
  });
  it('renders the component with no date', async () => {
    const setDate = jest.fn(); // Mock the setDate function
    const date: DateRange = {
      from: undefined, // A date range with start date
      to: new Date('2024-12-25'), // A date range with end date
    };
    const { getByTestId } = render(<DateRangePicker setDate={setDate} date={date} />);
    const btn = getByTestId('calendar-btn');
    fireEvent.click(btn);
  });
  it('renders the component with date', async () => {
    const setDate = jest.fn(); // Mock the setDate function
    const date: DateRange = {
      from: new Date('2024-12-25'), // A date range with start date
      to: new Date('2024-12-31'), // A date range with end date
    };
    const { getByTestId } = render(<DateRangePicker setDate={setDate} date={date} />);
    const btn = getByTestId('calendar-btn');
    fireEvent.click(btn);
    const calendar = getByTestId('calendar');
    const startCalendar = calendar.querySelector('table');
    const selectedDate = startCalendar?.querySelector('button[aria-selected="true"]') as Element;
    fireEvent.click(selectedDate);
    const firstDate = startCalendar?.querySelector('button') as Element;
    fireEvent.click(firstDate);
  });
});
