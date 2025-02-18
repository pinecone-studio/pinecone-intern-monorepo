import VipTicket from '@/components/ticketReservation/VipTicket';
import { render, screen } from '@testing-library/react';

describe('VipTicket', () => {
  it('should render the component with the vipclick ticket', async () => {
    render(<VipTicket vip={1} vipClick={2} vipPrice={1} vipRealCount={-1} Decrement={jest.fn()} Increment={jest.fn()} vipCount={5} />);
    screen.getByText(/VIP тасалбар \(0\)/i);
  });
  it('should render the component with the vip ticket', async () => {
    render(<VipTicket vip={2} vipClick={1} vipPrice={1} vipRealCount={-1} Decrement={jest.fn()} Increment={jest.fn()} vipCount={5} />);
    screen.getByText(/VIP тасалбар \(0\)/i);
  });
});
