import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/admin/assets';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe("Admin Header", () => {
    it("should render the admin header with breadcrumbs", () => {
        usePathname.mockReturnValue('/admin/1/11/111');
        
        render(<Header />);

        const breadcrumbLinks = ["Hotels", "Hotel Details", "Room Details", "Guest Info"];
        
        breadcrumbLinks.forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });

        expect(screen.getByTestId('header-icon')).toBeInTheDocument();
    });
});
