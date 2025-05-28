import { Footer } from '@/app/_components/Footer';
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

describe('Footer Component', () => {
  it('renders logo and company name', () => {
    expect(() => render(<Footer />)).not.toThrow();
    expect(screen.getByText('Pedia')).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    render(<Footer />);
    expect(screen.getByText('Contact Information')).toBeInTheDocument();
    expect(screen.getByText(/Email: support@pedia\.mn/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone: \+976 \(11\) 123-4567/i)).toBeInTheDocument();
    expect(screen.getByText(/Customer Support: Available 24\/7/i)).toBeInTheDocument();
  });

  it('renders follow us section', () => {
    render(<Footer />);
    expect(screen.getByText('Follow us')).toBeInTheDocument();
    ['Facebook', 'Instagram', 'Twitter', 'Youtube'].forEach((platform) => {
      expect(screen.getByText(platform)).toBeInTheDocument();
    });
  });

  it('renders policies section', () => {
    render(<Footer />);
    expect(screen.getByText('Policies')).toBeInTheDocument();
    ['Terms & Conditions', 'Privacy', 'Cookies', 'Cancellation Policy'].forEach((policy) => {
      expect(screen.getByText(policy)).toBeInTheDocument();
    });
  });

  it('renders other links section', () => {
    render(<Footer />);
    expect(screen.getByText('Other')).toBeInTheDocument();
    ['About us', 'Careers', 'Travel guides'].forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it('renders copyright', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2024 Booking Mongolia/i)).toBeInTheDocument();
  });
});
