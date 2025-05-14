import { render, screen } from '@testing-library/react';
import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import '@testing-library/jest-dom';

describe('TicketFilterBar', () => {
  it('renders the TicketFilterBar component', () => {
    render(<TicketFilterBar />);
    const filterBar = screen.getByTestId('TicketFilterBarId');
    expect(filterBar).toBeInTheDocument();
  });
});
