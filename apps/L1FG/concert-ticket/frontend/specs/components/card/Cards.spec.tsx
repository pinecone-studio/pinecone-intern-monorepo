import { Cards } from '@/components/ticketCard/Cards';
import { render } from '@testing-library/react';

const cards = [{ title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' }];
describe('Cards', () => {
  it('should render successfully', async () => {
    render(<Cards cards={cards} />);
  });
});
