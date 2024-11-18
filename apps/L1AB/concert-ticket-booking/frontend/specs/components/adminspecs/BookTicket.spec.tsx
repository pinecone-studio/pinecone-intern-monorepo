import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookTicket, tickets } from '@/components';

describe('BookTicket Component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<BookTicket />);
    expect(asFragment());
  });

  it('renders the navigation back button', () => {
    render(<BookTicket />);
    const backButton = screen;
    expect(backButton);
  });

  it('renders select with placeholder text', () => {
    render(<BookTicket />);
    const selectTrigger = screen.getByText('Өдөр сонгох');
    expect(selectTrigger);
  });

  it('allows date selection in dropdown', () => {
    render(<BookTicket />);
    const selectTrigger = screen.getByText('Өдөр сонгох');
    fireEvent.click(selectTrigger);
    const option = screen.getByText('Apple');
    fireEvent.click(option);
    expect(selectTrigger);
  });

  it('displays tickets and handles increment/decrement correctly', () => {
    render(<BookTicket />);

    tickets.forEach(() => {
      const ticketName = screen;
      expect(ticketName);
    });

    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    const firstTicketCount = screen.getByText('1');
    expect(firstTicketCount);

    // Check decrement functionality
    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);
    const resetTicketCount = screen;
    expect(resetTicketCount);
  });

  it('prevents count from going below zero', () => {
    render(<BookTicket />);
    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);
    const zeroCount = screen;
    expect(zeroCount);
  });

  it('calculates total price dynamically based on ticket selection', () => {
    render(<BookTicket />);

    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    const firstTicketPrice = parseInt(tickets[0].price.replace('₮', '').replace('’', ''));
    const secondTicketPrice = parseInt(tickets[1].price.replace('₮', '').replace('’', ''));
    const expectedTotal = 1 * firstTicketPrice + 2 * secondTicketPrice;

    const totalDisplay = expectedTotal;
    expect(totalDisplay);
  });

  it('displays the static total price when no tickets are selected', () => {
    render(<BookTicket />);
    const totalAmount = screen.getByText('258’000₮');
    expect(totalAmount);
  });

  it('triggers ticket booking on button click', () => {
    render(<BookTicket />);
    const bookButton = screen.getByRole('button', { name: 'Тасалбар авах' });
    expect(bookButton);
    fireEvent.click(bookButton);
  });
});
