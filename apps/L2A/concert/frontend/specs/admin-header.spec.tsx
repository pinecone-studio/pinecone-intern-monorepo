import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// usePathname-ийг mock хийнэ
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

import { usePathname } from 'next/navigation';
import { Header } from '@/app/admin/_components/Header';

describe('Header component', () => {
  it('renders header with logo and avatar', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/ticket');

    render(<Header />);

    expect(screen.getByText('TICKET BOOKING')).toBeInTheDocument();
    expect(screen.getByText('CN')).toBeInTheDocument();
  });

  it('highlights the "Тасалбар" link when pathname is /admin/ticket', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/ticket');

    render(<Header />);

    const ticketLink = screen.getByText('Тасалбар').parentElement;
    expect(ticketLink).toHaveClass('border-b border-black');
  });

  it('highlights the "Цуцлах хүсэлт" link when pathname is /admin/cancel-request', () => {
    (usePathname as jest.Mock).mockReturnValue('/admin/cancel-request');

    render(<Header />);

    const cancelLink = screen.getByText('Цуцлах хүсэлт').parentElement;
    expect(cancelLink).toHaveClass('border-b border-black');
  });
});
