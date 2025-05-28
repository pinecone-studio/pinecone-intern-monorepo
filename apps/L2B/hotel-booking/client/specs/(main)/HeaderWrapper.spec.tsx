'use client';
import HeaderWrapper from '@/app/(main)/_components/HeaderWrapper';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import '@testing-library/jest-dom';

jest.mock('@/app/_components/Header', () => ({
  __esModule: true,
  default: ({ bg }: { bg: string }) => <div data-testid="header">Header with bg: {bg}</div>,
}));

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('HeaderWrapper', () => {
  it('renders Header with blue bg on "/" route', () => {
    (usePathname as jest.Mock).mockReturnValue('/');

    render(<HeaderWrapper />);

    expect(screen.getByTestId('header')).toHaveTextContent('Header with bg: blue');
  });

  it('renders Header with white bg on unknown route', () => {
    (usePathname as jest.Mock).mockReturnValue('/profile');

    render(<HeaderWrapper />);

    expect(screen.getByTestId('header')).toHaveTextContent('Header with bg: white');
  });

  it('does not render Header on /signin route', () => {
    (usePathname as jest.Mock).mockReturnValue('/signin');

    render(<HeaderWrapper />);

    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
  });
});
