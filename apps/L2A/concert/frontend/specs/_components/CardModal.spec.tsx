import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CartModal } from '@/app/_components/CardModal';
import { MockedProvider } from '@apollo/client/testing';
import { useCreateTicketOrderMutation } from '@/generated';

jest.mock('@/generated', () => ({
  useCreateTicketOrderMutation: jest.fn(),
}));
describe('CartModal', () => {
  const mockOnClose = jest.fn();
  const mockOnClear = jest.fn();

  const mockBooking = {
    concertName: 'Test Concert',
    date: '2023-12-31',
    tickets: [
      { type: 'VIP', count: 2, price: 50000 },
      { type: 'Standard', count: 1, price: 30000 },
    ],
    totalPrice: 130000,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call createTicket mutation when "Худалдан авах" button is clicked', async () => {
    const createTicketMock = jest.fn().mockResolvedValue({ data: { createTicketOrder: {} } });
    (useCreateTicketOrderMutation as jest.Mock).mockReturnValue([createTicketMock, { loading: false, data: null }]);
    const localBooking = {
      concertId: 'concert123',
      seatDataId: 'seat456',
      tickets: [
        { type: 'VIP', count: 1, price: 10000 },
        { type: 'Standard', count: 2, price: 8000 },
      ],
      userId: 'user789',
      date: '2025-06-15',
      totalPrice: 26000,
    };
    Storage.prototype.getItem = jest.fn(() => JSON.stringify(localBooking));
    render(
      <MockedProvider>
        <CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Худалдан авах'));
    expect(createTicketMock).toHaveBeenCalledWith({
      variables: {
        input: {
          concertId: 'concert123',
          seatDataId: 'seat456',
          tickets: localBooking.tickets,
          userId: 'user789',
          date: '2025-06-15',
          totalPrice: 26000,
        },
      },
    });
  });
  it('should log error when createTicket mutation fails', async () => {
    const errorMock = new Error('Mutation failed');
    const createTicketMock = jest.fn().mockRejectedValue(errorMock);
    (useCreateTicketOrderMutation as jest.Mock).mockReturnValue([createTicketMock, { loading: false, data: null }]);

    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {
      // noop
    });

    const localBooking = {
      concertId: 'concert123',
      seatDataId: 'seat456',
      tickets: [
        { type: 'VIP', count: 1, price: 10000 },
        { type: 'Standard', count: 2, price: 8000 },
      ],
      userId: 'user789',
      date: '2025-06-15',
      totalPrice: 26000,
    };

    Storage.prototype.getItem = jest.fn(() => JSON.stringify(localBooking));

    render(
      <MockedProvider>
        <CartModal isOpen={true} onClose={mockOnClose} booking={mockBooking} onClear={mockOnClear} />
      </MockedProvider>
    );

    fireEvent.click(screen.getByText('Худалдан авах'));

    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(consoleSpy).toHaveBeenCalledWith(errorMock);

    consoleSpy.mockRestore();
  });
});
