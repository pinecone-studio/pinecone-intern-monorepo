import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RoomCard from '@/app/(main)/_components/RoomCard';

describe('RoomCard', () => {
    beforeEach(() => {
        render(<RoomCard />);
    });

    test('renders the room title', () => {
        expect(screen.getByText(/Economy Double Room, City View/i)).toBeInTheDocument();
    });

    test('displays amenities', () => {
        expect(screen.getByText(/Free WiFi/i)).toBeInTheDocument();
        expect(screen.getByText(/Spa access/i)).toBeInTheDocument();
        expect(screen.getByText(/Free self parking/i)).toBeInTheDocument();
        expect(screen.getByText(/Complimentary breakfast/i)).toBeInTheDocument();
        expect(screen.getByText(/Fitness center access/i)).toBeInTheDocument();
        expect(screen.getByText(/Airport shuttle service/i)).toBeInTheDocument();
        expect(screen.getByText(/Room cleaning service/i)).toBeInTheDocument();
    });

    test('shows total price and price per night', () => {
        expect(screen.getByText('150,000₮')).toBeInTheDocument();
        expect(screen.getByText(/80,000₮ Price per night/i)).toBeInTheDocument();
    });

    test('has a Show more button', () => {
        expect(screen.getByRole('button', { name: /Show more/i })).toBeInTheDocument();
    });

    test('has a Reserve button', () => {
        expect(screen.getByRole('button', { name: /Reserve/i })).toBeInTheDocument();
    });

    test('has a Price detail button', () => {
        expect(screen.getByRole('button', { name: /Price detail/i })).toBeInTheDocument();
    });
});