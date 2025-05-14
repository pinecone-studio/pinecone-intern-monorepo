import { render, screen } from '@testing-library/react';
import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import '@testing-library/jest-dom';

describe('TicketFilterBar', () => {
  it('renders the TicketFilterBar component', () => {
    render(<TicketFilterBar />);
    const filterBar = screen.getByTestId('TicketFilterBarId');
    expect(filterBar).toBeInTheDocument();
  });

  it('clears all filters when "Цэвэрлэх" button is clicked', () => {
    render(<TicketFilterBar />);
    const clearButton = screen.getByText('Цэвэрлэх');
    clearButton.click();
    const remainingBadges = screen.queryAllByRole('button', { name: /x/i });
    expect(remainingBadges.length).toBe(0);
  });
});
