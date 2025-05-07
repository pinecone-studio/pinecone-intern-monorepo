import { render, screen } from '@testing-library/react';
import Footer from '@/app/_components/Footer';
import '@testing-library/jest-dom';

// ✅ Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} alt={props.alt || 'mocked image'} />,
}));

// ✅ Mock usePathname from next/navigation
import { usePathname } from 'next/navigation';
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('Footer component', () => {
  it('renders logo and company name on non-admin page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Footer />);
    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Home Vault/i)).toBeInTheDocument();
  });

  it('renders contact information and social icons on non-admin page', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<Footer />);
    expect(screen.getByText(/support@pedia.mn/i)).toBeInTheDocument();
    expect(screen.getByText(/\+976 \(11\) 123-4567/)).toBeInTheDocument();
    expect(screen.getByText(/Available 24\/7/)).toBeInTheDocument();
  });

  it('hides contact and social info on /admin page', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin');

    render(<Footer />);
    expect(screen.queryByText(/support@pedia.mn/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Available 24\/7/)).not.toBeInTheDocument();
    expect(screen.queryByText(/\+976 \(11\) 123-4567/)).not.toBeInTheDocument();
  });

  it('always renders copyright', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin');

    render(<Footer />);
    expect(screen.getByText(/© 2024 Booking Mongolia. All Rights Reserved./i)).toBeInTheDocument();
  });
});
