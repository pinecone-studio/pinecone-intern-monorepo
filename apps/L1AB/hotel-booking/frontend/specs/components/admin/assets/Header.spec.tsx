import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Header } from '@/components/admin/assets';
import { usePathname } from 'next/navigation';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

describe("Admin Header", () => {
    it('should render the admin header with hotel breadcrumbs', () => {
      const hotelPaths = ['/admin/hotels', '/admin/hotels/1', '/admin/hotels/1/11', '/admin/hotels/1/11/111'];
      const expectedHotelLabels = ['Hotels', 'Hotel Details', 'Room Details', 'Guest Info'];

      hotelPaths.forEach((path, index) => {
        usePathname.mockReturnValue(path);
        render(<Header />);

        expect(screen.getByText(expectedHotelLabels[index])).toBeInTheDocument();
      });
    });
    it('should render the admin header with guest breadcrumbs', () => {
      const guestPaths = ['/admin/guests', '/admin/guests/1'];

      const expectedGuestLabels = ['Guests', 'Guest Info'];

      guestPaths.forEach((path, index) => {
        usePathname.mockReturnValue(path);
        render(<Header />);

        expect(screen.getByText(expectedGuestLabels[index])).toBeInTheDocument();
      });
    });
    it('renders only the header icon for an undefined path', () => {
      const unknownPaths = ['/admin/unknown/path', '/admin/another/path/with/no/label', '/unknown'];
      const unexpectedLinks = ['Hotels', 'Hotel Details', 'Guests', 'Room Details', 'Guest Info'];

      unknownPaths.forEach((path) => {
        usePathname.mockReturnValue(path);
        render(<Header />);

        unexpectedLinks.forEach((text) => {
          expect(screen.queryByText(text)).not.toBeInTheDocument();
        });
      });
    });
});
