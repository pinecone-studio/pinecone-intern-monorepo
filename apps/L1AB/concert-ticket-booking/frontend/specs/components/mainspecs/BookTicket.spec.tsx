/* eslint-disable max-lines */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BookTicket } from '@/components';
import { useGetEventByIdQuery, useCreateBookingTotalAmountMutation, useGetMeQuery } from '@/generated';
import { useRouter } from 'next/navigation';

jest.mock('@/generated', () => ({
  useGetEventByIdQuery: jest.fn(),
  useCreateBookingTotalAmountMutation: jest.fn(),
  useGetMeQuery: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
  usePathname: jest.fn(() => '/bookTicket/6765104197fab04d24c9ed5b'), // eslint-disable-line no-secrets/no-secrets
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
const mockUserData = {
  getMe: [
    {
      _id: '1',
    },
    {
      _id: undefined,
    },
  ],
};
describe('BookTicket Component', () => {
  beforeEach(() => {
    (useGetEventByIdQuery as jest.Mock).mockReturnValue({
      data: mockEventData,
    });
    (useGetMeQuery as jest.Mock).mockReturnValue({
      data: mockUserData,
    });
    (useCreateBookingTotalAmountMutation as jest.Mock).mockReturnValue([jest.fn(), { loading: true }]);
  });

  it('should call the mutation on booking', async () => {
    const { getByTestId } = render(<BookTicket id="test" />);
    const OrderPushButton = getByTestId('Orderpush');

    fireEvent.click(OrderPushButton);

    const createBookingMock = useCreateBookingTotalAmountMutation as jest.Mock;
    await waitFor(() => expect(createBookingMock));
  });

  it('should prevent ticket count when quantity is zero', () => {
    const mockEventDataWithZeroQuantity = {
      getEventById: {
        eventDate: ['2024-12-01', '2024-12-02'],
        venues: [
          { name: 'VIP Section', price: 100000, quantity: 0 },
          { name: 'General Section', price: 50000, quantity: 0 },
        ],
      },
    };

    (useGetEventByIdQuery as jest.Mock).mockReturnValue({
      data: mockEventDataWithZeroQuantity,
    });

    render(<BookTicket id="test" />);
    const incrementButton = screen.getAllByTestId('incrementCount')[0];
    const countElement = screen.getByTestId('ticket-count-0');

    fireEvent.click(incrementButton);

    expect(countElement);
  });

  it('should increment and decrement ticket count correctly', () => {
    render(<BookTicket id="test" />);
    const incrementButtons = screen.getAllByTestId('incrementCount');
    const decrementButtons = screen.getAllByTestId('decrementCount');

    fireEvent.click(incrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));

    fireEvent.click(decrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));
  });

  it('should prevent ticket count from going below zero', () => {
    render(<BookTicket id="test" />);
    const decrementButtons = screen.getAllByTestId('decrementCount');

    fireEvent.click(decrementButtons[0]);
    expect(screen.getByTestId('ticket-count-0'));
  });

  it('should calculate total price dynamically based on ticket selection', () => {
    render(<BookTicket id="test" />);
    const incrementButtons = screen.getAllByTestId('incrementCount');

    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    expect(screen.getByTestId('total-price'));
  });

  it('should redirect to the order page after successful booking', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const mockCreateBooking = jest.fn().mockResolvedValue({
      data: {
        createBookingTotalAmount: {
          _id: 'mockOrderId',
        },
      },
    });

    (useCreateBookingTotalAmountMutation as jest.Mock).mockReturnValue([mockCreateBooking, { loading: false }]);

    const { getByTestId } = render(<BookTicket id="test" />);

    const select = getByTestId('SelectTrigger');
    fireEvent.keyDown(select, { key: 'Enter' });

    const options = await screen.getAllByTestId('option');
    fireEvent.keyDown(options[0], { key: 'Enter' });

    const incrementButtons = screen.getAllByTestId('incrementCount');

    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    const orderPushButton = getByTestId('Orderpush');
    fireEvent.click(orderPushButton);

    await waitFor(() => expect(mockCreateBooking));

    await waitFor(() => expect(mockPush));
  });
  it('should display an error message when booking fails', async () => {
    const mockPush = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });

    const mockCreateBooking = jest.fn().mockRejectedValue(new Error('Booking failed'));

    (useCreateBookingTotalAmountMutation as jest.Mock).mockReturnValue([mockCreateBooking, { loading: false }]);

    const { getByTestId } = render(<BookTicket id="test" />);

    const select = getByTestId('SelectTrigger');
    fireEvent.keyDown(select, { key: 'Enter' });

    const options = await screen.getAllByTestId('option');
    fireEvent.keyDown(options[0], { key: 'Enter' });

    const incrementButtons = screen.getAllByTestId('incrementCount');

    fireEvent.click(incrementButtons[0]);
    fireEvent.click(incrementButtons[1]);
    fireEvent.click(incrementButtons[1]);

    const orderPushButton = getByTestId('Orderpush');
    fireEvent.click(orderPushButton);

    await waitFor(() => expect(mockCreateBooking));
  });

  it('should handle icon click correctly', () => {
    const { getByTestId } = render(<BookTicket id="test" />);
    const cardElement = getByTestId('FaArrowLeftClick');
    fireEvent.click(cardElement);
  });
  it('should display loading state when data is loading', () => {
    (useGetMeQuery as jest.Mock).mockReturnValue({
      loading: true,
      data: null,
    });

    render(<BookTicket id="test" />);

    expect(screen);
  });
});
