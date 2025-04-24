import ConcertCard from '@/app/_components/ConcertCard';
import { render } from '@testing-library/react';


describe('ConcertCard', () => {
  it('renders ConcertCard', () => {
    render(<ConcertCard/>);
  });
});
