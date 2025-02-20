import { TotalPrice } from '@/components/ticketReservation/TicketPrice';
import { render } from '@testing-library/react';

describe('ticket price', () => {
  it('render component', async () => {
    render(<TotalPrice vipClick={3} rearClick={23} standartClick={3} handleNext={jest.fn()} standartCount={1} standartPrice={1} rearCount={1} rearPrice={1} vipCount={1} vipPrice={1} total={1} />);
  });
  it('render component', async () => {
    render(<TotalPrice vipClick={3} rearClick={23} standartClick={3} handleNext={jest.fn()} standartCount={0} standartPrice={0} rearCount={0} rearPrice={0} vipCount={0} vipPrice={0} total={0} />);
  });
});
