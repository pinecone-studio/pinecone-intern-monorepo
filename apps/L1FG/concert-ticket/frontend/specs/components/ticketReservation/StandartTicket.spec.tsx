import StandartTicket from '@/components/ticketReservation/StandartTicket';
import { render } from '@testing-library/react';

describe('StandartTicket', () => {
  it('should render the component with the false count', async () => {
    render(<StandartTicket Decrement={jest.fn()} Increment={jest.fn()} standartCount={1} standart={1} standartClick={1} standartPrice={1} standartRealCount={-1} handleChange={jest.fn()} />);
  });
  it('should render the component with the correct count', async () => {
    render(<StandartTicket Decrement={jest.fn()} Increment={jest.fn()} standartCount={1} standart={1} standartClick={2} standartPrice={1} standartRealCount={1} handleChange={jest.fn()} />);
  });
});
