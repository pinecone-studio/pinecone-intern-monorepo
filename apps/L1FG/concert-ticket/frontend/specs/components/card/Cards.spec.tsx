import { Cards } from '@/components/ticketCard/Cards';
import { render } from '@testing-library/react';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));
const cards = [
  {
    _id: 'jgw87',
    concertName: 'mm',
    concertPlan: 'dv',
    artistName: ['dfsvsdv'],
    concertDay: 436,
    concertTime: 'fdg',
    concertPhoto: 'fsg',
    vipTicket: { price: 34, quantity: 234 },
    regularTicket: { price: 34, quantity: 234 },
    standingAreaTicket: { price: 34, quantity: 234 },
  },
];

describe('Cards', () => {
  it('should render successfully', async () => {
    render(<Cards cards={cards} />);
  });
});
