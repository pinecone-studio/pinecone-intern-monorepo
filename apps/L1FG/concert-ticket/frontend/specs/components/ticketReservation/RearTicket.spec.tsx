import RearTicket from '@/components/ticketReservation/RearTicket';
import { render } from '@testing-library/react';

describe('StandartTicket', () => {
  it('should render the component with the correct count', async () => {
    render(<RearTicket Decrement={jest.fn()} Increment={jest.fn()} rearCount={5} />);
  });
});
