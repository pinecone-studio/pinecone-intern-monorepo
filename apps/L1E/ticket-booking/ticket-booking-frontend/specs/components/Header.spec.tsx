import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Header } from '@/components/Header';

describe('Header', () => {
    it('renders logo text', () => {
        render(<Header />);
        expect(screen.getByText(/TICKET BOOKING/i)).toBeInTheDocument();
    });

    it('renders search input', () => {
        render(<Header />);
        const searchInput = screen.getByPlaceholderText('Хайлт');
        expect(searchInput).toBeInTheDocument();
        expect(searchInput).toHaveAttribute('type', 'text');
    });

    it('renders signup and login buttons', () => {
        render(<Header />);
        expect(screen.getByRole('button', { name: 'Бүртгүүлэх' })).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Нэвтрэх' })).toBeInTheDocument();
    });

});
