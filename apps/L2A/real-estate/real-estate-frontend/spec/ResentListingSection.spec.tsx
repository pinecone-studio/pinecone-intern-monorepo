import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RecentListingsSection from '../src/app/home/_components/ResentListingSection';


describe('RecentListingsSection', () => {
  it('renders section title', () => {
    render(<RecentListingsSection />);
    expect(screen.getByText('Сүүлд орсон зарууд')).toBeInTheDocument();
  });

  it('renders at least one listsing card', () => {
    render(<RecentListingsSection />);
    expect(screen.getByText('Зайсан seoul royal county хотхон')).toBeInTheDocument();
  });

  it('renders View all button', () => {
    render(<RecentListingsSection />);
    expect(screen.getByRole('button', { name: /View all/i })).toBeInTheDocument();
  });
});

