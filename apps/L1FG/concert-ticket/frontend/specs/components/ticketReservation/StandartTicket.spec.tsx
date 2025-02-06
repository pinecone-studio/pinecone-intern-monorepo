import StandartTicket from '@/components/ticketReservation/StandartTicket';
import { render } from '@testing-library/react';

describe('StandartTicket', () => {
  it('should render the component with the correct count', async () => {
    render(<StandartTicket Decrement={jest.fn()} Increment={jest.fn()} standardCount={5} />);
  });
});
