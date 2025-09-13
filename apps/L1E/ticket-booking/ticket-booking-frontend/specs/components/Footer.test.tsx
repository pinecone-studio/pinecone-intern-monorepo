'use client';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Footer } from '@/components/Footer';

// Mock Next.js Link
jest.mock('next/link', () => {
    return ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    );
});

describe('Footer', () => {
    beforeEach(() => {
        render(<Footer />);
    });

    it('renders the logo text', () => {
        const logoText = screen.getByText('TICKET BOOKING');
        expect(logoText).toBeInTheDocument();
    });

    it('renders the copyright text', () => {
        const copyright = screen.getByText(/© 2024 Booking Mongolia/i);
        expect(copyright).toBeInTheDocument();
    });

    it('renders the email info', () => {
        expect(screen.getByText('Email:')).toBeInTheDocument();
        expect(screen.getByText('support@ticketbooking.mn')).toBeInTheDocument();
    });

    it('renders the phone info', () => {
        expect(screen.getByText('Phone:')).toBeInTheDocument();
        expect(screen.getByText('+976 (11) 123-4567')).toBeInTheDocument();
    });

    it('renders the customer support info', () => {
        expect(screen.getByText('Customer Support::')).toBeInTheDocument();
        expect(screen.getByText('Available 24/7')).toBeInTheDocument();
    });

    it('logo links to the homepage', () => {
        const link = screen.getByRole('link', { name: /TICKET BOOKING/i });
        expect(link).toHaveAttribute('href', '/');
    });
});
