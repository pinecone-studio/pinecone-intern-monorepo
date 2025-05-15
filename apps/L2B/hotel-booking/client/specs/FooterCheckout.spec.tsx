import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { FooterCheckout } from '@/app/_components/FooterCheckout';

jest.mock('next/link', () => {
  return ({ children }: { children: React.ReactNode }) => {
    return children;
  };
});

describe('FooterCheckout', () => {
  it('renders the logo and paragraph text', () => {
    render(<FooterCheckout />);

    // Check for brand name
    expect(screen.getByText('Pedia')).toBeInTheDocument();

    // Check for paragraph content
    expect(screen.getByText(/Some hotels require you to cancel more than 24 hours/i)).toBeInTheDocument();

    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
  });
});
