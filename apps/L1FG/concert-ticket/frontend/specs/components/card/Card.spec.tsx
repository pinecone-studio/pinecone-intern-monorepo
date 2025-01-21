import { Card } from '@/components/ticketCard/Card';
import { render } from '@testing-library/react';

const formatDate = '2025-1-31';
const card = {
  _id: 'jdwhfg37',
  concertName: 'Coldplay live',
  concertPlan: 'Coldplay',
  artistName: ['dfsvsdv'],
  concertDay: formatDate,
  concertTime: 'fdg',
  concertPhoto: 'fsg',
  vipTicket: { price: 34, quantity: 234 },
  regularTicket: { price: 34, quantity: 234 },
  standingAreaTicket: { price: 34, quantity: 234 },
};
describe('card', () => {
  it('change concertday', async () => {
    const { getByTestId } = render(<Card card={card}></Card>);
    const dateText = getByTestId('card-format-date');
    expect(dateText).toBeDefined();
  });
});
