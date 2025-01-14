import { Card } from '@/components/ticketCard/Card';
import { render } from '@testing-library/react';
const card = { title: 'Music of the Spheres', artist: 'coldplay', price: '200’000$', discount: '160’000', concertDay: '10.31', location: 'UG ARENA', src: '/coldplay.png' };
describe('card', () => {
  it('card render successfully', async () => {
    render(<Card card={card} />);
  });
});
