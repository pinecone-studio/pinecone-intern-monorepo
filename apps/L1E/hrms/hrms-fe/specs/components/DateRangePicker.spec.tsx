import { DateRangePicker } from '@/components/DateRangePicker';
import { fireEvent, render } from '@testing-library/react';
describe('DateRangePicker', () => {
  it('renders the component with no date', async () => {
    const { getByTestId } = render(<DateRangePicker />);
    const btn = getByTestId('calendar-btn');
    fireEvent.click(btn);
    const calendar = getByTestId('calendar');
    const startCalendar = calendar.querySelector('table');
    const selectedDate = startCalendar?.querySelector('button[aria-selected="true"]') as Element;
    fireEvent.click(selectedDate);
  });
  it('renders the component with date', async () => {
    const { getByTestId } = render(<DateRangePicker />);
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
