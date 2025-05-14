import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import '@testing-library/jest-dom';
describe('TicketFilterBar', () => {
  it('should renders the TicketFilterBar component', () => {
    render(<TicketFilterBar />);
    const filterBar = screen.getByTestId('TicketFilterBarId');
    expect(filterBar).toBeInTheDocument();
  });
  it('should clears all filters when "Цэвэрлэх" button is clicked', async () => {
    render(<TicketFilterBar />);
    const user = userEvent.setup();
    const badgesBefore = screen.getAllByTestId(/filter-badge-/);
    expect(badgesBefore.length).toBeGreaterThan(0);
    const clearButton = screen.getByRole('button', { name: /цэвэрлэх/i });
    await user.click(clearButton);
    const badgesAfter = screen.queryAllByTestId(/filter-badge-/);
    expect(badgesAfter.length).toBe(0);
  });
  it('should renders date picker input and button', () => {
    render(<TicketFilterBar />);
    const dateButton = screen.getByRole('button', { name: /өдөр сонгох/i });
    const dateInput = screen.getByTestId('hidden-date-input');
    expect(dateButton).toBeInTheDocument();
    expect(dateInput).toBeInTheDocument();
  });
});
