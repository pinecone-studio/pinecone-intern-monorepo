import GuestHeader from '@/app/_components/GuestHeader';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('header components', () => {
  beforeEach(() => {
    render(<GuestHeader />);
  });
  it('renders the header image', () => {
    const image = screen.getByAltText('header-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'header.svg');
  });

  it('renders Create Account button with correct link', () => {
    const button = screen.getByText('Create Account');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/auth/sign-up');
  });

  it('renders Log in button with correct link', () => {
    const button = screen.getByText('Log in');
    expect(button).toBeInTheDocument();
    expect(button.closest('a')).toHaveAttribute('href', '/auth/sign-in');
  });
});
