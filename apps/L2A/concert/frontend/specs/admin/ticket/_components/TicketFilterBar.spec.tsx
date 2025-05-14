import { render, screen } from '@testing-library/react';
import TicketFilterBar from '@/app/admin/ticket/_components/TicketFilterBar';
import '@testing-library/jest-dom';
describe('TicketFilterBar', () => {
  it('renders search input and default filters', () => {
    render(<TicketFilterBar />);
    expect(screen.getByPlaceholderText('Тасалбар хайх')).toBeInTheDocument();
  });
});
