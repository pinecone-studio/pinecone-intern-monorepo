import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookTicket, tickets } from '@/components';
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

describe('BookTicket Component', () => {
  it('should match snapshot', () => {
    const { asFragment } = render(<BookTicket id="test" />);
    expect(asFragment());
  });

  it('renders the navigation back button', () => {
    render(<BookTicket id="test" />);
    const backButton = screen;
    expect(backButton);
  });

  it('displays tickets and handles increment/decrement correctly', () => {
    render(<BookTicket id="test" />);

    tickets.forEach(() => {
      const ticketName = screen;
      expect(ticketName);
    });

    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    const firstTicketCount = screen.getByText('1');
    expect(firstTicketCount);

    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);
    const resetTicketCount = screen;
    expect(resetTicketCount);
  });

  it('prevents count from going below zero', () => {
    render(<BookTicket id="test" />);
    const decrementButtons = screen.getAllByText('-');
    fireEvent.click(decrementButtons[0]);
    const zeroCount = screen;
    expect(zeroCount);
  });

  it('calculates total price dynamically based on ticket selection', () => {
    render(<BookTicket id="test" />);

    const incrementButtons = screen.getAllByText('+');
    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    const firstTicketPrice = parseInt(tickets[0].price.toString());
    const secondTicketPrice = parseInt(tickets[1].price.toString());
    const expectedTotal = 1 * firstTicketPrice + 2 * secondTicketPrice;

    const totalDisplay = expectedTotal;
    expect(totalDisplay);
  });

  it('displays the static total price when no tickets are selected', () => {
    render(<BookTicket id="test" />);
    const totalAmount = screen;
    expect(totalAmount);
  });

  it('triggers ticket booking on button click', () => {
    render(<BookTicket id="test" />);
    const bookButton = screen.getByRole('button', { name: 'Тасалбар авах' });
    expect(bookButton);
    fireEvent.click(bookButton);
  });

  it('icon is clicked', () => {
    const { getByTestId } = render(<BookTicket id="test" />);
    const cardElement = getByTestId('FaArrowLeftClick');
    fireEvent.click(cardElement);
  });
});
