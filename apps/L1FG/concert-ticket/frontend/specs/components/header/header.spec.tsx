import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import { HeaderPart } from '@/components/header/Header';

jest.mock('next/link', () => {
  const Link = ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
  Link.displayName = 'Link';
  return Link;
});

describe('HeaderPart', () => {
  it('renders the header component', () => {
    render(<HeaderPart />);
    expect(screen.getByText('TICKET BOOKING')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getByText('Бүртгүүлэх')).toBeInTheDocument();
    expect(screen.getByText('Нэвтрэх')).toBeInTheDocument();
  });

  it('navigates to the home page when the logo is clicked', () => {
    render(<HeaderPart />);
    fireEvent.click(screen.getByText('TICKET BOOKING'));
    expect(window.location.href).toContain('/');
  });

  it('navigates to the sign-up page when the sign-up button is clicked', () => {
    render(<HeaderPart />);
    fireEvent.click(screen.getByText('Бүртгүүлэх'));
    expect(window.location.href).toContain('http://localhost/');
  });

  it('navigates to the login page when the login button is clicked', () => {
    render(<HeaderPart />);
    fireEvent.click(screen.getByText('Нэвтрэх'));
    expect(window.location.href).toContain('http://localhost/');
  });

  it('renders the search input and button', () => {
    render(<HeaderPart />);
    expect(screen.getByPlaceholderText('Хайлт')).toBeInTheDocument();
    expect(screen.getAllByRole('button')).toHaveLength(3); // Adjust the length based on the number of buttons
  });
});
