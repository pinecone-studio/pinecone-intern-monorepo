import Container from '@/app/_components/Container';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('container components', () => {
  beforeEach(() => {
    render(<Container />);
  });
  it('renders heading correctly', () => {
    const heading = screen.getByText('Swipe Right®');
    expect(heading).toBeInTheDocument();
  });

  it('renders the Create Account button', () => {
    const button = screen.getByRole('button', { name: 'Create Account' });
    expect(button).toBeInTheDocument();
  });
});
