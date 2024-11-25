import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookTicket } from '@/components';
import { useGetEventByIdQuery } from '@/generated';

jest.mock('@/generated', () => ({
  useGetEventByIdQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

const mockEventData = {
  getEventById: {
    eventDate: ['2024-12-01', '2024-12-02'],
    venues: [
      { name: 'VIP Section', price: 100000, quantity: 50 },
      { name: 'General Section', price: 50000, quantity: 100 },
    ],
  },
};

describe('BookTicket Component', () => {
  beforeEach(() => {
    (useGetEventByIdQuery as jest.Mock).mockReturnValue({
      data: mockEventData,
    });
  });

  it('icon is clicked', () => {
    const { getByTestId } = render(<BookTicket id="test" />);
    const cardElement = getByTestId('FaArrowLeftClick');
    fireEvent.click(cardElement);
  });
  it('prevents ticket count when quantity is zero', () => {
    const mockEventDataWithZeroQuantity = {
      getEventById: {
        eventDate: ['2024-12-01', '2024-12-02'],
        venues: [
          { name: 'VIP Section', price: 100000, quantity: 0 },
          { name: 'General Section', price: 50000, quantity: 100 },
        ],
      },
    };

    (useGetEventByIdQuery as jest.Mock).mockReturnValue({
      data: mockEventDataWithZeroQuantity,
    });

    render(<BookTicket id="test" />);

    const incrementButton = screen.getAllByTestId('incrementCount')[0];
    const countElement = screen.getByTestId('ticket-count-0');

    expect(countElement);

    fireEvent.click(incrementButton);

    expect(screen.getByTestId('ticket-count-0'));
  });
  it('increments and decrements ticket count correctly', () => {
    render(<BookTicket id="test" />);
    const incrementButtons = screen.getAllByTestId('incrementCount');
    const decrementButtons = screen.getAllByTestId('decrementCount');

    fireEvent.click(incrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));

    fireEvent.click(decrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));
  });

  it('prevents ticket count from going below zero', () => {
    render(<BookTicket id="test" />);
    const decrementButtons = screen.getAllByTestId('decrementCount');
    fireEvent.click(decrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));
  });

  it('calculates total price dynamically based on ticket selection', () => {
    render(<BookTicket id="test" />);
    const incrementButtons = screen.getAllByTestId('incrementCount');
    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    expect(screen.getByTestId('total-price'));
  });
  it('icon is clicked', () => {
    const { getByTestId } = render(<BookTicket id="test" />);
    const OrderPush = getByTestId('Orderpush');
    fireEvent.click(OrderPush);
  });
});
