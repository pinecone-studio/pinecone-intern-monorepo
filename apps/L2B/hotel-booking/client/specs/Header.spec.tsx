import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/_components/Header';

jest.mock('next/link', () => {
  const Link = ({ children, href }) => <a href={href}>{children}</a>;
  Link.displayName = 'Link';
  return Link;
});

describe('Header Component', () => {
  it('renders logo and title correctly', () => {
    render(<Header />);
    expect(screen.getByText('Pedia')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    render(<Header />);
    const links = screen.getByTestId('link');
    expect(links).toBeInTheDocument();
    expect(screen.getByText('Register')).toHaveAttribute('href', '/signup');
    expect(screen.getByText('Sign in')).toHaveAttribute('href', '/signin');
  });
});
