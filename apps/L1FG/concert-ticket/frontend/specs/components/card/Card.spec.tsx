import { Card } from '@/components/ticketCard/Card';
import { render } from '@testing-library/react';
const card = {
  __typename: 'Concert',
  _id: 1,
  concertName: 'mm',
  concertPlan: 'dv',
  artistName: ['dfsvsdv'],
  concertDay: 436,
  concertTime: 'fdg',
  concertPhoto: 'fsg',
  vipTicket: { price: 34, quantity: 234 },
  regularTicket: { price: 34, quantity: 234 },
  standingAreaTicket: { price: 34, quantity: 234 },
};
describe('card', () => {
  it('card render successfully', async () => {
    render(<Card card={card} />);
  });
});
