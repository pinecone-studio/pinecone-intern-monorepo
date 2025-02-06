import { TotalPrice } from '@/components/ticketReservation/TicketPrice';
import { render } from '@testing-library/react';

describe('ticket price', () => {
  it('render component', async () => {
    render(<TotalPrice standardCount={1} standardPrice={1} rearCount={1} rearPrice={1} vipCount={1} vipPrice={1} total={1} />);
  });
});
