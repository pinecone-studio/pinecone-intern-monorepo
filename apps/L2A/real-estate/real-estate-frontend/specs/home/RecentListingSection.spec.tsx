import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentListingsSection from '@/app/home/_components/RecentListingSection';

describe('RecentListingsSection', () => {
  it('renders section title', () => {
    render(<RecentListingsSection />);
    expect(screen.getByText('Сүүлд орсон зарууд')).toBeInTheDocument();
  });

  it('renders at least one listing card', () => {
    render(<RecentListingsSection />);
    expect(screen.getByText('Зайсан seoul royal county хотхон')).toBeInTheDocument();
  });

  it('renders View all link correctly', () => {
    render(<RecentListingsSection />);
    const link = screen.getByRole('link', { name: /View all/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/listings');
  });
});
