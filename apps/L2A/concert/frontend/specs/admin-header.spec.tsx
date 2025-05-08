'use client';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { usePathname } from 'next/navigation';
import AdminHeader from '@/app/admin/_components/AdminHeader';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe('AdminHeader', () => {
  it('renders and highlights Тасалбар when pathname is /admin/ticket', () => {
    usePathname.mockReturnValue('/admin/ticket');

    render(<AdminHeader />);

    const ticketLink = screen.getByTestId('ticket-button-admin');
    const cancelLink = screen.getByTestId('cancel-request-admin');

    expect(ticketLink).toHaveClass('border-b');
    expect(cancelLink).not.toHaveClass('border-b');
  });

  it('renders and highlights Цуцлах хүсэлт when pathname is /admin/cancel-request', () => {
    usePathname.mockReturnValue('/admin/cancel-request');

    render(<AdminHeader />);

    const ticketLink = screen.getByTestId('ticket-button-admin');
    const cancelLink = screen.getByTestId('cancel-request-admin');

    expect(ticketLink).not.toHaveClass('border-b');
    expect(cancelLink).toHaveClass('border-b');
  });

  it('renders default header content', () => {
    usePathname.mockReturnValue('/admin/ticket');

    render(<AdminHeader />);

    expect(screen.getByText('TICKET BOOKING')).toBeInTheDocument();
    expect(screen.getByText('Тасалбар')).toBeInTheDocument();
    expect(screen.getByText('Цуцлах хүсэлт')).toBeInTheDocument();
  });
});
