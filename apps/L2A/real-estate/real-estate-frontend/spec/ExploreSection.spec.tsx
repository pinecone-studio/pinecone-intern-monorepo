import { render, screen } from '@testing-library/react';
import ExploreSection from '../src/app/home/_components/ExploreSection';
import '@testing-library/jest-dom';

describe('ExploreSection', () => {
  it('renders section title', () => {
    render(<ExploreSection />);
    expect(screen.getByText('Explore Mongolia')).toBeInTheDocument();
  });

  it('renders multiple explore cards', () => {
    render(<ExploreSection />);
    expect(screen.getByText('Орон сууц')).toBeInTheDocument();
    expect(screen.getByText('Байшин')).toBeInTheDocument();
    expect(screen.getByText('Оффис')).toBeInTheDocument();
  });

  it('renders View all button', () => {
    render(<ExploreSection />);
    expect(screen.getByRole('button', { name: /View all/i })).toBeInTheDocument();
  });
});
