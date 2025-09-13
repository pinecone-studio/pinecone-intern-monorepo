import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AdminHeader } from '@/components/AdminHeader';

describe('AdminHeader Component', () => {
    // Mock function for setActiveTab
    const mockSetActiveTab = jest.fn();

    it('renders the header with logo and profile image', () => {
        render(<AdminHeader activeTab="ticket" setActiveTab={mockSetActiveTab} />);

        // Check that the logo and profile image are rendered
        expect(screen.getByText('TICKET BOOKING')).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    it('renders the correct tab buttons', () => {
        render(<AdminHeader activeTab="ticket" setActiveTab={mockSetActiveTab} />);

        // Check that the "Тасалбар" button is rendered and active
        expect(screen.getByText('Тасалбар')).toBeInTheDocument();
        expect(screen.getByText('Тасалбар')).toHaveClass('border-b border-black');

        // Check that the "Цуцлах хүсэлт" button is rendered and inactive
        expect(screen.getByText('Цуцлах хүсэлт')).toBeInTheDocument();
        expect(screen.getByText('Цуцлах хүсэлт')).not.toHaveClass('border-b border-black');
    });

    it('sets the active tab when a button is clicked', () => {
        render(<AdminHeader activeTab="ticket" setActiveTab={mockSetActiveTab} />);

        const cancelRequestButton = screen.getByText('Цуцлах хүсэлт');

        // Simulate a click on "Цуцлах хүсэлт"
        fireEvent.click(cancelRequestButton);

        // Check that the mock function is called with the correct argument
        expect(mockSetActiveTab).toHaveBeenCalledWith('cancelRequest');
    });

    it('applies the active tab style correctly', () => {
        // Test with activeTab set to "cancelRequest"
        render(<AdminHeader activeTab="cancelRequest" setActiveTab={mockSetActiveTab} />);

        // Check that the "Цуцлах хүсэлт" button is active
        expect(screen.getByText('Цуцлах хүсэлт')).toHaveClass('border-b border-black');
        // Check that the "Тасалбар" button is inactive
        expect(screen.getByText('Тасалбар')).not.toHaveClass('border-b border-black');
    });
});
