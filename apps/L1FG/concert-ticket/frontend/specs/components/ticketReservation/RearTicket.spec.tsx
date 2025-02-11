import RearTicket from '@/components/ticketReservation/RearTicket';
import { act, fireEvent, render, screen } from '@testing-library/react';

describe('RearTicket Component', () => {
  const mockIncrement = jest.fn();
  const mockDecrement = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('calls Increment function ', async () => {
    render(<RearTicket Decrement={mockDecrement} Increment={mockIncrement} rearCount={2} rearRealCount={3} rearPrice={15000} rearClick={1} rear={5} />);

    const incrementButton = screen.getByTestId('rear-increment');
    await act(async () => {
      fireEvent.click(incrementButton);
    });

    expect(mockIncrement).toHaveBeenCalled();
  });

  it('calls Decrement function', async () => {
    render(<RearTicket Decrement={mockDecrement} Increment={mockIncrement} rearCount={2} rearRealCount={3} rearPrice={15000} rearClick={1} rear={5} />);

    const decrementButton = screen.getByTestId('rear-decrement');
    await act(async () => {
      fireEvent.click(decrementButton);
    });

    expect(mockDecrement).toHaveBeenCalled();
  });

  it('shows warning message ', async () => {
    render(<RearTicket Decrement={mockDecrement} Increment={mockIncrement} rearCount={5} rearRealCount={-1} rearPrice={15000} rearClick={6} rear={4} />);
  });
});
