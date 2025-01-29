import '@testing-library/jest-dom';

import NavButton from '@/components/admin-page-comp/NavButton';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(), // Mock usePathname to return a custom value
}));
describe('NavButton', () => {
  const mockHref = '/test';
  const mockChildren = 'Test Button';

  it('renders with correct href and children', () => {
    (usePathname as jest.Mock).mockReturnValue('/different-path');

    render(<NavButton href={mockHref}>{mockChildren}</NavButton>);

    const link = screen.getByRole('link');
    const button = screen.getByRole('button');

    expect(link).toHaveAttribute('href', mockHref);
    expect(button).toHaveTextContent(mockChildren);
  });

  it('applies active styles when current path matches href', () => {
    (usePathname as jest.Mock).mockReturnValue(mockHref);

    render(<NavButton href={mockHref}>{mockChildren}</NavButton>);

    const underline = screen.getByTestId('nav-button-underline');
    expect(underline).toHaveClass('scale-x-100');
  });

  it('applies inactive styles when current path does not match href', () => {
    (usePathname as jest.Mock).mockReturnValue('/different-path');

    render(<NavButton href={mockHref}>{mockChildren}</NavButton>);

    const underline = screen.getByTestId('nav-button-underline');
    expect(underline).toHaveClass('scale-x-0');
  });
});
