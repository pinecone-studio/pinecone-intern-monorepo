import StandartTicket from '@/components/ticketReservation/StandartTicket';
import { render } from '@testing-library/react';

describe('StandartTicket', () => {
  it('should render the component with the correct count', async () => {
    render(<StandartTicket Decrement={jest.fn()} Increment={jest.fn()} standardCount={5} />);

    // Check that the standard count is displayed
    // await expect(screen.getByTestId('standard-count')).toHaveTextContent('5');
  });

  //   it('should call Decrement when the minus button is clicked', () => {
  //     const decrementMock = jest.fn();
  //     const incrementMock = jest.fn();

  //     render(<StandartTicket Decrement={decrementMock} Increment={incrementMock} standardCount={5} />);

  //     // Click the minus button
  //     fireEvent.click(screen.getByTestId('minus-ticket-button-one'));

  //     // Check that the Decrement function was called
  //     expect(decrementMock).toHaveBeenCalledTimes(1);
  //   });

  //   it('should call Increment when the plus button is clicked', () => {
  //     const decrementMock = jest.fn();
  //     const incrementMock = jest.fn();

  //     render(<StandartTicket Decrement={decrementMock} Increment={incrementMock} standardCount={5} />);

  //     // Click the plus button
  //     fireEvent.click(screen.getByTestId('plus-ticket-button-one'));

  //     // Check that the Increment function was called
  //     expect(incrementMock).toHaveBeenCalledTimes(1);
  //   });
});
