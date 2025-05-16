import { Navbar } from '@/app/(admin)/guest-info/_components/Navbar';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Admin navbar component ', () => {
  it('renders all breadcrumbs', () => {
    render(<Navbar />);
    expect(screen.getByText('Hotels')).toBeInTheDocument();
    expect(screen.getByText('Hotel Detail')).toBeInTheDocument();
    expect(screen.getByText('Room Detail')).toBeInTheDocument();
    expect(screen.getByText('Guest Info')).toBeInTheDocument();

    const arrows = screen.getAllByText('>');
    expect(arrows).toHaveLength(3);
  });

  it('has correct link structure', () => {
    render(<Navbar />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    links.forEach((link) => {
      expect(link).toHaveAttribute('href', '#');
    });
  });
});
