import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import '@testing-library/jest-dom';

describe('TicketFilterBar Component', () => {
  it('renders the TicketFilterBar container', () => {
    render(<TicketFilterBar />);
    const filterBar = screen.getByTestId('TicketFilterBarId');
    expect(filterBar).toBeInTheDocument();
  });

  it('clears all filters when the "Цэвэрлэх" button is clicked', async () => {
    render(<TicketFilterBar />);
    const user = userEvent.setup();
    const initialBadges = screen.getAllByTestId(/filter-badge-/);
    expect(initialBadges.length).toBeGreaterThan(0);
    const clearButton = screen.getByTestId('clear-filters-button');
    await user.click(clearButton);
    const clearedBadges = screen.queryAllByTestId(/filter-badge-/);
    expect(clearedBadges.length).toBe(0);
  });

  it('renders the calendar date button and hidden input', () => {
    render(<TicketFilterBar />);
    const calendarButton = screen.getByTestId('calendar-button');
    const hiddenDateInput = screen.getByTestId('hidden-date-input');

    expect(calendarButton).toBeInTheDocument();
    expect(hiddenDateInput).toBeInTheDocument();
  });
});
