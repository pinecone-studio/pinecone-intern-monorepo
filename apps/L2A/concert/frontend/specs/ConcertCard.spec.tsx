import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ConcertCard from '@/app/_components/ConcertCard';

describe('ConcertCard', () => {
  it('renders ConcertCard', () => {
    render(<ConcertCard />);

    const card = screen.getByTestId('concert-card');
    expect(card).toBeInTheDocument();
  });
});
