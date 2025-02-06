import VipTicket from '@/components/ticketReservation/VipTicket';
import { render } from '@testing-library/react';

describe('VipTicket', () => {
  it('should render the component with the correct count', async () => {
    render(<VipTicket Decrement={jest.fn()} Increment={jest.fn()} vipCount={5} />);
  });
});
